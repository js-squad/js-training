import assert from "assert";

import LivingCreature from "../src/living-creature";
import Walker from "../src/walker";

describe("Walker", () => {

    it.skip("must be a function", () => {

        assert(typeof Walker === "function");
    });

    it.skip("must throw an error if invoked directly without new", () => {

        assert.throws(() => {

            const initialOxygen = 2;
            const legs = 2;

            const walker = Walker(initialOxygen, legs);
        });
    });

    it.skip("must construct objects with prototypes: Walker.prototype", () => {

        const initialOxygen = 2;
        const legs = 2;

        const walker = new Walker(initialOxygen, legs);

        const actual   = Object.getPrototypeOf(walker);
        const expected = Walker.prototype;

        assert(actual === expected);
    });

    it("must construct objects that inherit from: LivingCreature", () => {

        const initialOxygen = 2;
        const legs = 2;

        const walker = new Walker(initialOxygen, legs);

        const actual   = walker instanceof LivingCreature;
        const expected = true;

        assert(actual === expected);
    });

    it.skip("must throw an error if the amount of legs provided is not a number", () => {

        assert.throws(() => {

            const legs = undefined;

            const walker = new Walker(legs);
        });
    });

    it.skip("must throw an error if the amount of legs provided is zero", () => {

        assert.throws(() => {

            const legs = 0;

            const walker = new Walker(legs);
        });
    });

    it.skip("must throw an error if the amount of legs provided is an odd number", () => {

        assert.throws(() => {

            const legs = 1;

            const walker = new Walker(legs);
        });
    });

    it.skip("must not throw any error if the amount of legs provided is an even number greater than zero", () => {

        assert.doesNotThrow(() => {

            const legs = 2;

            const walker = new Walker(legs);
        });
    });

    describe("prototype", () => {

        describe(".getLegs(): number", () => {

            it.skip("must return the number of legs provided in the initialization", () => {

                const legs = 2;

                const walker = new Walker(legs);

                const actual   = walker.getLegs();
                const expected = legs;

                assert(actual === expected);
            });
        });

        describe(".getSteps(): number", () => {

            it.skip("must return 0 if it walk has not yet been invoked", () => {

                const legs = 2;

                const walker = new Walker(legs);

                const actual   = walker.getLegs();
                const expected = legs;

                assert(actual === expected);
            });
        });

        describe(".walk()", () => {

            it.skip("must increment the amount of steps by 1", () => {

                const legs = 2;

                const walker = new Walker(legs);

                walker.walk();

                const actual   = walker.getSteps();
                const expected = 1;

                assert(actual === expected);
            });
        });
    });
});