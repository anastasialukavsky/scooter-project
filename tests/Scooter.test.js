const Scooter = require('../src/Scooter')
const User = require('../src/User')

// typeof scooter === object
describe('scooter object', () => {
  test('Scooter class should create Scooter instance', () => {
    const scooter = new Scooter()
    expect(scooter).toBeInstanceOf(Scooter)
  })
})

// Method tests
describe('scooter methods', () => {
  // tests here!

  // rent method
  test('rent scooter when charged and not broken', async () => {
    const scooter = new Scooter('Station A');
    const user = new User('testuser', 'password', 20);
    await scooter.rent(user);
    expect(scooter.user).toBe(user);
  });
  // dock method

  // requestRepair method

  // charge method
  test('dock scooter', () => {
    const scooter = new Scooter('Station A');
    scooter.dock('Station B');
    expect(scooter.station).toBe('Station B');
    expect(scooter.user).toBe(null);
  });

  test('recharge scooter', async () => {
    const scooter = new Scooter('Station A');
    await scooter.recharge();
    expect(scooter.charge).toBe(100);
  });

  test('request repair', async () => {
    const scooter = new Scooter('Station A');
    scooter.isBroken = true;
    await scooter.requestRepair();
    expect(scooter.isBroken).toBe(false);
  });

})
