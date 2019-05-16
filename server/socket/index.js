const {
  addToEventTeamSetAsync,
  getSetMembersAsync,
  deletePlayerFromEventTeamHashAsync,
  setAndGetPlayerHash
} = require('../redis');

const {
  JOIN_TEAM_ROOM,
  LEAVE_TEAM_ROOM,
  BROADCAST_GAME_START,
  BROADCAST_JOINED_GAME,
  GAME_START,
  JOINED_GAME,
  ENTER_GEOFENCE,
  EXIT_GEOFENCE,
  BROADCAST_TASK_COMPLETE,
  BROADCAST_END_GAME,
  CONFIRM_TEAM_PRESENCE,
  COMPLETE_TASK,
  END_GAME
} = require('./constants');

module.exports = io => {
  io.on('connection', socket => {
    let teamRoom = null;

    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    socket.on(JOIN_TEAM_ROOM, teamId => {
      teamRoom = teamId;
      console.log('joined room, ', teamRoom);
      socket.join(teamRoom);
    });

    socket.on(BROADCAST_GAME_START, ({game, username}) => {
      socket.broadcast.to(teamRoom).emit(GAME_START, game);
      addToEventTeamSetAsync(game.id, username);
    });

    socket.on(BROADCAST_JOINED_GAME, async ({eventTeamId, username}) => {
      socket.broadcast.to(teamRoom).emit(JOINED_GAME, username);
      await addToEventTeamSetAsync(eventTeamId, username);
      const players = await getSetMembersAsync(eventTeamId);
      console.log(players);
    });

    socket.on(ENTER_GEOFENCE, async ({eventTeamId, username, geoIdentifier}) => {
      const [_, players, locations] = await setAndGetPlayerHash(eventTeamId, username, geoIdentifier);
      console.log(players, locations);

      // emit event to confirm whether all players present
      socket.emit(CONFIRM_TEAM_PRESENCE, {
        isTeamPresent: locations.length === players.length && locations.every(location => location === geoIdentifier),
        missingPlayerCount: players.length - locations.length,
        taskId: geoIdentifier
      });
    });

    socket.on(EXIT_GEOFENCE, async ({eventTeamId, username}) => {
      await deletePlayerFromEventTeamHashAsync(eventTeamId, username);
    });

    socket.on(BROADCAST_TASK_COMPLETE, taskId => {
      // send task completion message so client can dispatch
      socket.broadcast.to(teamRoom).emit(COMPLETE_TASK, taskId);
    });

    socket.on(BROADCAST_END_GAME, score => {
      // send end game details so other clients can dispatch
      socket.broadcast.to(teamRoom).emit(END_GAME, score);
    });

    socket.on(LEAVE_TEAM_ROOM, teamId => {
      socket.leave(teamId);
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`);
      socket.leave(teamRoom);
    });
  });
};
