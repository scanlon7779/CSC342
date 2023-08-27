import api from './APIClient.js';

const username = document.querySelector('#username');
const password = document.querySelector('#password');
const loginButton = document.querySelector('#login-button');
const errorMessage = document.querySelector('#error-message');



loginButton.addEventListener('click', () => {
  errorMessage.classList.add('hidden');
  api.login(username.value, password.value).then(res => {
    document.location = '/';
  }).catch(err => {
    errorMessage.classList.remove('hidden');
    errorMessage.classList.add('alert', 'alert-danger');
    errorMessage.innerHTML = err;
  });
});


