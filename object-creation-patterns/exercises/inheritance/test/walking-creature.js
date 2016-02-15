var assert = require("assert");

var WalkingCreature = require("../src/walking-creature");
var LivingCreature = require("../src/leaving-creature");
var WalkingCreature = require("../src/walking-creature");

describe("WalkingCreature", function () {

    it.skip("must be a function", function () {

        assert(typeof WalkingCreature === "function");
    });

    it.skip("must construct objects with prototypes: WalkingCreature.prototype", function () {

        var legs = 2;

        var wc = new WalkingCreature(legs);

        var actual   = Object.getPrototypeOf(wc);
        var expected = WalkingCreature.prototype;

        assert(actual === expected);
    });

    it.skip("must construct inherit from: LivingCreature", function () {

        var legs = 2;

        var wc = new WalkingCreature(legs);

        var actual   = wc instanceof LivingCreature;
        var expected = true;

        assert(actual === expected);
    });

    it.skip("must construct inherit from: Walker", function () {

        var legs = 2;

        var wc = new WalkingCreature(legs);

        var actual   = wc instanceof WalkingCreature;
        var expected = true;

        assert(actual === expected);
    });

    describe("prototype", function () {

        describe(".walk()", function () {

            it.skip("must increment throw an error if it has died", function () {

                var legs = 2;

                var WalkingCreature = new WalkingCreature(legs);

                assert.throws(function () {

                    WalkingCreature.walk();
                });
            });

            it.skip("must increment the amount of steps by 1 if it has not died", function () {

                var initialOxygen = 2;
                var legs = 2;

                var WalkingCreature = new WalkingCreature(initialOxygen, legs);

                WalkingCreature.walk();

                var actual   = WalkingCreature.getSteps();
                var expected = 1;

                assert(actual === expected);
            });

            it.skip("must decrement the decrement the amount of oxygen by 1 if it has not died", function () {

                var initialOxygen = 2;
                var legs = 2;

                var WalkingCreature = new WalkingCreature(initialOxygen, legs);

                WalkingCreature.walk();

                var actual   = WalkingCreature.getRemainingOxygen();
                var expected = initialOxygen - 1;

                assert(actual === expected);
            });
        });
    });
});