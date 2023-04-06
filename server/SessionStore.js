export class SessionStore {
    constructor() {
      this.sessions = new Map();
      this.rooms = {}
    }
  
    findSession(sessionId) {
      return this.sessions.get(sessionId);
    }
  
    saveSession(sessionId, sessionData) {
      this.sessions.set(sessionId, {sessionId, ...sessionData});
    }

    deleteSession(sessionId) {
      this.sessions.delete(sessionId);
    }
  
    findAllSessions() {
      
      return [...this.sessions.values()];
    }

    findRoom(roomName) {
      return this.rooms[roomName];
    }



    findUsersInRoom(roomName) {
      const room = this.rooms[roomName];
      if (room) {
        return Object.values(room);
      }
      return [];
    }

    deleteUserFromRoom(roomName, sessionId) {
      console.log('pre del',this.rooms[roomName])
      delete this.rooms[roomName][sessionId];
      console.log('post del',this.rooms[roomName])
      return this.findUsersInRoom(roomName);
    }

    deleteRoom(roomName) {
      delete this.rooms[roomName];
    }

    saveRoom(roomName) {
      if(!this.rooms[roomName]) {
        this.rooms[roomName] = {};
      }
      console.log('rooms',this.rooms);
    }

    saveUserInRoom(roomName, user) {
      
        this.rooms[roomName][user.sessionId] = user;
        console.log('room users',this.rooms[roomName][user.sessionId])
    }
}