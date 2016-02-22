import assert from "assert";

import LivingCreature from "../src/living-creature";
import Walker from "../src/walker";
import WalkingCreature  from "../src/walking-creature";

describe("WalkingCreature", () => {

    it("must be a function", () => {

        assert(typeof WalkingCreature === "function");
    });

    it.skip("must throw an error if invoked directly without new", () => {

        assert.throws(() => {

            const initialOxygen = 2;
            const legs = 2;

            const walker = Walker(initialOxygen, legs);
        });
    });

    it("must construct objects with prototypes: WalkingCreature.prototype", () => {

        const initialOxygen = 2;
        const legs = 2;

        const wc = new WalkingCreature(initialOxygen, legs);

        const actual   = Object.getPrototypeOf(wc);
        const expected = WalkingCreature.prototype;

        assert(actual === expected);
    });

    it("must construct objects that inherit from: LivingCreature", () => {

        const initialOxygen = 2;
        const legs = 2;

        const wc = new WalkingCreature(initialOxygen, legs);

        const actual   = wc instanceof LivingCreature;
        const expected = true;

        assert(actual === expected);
    });

    it("must construct objects that inherit from: Walker", () => {

        const initialOxygen = 2;
        const legs = 2;

        const wc = new WalkingCreature(initialOxygen, legs);

        const actual   = wc instanceof Walker;
        const expected = true;

        assert(actual === expected);
    });

    describe("prototype", () => {

        describe(".walk()", () => {

            it.skip("must throw an error if it has died", () => {

                const initialOxygen = 0;
                const legs = 2;

                const wc = new WalkingCreature(initialOxygen, legs);

                assert.throws(() => {

                    wc.walk();
                });
            });

            it.skip("must increment the amount of steps by 1 if it has not died", () => {

                const initialOxygen = 2;
                const legs = 2;

                const wc = new WalkingCreature(initialOxygen, legs);

                wc.walk();

                const actual   = wc.getSteps();
                const expected = 1;

                assert(actual === expected);
            });

            it.skip("must decrement the amount of oxygen by 1 if it has not died", () => {

                const initialOxygen = 2;
                const legs = 2;

                const wc = new WalkingCreature(initialOxygen, legs);

                wc.walk();

                const actual   = wc.getRemainingOxygen();
                const expected = initialOxygen - 1;

                assert(actual === expected);
            });
        });
    });
});