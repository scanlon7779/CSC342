import api from './APIClient_mock.js';
import formatter from './format.js';

const availableBetList = document.querySelector('#availableBets');

const UNIT = 'unit';
const UNITS = UNIT + 's';
const INITIAL_AMOUNT = 10;
let currentAmount = INITIAL_AMOUNT;

let currentUser;
api.getCurrentUser().then((user) => {
  currentUser = user;
});

api.getAvailableBets().then((bets) => {
  bets.forEach((bet) => {
    createBetButtonHtml(availableBetList, bet);
  })
});

function createBetButtonHtml(list, bet) {
  const div = document.createElement('div');
  div.id = "bet-button";
  div.classList.add("flex-item");
  const dateText = document.createTextNode(formatter.getFormattedDate(bet.date));
  const newLine = document.createElement('br');
  const newLine2 = document.createElement('br');
  const newLine3 = document.createElement('br');
  const teamsText = document.createTextNode(bet.myPick + " vs " + bet.theirPick + " | (Pick: " + bet.myPick + ")");
  const vsText = document.createTextNode("user: " + bet.userId + " | Amount: " + bet.amount + " " + UNITS);
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
    acceptBet(list, bet);
  })
  list.appendChild(div);
}

function acceptBet(list, bet) {
    let acceptedBet = createAcceptedBet(bet.userId, bet.gameId, bet.myPick, bet.amount);
    api.postBet(acceptedBet);
    api.deleteAvailableBet(bet.id);
}

function createAcceptedBet(userId, gameId, pickTeam, amount) {
    return { "userId" : userId, "gameId" : gameId, "pick" : pickTeam, "status" : null, "amount" : amount, "bet_status" : "accepted" };
  }

