const express = require('express');

const app = express();
const PORT = process.env.PORT;

// const BetDAO = require('./db/BetDAO');
// const GameDAO = require('./db/GameDAO');
// const SportDAO = require('./db/SportDAO');
// const UserDAO = require('./db/UserDAO');
// const TeamDAO = require('./db/TeamDAO');
// const Game = require('./db/Game');

// Designate the static folder as serving static resources
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({extended: true}));

// const routes = require('./static/js/api/APIRoutes');
// app.use(routes);

const html_dir = __dirname + '/static/';
app.get('/', (req, res) => {
  res.sendFile(`${html_dir}index.html`);
});

app.get('/login', (req, res) => {
  res.sendFile(`${html_dir}login.html`);
});

app.get('/create', (req, res) => {
  res.sendFile(`${html_dir}create.html`);
});

app.get('/account', (req, res) => {
  res.sendFile(`${html_dir}account.html`);
});

app.get('/browse', (req, res) => {
  res.sendFile(`${html_dir}browse.html`);
});

app.get('/offline', (req, res) => {
  res.sendFile(`${html_dir}offline.html`);
});

// app.post('/createGame', (req, res) => {
//   let game = new Game();
//   game.team1_id = req.body.team1;
//   game.date = req.body.date;
//   game.team2_id = req.body.team2;
//   let sport = SportDAO.getSportByName(req.body.sport);
//   game.sport_id = sport.sport_id;
//   GameDAO.createGame(game);
// })

// app.post('/login', (req, res) => {
//   if (req.body.userId == 'Admin' || req.body.userId == "admin") {
//     res.sendFile(`${html_dir}admin.html`);
//   } else {
//     res.sendFile(`${html_dir}account.html`);
//   }
// });

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
