const User = require('../src/User')

const user = new User('Joe Bloggs', 'test123', 21)

// User tests here
describe('User property tests', () => {
  // test username
  test('username should be a string', () => {
    expect(typeof user._username).toBe('string')
  })
  // test password

  test('password sgould be a string', () => {
    expect(typeof user._password).toBe('string')
  })
  // test age
  test('age should be an integer', () => {
    expect(typeof user._age).toBe('number')
  })

  test('loggedIn shuld be a boolean', () =>{
    expect(typeof user._loggedIn).toBe('boolean')
  })
})


describe('User method tests', () => {
  let user;

  beforeEach(() => {
    user = new User('Jane Magazzi', 'test123', 31);
  });

  test('login with correct password should set loggedIn to true', () => {
    user.login('Jane Magazzi', 'test123');
    expect(user._loggedIn).toBe(true);
  });

  test('login with incorrect password should throw an error', () => {
    expect(() => {
      user.login('Jane Magazzi', 'wrongpassword');
    }).toThrow('Username or password is incorrect');
  });

  test('logout should set loggedIn to false', () => {
    user.login('Jane Magazzi', 'test123');
    user.logout();
    expect(user._loggedIn).toBe(false);
  });
});
