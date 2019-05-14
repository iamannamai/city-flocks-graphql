const redisClient = require('../redis');
const {promisify} = require('util');
const getSetMembersAsync = promisify(redisClient.smembers).bind(redisClient);
const addSetAsync = promisify(redisClient.sadd).bind(redisClient);

const { JOIN_TEAM_ROOM, LEAVE_TEAM_ROOM, BROADCAST_GAME_START, BROADCAST_JOINED_GAME, GAME_START, JOINED_GAME } = require('./constants');

module.exports = io => {
  io.on('connection', socket => {
    let teamRoom = null;

    console.log(`A socket connection to the server has been made: ${socket.id}`);

    socket.on(JOIN_TEAM_ROOM, teamId => {
      teamRoom = teamId;
      console.log('joined room, ', teamRoom);
      socket.join(teamRoom);
    });

    socket.on(BROADCAST_GAME_START, ({game, username}) => {
      socket.broadcast.to(teamRoom).emit(GAME_START, game);
      addSetAsync(`eventTeam:${game.id}:players`, username);
    });

    socket.on(BROADCAST_JOINED_GAME, ({eventTeamId, username}) => {
      socket.broadcast.to(teamRoom).emit(JOINED_GAME, username);
      addSetAsync(`eventTeam:${eventTeamId}:players`, username)
        .then(() => getSetMembersAsync(`eventTeam:${eventTeamId}:players`)
          .then(players => console.log(players)));
    });

    socket.on(LEAVE_TEAM_ROOM, (teamId) => {
      socket.leave(teamId);
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      socket.leave(teamRoom);
    });
  });
}
