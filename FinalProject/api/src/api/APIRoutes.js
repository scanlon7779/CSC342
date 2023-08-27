const express = require('express');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const apiRouter = express.Router();

const BetDAO = require('./db/BetDAO');
const GameDAO = require('./db/GameDAO');
const SportDAO = require('./db/SportDAO');
const UserDAO = require('./db/UserDAO');
const TeamDAO = require('./db/TeamDAO');

let basketballGames = require('../data/basketballGames.json');
let soccerGames = require('../data/soccerGames.json');
let footballGames = require('../data/footballGames.json');
let users = require('../data/users.json');
let bets = require('../data/bets.json');
// let availableBets = require('../data/availableBets.json');


const {TokenMiddleware, generateToken, removeToken} = require('../TokenMiddleware');
const HASH_ALGORITHM = 'sha512';

apiRouter.use(cookieParser());
apiRouter.use(express.json());

// User login receives an email and password
apiRouter.post('/login', (req,  res) => {
  if (req.body.username && req.body.password) {
    UserDAO.getUserByCredentials(req.body.username, req.body.password).then((user) => {
      generateToken(req, res, user);
      res.status(200).json({ success: true });
      return;
    })
    .catch(err => {
      res.status(401).json({ success: false })
    });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }
});

apiRouter.post('/logout', (req, res) => {
  removeToken(req, res);
  res.json({success: true});
});

apiRouter.get('/users/currentUser', TokenMiddleware, (req, res) => {
  res.json(req.user);
});

// User registration creates a new user account and returns the new user object
apiRouter.post('/register', (req, res) => {
  let { username, password } = req.body;
  if (UserDAO.isUsernameAvailable(username)){
    let salt = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(password, salt, 100000, 64, HASH_ALGORITHM, (err, derivedKey) => {
      if (err) {
        res.status(400).json({ error: err });
      }
      let hashedPassword = derivedKey.toString('hex');
      UserDAO.createUser(username, hashedPassword, salt);
      res.status(200).json({ success: true });
      return;
    });
  } else {
    res.status(409).json({ success: false })
  }
});

//Get all users
apiRouter.get('/users', TokenMiddleware, (req,  res) => {
  res.json(users);
});

//Get a user by id 
apiRouter.get('/users/:userId', TokenMiddleware, (req,  res) => {
  let userId = req.params.userId;
  UserDAO.getUserByUserId(userId).then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    res.status(404).json({error: 'User not found'});
  });
});

//Get bet from bet id
apiRouter.get('/bets/:betId', TokenMiddleware, (req,  res) => {
  let id = req.params.betId;
  BetDAO.getBetByBetId(id).then(bet => {
    res.status(200).json(bet);
  })
  .catch(err => {
    res.status(404).json({error: 'User not found'});
  });
});

//Create a bet
apiRouter.post('/bets', TokenMiddleware, (req,  res) => {
  let newBet = req.body;
  BetDAO.createBet(newBet);
});

// Create an accepted bet
apiRouter.post('/activeBets', TokenMiddleware, (req,  res) => {
  let newBet = req.body;
  BetDAO.createBet(newBet);
  res.json(newBet);
});

// Gets a users active bets
apiRouter.get('/users/:userId/bets', TokenMiddleware, (req,  res) => {
  const userId = req.params.userId;
  BetDAO.getBetsByUserId(userId).then(bets => {
    res.status(200).json(bets);
  });
});

// Gets all bets for a particular game
apiRouter.get('/games/:gameId/bets', TokenMiddleware, (req,  res) => {
  const gameId = req.params.gameId;
  BetDAO.getBetsByGameId(gameId).then(bets => {
    res.status(200).json(bets);
  });
});

// Gets a users active bets
apiRouter.get('/users/:userId/bets/:active', TokenMiddleware, (req,  res) => {
  const userId = req.params.userId;
  let targetBets = bets.filter(bet => bet.userId == Number(userId));
  res.status(200).json(targetBets);
});

//Get all games
apiRouter.get('/games', TokenMiddleware, (req,  res) => {
  GameDAO.getGames().then(games => {
    res.status(200).json(games);
  });
});

apiRouter.get('/games/:gameId', TokenMiddleware, (req, res) => {
  const gameId = req.params.gameId;
  GameDAO.getGameByGameId(gameId).then(game => {
    res.status(200).json(game);
  });
});

apiRouter.get('/basketballGames', TokenMiddleware, (req, res) => {
  SportDAO.getSportByName("basketball").then(sport => {
    GameDAO.getGamesBySportId(sport.id).then(games => {
      res.status(200).json(games);
    })
  })
});

apiRouter.get('/soccerGames', TokenMiddleware, (req, res) => {
  SportDAO.getSportByName("soccer").then(sport => {
    GameDAO.getGamesBySportId(sport.id).then(games => {
      res.status(200).json(games);
    })
  })
});

apiRouter.get('/footballGames', TokenMiddleware, (req, res) => {
  SportDAO.getSportByName("football").then(sport => {
    GameDAO.getGamesBySportId(sport.id).then(games => {
      res.status(200).json(games);
    })
  })
});

apiRouter.get('/availableBets', TokenMiddleware, (req, res) => {
  BetDAO.getAvailableBets().then(bets => {
    res.status(200).json(bets);
  })
});

apiRouter.delete('/availableBets/bet/:id', TokenMiddleware, (req, res) => {
  let bet = availableBets.filter(bet => bet.id == id);
  availableBets.remove(bet);
});

//Update a users balance
apiRouter.put('/users/:userId/:newBalance', TokenMiddleware, (req,  res) => {
  let userId = req.params.userId;
  let newBalance = req.params.newBalance;
  UserDAO.changeBalance(userId, newBalance).then(() => {
    res.status(200).json({success: true});
  }).catch(err => {
    res.status(400).json({error: 'failed to change'});
  })
});

//Delete a user
apiRouter.delete('/users/:userId', TokenMiddleware, (req,  res) => {
  res.status(501).json({error: 'Not implemented'});
});

apiRouter.put('/bets/:betId', TokenMiddleware, (req, res) => {
  let betId = req.params.betId;
  let newBet = req.body;
  console.log('betId',betId);
  console.log('newBet',newBet);
  BetDAO.editBet(betId, newBet.pick, newBet.amount).then(() => {
    res.status(200).json({success: true});
  })
  .catch(err => {
    res.status(404).json({error: 'Bet not found'});
  });
});

//Delete a users bet
apiRouter.delete('/users/:userId/bets/:betId', TokenMiddleware, (req, res) => {
  const userId = req.params.userId;
  const betId = req.params.betId;
  BetDAO.deleteBet(betId).then(() => {
    res.status(200).json({success: true});
  })
  .catch(err => {
    res.status(404).json({error: err});
  });
});


apiRouter.get('/teams/:teamId', TokenMiddleware, (req, res) => {
  const teamId = req.params.teamId;
  TeamDAO.getTeamById(teamId).then(team => {
    res.status(200).json(team);
  })
  .catch(err => {
    res.status(404).json({ message: "no such team" });
  });
})


function createResponse(code, data, message) {
  return {
    code: code,
    data: data,
    message: message
  }
}



module.exports = apiRouter;