import api from './APIClient.js';

const userName = document.querySelector('#user-name');
const userBalance = document.querySelector('#user-balance');
const userImage = document.querySelector('#user-profile-image');
const userLogoutLink = document.querySelector('#user-logout-link');


api.getCurrentUser().then(currentUser => {
  userName.innerHTML = currentUser.username;
  userBalance.innerHTML = currentUser.credits;
  userImage.src = currentUser.image;
  userLogoutLink.addEventListener('click', e => {
    e.preventDefault();
    api.logout().then(() => {
      document.location = '/login';
    });
  })
}).catch(err => {
  console.log(err);
  document.location = '/login';
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

