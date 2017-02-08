// 1. Inherit from EventEmitter
// 2. On each interval, measure temperature and dispatch the following event
//    only if temperature has changed from the previous measurement
// Event
// - name: change
// - data: Temperature measured

// type Params = {
//   measurementInterval: number
//   temperature: number,
// };

function Thermometer(params) {
}

module.exports = Thermometer;
