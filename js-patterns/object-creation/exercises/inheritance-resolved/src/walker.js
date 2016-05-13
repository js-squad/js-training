var LivingCreature = require('./living-creature');
// * constructor parameters
// - legs: the amount of legs the walker has
// * methods
// - getLegs : It returns the amount of legs (the ones received in the constructor)
// - getSteps: It returns the amount of steps done
// - walk    : It increments the amount of steps done
function Walker(legs, oxygen) {
  if(typeof legs !== 'number') {
    throw Error('legs must be a number');
  }
  if(legs <= 0) {
    throw Error('legs must be mayor to zero');
  }
  if(legs % 2 === 1) {
    throw Error('legs must be an even number');
  }
  this.legs = legs;
  this.steps = 0;

  if(typeof oxygen !== 'undefined') {
    LivingCreature.call(this, oxygen);
  }
}

Walker.prototype = Object.create(LivingCreature.prototype);
Walker.prototype.constructor = Walker;


Walker.prototype.getLegs = function() {
  return this.legs;
}

Walker.prototype.getSteps = function() {
  return this.steps;
}

Walker.prototype.walk = function() {
  this.steps++;
}

module.exports = Walker;