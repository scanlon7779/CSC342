const crypto = require('crypto');

module.exports = class {
  #passwordHash;
  #salt;

  constructor(data) {
    this.id = data.user_id;
    this.first_name = data.user_first_name;
    this.last_name = data.user_last_name;
    this.username = data.user_username;
    this.image = data.user_image;
    this.credits = data.user_credits;
    this.#salt = data.user_salt;
    this.#passwordHash = data.user_password;
  }

  validatePassword(password) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, this.#salt, 100000, 64, 'sha512', (err, derivedKey) => {
        if (err) {
         reject("Error: " + err);
        }
        const digest = derivedKey.toString('hex');
        if (this.#passwordHash == digest) {
          resolve(this);
        }
        else {
          reject("Invalid username or password");
        }
      });
    });
  }

  toJSON() {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      image: this.image,
      credits: this.credits
    }
  }
};