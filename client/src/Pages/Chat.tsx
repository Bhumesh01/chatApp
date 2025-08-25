import { SendIcon } from "../Icons/sendIcon"
import { useEffect, useRef, useState } from "react"

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>(["hi there", "how do you do?"]);
  const inputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket>(null);
  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;
    ws.onmessage = (event)=>{
      setMessages(m=>[...m, event.data]);
    };
    ws.onopen = ()=>{
      ws.send(JSON.stringify({
        "type": "join",
        "payload":{
          "roomId": "1234"
        }
      }))
    }
    return ()=>{
      ws.close();
    }
  }, [])
  return (
    <div className="flex flex-col bg-bg h-screen p-5 sm:pl-15 sm:pr-15 lg:pl-35 lg:pr-35">
      <div className="h-auto text-text font-bold text-2xl sm:text-3xl lg:text-4xl flex items-center justify-center mb-5">
        WELCOME TO THE CHAT APP
      </div>
      <div className="flex-1 bg-card border border-borderCard border-b-0 rounded-t-2xl overflow-y-auto p-4">
        {messages.map((message, id)=><div key={id} className="p-3 rounded-2xl font-semibold bg-bgPrimary text-bg w-fit ml-auto mb-2">{message}</div>)}
      </div>
      <div className="h-16 bg-bgSecondary border border-t-0 border-borderCard rounded-b-2xl flex items-center gap-3 px-4">
        <input ref={inputRef} className="flex-1 bg-white text-text px-4 py-2 border border-borderCard rounded-xl focus:outline-none focus:ring-2 focus:ring-bgPrimary focus:border-transparent" type="text" placeholder="Enter your message..." />
        <button onClick={()=>{
          const message= inputRef.current?.value;
          if(message){
            wsRef.current?.send(JSON.stringify({
              "type": "chat",
              "payload": {
                "message": message
              }
            }));
          }
        }} className="bg-cardText hover:bg-opacity-90 text-white p-2 rounded-xl transition-colors duration-200 flex items-center justify-center" >
          <SendIcon />
        </button>
      </div>
    </div>
  )
}
