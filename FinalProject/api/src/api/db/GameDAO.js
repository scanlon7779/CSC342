const db = require('./DBConnection');
const Game = require('./Game');

function getGames() {
  return db.query('SELECT * FROM games').then(({results}) => {
    return results.map(game => new Game(game)); ;
  });
}

function getGamesBySportId(sportId) {
  return db.query('SELECT * FROM games WHERE sport_id=?', [sportId]).then(({results}) => {
    return results.map(game => new Game(game)); ;
  });
}

function getGameByGameId(gameId) {
  return db.query('SELECT * FROM games WHERE game_id=?', [gameId]).then(({results}) => {
    if(results[0])
      return new Game(results[0]);
  });
}

function getGameByTeamId(team) {
  return db.query('SELECT * FROM games WHERE team1_id=? OR team2_id=?', [team]).then(({results}) => {
    if(results[0])
      return new Game(results[0]);
  });
}

function createGame(game) {
  return db.query('INSERT INTO games (team1_id, team2_id, sport_id, date) VALUES (?)', [game.team1, game.team2, game.sport, game.date]).then(({results}) => {
    return getCountyById(results.insertId);
  });
}


module.exports = {
  getGames: getGames,
  getGamesBySportId: getGamesBySportId,
  getGameByGameId: getGameByGameId,
  getGameByTeamId: getGameByTeamId,
  createGame: createGame,
};

