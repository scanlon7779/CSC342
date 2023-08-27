const express = require('express');
const apiRouter = express.Router();

let basketballGames = require('../data/basketballGames.json');
let soccerGames = require('../data/soccerGames.json');
let footballGames = require('../data/footballGames.json');
let users = require('../data/users.json');
let bets = require('../data/bets.json');
// let availableBets = require('../data/availableBets.json');

apiRouter.use(express.json());

// User login receives an email and password
apiRouter.post('/login', (req,  res) => {
  
});

apiRouter.get('/users/currentUser', (req, res) => {
  res.json(users[0]);
});

// User registration creates a new user account and returns the new user object
apiRouter.post('/register', (req,  res) => {
  let newUser = req.body;
  users.push(newUser);
  res.json(newUser);
});
//Get all users
apiRouter.get('/users', (req,  res) => {
  res.json(users);
});

//Get a user by id 
apiRouter.get('/users/:userId', (req,  res) => {
  const userId = req.params.userId;
  let user = users.find(user => user.id == userId);
  if(user) {
    res.json(user);
  }
  else {
    res.status(404).json({error: 'User not found'});
  }
});

//Create a bet
apiRouter.post('/bets', (req,  res) => {
  let newBet = req.body;
  bets.push(newBet);
  res.json(newBet);
});

// Create an assepted bet
apiRouter.post('/activeBets', (req,  res) => {
  let newBet = req.body;
  bets.push(newBet);
  res.json(newBet);
});

// Gets a users active bets
apiRouter.get('/users/:userId/bets', (req,  res) => {
  // const userId = req.params.userId;
  // let user = users.find(user => user.id == userId);
  // if(user) {
  //   res.json(user);
  // }
  // else {
  //   res.status(404).json({error: 'User not found'});
  // }
  const userId = req.params.userId;
  let userBets = bets.filter(bet => bet.userId == userId);
  res.status(200).json(userBets);
});

// Gets a users active bets
apiRouter.get('/users/:userId/bets/:active', (req,  res) => {
  // const userId = req.params.userId;
  // let user = users.find(user => user.id == userId);
  // if(user) {
  //   res.json(user);
  // }
  // else {
  //   res.status(404).json({error: 'User not found'});
  // }
  const userId = req.params.userId;
  let targetBets = bets.filter(bet => bet.userId == userId && bet.betStatus != 'finished');
  res.status(200).json(targetBets);
});

apiRouter.get('/users/:userId/img', (req, res) => {
  const userId = req.params.userId;
  // TODO: continue to implement
});


//Get all games
apiRouter.get('/games', (req,  res) => {
  res.json(games);
});

apiRouter.get('/basketballGames', (req, res) => {
  res.status(200).json(basketballGames);
});

apiRouter.get('/soccerGames', (req, res) => {
  res.status(200).json(soccerGames);
});

apiRouter.get('/footballGames', (req, res) => {
  res.status(200).json(footballGames);
});

apiRouter.get('/availableBets', (req, res) => {
  res.json(availableBets);
});

apiRouter.delete('/availableBets/bet/:id', (req, res) => {
  let bet = availableBets.filter(bet => bet.id == id);
  availableBets.remove(bet);
});

//Update a users balance
apiRouter.put('/users/:userId/balance', (req,  res) => {
  res.status(501).json({error: 'Not implemented'});
});

//Delete a user
apiRouter.delete('/users/:userId', (req,  res) => {
  res.status(501).json({error: 'Not implemented'});
});

//Delete a users bet
apiRouter.delete('/users/:userId/bets/:betId', (req, res) => {
  const userId = req.params.userId;
  const betId = req.params.betId;
  
  // It is assumed that there must a bet aoosicated with the given ids
  // or an additional check is needed
  let index = 0;
  for (let bet of bets) {
    if (bet.userId == userId && bet.betId == betId) {
      break;
    }
    index++;
  }
  bets.splice(index, 1);
  res.status(200);
});





module.exports = apiRouter;