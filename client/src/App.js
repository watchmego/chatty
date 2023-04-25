import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, useParams, useRef, useLayoutEffect, createContext } from "react";
import { Provider, useDispatch } from "react-redux";
import { io } from "socket.io-client";


import { store } from "./app/store";
import { Join } from "./components/join/join";
import { Chat } from "./components/chat/main/chat";

export const socket = io(process.env.REACT_APP_SERVER, {autoConnect: false});
function App() {
  
  
  socket.auth = {};

  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/') {
      navigate(path);
    }
  }, []);

  return (
    <Provider store={store}>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat/:room" element={<Chat socket={socket} />} />
        </Routes>
    </Provider>
  );
}

export default App;
