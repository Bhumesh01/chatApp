export default function HomePage() {
  return (
    <div className="h-screen bg-linear-to-r/srgb from-bgPrimary/80 to-bgSecondary/10 flex justify-center items-center flex-col">
      <div className="max-w-6xl mx-auto text-center">
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
            <div>
                <input className="text-center border border-bgSecondary focus:border-bgSecondary outline-0 w-full rounded-xl p-2 bg-green-300/70 focus:bg-green-300/35 focus:scale-110" type="text" placeholder="Enter your name" />
            </div>
            <div className="flex justify-center sm:justify-between w-full gap-10 mt-5 mb-5 flex-wrap items-center">
                <button className="bg-bgPrimary border border-slate-100/50 w-3xs rounded-2xl p-2 pl-5 pr-5 font-semibold text-lg hover:bg-bgSecondary hover:scale-110 focus:scale-110 focus:bg-bgSecondary">Create Room</button>
                <button className="bg-bgSecondary border border-slate-100/50 w-3xs rounded-2xl p-2 pl-5 pr-5 font-semibold text-lg hover:bg-bgPrimary focus:bg-bgPrimary hover:scale-110 focus:scale-110 ">Join Room</button>
            </div>
        </div>
    </div>
  )
}
