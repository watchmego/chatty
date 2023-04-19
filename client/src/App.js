import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, useParams, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import { io } from "socket.io-client";


import { store } from "./app/store";
import { Join } from "./components/join/join";
import { Chat } from "./components/chat/main/chat";


function App() {
  
  const router = useRouter();
  const path = (/#!(\/.*)$/.exec(router.asPath) || [])[1];
  if (path) {
    router.replace(path);
  }
  
  const socket = io(process.env.REACT_APP_SERVER, {autoConnect: false});
  console.log(`process.env...${process.env.REACT_APP_SERVER}`);
  

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
