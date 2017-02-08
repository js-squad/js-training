var Device = require("./device");
var SmartRoom = require("./smart-room");
var SmartWindow = require("./smart-window");
var Temperature = require("./temperature");
var Thermometer = require("./thermometer");

var seasons = {
  summer: {
    minValue: 20,
    maxValue: 36,
    updateInterval: 2000,
  }
};

new SmartRoom({
  fan: new Device("fan"),
  heater: new Device("heater"),
  smartWindow: new SmartWindow(),
  thermometer: new Thermometer({
    measurementInterval: 5000,
    temperature: new Temperature(seasons.summer),
  })
});