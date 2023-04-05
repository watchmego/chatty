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
      console.log('room list', roomName, room);
      if (room) {
        console.log('is there just one room?', room)
        return Object.values(room);
      }
      return [];
    }

    deleteUserFromRoom(roomName, sessionId) {
      const room = this.rooms[roomName];
      console.log('deleing user',room);
      if (room) {
        for (const user in room) {
          if (user.sessionId === sessionId) {
            delete room[sessionId];
            break;
          }
        }
      }
      return this.findUsersInRoom(room);
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