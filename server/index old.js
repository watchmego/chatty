import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv'
dotenv.config()


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: [process.env.CLIENT,"http://localhost:3000"]
  },
 });

// const updateClients = async (socket, room) => {
//   const clients = io.sockets.adapter.rooms.get(room);
//   console.log(socket.rooms);
//   let users = [];
//   //send new list of users in room
//   //io.to(room).emit('userListUpdate', clients)


//   //number of clients
//   //const numClients = clients ? clients.size : 0;

//   //loop through clients
//     for (const clientId of clients ) {

//       //this is the socket of each client in the room.
//       const clientSocket = io.sockets.sockets.get(clientId);


//       //you can do whatever you need with this
//       //clientSocket.leave('Other Room')

//   }
//   return users;
//}

io.use((socket, next) => {
  const username = socket.handshake.auth.name;
  if (!username) {
    return next(new Error("invalid name"));
  }
  socket.username = username;
  next();
});

io.on('connection', (socket) => {
  console.log(`${socket.handshake.auth.name} connected`);

  socket.on('disconnect', () => {
    console.log(`${socket.handshake.auth.name} disconnected`);
  });
  socket.on("join room", (room) => {
    console.log('joining room', room);
    socket.join(room);
    //updateClients(socket, room);
  })

  socket.onAny((event, ...args) => {
      console.log('catchall',event, args);
    });

  socket.on("chat", (data) => {
    console.log('sending message to room', data.room, data.message);
    //io.to(data.room).emit("chat",data.message);
    io.emit("chatResponse", data.message, data.name);
  });
});




httpServer.listen(8000, () => {
  console.log('listening on port 8000');
});

console.log(io.eventNames());