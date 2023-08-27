import api from './APIClient_mock.js';

const userName = document.querySelector('#user-name');
const userBalance = document.querySelector('#user-balance');

api.getCurrentUser().then(currentUser => {
  userName.innerHTML = currentUser.nickname;
  userBalance.innerHTML = currentUser.balance;
});

const myHistoryButton = document.querySelector('#my-history-button');
const pendingWagersButton = document.querySelector('#pending-wagers-button');
const acceptedWagersButton = document.querySelector('#accepted-wagers-button');

myHistoryButton.addEventListener('click', () => {
  
});

pendingWagersButton.addEventListener('click', () => {

});

acceptedWagersButton.addEventListener('click', () => {

});

