import userHelper from './user.js'
import betHelper from './bet.js'

let currentUser;
await userHelper.getCurrentUser().then(user => currentUser = user);

let pendingBets;
await betHelper.getBetsByUserId(currentUser.userId).then(bets => {
  pendingBets = bets.filter(bet => bet.betStatus === 'pending');
});

const gameContainer = document.querySelector('#game-container');
pendingBets.forEach(bet => {
  createBetItemHtmlIntoContainer(gameContainer, bet);
});

function createBetItemHtmlIntoContainer(container, bet) {
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

  let buttonsDiv = document.createElement('div');
  let deleteButton = document.createElement('button');
  deleteButton.innerHTML ='DELETE';
  deleteButton.id = 'delete-button';
  deleteButton.addEventListener('click', () => {
    betHelper.deleteBet(currentUser.userId, bet.betId);
    // TODO: ask for confirmation
    // TODO: refresh after deletion
  });
  let editButton = document.createElement('button');
  editButton.innerHTML = 'EDIT';
  editButton.id = 'edit-button';
  buttonsDiv.appendChild(deleteButton);
  buttonsDiv.appendChild(editButton);

  div.appendChild(dateAndStatusDiv);
  div.appendChild(teamsDiv);
  div.appendChild(pickAndAmountDiv);
  div.appendChild(buttonsDiv);

  container.appendChild(div);
}



const editbutton = document.querySelector('#edit-button');





