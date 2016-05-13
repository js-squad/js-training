var assert = require("assert");

var LivingCreature = require("../src/living-creature");

describe("LivingCreature", function () {

    it("must be a function", function () {

        assert(typeof LivingCreature === "function");
    });

    it("must construct objects with prototypes: LivingCreature.prototype", function () {

        var initialOxygen = 0;

        var lc = new LivingCreature(initialOxygen);

        var actual   = Object.getPrototypeOf(lc);
        var expected = LivingCreature.prototype;

        assert(actual === expected);
    });

    it("must not throw any error if the oxygen provided is 0", function () {

        assert.doesNotThrow(function () {

            var initialOxygen = 0;

            var lc = new LivingCreature(initialOxygen);
        });
    });

    it("must not throw any error if the oxygen provided is greater than 0", function () {

        assert.doesNotThrow(function () {

            var initialOxygen = Number.MAX_VALUE;

            var lc = new LivingCreature(initialOxygen);
        });
    });

    it("must throw an error if the oxygen provided is not a number", function () {

        assert.throws(function () {

            var initialOxygen = undefined;

            var lc = new LivingCreature(initialOxygen);
        });
    });

    it("must throw an error if the oxygen provided is less than zero", function () {

        assert.throws(function () {

            var initialOxygen = -1;

            var lc = new LivingCreature(initialOxygen);
        });
    });

    describe("prototype", function () {

        describe(".getRemainingOxygen(): number", function () {

            it("must return the initial amount of oxygen if no other method has been called", function () {

                var initialOxygen = 10;

                var lc = new LivingCreature(initialOxygen);

                var actual   = lc.getRemainingOxygen();
                var expected = initialOxygen;

                assert(actual === expected);
            });
        });

        describe(".breath()", function () {

            it("must throw an error if it has died", function () {

                var initialOxygen = 0;

                var lc = new LivingCreature(initialOxygen);

                assert.throws(function () {

                    lc.breath();
                });
            });

            it("must increment the amount of oxygen by 1 if it has not died", function () {

                var initialOxygen = 10;

                var lc = new LivingCreature(initialOxygen);

                lc.breath();

                var actual   = lc.getRemainingOxygen();
                var expected = initialOxygen + 1;

                assert(actual === expected);
            });
        });

        describe(".consumeOxygen()", function () {

            it("must throw an error if it has died", function () {

                var initialOxygen = 0;

                var lc = new LivingCreature(initialOxygen);

                assert.throws(function () {

                    lc.consumeOxygen();
                });
            });

            it("must decrement the amount of oxygen by 1 if it has not died", function () {

                var initialOxygen = 10;

                var lc = new LivingCreature(initialOxygen);

                lc.consumeOxygen();

                var actual   = lc.getRemainingOxygen();
                var expected = initialOxygen -1;

                assert(actual === expected);
            });
        });

        describe(".hasDied(): boolean", function () {

            it("must return true if has been initialized with no oxygen (0)", function () {

                var initialOxygen = 0;

                var lc = new LivingCreature(initialOxygen);

                var actual   = lc.hasDied();
                var expected = true;

                assert(actual === expected);
            });

            it("must return false if has been initialized with oxygen (> 0)", function () {

                var initialOxygen = 10;

                var lc = new LivingCreature(initialOxygen);

                var actual   = lc.hasDied();
                var expected = false;

                assert(actual === expected);
            });

            it("must return true if all the oxygen was consumed", function () {

                var initialOxygen = 1;

                var lc = new LivingCreature(initialOxygen);

                lc.consumeOxygen();

                var actual   = lc.hasDied();
                var expected = true;

                assert(actual === expected);
            });

            it("must return false if not all the oxygen was consumed", function () {

                var initialOxygen = 2;

                var lc = new LivingCreature(initialOxygen);

                lc.consumeOxygen();

                var actual   = lc.hasDied();
                var expected = false;

                assert(actual === expected);
            });
        });
    });
});