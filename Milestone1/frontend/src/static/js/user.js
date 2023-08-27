import api from './APIClient_mock.js';

export default {
  getCurrentUser: () => {
    return api.getCurrentUser();
  }
}
