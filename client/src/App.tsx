import HomePage from "./Pages/Home"
import ChatPage from "./Pages/Chat"
import { Routes, Route, BrowserRouter } from "react-router-dom"
export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
