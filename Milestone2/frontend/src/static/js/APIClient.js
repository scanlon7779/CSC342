
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

  getGameById: (gameId) => {
    return HTTPClient.get(`/games/${gameId}`);
  },

  getTeamByTeamId: (teamId) => {
    return HTTPClient.get(`/teams/${teamId}`);
  },

  getBetById: (betId) => {
    return HTTPClient.get(`/bets/${betId}`);
  },

  getBetsByGameId: (gameId) => {
    return HTTPClient.get(`/games/${gameId}/bets`);
  },

  getUserBetList: (userId, reload=false) => {
    return HTTPClient.get(`/users/${userId}/bets`, reload);
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
    return HTTPClient.post('/bets', bet);
  },

  postAcceptedBet: (bet) => {
    return HTTPClient.post('/activeBets', bet);
  },

  putBet: (betId, newBet) => {
    return HTTPClient.put(`/bets/${betId}`, newBet);
  },

  deleteBet: (userId, betId) => {
    return HTTPClient.delete(`/users/${userId}/bets/${betId}`);
  },

  login: (username, password) => {
    return HTTPClient.post('/login', { username: username, password: password });
  },

  logout: () => {
    return HTTPClient.post('/logout', {});
  },

  registerUser: (username, password) => {
    return HTTPClient.post('/register', { username: username, password: password });
  },
  
  changeBalance: (userId, newBalance) => {
    return HTTPClient.put(`/users/${userId}/${newBalance}`, { userId: userId, newBalance: newBalance })
  }
};


const HTTPClient = {
  get: (url, reload=false) => {
    console.log(`[GET] ${url}`);
    let cached = reload ? 'reload' : 'default';
    // console.log('reload',reload);
    return fetch(`${API_BASE}${url}`, { cache: cached })
    .then(res => {
        if(res.ok) {
          return res.json();
        }
        //throw new Error(`[${res.status}] Network response was not ok.`);
      })
      .then(obj => {
        console.log(obj);
        return obj;
      })
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
      } else if (res.status == 401) {
        throw new Error('Authentication failed');
      } else {
        throw new Error(`[${res.status}] Error`);
      }
    })
  },

  put: (url, data) => {
    console.log(`[PUT] ${url}`);
    return fetch(`${API_BASE}${url}` , {
      method : "PUT",
      headers : { "Content-Type": "application/json" },
      body : JSON.stringify(data)
    })
    .then(res => {
        if(res.ok) {
          return res.json();
        }
        //throw new Error(`[${res.status}] Network response was not ok.`);
      })
      .then(obj => {
        console.log(obj);
        return obj;
      })
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
      //throw new Error('Delete response was not ok.');
    })
  }
};