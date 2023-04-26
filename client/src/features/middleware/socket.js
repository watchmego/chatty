import { addMessage, addSocketToState, addUser, aiActive, isTyping } from "../chat/chatSlice";

export const socketMiddleware = (socket) => (params) => (next) => (action) => {
    const { dispatch, getState } = params;
    const { type, payload } = action;

    switch (type) {
        case 'socket/connect': {
            
            const onConnectError = (err) => {
                console.log(`connect_error due to ${err.message}`);
            };
            const onMessage = (data) => {
                console.log("message received", data);
                dispatch(addMessage(data));
            };
          
            const onConnect = () => {
                console.log("connecting socket", socket.auth);
            };
          
            const onSession = ({ sessionID, userID, name }) => {
                console.log("session data received");
                socket.auth =
                    {
                        sessionID: sessionID,
                        userID: userID
                    }
                sessionStorage.setItem("sessionID", sessionID);
                sessionStorage.setItem("userID", userID);
                socket.emit("join", { name: sessionStorage.getItem("name"), roomName: sessionStorage.getItem("room") });
            };
          
            const onUserUpdate = (data) => {
                console.log("userdata", data);
                dispatch(addUser(data));
            };
          
            const onTyping = (message) => {
                console.log("typgin");
                if (message !== `${sessionStorage.getItem("name")} is typing`) {
                  dispatch(isTyping(message));
                }
            };
          
            const onAIJoin = () => {
                dispatch(aiActive(true));
            }
          
            socket.on("typing", onTyping);
            socket.on("userList", onUserUpdate);
            socket.on("session", onSession);
            socket.on("connect_error", onConnectError);
            socket.on("messageResponse", onMessage);
            socket.on("connect", onConnect);
            socket.on("aiAdded", onAIJoin);

            socket.auth = payload;
            socket.connect();
            break;
        }

        case 'socket/disconnect': {
            const room = sessionStorage.getItem("room");
            const sessionID = sessionStorage.getItem("sessionID")
            if(room && sessionID) {
                socket.emit("leave", {room: sessionStorage.getItem("room"), sessionID: sessionStorage.getItem("sessionID")});
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

        case 'socket/leave': {
            sessionStorage.removeItem("sessionID");
            sessionStorage.removeItem("userID");
            socket.emit('leave', payload);
            break;
        }
        case 'socket/typing': {
            socket.emit("typing", payload);
            break;
        }

        case 'socket/sendMessage': {
            socket.emit("message", payload);
            break;
        }

        case 'socket/addAI': {
            socket.emit("addAI");
            break;
        }
        
    }
    return next(action);
}