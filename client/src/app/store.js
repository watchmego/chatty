import { configureStore } from "@reduxjs/toolkit";
import {
  messageReducer,
  userReducer,
  typingReducer,
  aiReducer,
} from "../features/chat/chatSlice";
import { socketMiddleware } from "../features/middleware/socket";
import { io } from "socket.io-client";
import logger from 'redux-logger'

const socket = io(process.env.REACT_APP_SERVER, {autoConnect: false});


export const store = configureStore({
  reducer: {
    messages: messageReducer,
    typing: typingReducer,
    users: userReducer,
    ai: aiReducer,
  },
  middleware: (getDefaultMiddleware =>  [...getDefaultMiddleware(), socketMiddleware(socket), logger])
});
