'use strict';
const h = require('../helpers');

module.exports = (io, app) => {
  const allrooms = app.locals.chatrooms;

  io.of('/roomslist').on('connection', socket => {
    socket.on('getChatrooms', () => {
      socket.emit('chatRoomsList', JSON.stringify(allrooms));
    });

    socket.on('createNewRoom', newRoomInput => {
      if (!h.findRoomByName(allrooms, newRoomInput)) {
        allrooms.push({
          room: newRoomInput,
          roomID: h.randomHex(),
          users: []
        });
        socket.emit('chatRoomsList', JSON.stringify(allrooms));
        socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
      }
    });
  });

  io.of('/chatter').on('connection', socket => {
    socket.on('join', data => {
      const usersList = h.addUserToRoom(allrooms, data, socket);
      if (usersList !== undefined) {
        socket.broadcast.to(data.roomID).emit('updateUsersList', JSON.stringify(usersList.users));
        socket.emit('updateUsersList', JSON.stringify(usersList.users));
      }
    });

    socket.on('disconnect', () => {
      const room = h.removeUserFromRoom(allrooms, socket);
      if (room !== undefined) {
        socket.broadcast.to(room.roomID).emit('updateUsersList', JSON.stringify(room.users));
      }
    });
  });
};
