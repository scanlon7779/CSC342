import api from './APIClient.js'; 
import formatter from './format.js';

const main = document.querySelector('#game-container');

let currentUser;
api.getCurrentUser().then(user => {
  currentUser = user;
  api.getUserBetList(currentUser.id).then(bets => {
    let now = Date.now();
    for (let bet of bets) {
      api.getGameById(bet.bet_id).then(game => {
        if (Date.parse(game.date) < now) {
          createBetItemHtml(main, bet);
        }
      });
    }
  });
}).catch(err => {
  document.location = '/login';
});

function createBetItemHtml(container, bet) {
  let div = document.createElement('div');
  div.classList.add('bet-item', 'flex-itme', 'mt-3');
  
  let dateAndStatusDiv = document.createElement('div');
  api.getGameById(bet.bet_id).then(game => {
    let date = document.createTextNode(`${formatter.getFormattedDate(game.date)}`);
    dateAndStatusDiv.appendChild(date);

    let status = document.createTextNode(`Status: ${bet.status}`);
    dateAndStatusDiv.appendChild(status);
  
    let teamsDiv = document.createElement('div');
    let teams = document.createTextNode(`${game.team1} ${bet.team1Score} - ${game.team2} ${bet.team2Score}`);
    teamsDiv.appendChild(teams);
    let pickAndAmountDiv = document.createElement('div');
    let pick = document.createTextNode(`Pick: ${bet.pick}`);
    let amount = document.createTextNode(`Amount: ${bet.amount} unit(s)`);
    pickAndAmountDiv.appendChild(pick);
    pickAndAmountDiv.appendChild(amount);
  
    div.appendChild(dateAndStatusDiv);
    div.appendChild(teamsDiv);
    div.appendChild(pickAndAmountDiv);
  
    container.appendChild(div);
  });
}

