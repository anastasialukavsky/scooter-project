class Scooter {
  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  async rent(user) {
    if (this.charge > 20 && !this.isBroken) {
      this.station = null;
      this.user = user;
    } else {
      throw new Error('Scooter needs to charge or needs repair.');
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }

  async recharge() {
    console.log('Starting charge');

    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.charge = 100;

    console.log('Charge complete');
  }

  async requestRepair() {
    console.log('Requesting repair');

    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.isBroken = false;

    console.log('Repair completed');
  }
}

module.exports = Scooter;
