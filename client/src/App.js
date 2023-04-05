import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createContext, useState } from 'react';

import { Join } from "./components/join/join";
import { Chat } from "./components/chat/main/chat";


function App() {


  return (
      <Router>
        <Routes>
            <Route path='/' exact element={<Join />} />
            <Route path='/chat/:room' element={<Chat />} />
        </Routes>
      </Router>
    
  )
}

export default App;
