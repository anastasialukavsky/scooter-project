// require the User and Scooter classes - see where they can be used in ScooterApp.js
const User = require('../src/User')
const Scooter = require('../src/Scooter')


class ScooterApp {
  constructor() {
    this.stations = {
      'Station A': [],
      'Station B': [],
      'Station C': [],
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (!this.registeredUsers[username] && age >= 18) {
      const user = new User(username, password, age);
      this.registeredUsers[username] = user;
      console.log(`User ${username} has been registered`);
      return user;
    } else {
      throw new Error('Already registered or too young to register');
    }
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (user) {
      user.login(username, password);
      console.log(`User ${username} has been logged in`);
    } else {
      throw new Error('Username or password is incorrect');
    }
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (user) {
      user.logout();
      console.log(`User ${username} is logged out`);
    } else {
      throw new Error('No such user is logged in');
    }
  }

  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error('No such station');
    }
    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log('Created new scooter');
    return scooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error('No such station');
    }
    if (this.stations[station].includes(scooter)) {
      throw new Error('Scooter already at station');
    }
    this.stations[station].push(scooter);
    scooter.station = station;
    console.log('Scooter is docked');
  }

  rentScooter(scooter, user) {
    const stationNames = Object.keys(this.stations);
    for (const stationName of stationNames) {
      const station = this.stations[stationName];
      const index = station.indexOf(scooter);
      if (index !== -1) {
        station.splice(index, 1);
        scooter.rent(user);
        console.log('Scooter is rented');
        return;
      }
    }
    throw new Error('Scooter not found at any station');
  }

  print() {
    console.log('Registered Users:');
    for (const username in this.registeredUsers) {
      console.log(`- ${username}`);
    }
    console.log('Stations:');
    for (const stationName in this.stations) {
      console.log(
        `- ${stationName}: ${this.stations[stationName].length} scooters`
      );
    }
  }
}

// const newApp = new ScooterApp()
// newApp.print()
// newApp.registerUser('Jane', "qwerty", 24)
// newApp.print()
// newApp.createScooter("Station A")
// newApp.print()
// newApp.rentScooter(1, "Station A")

module.exports = ScooterApp
