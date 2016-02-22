// * constructor parameters
// - oxygen: initial amount of oxygen
// * methods
// - getRemainingOxygen: It returns the amount of remaining oxygen
// - breath            : It increments the amount of remaining oxygen
// - consumeOxygen     : It decrements the amount of remaining oxygen
// - hasDied           : It returns true if the amount of oxygen is zero and false otherwise
function LivingCreature(oxygen) {
  if(typeof oxygen !== 'number') {
    throw Error('oxygen must be a number');
  }
  if(oxygen < 0) {
    throw Error('oxygen must be mayor or equal to zero');
  }
  this.oxygen = oxygen;
}

LivingCreature.prototype.getRemainingOxygen = function() {
  return this.oxygen;
}

LivingCreature.prototype.breath = function() {
  if(this.hasDied()) {
    throw Error('can\'t breath if it\'s dead');
  }
  this.oxygen++;
}

LivingCreature.prototype.consumeOxygen = function() {
  if(this.hasDied()) {
    throw Error('can\'t consume oxygen if it\'s dead');
  }
  this.oxygen--;
}

LivingCreature.prototype.hasDied = function() {
  return this.oxygen === 0;
}

module.exports = LivingCreature;
