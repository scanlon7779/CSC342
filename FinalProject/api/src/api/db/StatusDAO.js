const db = require('./DBConnection');
const Status = require('./Status');

function getStatuses() {
  return db.query('SELECT * FROM statuses').then(({results}) => {
    return results.map(status => new Status(status)); ;
  });
}

function getStatusById(statusId) {
    return db.query('SELECT * FROM statuses WHERE status_id=?', [statusId]).then(({results}) => {
      if(results[0])
        return new Status(results[0]);
    });
}

function getStatustByName(status) {
    return db.query('SELECT * FROM statuses WHERE sport_name=?', [status]).then(({results}) => {
      if(results[0])
        return new Status(results[0]);
    });
}

function createStatus(status) {
    return db.query('INSERT INTO statuses (status_name) VALUES (?)', [status]).then(({results}) => {
      return getStatusById(results.insertId);
    });
}

module.exports = {
    getStatuses: getStatuses,
    getStatusById: getStatusById,
    getStatustByName: getStatustByName,
    createStatus: createStatus,
};