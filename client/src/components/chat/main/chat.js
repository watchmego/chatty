import { useState, useEffect, useRef } from "react";
import { InfoPanel } from "../infoPanel/infoPanel";
import { MessageBox } from "../messageBox/messageBox";
import { TextInput } from "../textBox/textInput";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  clearMessages } from "../../../features/chat/chatSlice";

import "./chat.css";
import { Help } from "../modal/help";

export const Chat = () => {

  const name = sessionStorage.getItem("name");
  const sessionID = sessionStorage.getItem("sessionID");
  const userID = sessionStorage.getItem("userID");
  const room = sessionStorage.getItem("room");


  const dispatch = useDispatch();
  //clear messages from state if new room
 

  const messages = useSelector((state) => state.messages.messageList);
  const users = useSelector((state) => state.users.userList);
  const typingStatus = useSelector((state) => state.typing.typing);
  const aiActive = useSelector((state => state.ai.aiActive));
  const [helpOpen, setHelpOpen] = useState(false);
  

  //ref to keep last message in view
  const lastMessageRef = useRef(null);
  



  const auth = {
            name: name,
            sessionID: sessionID,
            userID: userID
          }

  useEffect(() => {
    //connect socket
    dispatch(clearMessages(room));
    dispatch({ type: 'socket/connect', payload: auth});
    //add listener to disconnect if browser is closed
    window.addEventListener('beforeunload', () => dispatch({ type: 'socket/disconnect'}))
    
    



    return () => {
      dispatch({ type: 'socket/disconnect'});
      window.removeEventListener('beforeunload', () => dispatch({ type: 'socket/disconnect'}));
    };
  }, []);

  //scroll to last message
  useEffect(() => {
    if (messages.length > 0) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  //help popup
  const handleHelpModal = () => {
    setHelpOpen(!helpOpen);
  }


  return (
    <>
      {!sessionStorage.getItem("name") ? (
        <Navigate to="/" />
      ) : (
        <div className="main">
          <InfoPanel  users={users} aiActive={aiActive} />
          <div className="chatContainer">
            <MessageBox
              messages={messages}
              lastMessageRef={lastMessageRef}
              typingStatus={typingStatus}
              handleHelp={handleHelpModal}
            />
            <TextInput />
            {helpOpen &&
            <Help handleHelp={handleHelpModal}/>
            }
          </div>
        </div>
      )}
    </>
  );
};
