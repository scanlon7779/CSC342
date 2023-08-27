module.exports = class {
    constructor(data) {
      this.id = data.bet_id;
      this.game = data.game_id;
      this.user1 = data.user1_id;
      this.user2 = data.user2_id;
      this.team = data.team_pick_id; //don't know if these should be id or team name
      this.status = data.status_id;
      this.amount = data.wager_amount;
    }
  
};