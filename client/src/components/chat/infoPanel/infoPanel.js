import { useEffect, useState } from "react";

import "./infoPanel.css";

export const InfoPanel = ({ socket, users }) => {
  console.log(users);
  //AI 'user' invite status
  const [aiInvited, setAIInvited] = useState(false);
  const handleAIInvite = () => {
    setAIInvited(true);
    socket.emit("addAI");
  };

  return (
    <div className="infoPanelBox">
      <button onClick={handleAIInvite}>Invite AI</button>
      <h2>Participants</h2>
      {users.map((user) => {
        return <p key={user.sessionId}>{user.name}</p>;
      })}
    </div>
  );
};
