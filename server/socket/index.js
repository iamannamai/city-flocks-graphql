const { JOIN_TEAM_ROOM, LEAVE_TEAM_ROOM, BROADCAST_GAME_START, GAME_START } = require('./constants');

module.exports = io => {
  io.on('connection', socket => {
    let teamRoom = null;

    console.log(`A socket connection to the server has been made: ${socket.id}`);

    socket.on(JOIN_TEAM_ROOM, teamId => {
      teamRoom = teamId;
      console.log('joined room, ', teamRoom);
      socket.join(teamRoom);
    });

    socket.on(BROADCAST_GAME_START, game => {
      socket.broadcast.to(teamRoom).emit(GAME_START, game);
    });

    socket.on(LEAVE_TEAM_ROOM, teamId => {
      socket.leave(teamId);
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    });
  });
}
