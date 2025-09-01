import { SendIcon } from "../Icons/sendIcon"
import CopyIcon from "../Icons/copyIcon";
import { useEffect, useRef, useState } from "react"

interface User{ 
  name: string, 
  roomId: string 
}
interface MessageType{
  "type": "chat",
  "name": string,
  "payload": {
                "message": string
  }
}
export default function ChatPage() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [user, setUser] = useState<User>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const wsRef = useRef<WebSocket|null>(null);
  useEffect(()=>{
    try{
      const raw = localStorage.getItem("user");
      const storedUser = raw? (JSON.parse(raw) as User): undefined;
      if(storedUser?.name && storedUser?.roomId){
        setUser(storedUser);
      }
    }
    catch(error){
      console.log("Error: " + error);
    }
  }, []);
  useEffect(()=>{
    if(!user)return;
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;
    ws.onopen = ()=>{
      console.log("Ws opened");
      setIsOpen(true);
      ws.send(JSON.stringify({
        "type": "join",
        "name": user.name,
        "payload": {
          "roomId": user.roomId,
        }
      }))
    };
    ws.onmessage = (event)=>{
      try{
        const msgData = JSON.parse(event.data) as MessageType;
         if (msgData?.payload?.message) {
          setMessages((m) => [...m, msgData])
        }
      }catch (err) {
        console.log("Invalid WS message:", event.data, err);
      }
    };
    ws.onerror = (e) => {
      console.log("[v0] WS error:", e)
    }

    ws.onclose = () => {
      console.log("[v0] WS closed")
      setIsOpen(false)
    }

    return () => {
      ws.close()
      wsRef.current = null
    }
  }, [user]);

  return (
    <div className="flex flex-col bg-bg h-screen p-5 sm:pl-15 sm:pr-15 lg:pl-35 lg:pr-35">
      <div className="h-auto text-bgPrimary font-bold text-2xl sm:text-3xl lg:text-4xl flex items-center justify-between mb-5">
        <div className="flex justify-between flex-wrap w-full">
          <div className="flex gap-2">
            <div>ROOM ID: <span className="font-medium text-black">{user?.roomId}</span></div>
            <div className="hover:bg-card p-2 rounded-2xl focus:bg-card focus:scale-110 ease-in-out hover:scale-110" onClick={()=>{
              if(user?.roomId){
                  navigator.clipboard.writeText(user.roomId).then(()=>alert("Room Id Copied to the clipboard"));
              }
            }}>
            {<CopyIcon />}
            </div>
          </div>
          <div>USERNAME: <span className="font-medium text-black">{user?.name}</span></div>
        </div>
      </div>
      <div className="flex-1 bg-card border border-borderCard border-b-0 rounded-t-2xl overflow-y-auto p-4">
        {messages.map((msg, id)=>
        (msg.name == user?.name) ?
        <div key={id} className="w-fit ml-auto mb-2 flex gap-2">
          <div className="p-3 rounded-2xl font-semibold bg-bgPrimary text-bg">{msg.payload.message}</div>
          <div className="bg-blue-700 rounded-full w-fit text-white font-semibold text-center pl-4 pr-4 flex items-center text-lg">{msg.name.split("")[0]}</div>
        </div>:
        <div key={id} className="w-fit mr-auto mb-2 flex gap-2">
          <div className="bg-red-700 rounded-full w-fit text-white font-semibold text-center pl-4 pr-4 flex items-center text-lg">{msg.name.split("")[0]}</div>
          <div className="p-3 rounded-2xl font-semibold bg-bgPrimary text-bg">{msg.payload.message}</div>
        </div>
        )}
      </div>
      <div className="h-16 bg-bgSecondary border border-t-0 border-borderCard rounded-b-2xl flex items-center gap-3 px-4">
        <input ref={inputRef} className="flex-1 bg-white px-4 py-2 border border-borderCard rounded-xl focus:outline-none focus:ring-2 focus:ring-bgPrimary focus:border-transparent focus:scale-105" type="text" placeholder="Enter your message..." />
        <button disabled={!isOpen} onClick={()=>{
            const message = inputRef.current?.value?.trim();
            if (!message || !user) return;

            const outgoing: MessageType = {
              type: "chat",
              name: user.name,
              payload: { message },
            };

            try {
              wsRef.current?.send(JSON.stringify(outgoing))
            } catch (e) {
              console.log("Failed to send over WS:", e)
            }
          
            if (inputRef.current) inputRef.current.value = ""
          }} className="bg-cardText hover:bg-opacity-90 text-white p-2 rounded-xl transition-all duration-75 flex items-center justify-center hover:scale-110 focus:scale-110 ease-in-out disabled:cursor-not-allowed" >
          <SendIcon />
        </button>
      </div>
    </div>
  )
}
