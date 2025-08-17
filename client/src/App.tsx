import { } from 'react'
import { SendIcon } from './Icons/sendIcon'

function App() {
  
  return (
    <div className='flex flex-col bg-black h-screen p-5 sm:pl-15 sm:pr-15 lg:pl-35 lg:pr-35'>
      <div className='flex-1/10 text-white font-bold text-2xl m-auto text-center'>WELCOME TO THE CHAT APP</div>
      <div className='flex-8/10 bg-gray-950 border border-slate-500 border-b-0 rounded-t-2xl'>
        
      </div>
      <div className='flex-1/10 bg-gray-900 border border-t-0 border-slate-500 rounded-b-2xl text-white flex justify-center items-center gap-2'>
        <input className='text-white text-center w-full border border-slate-50 rounded-2xl h-3/6 ml-2' type='Text' placeholder='Enter the message' />
        <button className='mr-2'>{<SendIcon />}</button>
      </div>
    </div>
  )
}

export default App
