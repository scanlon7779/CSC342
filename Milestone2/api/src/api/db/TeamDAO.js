const db = require('./DBConnection');
const Team = require('./Team');

function getTeams() {
  return db.query('SELECT * FROM teams').then(({results}) => {
    return results.map(team => new Team(team)); ;
  });
}

function getTeamById(teamId) {
  return db.query('SELECT * FROM teams WHERE team_id=?', [teamId]).then(({results}) => {
    if(results[0])
      return new Team(results[0]);
  });
}

function getTeamByName(team) {
  return db.query('SELECT * FROM teams WHERE team_name=?', [team]).then(({results}) => {
    if(results[0])
      return new Team(results[0]);
  });
}

function createTeam(team) {
  return db.query('INSERT INTO teams (team_name) VALUES (?)', [team]).then(({results}) => {
    return getTeamById(results.insertId);
  });
}

module.exports = {
  getTeams: getTeams,
  getTeamById: getTeamById,
  getTeamByName: getTeamByName,
  createTeam: createTeam,
};