import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, useParams, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { io } from "socket.io-client";


import { store } from "./app/store";
import { Join } from "./components/join/join";
import { Chat } from "./components/chat/main/chat";


function App() {
  
  const [socket, setSocket] = useState(null);

  let navigate = useNavigate()
  useEffect(() => {
    const path  = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
    if (path) {
      navigate(path, { replace: true});
    }
  },[])

  useEffect(() => {
    setSocket(io(process.env.REACT_APP_SERVER, {autoConnect: false}));
    console.log(`process.env...${process.env.REACT_APP_SERVER}`);
    return () => {
      socket.disconnect();
    };
  })

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat/:room" element={<Chat socket={socket} />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
