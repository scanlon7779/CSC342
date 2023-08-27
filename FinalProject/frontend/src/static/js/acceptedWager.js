import api from './APIClient.js';
import formatter from './format.js';

const gameContainer = document.querySelector('#game-container');


let acceptedBets;
let currentUser;
await api.getCurrentUser().then(user => {
  currentUser = user
  api.getUserBetList(currentUser.id).then(betList => {
    console.log("BETLIST", betList);
    betList.forEach(bet => {
      if (bet.user2_id != null) {
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
        let teams = document.createTextNode(`${team1.name} vs ${team2.name}`);
        teamsDiv.appendChild(teams);
        
        let pickAndAmountDiv = document.createElement('div');
        let pickTeamName = (bet.team == game.team1) ? team1.name : team2.name;
        let pick = document.createTextNode(`Pick: ${pickTeamName}`);
        let newLine = document.createElement('br');
        let amount = document.createTextNode(`Amount: ${bet.wager_amount} unit(s)`);
        pickAndAmountDiv.appendChild(pick);
        pickAndAmountDiv.appendChild(newLine);
        pickAndAmountDiv.appendChild(amount);
    
        let userTwoDiv = document.createElement('div');
        api.getUserById(bet.user2_id).then(user => {
          let userTwo = document.createTextNode(`Accepted By ${user.username}`);
          userTwoDiv.appendChild(userTwo);
        });
        
        div.appendChild(dateAndStatusDiv);
        div.appendChild(teamsDiv);
        div.appendChild(pickAndAmountDiv);
        div.appendChild(userTwoDiv);
        
        container.appendChild(div);
      })
    })

  });
}
