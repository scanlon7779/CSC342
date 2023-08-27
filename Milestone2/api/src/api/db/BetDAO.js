const db = require('./DBConnection');
const Bet = require('./Bet');


function getBetByBetId(betId) {
  return db.query('SELECT * FROM bets WHERE bet_id=(?)', [betId]).then(({results}) => {
    if (results.length == 0) {
      throw [];
    }
    return results[0];
  });
}

function getBetByGameId(betId) {
  if (betId == null) {
    return db.query('SELECT * FROM bets WHERE game_id is NULL)').then(({results}) => {
        if (results.length == 0) {
          throw [];
        }
        return results.map(bet => new Bet(bet)); 
      });
  } else {
    return db.query('SELECT * FROM bets WHERE game_id=(?)', [betId]).then(({results}) => {
      if (results.length == 0) {
        throw [];
      }
      return results.map(bet => new Bet(bet)); 
    });
  } 
}

function getBetsByUserId(userId) {
  return db.query('SELECT * FROM bets WHERE user1_id=? OR user2_id=?', [userId, userId]).then(({results}) => {
    if (results.length == 0) {
      return [];
    }
    return JSON.parse(JSON.stringify(results));
  });
}

function getBetsByGameId(gameId) {
  return db.query('SELECT * FROM bets WHERE game_id=? AND user2_id is not NULL', [gameId]).then(({results}) => {
    console.log("RESULTS", results);
    if (results.length == 0) {
      return [];
    }
    return results.map(bet => new Bet(bet)); 
    //return JSON.parse(JSON.stringify(results));
  });
}

function getAvailableBets() {
  return db.query('SELECT * FROM bets WHERE user2_id is NULL').then(({results}) => {
    console.log(results);
    if (results.length == 0) {
      return [];
    }
    return results.map(bet => new Bet(bet)); 
  });
}

function getPendingBetsByUserId(userId) {
  return db.query('SELECT * FROM bets WHERE user1_id=(?) AND user2_id=NULL', [userId]).then(({results}) => {
    if (results.length == 0) {
      return [];
    }
    return JSON.parse(JSON.stringify(results));
  });
}

function getAcceptedBetsByUserId(userId) {
  return db.query('SELECT * FROM bets WHERE user1_id=(?) AND user2_id!=NULL', [userId]).then(({results}) => {
    if (results.length == 0) {
      return [];
    }
    return JSON.parse(JSON.stringify(results));
  });
}

function editBet(betId, newTeamPickId, newWagerAmount) {
  return db.query('UPDATE bets SET team_pick_id=(?), wager_amount=(?) WHERE bet_id=(?)', [newTeamPickId, newWagerAmount, betId]).then((error, results, fields) => {
    if (error) {
      console.log('error',error);
    }
  });
}

function deleteBet(betId) {
  return db.query('DELETE FROM bets WHERE bet_id=?', [betId]).then(({results}) => {
    console.log('bet deleted successfully');
  })
  .catch(err => console.log(err));
}

function createBet(bet) {
  return db.query('INSERT INTO bets (game_id, user1_id, user2_id, team_pick_id, status_id, wager_amount) VALUES (?, ?, ?, ?, ?, ?)',
   [bet.game, bet.user1, bet.user2, bet.team, bet.status, bet.amount]).then(({results}) => {
    console.log('bet created successfully');
   })
   .catch(err => console.log(err));
}





module.exports = {
  getBetByBetId: getBetByBetId,
  getBetByGameId: getBetByGameId,
  getBetsByGameId: getBetsByGameId,
  getBetsByUserId: getBetsByUserId,
  getPendingBetsByUserId: getPendingBetsByUserId,
  getAcceptedBetsByUserId: getAcceptedBetsByUserId,
  getAvailableBets: getAvailableBets,
  editBet: editBet,
  deleteBet: deleteBet,
  createBet: createBet
};

