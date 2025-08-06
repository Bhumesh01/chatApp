import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({port: 8000});
let userCount = 0;
let allSockets: WebSocket[] = [];
wss.on("connection", function(socket){
    allSockets.push(socket);
    userCount++;
    socket.send("user Connected");
    allSockets.forEach(element => {
        element.send("total users: " + userCount);
    });
    socket.on("message", function(e){
        allSockets.forEach((element)=>{
            element!=socket&&element.send(`${e.toString()}`);
        })
    })
});