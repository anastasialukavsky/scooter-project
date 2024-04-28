class User {
  constructor(username, password, age) {
    this._username = username;
    this._password = password;
    this._age = age;
    this._loggedIn = false;
  }

  login(username, password) {
    if (username === this._username && password === this._password) {
      this._loggedIn = true;
    } else {
      throw new Error('Username or password is incorrect');
    }
  }

  logout() {
    this._loggedIn = false;
  }
}

module.exports = User
