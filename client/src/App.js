import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { io } from "socket.io-client";

import { store } from "./app/store";
import { Join } from "./components/join/join";
import { Chat } from "./components/chat/main/chat";

//initialise socket
console.log(process.env.REACT_APP_SERVER);
export const socket = io(process.env.REACT_APP_SERVER, { autoConnect: false });

function App() {
  const navigate = useNavigate();

  //enable direct access to website sub-pages
  useEffect(() => {
    const path = window.location.pathname;
    if (path !== "/") {
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
