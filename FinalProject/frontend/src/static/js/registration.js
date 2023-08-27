import api from './APIClient.js';


const username = document.querySelector('#signup-username');
const password = document.querySelector('#signup-password');
const signUpButton  = document.querySelector('#signup-button');
const signUpCancel = document.querySelector('#signup-cancel');
const errorMessage = document.querySelector('#error-message');

signUpButton.addEventListener('click', (user) => {
  errorMessage.classList.add('hidden');
  api.registerUser(username.value, password.value).then(() => {
    errorMessage.classList.remove('hidden');
    errorMessage.classList.add('alert', 'alert-primary');
    errorMessage.innerHTML = `${username.value} created successfully!`;
    resetCreateUserForm();
  }).catch(err => {
    console.log(err);
    errorMessage.classList.remove('hidden');
    errorMessage.classList.add('alert', 'alert-danger');
    errorMessage.innerHTML = err;
    resetCreateUserForm();
  });
});

signUpCancel.addEventListener('click', () => {
  resetCreateUserForm();
});


function resetCreateUserForm() {
  username.value = '';
  password.value = '';
}
