import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv'
import { initialiseAI, chatAddAI, sendAIMessage } from "./openAI/AI.js";
dotenv.config()


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: [process.env.CLIENT,"http://localhost:3000"]
  },
 });

let users = [];
let typers = [];
let timeout = 0;
let message = ""
let AISocket;

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  //Listens and logs the message to the console
  socket.on('message', (data) => {
    console.log('message received', data);
    io.emit('messageResponse', data);
    if(data.text.slice(0,10).toLowerCase().includes("assistant")) {
      sendAIMessage(data);
    }
  });
  socket.on('addAI', () => {
    chatAddAI();
    console.log('ai added to chat');
  })
  socket.onAny((event, data) => console.log('catchall',event, data));

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit("userList", users);
    socket.disconnect();
  });

  socket.on('addUser', (data) => { 
    users.push(data);
    io.emit("userList", users);
  })

  socket.on('typing', (data, remove) => {
    let message;
    console.log('typers pre:',typers[0]?.message, typers[1]?.message)
    let idx = typers.findIndex(e => e.message.includes(data));
    if(idx !== -1) {
      console.log('splicing');
      clearTimeout(typers[idx].timeoutId)
      typers.splice(idx, 1);
      
    }
    console.log("typing");
    if(!remove) {
      let id = setTimeout(()=> typers.pop(), 3000);
      typers.push({message: `${data} is typing`, timeoutId: id})
      console.log(typers.length);
      if(typers.length > 1) {
        message = "multiple people are typing"
      } else {
        message = typers[0].message;
      }
    }
    io.emit('typing', message);
    console.log('typers post:',typers[0]?.message, typers[1]?.message)

  }) 
});




httpServer.listen(8000, () => {
  initialiseAI();
  console.log('listening on port 8000');
});

console.log(io.eventNames());