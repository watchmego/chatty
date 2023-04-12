import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, useParams, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import { io } from "socket.io-client";

import { store } from "./app/store";
import { Join } from "./components/join/join";
import { Chat } from "./components/chat/main/chat";

function App() {
  const socket = io("https://192.168.178.33:8000");

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" exact element={<Join />} />
          <Route path="/chat/:room" element={<Chat socket={socket} />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
