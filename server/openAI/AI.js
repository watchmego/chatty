import { Configuration, OpenAIApi } from "openai";
import { encodeCodex, decode } from "gpt-token-utils";
import { io } from "socket.io-client";
import dotenv from "dotenv";
dotenv.config();

let openai;
let socket;
let aiActive = false;
let aiSessionID;

let conversation = [];

//initialise API when server starts 
export const initialiseAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  openai = new OpenAIApi(configuration);
};

//add AI to room and connect to socketIO server
export const chatAddAI = (room) => {
  if (!aiActive) {
    const port = process.env.PORT || 8000;
    conversation = [];
    socket = io(`http://localhost:${port}`);
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    socket.on("session", ({ sessionID }) => {
      socket.emit("join", { name: "AI Assistant", roomName: room });
      aiSessionID = sessionID;
    });
    socket.connect();
    aiActive = true;
    return true;
  }
  return false;
};

//when user ejects AI
export const chatRemoveAI = (room) => {
  if (aiSessionID) {
    socket.emit("leave", { room, sessionID: aiSessionID });
  }
  aiActive = false;
};

//send message to ChatGPT API, and return response to socketIO server
export const sendAIMessage = async (data) => {
  let response;
  try {
    console.log("running try/catch");
    response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        ...conversation,
        { role: "user", content: data.text },
      ],
      temperature: 0.9,
      max_tokens: 3500,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    socket.emit("typing", `AI Assistant`);

    if (response.data.choices[0].message.content.trim()) {
      socket.emit("message", {
        text: response.data.choices[0].message.content,
        name: "AI Assistant",
        key: Math.random(),
        roomName: data.roomName,
      });
    }
    conversation = [
      ...conversation,
      { role: "user", content: data.text },
      {
        role: "assistant",
        content: response.data.choices[0].message.content.trim(),
      },
    ];

    while (conversation.length > 4096) {
      conversation.splice(0, 1);
    }
  } catch (err) {
    console.log(err);
  }
};
