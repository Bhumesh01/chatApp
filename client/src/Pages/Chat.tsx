import { SendIcon } from "../Icons/sendIcon"
import CopyIcon from "../Icons/copyIcon";
import { useEffect, useRef, useState } from "react";
import Avatar from "boring-avatars";

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
const colorPalettes = [
  ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"],
  ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#845EC2"],
  ["#00C9A7", "#F9F871", "#FF9671", "#0081CF", "#FF6F91"],
  ["#FFB703", "#FB8500", "#219EBC", "#023047", "#8ECAE6"],
];

function getRandomColors(userId: number) {
  const index = userId % colorPalettes.length;
  return colorPalettes[index];
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
        <div key={id} className="w-fit ml-auto mb-2 flex items-start flex-col gap-1">
          <div className="flex gap-1">
            <Avatar name={msg.name} size={40} colors={getRandomColors(id)} variant="beam"/>
            <div className="font-semibold">{msg.name}</div>
          </div>
          <div className="relative -top-5  ml-3 p-3 max-w-3xl min-w-24 rounded-2xl font-semibold bg-bgPrimary text-bg w-fit">{msg.payload.message}</div>
        </div>:
        <div key={id} className="w-fit mr-auto mb-2 flex gap-1 flex-col items-start">
          <div className="flex gap-1">
            <Avatar name={msg.name} size={40} colors={getRandomColors(id)} variant="beam"/>
            <div className="font-semibold">{msg.name}</div>
          </div>
          <div className="relative -top-5 min-w-24 ml-3 p-3 max-w-3xl rounded-2xl font-semibold bg-bgPrimary text-bg w-fit">{msg.payload.message}</div>
        </div>
        )}
      </div>
      <div className="h-16 bg-bgSecondary border border-t-0 border-borderCard rounded-b-2xl flex items-center gap-3 px-4">
        <input ref={inputRef} className="flex-1 bg-white px-4 py-2 border border-borderCard rounded-xl focus:outline-none focus:ring-2 focus:ring-bgPrimary focus:border-transparent" type="text" placeholder="Enter your message..." />
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
