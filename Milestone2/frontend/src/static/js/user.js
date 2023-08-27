import api from './APIClient.js';

export default {
  getCurrentUser: () => {
    api.getCurrentUser().then(user => {

    }).catch(err => {
      document.location = "/login";
    })
  }
}
