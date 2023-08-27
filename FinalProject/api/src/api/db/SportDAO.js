const db = require('./DBConnection');
const Sport = require('./Sport');

function getSports() {
  return db.query('SELECT * FROM sports').then(({results}) => {
    return results.map(sport => new Sport(sport)); ;
  });
}

function getSportById(sportId) {
  return db.query('SELECT * FROM sports WHERE sport_id=?', [sportId]).then(({results}) => {
    if(results[0])
      return new Sport(results[0]);
  });
}

function getSportByName(sport) {
  return db.query('SELECT * FROM sports WHERE sport_name=?', [sport]).then(({results}) => {
    if(results[0])
      return new Sport(results[0]);
  });
}

function createSport(sport) {
  return db.query('INSERT INTO sports (sport_name) VALUES (?)', [sport]).then(({results}) => {
    return getSportById(results.insertId);
  });
}

module.exports = {
  getSports: getSports,
  getSportById: getSportById,
  getSportByName: getSportByName,
  createSport: createSport,
};