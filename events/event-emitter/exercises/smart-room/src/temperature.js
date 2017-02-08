var BEHAVIOR_INCREASING = 'increasing';
var BEHAVIOR_DECREASING = 'decreasing';

function increase(temperature, options) {
  temperature.value++;
  
  if (temperature.value === options.maxValue) {
    temperature.behaviour = BEHAVIOR_DECREASING;
  }
};

function decrease(temperature, options) {
  temperature.value--;
  
  if (temperature.value === options.minValue) {
    temperature.behaviour = BEHAVIOR_INCREASING;
  }
};

function update(temperature, options) {
  if (temperature.behaviour === BEHAVIOR_INCREASING) {
    increase(temperature, options);
  }
  else {
    decrease(temperature, options);
  }
};

function sync(temperature, options) {
  setInterval(function onInterval() {
    update(temperature, options);
    
    console.log('temperature', temperature);
  }, options.updateInterval);
}

function Temperature(options) {
  this.value = options.minValue;
  this.behaviour = BEHAVIOR_INCREASING;
  
  sync(this, options);
}

module.exports = Temperature;
