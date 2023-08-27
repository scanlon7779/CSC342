import api from './APIClient.js';
import formatter from './format.js';

const availableBetList = document.querySelector('#availableBets');

const UNIT = 'unit';
const UNITS = UNIT + 's';
const INITIAL_AMOUNT = 10;
let currentAmount = INITIAL_AMOUNT;

let currentUser;
api.getCurrentUser().then((user) => {
  currentUser = user;
  api.getAvailableBets().then((bets) => {
    bets.forEach((bet) => {
      if (bet.user1 != currentUser.id) {
        createBetButtonHtml(availableBetList, bet);
      }
    })
  });
}).catch(err => {
  document.location = '/login';
});

function createBetButtonHtml(list, bet) {
  api.getGameById(bet.game).then((game) => {
    const div = document.createElement('div');
    div.id = "bet-button";
    div.classList.add("flex-item");
    const dateText = document.createTextNode(formatter.getFormattedDate(game.date));
    const newLine = document.createElement('br');
    const newLine2 = document.createElement('br');
    const newLine3 = document.createElement('br');
    var myPick;
    api.getUserById(bet.user1).then((user) => {
      api.getTeamByTeamId(game.team1).then((team1) => {
        api.getTeamByTeamId(game.team2).then((team2) => {
          if (bet.team == game.team1) {
            const teamsText = document.createTextNode(team1.name + " vs " + team2.name + " | (Pick: " + team2.name + ")");
            const vsText = document.createTextNode("user: " + user.username + " | Amount: " + bet.amount + " " + UNITS);
            const button = document.createElement('button');
            button.textContent = "Accept";
            div.appendChild(dateText);
            div.appendChild(newLine);
            div.appendChild(teamsText);
            div.appendChild(newLine2);
            div.appendChild(vsText);
            div.appendChild(newLine3);
            div.appendChild(button);
            button.addEventListener('click', () => {
              acceptBet(list, bet, div);
            })
            list.appendChild(div);
          } else {
            myPick = team1.name;
            const teamsText = document.createTextNode(team1.name + " vs " + team2.name + " | (Pick: " + team1.name + ")");
            const vsText = document.createTextNode("user: " + user.username + " | Amount: " + bet.amount + " " + UNITS);
            const button = document.createElement('button');
            button.textContent = "Accept";
            div.appendChild(dateText);
            div.appendChild(newLine);
            div.appendChild(teamsText);
            div.appendChild(newLine2);
            div.appendChild(vsText);
            div.appendChild(newLine3);
            div.appendChild(button);
            button.addEventListener('click', () => {
              acceptBet(list, bet, div);
            })
            list.appendChild(div);
          }
        });
      });
    });
  });
}

function acceptBet(list, bet, div) {
  bet.user2 = currentUser.id;
  bet.status = 1;
  api.deleteBet(bet.user1, bet.id);
  console.log("BET", bet);
  api.postAcceptedBet(bet);
  list.removeChild(div);
}

