import api from './APIClient_mock.js';
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
  const div = document.createElement('div');
  const button1 = document.createElement('button');
  button1.textContent = game.team1 + " won";
  const button2 = document.createElement('button');
  button2.textContent = game.team2 + " won";
  div.id = "game-button";
  div.classList.add("flex-item");
  const dateText = document.createTextNode(formatter.getFormattedDate(game.date));
  const newLine = document.createElement('br');
  const newLine2 = document.createElement('br');
  const teamsText = document.createTextNode(game.team1 + " vs " + game.team2);
  div.appendChild(dateText);
  div.appendChild(newLine);
  div.appendChild(teamsText);
  div.appendChild(newLine2);
  div.appendChild(button1);
  div.appendChild(button2);
  button1.addEventListener('click', () => {
    console.log(button1.textContent + "was clicked");
  })
  button2.addEventListener('click', () => {
    console.log(button1.textContent + "was clicked");
  })
  list.appendChild(div);
}