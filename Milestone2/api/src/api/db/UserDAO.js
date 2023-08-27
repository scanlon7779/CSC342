const db = require('./DBConnection');
const User = require('./User');

function getUserByCredentials(username, password) {
  return db.query('SELECT * FROM users WHERE user_username=(?)', [username]).then(({results}) => {
    if (results.length == 0) {
      throw new Error("No such user");
    }
    const user = new User(results[0]);
    if (user) { // we found our user
      return user.validatePassword(password);
    }
    else { // if no user with provided username
      throw new Error("No such user");
    }
  });
}

function getUserByUsername(username) {
  return db.query('SELECT * FROM users WHERE user_username=(?)', [username]).then(({results}) => {
    if (results.length == 0) {
      return null;
    }
    const user = new User(results[0]);
    if (user) { // we found our user
      return user;
    }
    // no user with provided username
  })
  .catch(err => {
    console.log(err);
  });
}

function getUserByUserId(userId) {
  return db.query('SELECT * FROM users WHERE user_id=(?)', [userId]).then(({results}) => {
    if (results.length == 0) {
      return null;
    }
    const user = new User(results[0]);
    if (user) {
      return user;
    }
  })
  .catch(err => {
    console.log(err);
  })
}

function isUsernameAvailable(username) {
  return db.query('SELECT * FROM users WHERE user_username=(?)', [username]).then(({results}) => {
    return results.length == 0;
  })
  .catch(err => {
    console.log(err);
  });
}

function createUser(username, hashedPassword, salt) {
  return db.query('INSERT INTO users (user_username, user_password, user_salt) VALUES (?, ?, ?)', [username, hashedPassword, salt]).then(({results}) => {
      console.log(`${username} created successfully`);
  })
  .catch(err => console.log(err));
}

function changeBalance(userId, newBalance) {
  return db.query('UPDATE users SET user_credits=(?) WHERE user_id=(?)', [newBalance, userId]).then((error, results, fields) => {
    if (error) {
      console.log('error', error);
    } else {
      console.log('changed user_credits', newBalance);
    }
  });
}





module.exports = {
  getUserByCredentials: getUserByCredentials,
  getUserByUsername: getUserByUsername,
  isUsernameAvailable: isUsernameAvailable,
  getUserByUserId: getUserByUserId,
  changeBalance: changeBalance,
  createUser: createUser,
};
