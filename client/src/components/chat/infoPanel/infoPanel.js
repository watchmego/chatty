import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./infoPanel.css";


export const InfoPanel = ({ socket, users, aiActive }) => {
  console.log(users);
  const dispatch = useDispatch();
  //AI 'user' invite status
  const handleAIInvite = () => {
    console.log('ai added?', aiActive);
    if(!aiActive) {
      console.log(socket);
      console.log('adding ai');
      dispatch({type: "socket/addRemoveAI", payload: {room: sessionStorage.getItem("room"), invite: true}})
    } else {
      dispatch({type: "socket/addRemoveAI", payload: {room: sessionStorage.getItem("room"), invite: false}})
    }
  };

  return (
    <div className="infoPanelBox">
      <div className="participantHeading">   
      <h3>Participants</h3>
      <button className="inviteButton" onClick={handleAIInvite}>{aiActive ? "Eject AI" : "Invite AI" }</button>
      </div>
      {users.map((user) => {
        return <p key={user.sessionId}>{user.name}</p>;
      })}
    </div>
  );
};
