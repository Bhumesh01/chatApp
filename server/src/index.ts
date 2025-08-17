import { WebSocketServer, WebSocket } from 'ws';

interface UserRequest{
    "type": "join"|"chat",
    "payload": Record<"message"|"roomId", string>
}

const wss = new WebSocketServer({port: 8080});
const arina = new Map<string, Set<WebSocket>>();
const user = new Map<WebSocket, string>();
wss.on("connection", function(socket:WebSocket){
    socket.on("error", console.error);
    socket.on("message", (e)=>{
        let request: UserRequest;
        try{
            request = JSON.parse(e.toString());
        }
        catch{
            socket.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
            return;
        }
        // When the user wants to join the room
        if(request.type === "join" && request.payload.roomId){
            const roomId = request.payload.roomId;
            if(!arina.has(roomId)){
                arina.set(roomId, new Set());
            }
            arina.get(roomId)?.add(socket);
            user.set(socket, roomId);
            socket.send(JSON.stringify({"message": "joined successfully"}));
        }
        // when the user wants to chat ie send messages
        else if(request.type === "chat" && request.payload.message){
            const roomId = user.get(socket);
            if(!roomId){
                socket.send(JSON.stringify({message: "You are not in a room" }));
                return;
            }
            arina.get(roomId)?.forEach(element=>element!==socket&&element.send(JSON.stringify(request)));
            socket.send(JSON.stringify({message: "Message sent successfully" }));
        }
    });
    // when the user leaves the room
    socket.on("close", ()=>{
        const roomId = user.get(socket);
        if(roomId && arina.get(roomId)){
            arina.get(roomId)?.delete(socket);
            if (arina.get(roomId)?.size === 0) {
                arina.delete(roomId);
            }
            user.delete(socket);
        }
    })
});