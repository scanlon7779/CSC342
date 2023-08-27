import api from './APIClient.js';
import formatter from './format.js';

const gameContainer = document.querySelector('#game-container');
const team1Name = document.createElement('div');
const team2Name = document.createElement('div');

let pendingBets;
let currentUser;
await api.getCurrentUser().then(user => {
  currentUser = user
  api.getUserBetList(currentUser.id).then(betList => {
    betList.forEach(bet => {
      if (bet.user2_id == null) {
        createBetItemHtmlIntoContainer(gameContainer, bet);
      }
    });
  });
}).catch(err => {
  document.location = '/login';
});

function createBetItemHtmlIntoContainer(container, bet) {
  api.getGameById(bet.game_id).then((game) => {
    let div = document.createElement('div');
    div.classList.add('bet-item', 'flex-itme');
    
    let dateAndStatusDiv = document.createElement('div');
    let date = document.createTextNode(formatter.getFormattedDate(game.date));
    dateAndStatusDiv.appendChild(date);

    let teamsDiv = document.createElement('div');
    
    api.getTeamByTeamId(game.team1).then(team1 => {
      api.getTeamByTeamId(game.team2).then(team2 => {
        team1Name.innerHTML = team1.name;
        team2Name.innerHTML = team2.name;
        let teams = document.createTextNode(`${team1.name} vs ${team2.name}`);
        teamsDiv.appendChild(teams);
        
        let pickAndAmountDiv = document.createElement('div');
        let pickTeamName = (bet.team_id == game.team1) ? team1Name.innerHTML : team2Name.innerHTML;
        let pick = document.createTextNode(`Pick: ${pickTeamName}`);
        let newLine = document.createElement('br');
        let amount = document.createTextNode(`Amount: ${bet.wager_amount} unit(s)`);
        pickAndAmountDiv.appendChild(pick);
        pickAndAmountDiv.appendChild(newLine);
        pickAndAmountDiv.appendChild(amount);
        
        let buttonsDiv = document.createElement('div');
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML ='DELETE';
        deleteButton.id = 'delete-button';
        deleteButton.addEventListener('click', () => {
          api.deleteBet(currentUser.id, bet.bet_id).then(() => {
            api.getUserBetList(currentUser.id).then(betList => {
              // pendingBets = betList.filter(bet => bet.bet_status == null);
              // gameContainer.innerHTML = '';
              // pendingBets.forEach(bet => {
              //   createBetItemHtmlIntoContainer(gameContainer, bet);
              // });
              reloadWagers();
            });
          });
          window.location.reload();
          // reloadWagers();
        });
        deleteButton.style.cssFloat = 'left';
        buttonsDiv.appendChild(deleteButton);
    
        let editButton = document.createElement('button');
        editButton.innerHTML = 'EDIT';
        editButton.id = 'edit-button';
        editButton.setAttribute('data-bs-toggle', 'modal')
        editButton.setAttribute('data-bs-target', '#edit-modal');
        editButton.setAttribute('data-bs-whatever', bet.bet_id);
        editButton.style.cssFloat = 'right';
        buttonsDiv.appendChild(editButton);
        
        div.appendChild(dateAndStatusDiv);
        div.appendChild(teamsDiv);
        div.appendChild(pickAndAmountDiv);
        div.appendChild(buttonsDiv);
        
        container.appendChild(div);
      });
    });
  });
}

function reloadWagers() {
  gameContainer.innerHTML = '';
  api.getUserBetList(currentUser.id, true).then(betList => {
    pendingBets = betList.filter(bet => bet.status == 1); // 1: pending
    pendingBets.forEach(bet => {
      createBetItemHtmlIntoContainer(gameContainer, bet);
    });
  });
}


const editButtonModal = document.querySelector('#edit-modal');
editButtonModal.addEventListener('show.bs.modal', event => {
  const pressedWager = event.relatedTarget;
  const betId = pressedWager.getAttribute('data-bs-whatever');
  let currentBet = pendingBets.find(bet => bet.id == betId);
  const editModalDate = editButtonModal.querySelector('#edit-modal-date');
  const editModalPickTeam1 = editButtonModal.querySelector('#edit-modal-radio-team1');
  const editModalPickTeam2 = editButtonModal.querySelector('#edit-modal-radio-team2');
  api.getGameById(currentBet.game).then(game => {
    console.log('game',game);
    editModalDate.innerHTML = formatter.getFormattedDate(game.date);
    editModalPickTeam1.innerHTML = team1Name.innerHTML;
    editModalPickTeam1.name = game.team1;
    editModalPickTeam2.innerHTML = team2Name.innerHTML;
    editModalPickTeam2.name = game.team2;
    if (editModalPickTeam1.innerHTML == currentBet.team) {
      editButtonModal.querySelector('#btnradio-team1').checked = true;
    } else {
      editButtonModal.querySelector('#btnradio-team2').checked = true;
    }
  });

  let currentAmount = currentBet.amount;
  const editModalAmount = editButtonModal.querySelector('#edit-modal-amount');
  editModalAmount.innerHTML = currentAmount;

  const editModalAmountPlusButton = editButtonModal.querySelector('#edit-modal-amount-plus-button');
  editModalAmountPlusButton.addEventListener('click', () => {
    currentAmount += 5;
    if (currentAmount > currentUser.balance) {
      currentAmount = currentUser.balance;
    }
    editModalAmount.innerHTML = currentAmount;
  });
  const editModalAmountMinusButton = editButtonModal.querySelector('#edit-modal-amount-minus-button');
  editModalAmountMinusButton.addEventListener('click', () => {
    if (currentAmount <= 5) {
      return;
    }
    currentAmount -= 5;
    editModalAmount.innerHTML = currentAmount;
  });
  
  const editModalConfirmButton = editButtonModal.querySelector('#edit-modal-confirm-button');
  editModalConfirmButton.addEventListener('click', () => {
    let newPick = editButtonModal.querySelector('#btnradio-team1').checked ?
        editModalPickTeam1.name : editModalPickTeam2.name;
    let newBet = {
      "betId": currentBet.id,
      "pick": newPick,
      "amount": currentAmount
    };
    console.log('newBet',newBet);
    api.putBet(currentBet.id, newBet).then(() => {
      console.log('success');
    });
    window.location.reload();
  });
  
});


