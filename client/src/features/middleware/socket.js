import { addMessage, addUser, aiActive, isTyping } from "../chat/chatSlice";

export const socketMiddleware = (socket) => (params) => (next) => (action) => {
  const { dispatch, getState } = params;
  const { type, payload } = action;

  switch (type) {
    case "socket/connect": {
      const onConnectError = (err) => {
        console.log(`connect_error due to ${err.message}`);
      };
      const onMessage = (data) => {
        dispatch(addMessage(data));
      };

      //currently not used
      const onConnect = () => {};

      const onSession = ({ sessionID, userID, name }) => {
        socket.auth = {
          sessionID: sessionID,
          userID: userID,
        };
        sessionStorage.setItem("sessionID", sessionID);
        sessionStorage.setItem("userID", userID);
        socket.emit("join", {
          name: sessionStorage.getItem("name"),
          roomName: sessionStorage.getItem("room"),
        });
      };

      const onUserUpdate = (data) => {
        dispatch(addUser(data));
      };

      const onTyping = (message) => {
        if (message !== `${sessionStorage.getItem("name")} is typing`) {
          dispatch(isTyping(message));
        }
      };

      const onAddRemoveAI = (aiAdded) => {
        if (aiAdded) {
          dispatch(aiActive(true));
        } else {
          dispatch(aiActive(false));
        }
      };

      socket.on("typing", onTyping);
      socket.on("userList", onUserUpdate);
      socket.on("session", onSession);
      socket.on("connect_error", onConnectError);
      socket.on("messageResponse", onMessage);
      socket.on("connect", onConnect);
      socket.on("addRemoveAI", onAddRemoveAI);

      socket.auth = payload;
      socket.connect();
      break;
    }

    case "socket/disconnect": {
      const room = sessionStorage.getItem("room");
      const sessionID = sessionStorage.getItem("sessionID");
      if (room && sessionID) {
        socket.emit("leave", {
          room: sessionStorage.getItem("room"),
          sessionID: sessionStorage.getItem("sessionID"),
        });
      }
      socket.disconnect();
      socket.off("typing");
      socket.off("userList");
      socket.off("session");
      socket.off("connect_error");
      socket.off("messageResponse");
      socket.off("connect");
      socket.off("aiAdded");
      // unload();
      break;
    }

    case "socket/leave": {
      sessionStorage.removeItem("sessionID");
      sessionStorage.removeItem("userID");
      socket.emit("leave", payload);
      break;
    }
    case "socket/typing": {
      socket.emit("typing", payload);
      break;
    }

    case "socket/sendMessage": {
      socket.emit("message", payload);
      break;
    }

    case "socket/addRemoveAI": {
      socket.emit("addRemoveAI", payload);
      break;
    }
  }
  return next(action);
};
