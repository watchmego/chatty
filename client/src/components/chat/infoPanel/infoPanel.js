import { useEffect, useState } from "react";

import "./infoPanel.css";

export const InfoPanel = ({ socket, users, aiActive }) => {
  console.log(users);
  //AI 'user' invite status
  const handleAIInvite = () => {
    if(!aiActive) {
      console.log(socket);
      console.log('adding ai');
      socket.emit("addAI");
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
