import api from './APIClient.js';

export default {
  getBetsByUserId: (userId) => {
    return api.getUserBetList(userId);
  },

  createBet: (userId, gameId, pickTeam, amount) => {
    api.postBet({
      "userId" : userId, 
      "gameId" : gameId, 
      "team" : pickTeam, 
      "amount" : amount, 
      "status" : "pending"
    });
  },

  deleteBet: (userId, betId) => {
    api.deleteBet(userId, betId);
  }




}

function validateBet() {
  
}

