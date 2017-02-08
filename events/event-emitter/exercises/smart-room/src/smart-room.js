// - with fan
//   - turn on if:
//     - not already turned on
//     - temperature is above the desired one
//   - turn off if:
//     - not already turned off
//     - temperature is below the desired one
// - with heater
//   - turn on if:
//     - not already turned on
//     - smart window is not opened
//     - temperature is below the desired one
//   - turn off if:
//     - not already turned off
//     - smart window opens
//     - temperature is above the desired one
// - with devices
//   - log events: turnedOn/turnedOff displaying the device, and event name

// type Things = {
//   fan: Device,
//   heater: Device,
//   smartWindow: SmartWindow,
//   thermometer: Thermometer
// };
// 
// type Options = {
//   desiredTemperature: number
// };

function SmartRoom(things, options) {
}

module.exports = SmartRoom;