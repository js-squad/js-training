var Walker = require('./walker');
var LivingCreature = require('./living-creature');
// * inherits from
// - LivingCreature
// - Walker
// * constructor parameters:
// - the ones required to be passed to their ancestor
// * methods
// - walk
//   - must throw an exception if it has died
//   - must consume oxygen and walk
function WalkingCreature(oxygen, legs) {
  Walker.call(this, legs, oxygen);
}

WalkingCreature.prototype = Object.create(Walker.prototype);
WalkingCreature.prototype.constructor = WalkingCreature;

WalkingCreature.prototype.walk = function() {
  if(LivingCreature.prototype.hasDied.call(this)) {
    throw Error('can\'t walk if it\'s dead. or could be a zombies outbreak');
  }
  LivingCreature.prototype.consumeOxygen.call(this);
  Walker.prototype.walk.call(this);

}

module.exports = WalkingCreature;