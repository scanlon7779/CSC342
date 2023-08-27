// const express = require('express');
// const apiRouter = express.Router();

// let basketballGames = require('../data/basketballGames.json');
// let soccerGames = require('../data/soccerGames.json');
// let footballGames = require('../data/footballGames.json');
// let users = require('../data/users.json');
// let bets = require('../data/bets.json');
// let availableBets = require('../data/availableBets.json');

// apiRouter.use(express.json());

// // User registration creates a new user account and returns the new user object
// apiRouter.post('/register', (req,  res) => {
//     let newUser = req.body;
//     users.push(newUser);
//     res.json(newUser);
// });

// apiRouter.get('/users', (req, res) => {
//   res.json(users);
// });

// apiRouter.get('/users/currentUser', (req, res) => {
//   let user = users[0];
//   res.json(user);
// })

// apiRouter.get('/users/:userId', (req, res) => {
//   const userId = req.params.userId;
//   let user = users.find(user => user.userId == userId);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({error: 'User not found'});
//   }
// });

// apiRouter.get('/users/:userId/img', (req, res) => {
//   const userId = req.params.userId;
//   // TODO: continue to implement
// });

// apiRouter.get('/basketballGames', (req, res) => {
//   res.status(200).json(basketballGames);
// });

// apiRouter.get('/soccerGames', (req, res) => {
//   res.status(200).json(soccerGames);
// });

// apiRouter.get('/footballGames', (req, res) => {
//   res.status(200).json(footballGames);
// });

// apiRouter.get('/availableBets', (req, res) => {
//   res.json(availableBets);
// });

// apiRouter.delete('/availableBets/bet/:id', (req, res) => {
//   let bet = availableBets.filter(bet => bet.id == id);
//   availableBets.remove(bet);
// });

// apiRouter.get('/users/:userId/bets', (req, res) => {
//   const userId = req.params.userId;
//   let userBets = bets.filter(bet => bet.userId == userId);
//   res.status(200).json(userBets);
// });

// apiRouter.get('/users/:userId/bets/:active', (req, res) => {
//   const userId = req.params.userId;
//   let targetBets = bets.filter(bet => bet.userId == userId && bet.betStatus != 'finished');
//   res.status(200).json(targetBets);
// });

// apiRouter.post('/bet', (req, res) => {
//   let bet = req.body;
//   bets.push(bet);
//   res.json(bet);
// });

// apiRouter.delete('/users/:userId/bets/:betId', (req, res) => {
//   const userId = req.params.userId;
//   const betId = req.params.betId;
  
//   // It is assumed that there must a bet aoosicated with the given ids
//   // or an additional check is needed
//   let index = 0;
//   for (let bet of bets) {
//     if (bet.userId == userId && bet.betId == betId) {
//       break;
//     }
//     index++;
//   }
//   bets.splice(index, 1);
//   res.status(200);
// });

// module.exports = apiRouter;
