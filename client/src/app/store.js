import { configureStore } from '@reduxjs/toolkit';
import {messageReducer, userReducer, typingReducer} from '../features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    typing: typingReducer,
    users: userReducer,
  },
});
