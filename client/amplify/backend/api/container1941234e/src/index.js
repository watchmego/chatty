import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv'
import { initialiseAI, chatAddAI, sendAIMessage } from "./openAI/AI.js";
import { v4 as uuidv4 } from 'uuid';
import { SessionStore } from './SessionStore.js'
dotenv.config()


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: [process.env.CLIENT,"http://localhost:3000"]
  },
 });

let typers = [];

const sessionStore = new SessionStore();



io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  

    //create persistent session
    let sessionExists = false;
    const sessionID = socket.handshake.auth?.sessionID;
    console.log("sessionID", socket.handshake.auth, sessionID, sessionStore.findAllSessions());
    if(sessionID) {
         // find existing session
        const session = sessionStore.findSession(sessionID);
        console.log('sessionStore',sessionStore.findSession(sessionID));
        if (session) {
          socket.sessionID = sessionID;
          socket.userId = session.userId;
          socket.username = session.username;
          sessionExists = true;
          }
        }
    
    if (!sessionExists) {
      console.log('creating new sessionStore');
      socket.sessionID = uuidv4();
      socket.userId = uuidv4();
      sessionStore.saveSession(socket.sessionID, {
        socketId: socket.id,
        userId: socket.userId,
        username: socket.handshake.auth.name,
        connected: true,
      });
    

    } 
    console.log('about to emit session');
    socket.emit("session", {
      sessionID: socket.sessionID,
      userID: socket.userId,
    });


  socket.on('join', (data) => {
    console.log('join data', data);

    const { name, roomName } = data;

    if (!name) {
      socket.emit('error', 'Name is required to join the chat');
      return;
    }
    const { rooms } = io.sockets.adapter;
    const room = rooms.get(roomName);

    socket.join(roomName);
    sessionStore.saveRoom(roomName);
    sessionStore.saveUserInRoom(roomName, {sessionId: socket.sessionID, name: name, socketId: socket.userId});
    socket.emit("created");
    console.log("joined room")
    console.log(socket.sessionID, room);

    
    const users = sessionStore.findUsersInRoom(roomName);
    console.log('userlist',users.length);
    io.to(roomName).timeout(2000).emit("userList", users);
  });
  //Listens and logs the message to the console
  socket.on('message', (data) => {
    //console.log('message received', data);
    const {roomName} = data;
    io.in(roomName).fetchSockets().then((sockets) => {console.log('users in room', sockets[0])});
    io.to(roomName).timeout(5000).emit('messageResponse', data);
    if(data.text.slice(0,10).toLowerCase().includes("assistant")) {
      sendAIMessage(data);
    }
  });
  socket.on('addAI', () => {
    chatAddAI();
    console.log('ai added to chat');
  })
  socket.onAny((event, data) => console.log('catchall',event, data));

  socket.on('leave', (roomName) => {
    console.log('🔥: A user disconnected');
    console.log(socket);
    const users = sessionStore.deleteUserFromRoom(roomName, socket.sessionID)
    sessionStore.deleteSession(socket.sessionID);
    console.log("users post", users); 
    io.to(roomName).timeout(2000).emit("userList", users);
    socket.disconnect();
  });
  
 
  
 
  socket.on('typing', (data, remove, roomName) => {
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

    io.to(roomName).timeout(2000).emit('typing', message);
    console.log('typers post:',typers[0]?.message, typers[1]?.message)

  }) 
});




httpServer.listen((8000), () => {
  initialiseAI();
  console.log('listening on port 8000');
});

console.log(io.eventNames());