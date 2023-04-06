import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createContext, useState } from 'react';
import { io } from "socket.io-client";
import { Join } from "./components/join/join";
import { Chat } from "./components/chat/main/chat";


function App() {

  //initialise socket
  let socket = io("http://192.168.178.33:8000");

  return (
      <Router>
        <Routes>
            <Route path='/' exact element={<Join />} />
            <Route path='/chat/:room' element={<Chat socket={socket}/>} />
        </Routes>
      </Router>
    
  )
}

export default App;
