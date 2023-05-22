import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./join.css";

export const Join = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = async (e) => {
    //save user info to session storage
    //additional authentication middleware can go here
    e.preventDefault();
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("room", room);

    navigate(`/chat/${room}`);
  };

  return (
    <div className="joinMain">
      <form className="joinInnerContainer" onSubmit={handleSubmit}>
        <h1 className="heading">Chatty</h1>
        <h2>Join or Create Chat</h2>
        <div>
          <input
            className="joinInput mt-20"
            placeholder="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="joinInput mt-20"
            placeholder="Room"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
            required
          />
        </div>
        <button className={"button mt-20"} type="submit">
          Join
        </button>
      </form>
    </div>
  );
};
