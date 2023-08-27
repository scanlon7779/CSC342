import api from './APIClient.js';
import formatter from './format.js';

const basketballGameList = document.querySelector('#basketball');
const soccerGameList = document.querySelector('#soccer');
const footballGameList = document.querySelector('#football');

const createBettingModal = document.querySelector('#create-betting-modal');
const createBettingCancelButton = document.querySelector('#create-betting-cancel-button');
const createBettingCreateWagerButton = document.querySelector('#create-betting-create-wager-button');

const gameDate = document.querySelector('#game-date');
const team1Name = document.querySelector('#team1-name');
const team1Id = document.createElement('div');
const team2Name = document.querySelector('#team2-name');
const team2Id = document.createElement('div');
const amount = document.querySelector('#betting-amount');
const amountPlusButton = document.querySelector('#amount-plus-button');
const amountMinusButton = document.querySelector('#amount-minus-button');

const team1RadioButton = document.querySelector('#team1');
const team2RadioButton = document.querySelector('#team2');

const alertSuccessMessage = document.querySelector('#alert-success');

let selectedGame;

const UNIT = 'unit';
const UNITS = UNIT + 's';
const INITIAL_AMOUNT = 10;
let currentAmount = INITIAL_AMOUNT;

let currentUser;
let currentUserBet = [];
api.getCurrentUser().then(user => {
  currentUser = user;
  api.getUserBetList(currentUser.id).then((betList) => {
    currentUserBet = betList;
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
  });
}).catch(err => {
  document.location = '/login';
});

function isCreatedAlready(id) {
  let found = currentUserBet.find(bet => bet.game_id == id);
  if (found != null) {
    return true;
  } else {
    return false;
  }
}

function createGameButtonHtml(list, game) {
  const div = document.createElement('div');
  div.id = "game-button";
  div.classList.add("flex-item");
  const dateText = document.createTextNode(formatter.getFormattedDate(game.date));
  const newLine = document.createElement('br');
  api.getTeamByTeamId(game.team1).then(team1 => {
    api.getTeamByTeamId(game.team2).then(team2 => {
      const teamsText = document.createTextNode(team1.name + " vs " + team2.name);
      game["team1Name"] = team1.name;
      game["team2Name"] = team2.name;
      team1Id.innerHTML = game.team1;
      team2Id.innerHTML = game.team2;
      div.appendChild(dateText);
      div.appendChild(newLine);
      div.appendChild(teamsText);
    })
  })
  if (isCreatedAlready(game.id)) {
    div.classList.add("bg-green");
  } else {
    div.addEventListener('click', () => {
      hideSuccessMessage();
      openBettingModal();
      fillCreateWagerModal(game);
    });
  }
  list.appendChild(div);
}

function fillCreateWagerModal(game) {
  gameDate.innerHTML = formatter.getFormattedDate(game.date);
  team1Name.innerHTML = game.team1Name;
  team2Name.innerHTML = game.team2Name;
  currentAmount = INITIAL_AMOUNT;
  amount.innerHTML = currentAmount + ' ' + UNIT;
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
  reloadGamesBySportId(selectedGame.sport);
  showSuccessMessage();
});

function createWager(game, amount) {
  api.postBet({
    "gameId": game.id,
    "userOneId": currentUser.id,
    "userTwoId": null,
    "pick": getWhichTeamPicked(),
    "status": 1, // pending
    "amount": amount
  });
}

function getWhichTeamPicked() {
  if (team1RadioButton.checked) {
    return team1Id.innerHTML;
  } else if (team2RadioButton.checked) {
    return team2Id.innerHTML;
  }
}

function reloadGamesBySportId(sportId) {
  // console.log('sportId',sportId);
  api.getUserBetList(currentUser.id, true).then(betList => {
    currentUserBet = betList
    switch (sportId) {
      case 1:
        basketballGameList.innerHTML = '';
        api.getBasketballGames().then((games) => {
          games.forEach((game) => {
            createGameButtonHtml(basketballGameList, game);
          })
        });
        break;
      case 2:
        soccerGameList.innerHTML = '';
        api.getSoccerGames().then((games) => {
          games.forEach((game) => {
            createGameButtonHtml(soccerGameList, game);
          })
        });
        break;
      case 3:
        footballGameList.innerHTML = '';
        api.getFootballGames().then((games) => {
          games.forEach((game) => {
            createGameButtonHtml(footballGameList, game);
          })
        });
        break;
    }
  });
}

function showSuccessMessage() {
  alertSuccessMessage.classList.remove('hidden');
  alertSuccessMessage.classList.add('alert', 'alert-success');
  alertSuccessMessage.innerHTML = 'Wager created successfully';
}

function hideSuccessMessage() {
  alertSuccessMessage.classList.remove('alert', 'alert-success');
  alertSuccessMessage.classList.add('hidden');
  alertSuccessMessage.innerHTML = '';
}

function resetTeamRadioButton() {
  team1RadioButton.checked = false;
  team2RadioButton.checked = false;
}

amountPlusButton.addEventListener('click', () => {
  currentAmount += 5;
  amount.innerHTML = currentAmount + ' ' + UNITS;
});

amountMinusButton.addEventListener('click', () => {
  if (currentAmount <= 5) {
    return; // TODO: maybe with error message?
  }
  currentAmount -= 5;
  amount.innerHTML = amount.innerHTML = currentAmount == 1 ? 
          currentAmount + ' ' + UNIT : currentAmount + ' ' + UNITS;
});


const offlineMessage = document.querySelector('#offline-message');
self.addEventListener('offline', event => {
  offlineMessage.innerHTML = 'Internet connection lost';
  offlineMessage.style.display = 'block';
});

self.addEventListener('online', event => {
  offlineMessage.innerHTML = 'Internet connection restored';
  offlineMessage.style.display = 'none';
});
