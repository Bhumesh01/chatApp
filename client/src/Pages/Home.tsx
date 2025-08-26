import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { CrossIcon } from "../Icons/crossIcon";

export default function HomePage() {
  const [disable, setDisable] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const nameRef = useRef<HTMLInputElement>(null);
  const roomIdRef = useRef<HTMLInputElement>(null);
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();

  function createRoom(){
    setDisable(true);
    if(!nameRef.current?.value){
      setError("Please Enter Your Name!");
      setTimeout(()=>{
        setDisable(false);
        setError("");
      }, 2000);
    }
    else{
      const roomId = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      localStorage.setItem("user", JSON.stringify({
        name: nameRef.current?.value,
        roomId
      }));
      setMessage("Room Created Successfully!")
      setTimeout(()=>{
        setDisable(false);
        setMessage("");
        navigate("/chat");
      }, 2000);
    }
  }

  function joinRoom(){
    setDisable(true);
    if(!roomIdRef.current?.value && !nameRef.current?.value){
      setError("Please Enter Your Name & Room Id!");
      setTimeout(()=>{
        setDisable(false);
        setError("");
      }, 2000);
    }
    else if(!roomIdRef.current?.value){
      setError("Please Enter The Room Id!");
      setTimeout(()=>{
        setDisable(false);
        setError("");
      }, 2000);
    }
    else if(!nameRef.current?.value){
      setError("Please Enter Your Name!");
      setTimeout(()=>{
        setDisable(false);
        setError("");
      }, 2000);
    }
    else{
      const roomId = roomIdRef.current?.value;
      localStorage.setItem("user", JSON.stringify({
        name: nameRef.current?.value,
        roomId
      }));
      setMessage("Room Joined Successfully!")
      setTimeout(()=>{
        setDisable(false);
        setMessage("");
        navigate("/chat");
      }, 2000);
    }
  }

  return (
    <div className="h-screen bg-linear-to-r/srgb from-bgPrimary/80 to-bgSecondary/10 flex justify-center items-center flex-col">
      <div className="max-w-6xl mx-auto text-center pl-2 pr-2">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-accent drop-shadow-lg tracking-tight">LinkUp</h1>
          <div className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto font-semibold">
            Connect Instantly, Chat Effortlessly
          </div>
          <div className="text-lg mb-8 max-w-2xl mx-auto">
            Experience seamless communication with friends, family, and colleagues. Join millions who trust LinkUp for
            their daily conversations.
          </div>
        </div>
        <div className="flex justify-center flex-col p-2">
            <div className="flex justify-center">
                <input ref={nameRef} className="text-center border border-bgSecondary focus:border-bgSecondary outline-0 w-xs sm:w-sm rounded-xl p-2 bg-[#bcf5df] focus:bg-[#dff0e9] focus:scale-110" type="text" placeholder="Enter your name" />
            </div>
            <div className="flex justify-center sm:justify-between w-full gap-10 mt-5 mb-5 flex-wrap items-center">
                <button disabled={disable} className="bg-bgPrimary border border-slate-100/50 w-3xs rounded-2xl p-2 pl-5 pr-5 font-semibold text-lg hover:bg-bgSecondary hover:scale-110 focus:scale-110 focus:bg-bgSecondary transition-all duration-75 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed" onClick={createRoom}>Create Room</button>
                <button disabled={disable} className="bg-bgSecondary border border-slate-100/50 w-3xs rounded-2xl p-2 pl-5 pr-5 font-semibold text-lg hover:bg-bgPrimary focus:bg-bgPrimary hover:scale-110 focus:scale-110 transition-all duration-75 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed" onClick={()=>setModal(true)}>Join Room</button>
            </div>
        </div>
        {error&&<div className="absolute top-10 h-10 bg-red-600 p-2 rounded-2xl pl-4 pr-4  text-white font-semibold  pb-5 w-fit  flex  justify-center">{error}</div>}
        {message&&<div className="absolute top-20 h-10 bg-green-600 p-2 rounded-2xl pl-4 pr-4  text-white font-semibold  pb-5 w-fit  flex  justify-center">{message}</div>}
        {
          modal&&<div className="fixed inset-0 z-[9999] flex flex-col justify-center items-center m-2">
            <div className="absolute inset-auto h-55 rounded-2xl w-90 bg-white"></div>
            <div className="relative z-10 flex flex-col gap-5 justify-center items-center">
              <div className="flex justify-between w-full pl-2">
                <h2 className="font-semibold text-xl">Please Enter the Room ID:</h2>
                <div className="relative -top-5 -right-5 bg-red-600 text-white w-fit p-2 rounded-2xl hover:bg-red-600/60 focus:bg-red-600/60 focus:scale-110 hover:scale-110" onClick={()=>setModal(false)}>
                  <CrossIcon />
                </div>
              </div>
              <input ref={roomIdRef} className="text-center border border-bgSecondary focus:border-bgSecondary outline-0 w-2xs sm:w-2sm rounded-xl p-2 bg-[#bcf5df] focus:bg-[#dff0e9] focus:scale-110" type="text" placeholder="Enter The roomId" />
              <button disabled={disable} className="bg-bgSecondary border border-slate-100/50 w-3xs rounded-2xl p-2 pl-5 pr-5 font-semibold text-lg hover:bg-bgPrimary focus:bg-bgPrimary hover:scale-110 focus:scale-110 transition-all duration-75 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed" onClick={joinRoom}>Join</button>
            </div>
          </div>
        }
    </div>
  )
}
