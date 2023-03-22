import { Configuration, OpenAIApi } from "openai";
import { encodeCodex, decode } from 'gpt-token-utils'
import { io } from "socket.io-client";
import dotenv from 'dotenv';
dotenv.config();

let openai;
let socket;

let conversation = [];

export const initialiseAI = () => {
    const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    });
    openai = new OpenAIApi(configuration);

}

// const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "Say this is a test",
//     temperature: 0,
//     max_tokens: 7,
//   });

// const response2 = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{role: "user", content: "Hello world"}],
// })

export const chatAddAI = () => {
    conversation = [];
    socket = io("http://localhost:8000");
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    socket.on("connect", () => {
          socket.emit("addUser", {name: 'AI Assistant', socketID: socket.id})
      });
    socket.connect();
} 

export const sendAIMessage = async (data) => { 


    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {"role": "system", "content": "You are a helpful assistant"},
            ...conversation,
            {"role": "user", "content": data.text}
        ], 
        temperature: 0.9,
        max_tokens: 3500,
        top_p: 1,
        frequency_penalty: 0.0, 
        presence_penalty: 0.6, 
        stop: [" Human:", " AI:"],
    })
    socket.emit('typing', `AI Assistant`);

        if (response.data.choices[0].message.content.trim()) {
            socket.emit("message",{
                text: response.data.choices[0].message.content, 
                id: `${socket.id}${Math.random()}`,
                name: 'AI Assistant'
        }); 
        } 
    
    conversation = [...conversation, {"role": "user", "content": data.text}, {"role": "assistant", "content": response.data.choices[0].message.content.trim()}];

    while(conversation.length > 4096) {
        conversation.splice(0,1);
    }
}