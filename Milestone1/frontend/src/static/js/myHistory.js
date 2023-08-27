import user from './user.js'
import bet from './bet.js'

const main = document.querySelector('#game-container');

let currentUser;
await user.getCurrentUser().then(user => currentUser = user);

let foundBets;
await bet.getBetsByUserId(currentUser.userId).then(bets => foundBets = bets);
console.log(foundBets);
for (let bet of foundBets) {
  createBetItemHtml(main, bet);
}

function createBetItemHtml(container, bet) {
  let div = document.createElement('div');
  div.classList.add('bet-item', 'flex-itme');
  
  let dateAndStatusDiv = document.createElement('div');
  let date = document.createTextNode(bet.date);
  let status = document.createTextNode(`Status: ${bet.status}`);
  dateAndStatusDiv.appendChild(date);
  dateAndStatusDiv.appendChild(status);

  let teamsDiv = document.createElement('div');
  let teams = document.createTextNode(`${bet.team1Name} ${bet.team1Score} - ${bet.team2Name} ${bet.team2Score}`);
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
}

