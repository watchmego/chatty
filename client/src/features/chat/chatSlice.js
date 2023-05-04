import { createSlice } from "@reduxjs/toolkit";


const messageState = {
  messageList: [],
};
const typingState = {
  typing: false,
};
const userState = {
  userList: [],
};
const aiState = {
  aiActive: false
};


const messagesSlice = createSlice({
  name: "messages",
  initialState: messageState,
  reducers: {
    addMessage: (state, action) => {
      state.messageList.push(action.payload);
    },
    deleteMessage: (state, action) => {
      state.messageList = state.messageList.filter(
        (message) => message.id !== action.payload
      );
    },
    clearMessages: (state, action) => {
      if(action.room != state.messageList[0]?.roomName) {
        state.messageList = [];
      }
    }
  },
});




//currently not used
const typingSlice = createSlice({
  name: "typing",
  initialState: typingState,
  reducers: {
    isTyping: (state, action) => {
      state.typing = action.payload;
    },
  },
});

const userSlice = createSlice({
  name: "users",
  initialState: userState,
  reducers: {
    addUser: (state, action) => {
      state.userList = action.payload;
    },
    removeUser: (state, action) => {
      state.userList = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

const aiSlice = createSlice({
  name: "ai",
  initialState: aiState,
  reducers: {
    aiActive: (state, action) => {
      state.aiActive = action.payload;
    }
  }
})

export const { addMessage, deleteMessage, clearMessages } = messagesSlice.actions;
export const { isTyping } = typingSlice.actions;
export const { addUser, removeUser } = userSlice.actions;
export const { aiActive } = aiSlice.actions;
export const messageReducer = messagesSlice.reducer;
export const typingReducer = typingSlice.reducer;
export const userReducer = userSlice.reducer;
export const aiReducer = aiSlice.reducer;


