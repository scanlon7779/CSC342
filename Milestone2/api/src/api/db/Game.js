module.exports = class {
    constructor(data) {
      this.id = data.game_id;
      this.team1 = data.team1_id; //don't know if these should be id or team name
      this.team2 = data.team2_id;
      this.sport = data.sport_id;
      this.date = data.date;
    }
  
};