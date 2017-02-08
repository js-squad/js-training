// 1. Inherit from EventEmitter
// 2. Dispatch the following events
//    - turnedOn: (data: name) on turnedOn method call
//    - turnedOff: (data: name) on turnedOff method call

function Device(name) {
  this.name = name;
  this.isTurnedOn = false;
}

Device.prototype.turnOn = function turnOn() {
  if (this.isTurnedOn) {
    throw new Error('already turned on');
  }

  this.isTurnedOn = true;
};

Device.prototype.turnOff = function turnOff() {
  if (!this.isTurnedOn) {
    throw new Error('already turned off');
  }

  this.isTurnedOn = false;
};

module.exports = Device;
