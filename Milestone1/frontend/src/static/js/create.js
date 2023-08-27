import api from './APIClient_mock.js';
import formatter from './format.js';
import bet from './bet.js';
import user from './user.js';

const basketballGameList = document.querySelector('#basketball');
const soccerGameList = document.querySelector('#soccer');
const footballGameList = document.querySelector('#football');

const createBettingModal = document.querySelector('#create-betting-modal');
const createBettingCancelButton = document.querySelector('#create-betting-cancel-button');
const createBettingCreateWagerButton = document.querySelector('#create-betting-create-wager-button');

const gameDate = document.querySelector('#game-date');
const team1Name = document.querySelector('#team1-name');
const team2Name = document.querySelector('#team2-name');
const amount = document.querySelector('#betting-amount');
const amountPlusButton = document.querySelector('#amount-plus-button');
const amountMinusButton = document.querySelector('#amount-minus-button');

const UNIT = 'unit';
const UNITS = UNIT + 's';
const INITIAL_AMOUNT = 10;
let currentAmount = INITIAL_AMOUNT;

let currentUser;
user.getCurrentUser().then(user => {currentUser = user});

api.getBasketballGames().then((games) => {
  games.forEach((game) => {
    createGameButtonHtml(basketballGameList, game);
  })
});

api.getSoccerGames().then((games) => {
  games.forEach((game) => {
    createGameButtonHtml(soccerGameList, game);
  })
});

api.getFootballGames().then((games) => {
  games.forEach((game) => {
    createGameButtonHtml(footballGameList, game);
  })
});

function createGameButtonHtml(list, game) {
  const div = document.createElement('div');
  div.id = "game-button";
  div.classList.add("flex-item");
  const dateText = document.createTextNode(formatter.getFormattedDate(game.date));
  const newLine = document.createElement('br');
  const teamsText = document.createTextNode(game.team1 + " vs " + game.team2);
  div.appendChild(dateText);
  div.appendChild(newLine);
  div.appendChild(teamsText);
  div.addEventListener('click', () => {
    openBettingModal();
    fillCreateWagerModal(game);
  })
  list.appendChild(div);
}

let selectedGame;
function fillCreateWagerModal(game) {
  gameDate.innerHTML =formatter.getFormattedDate(game.date);
  team1Name.innerHTML = game.team1;
  team2Name.innerHTML = game.team2;
  currentAmount = INITIAL_AMOUNT;
  amount.innerHTML = currentAmount + UNIT;
  selectedGame = game;
}

function openBettingModal() {
  createBettingModal.style.display = 'block';
}

function closeBettingModal() {
  createBettingModal.style.display = 'none';
}

window.addEventListener('click', (e) => {
  if (e.target == createBettingModal) {
    closeBettingModal();
    resetTeamRadioButton();
  }
});

createBettingCancelButton.addEventListener('click', () => {
  closeBettingModal();
  resetTeamRadioButton();
});

createBettingCreateWagerButton.addEventListener('click', () => {
  createWager(selectedGame, currentAmount)
  closeBettingModal();
  resetTeamRadioButton();
});

function createWager(game, amount) {
  bet.createBet(
    currentUser.userId,
    game.id,
    getWhichTeamPicked(),
    amount
  );
}

const team1RadioButton = document.querySelector('#team1');
const team2RadioButton = document.querySelector('#team2');
function getWhichTeamPicked() {
  if (team1RadioButton.checked) {
    return team1Name.innerHTML;
  } else if (team2RadioButton.checked) {
    return team2Name.innerHTML;
  }
}

function resetTeamRadioButton() {
  team1RadioButton.checked = false;
  team2RadioButton.checked = false;
}

amountPlusButton.addEventListener('click', () => {
  currentAmount += 5;
  amount.innerHTML = currentAmount + UNITS;
});

amountMinusButton.addEventListener('click', () => {
  if (currentAmount <= 5) {
    return; // TODO: maybe with error message?
  }
  currentAmount -= 5;
  amount.innerHTML = amount.innerHTML = currentAmount == 1 ? currentAmount + UNIT : currentAmount + UNITS;
});

