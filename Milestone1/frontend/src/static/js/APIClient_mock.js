
const API_BASE = '/api';

export default {
  getUsers: () => {
    return HTTPClient.get('/users');
  },

  getUserById: (userId) => {
    return HTTPClient.get(`/users/${userId}`);
  },

  getCurrentUser: () => {
    return HTTPClient.get('/users/currentUser');
  },

  getBasketballGames: () => {
    return HTTPClient.get('/basketballGames');
  },

  getSoccerGames: () => {
    return HTTPClient.get('/soccerGames');
  },

  getFootballGames: () => {
    return HTTPClient.get('/footballGames');
  },

  getUserBetList: (userId) => {
    return HTTPClient.get(`/users/${userId}/bets`);
  },

  getUserActiveBetList: (userId) => {
    return HTTPClient.get(`/users/${userId}/bets/active`);
  },

  getAvailableBets: () => {
    return HTTPClient.get(`/availableBets`);
  },

  deleteAvailableBet: (id) => {
    return HTTPClient.delete(`/availableBets/bet/${id}`);
  },

  postBet: (bet) => {
    return HTTPClient.post('/bet', bet);
  },

  deleteBet: (userId, betId) => {
    return HTTPClient.delete(`/users/${userId}/bets/${betId}`);
  }
};


const HTTPClient = {
  get: (url) => {
    console.log(`[GET] ${url}`);
    return fetch(`${API_BASE}${url}`)
    .then(res => {
        if(res.ok) {
          return res.json();
        }
        throw new Error(`[${res.status}] Network response was not ok.`);
      })
      .then(obj => {
        console.log(obj);
        return obj;
      })
      .catch(err => console.log(err));
  },
  post: (url, data) => {
    console.log(`[POST] ${url}`);
    return fetch(`${API_BASE}${url}`, {
      method : "POST",
      headers : { "Content-Type": "application/json" },
      body : JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        res.json();
      }
      throw new Error('Post response was not ok.');
    })
    .catch(err => console.log(err));
  },

  put: (url, data) => {

  },

  delete: (url, data) => {
    console.log(`[DELETE] ${url}`);
    return fetch(`${API_BASE}${url}`, {
      method : "DELETE",
      headers : { "Content-Type" : "application/json" },
      body : JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        res.json();
      }
      throw new Error('Delete response was not ok.');
    })
    .catch(err => console.log(err));
  }
};