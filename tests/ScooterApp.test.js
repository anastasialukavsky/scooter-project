const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')
const Scooter = require('../src/Scooter')

const scooterApp = new ScooterApp()

describe('registerUser method tests', () => {
  test('Should return instance of User', () => {
    const response = scooterApp.registerUser('Joe Bloggs', 'test123', 21)
    expect(response).toBeInstanceOf(User)
  })
})

describe('ScooterApp tests', () => {
  let app;

  beforeEach(() => {
    app = new ScooterApp();
  });

  test('registerUser should register a new user', () => {
    const user = app.registerUser('testUser', 'test123', 20);
    expect(user).toBeInstanceOf(User);
    expect(app.registeredUsers['testUser']).toEqual(user);
  });

  test('registerUser should throw an error if user already exists', () => {
    app.registerUser('testUser', 'test123', 20);
    expect(() => {
      app.registerUser('testUser', 'test123', 20);
    }).toThrow('Already registered or too young to register');
  });

  test('registerUser should throw an error if age is less than 18', () => {
    expect(() => {
      app.registerUser('testUser', 'test123', 17);
    }).toThrow('Already registered or too young to register');
  });

  test('loginUser should log in an existing user', () => {
    app.registerUser('testUser', 'test123', 20);
    app.loginUser('testUser', 'test123');
    expect(app.registeredUsers['testUser']._loggedIn).toBe(true);
  });

  test('loginUser should throw an error if username or password is incorrect', () => {
    app.registerUser('testUser', 'test123', 20);
    expect(() => {
      app.loginUser('testUser', 'wrongpassword');
    }).toThrow('Username or password is incorrect');
  });

  test('logoutUser should log out a logged-in user', () => {
    app.registerUser('testUser', 'test123', 20);
    app.loginUser('testUser', 'test123');
    app.logoutUser('testUser');
    expect(app.registeredUsers['testUser']._loggedIn).toBe(false);
  });

});

describe('ScooterApp method tests', () => {
  let app;
  let user;
  let scooter;

  beforeEach(() => {
    app = new ScooterApp();
    user = app.registerUser('testUser', 'test123', 20);
    scooter = app.createScooter('Station A');
  });

  test('createScooter should create a new scooter at the specified station', () => {
    expect(scooter).toBeInstanceOf(Scooter);
    expect(app.stations['Station A']).toContain(scooter);
  });

  test('createScooter should throw an error if station does not exist', () => {
    expect(() => {
      app.createScooter('Non-existent Station');
    }).toThrow('No such station');
  });

  test('dockScooter should dock a scooter at the specified station', () => {
    const station = 'Station B';
    app.createScooter(station);
    app.dockScooter(scooter, station);
    expect(app.stations[station]).toContain(scooter);
    expect(scooter.station).toBe(station);
  });

  test('dockScooter should throw an error if station does not exist', () => {
    expect(() => {
      app.dockScooter(scooter, 'Non-existent Station');
    }).toThrow('No such station');
  });

  test('dockScooter should throw an error if scooter is already at the station', () => {
    const station = 'Station B';
    app.createScooter(station);
    app.dockScooter(scooter, station);
    expect(() => {
      app.dockScooter(scooter, station);
    }).toThrow('Scooter already at station');
  });

  test('rentScooter should rent a scooter to a user', () => {
    const station = 'Station B';
    const rentedScooter = app.createScooter(station);
    app.rentScooter(rentedScooter, user);
    expect(rentedScooter.user).toBe(user);
  });
  test('rentScooter should throw an error if scooter is not found at any station', () => {
    const nonExistentScooter = new Scooter('Station A');
    expect(() => {
      app.rentScooter(nonExistentScooter, user);
    }).toThrow('Scooter not found at any station');
  });
});



