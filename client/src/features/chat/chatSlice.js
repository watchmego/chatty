import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  messageList: [],
  typing: false,
  userList: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messageList.push(action.payload);
    },
    deleteMessage: (state, action) => {
      state.messageList = state.messageList.filter(
        (message) => message.id !== action.payload
      );
    },
  },
});

//currently not used
const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    isTyping: (state, action) => {
      state.typing = action.payload;
    },
  },
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userList = action.payload;
    },
    removeUser: (state, action) => {
      state.userList = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addMessage, deleteMessage } = messagesSlice.actions;
export const { isTyping } = typingSlice.actions;
export const { addUser, removeUser } = userSlice.actions;
export const messageReducer = messagesSlice.reducer;
export const typingReducer = typingSlice.reducer;
export const userReducer = userSlice.reducer;
