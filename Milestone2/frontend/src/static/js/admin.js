import api from './APIClient.js';
import formatter from './format.js';

const basketballGameList = document.querySelector('#basketball');
const soccerGameList = document.querySelector('#soccer');
const footballGameList = document.querySelector('#football');

const UNIT = 'unit';
const UNITS = UNIT + 's';

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
    api.getTeamByTeamId(game.team1).then((team1) => {
      api.getTeamByTeamId(game.team2).then((team2) => {
        const div = document.createElement('div');
        const button1 = document.createElement('button');
        button1.textContent = team1.name + " won";
        const button2 = document.createElement('button');
        button2.textContent = team2.name + " won";
        div.id = "game-button";
        div.classList.add("flex-item");
        const dateText = document.createTextNode(formatter.getFormattedDate(game.date));
        const newLine = document.createElement('br');
        const newLine2 = document.createElement('br');
        const teamsText = document.createTextNode(team1.name + " vs " + team2.name);
        div.appendChild(dateText);
        div.appendChild(newLine);
        div.appendChild(teamsText);
        div.appendChild(newLine2);
        div.appendChild(button1);
        div.appendChild(button2);
        button1.addEventListener('click', () => {
          list.removeChild(div);
          api.getBetsByGameId(game.id).then((bets) => {
              console.log("BETS", bets);
              bets.forEach((bet) => {
                bet.status = "finished";
                if (bet.team == game.team1) {
                  api.getUserById(bet.user1).then ((winner) => {
                    api.changeBalance(winner.id, winner.credits + bet.amount);
                  });
                  api.getUserById(bet.user2).then ((loser) => {
                    api.changeBalance(loser.id, loser.credits - bet.amount);
                  });
                } else {
                  api.getUserById(bet.user2).then ((winner) => {
                    api.changeBalance(winner.id, winner.credits + bet.amount);
                  });
                  api.getUserById(bet.user1).then ((loser) => {
                    api.changeBalance(loser.id, loser.credits - bet.amount);
                  });
                }

              })
          });
        })
        button2.addEventListener('click', () => {
          list.removeChild(div);
          api.getBetsByGameId(game.game_id).then((bets) => {
            bets.forEach((bet) => {
              bet.status = "finished";
              if (bet.team == game.team2) {
                api.getUserById(bet.user1).then ((winner) => {
                  api.changeBalance(winner.id, winner.credits + bet.amount);
                });
                api.getUserById(bet.user2).then ((loser) => {
                  api.changeBalance(loser.id, loser.credits - bet.amount);
                });
              } else {
                api.getUserById(bet.user2).then ((winner) => {
                  api.changeBalance(winner.id, winner.credits + bet.amount);
                });
                api.getUserById(bet.user1).then ((loser) => {
                  api.changeBalance(loser.id, loser.credits - bet.amount);
                });
              }

            })
          });
        })
        list.appendChild(div);
      });
    });
}