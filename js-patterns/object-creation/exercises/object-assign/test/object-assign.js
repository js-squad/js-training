var assert = require("assert");

var objectAssign = require("../src/object-assign");

describe("objectAssign", function () {

    it.skip("must be a function", function () {

        assert(typeof objectAssign === "function");
    });

    it.skip("must throw an error if the first argument is not an object", function () {

        assert.throws(function () {

            var result = objectAssign(undefined);
        });

        assert.doesNotThrow(function () {

            var result = objectAssign({});
        });
    });

    it.skip("must accept one or more objects", function () {

        assert.doesNotThrow(function () {

            var result = objectAssign({});
        });

        assert.doesNotThrow(function () {

            var result = objectAssign({}, {});
        });
    });

    it.skip("must return the first argument (destination object)", function () {

        var destination = {};

        var actual   = objectAssign(destination);
        var expected = destination;

        assert(actual === expected);
    });

    it.skip("must copy in order to the first argument the properties of rest ones", function () {

        var destination = {};

        var obj1 = {
            p1: true,
            m1: function () {}
        };

        var obj2 = {
            p1: true,
            m1: function () {},
            m2: function () {}
        };

        var actual = objectAssign(destination, obj1, obj2);

        var expected = {
            p1: obj1.p1,
            m1: obj2.m1,
            m2: obj2.m2
        };

        Object.keys(expected).forEach(function (key) {

            assert(actual[key] === expected[key]);
        });
    });

    it.skip("must skip undefined or null sources", function () {

        var destination = {};

        var obj1 = {
            p1: true
        };

        var actual = objectAssign(destination, null, undefined, obj2);

        var expected = {
            p1: obj1.p1
        };

        Object.keys(expected).forEach(function (key) {

            assert(actual[key] === expected[key]);
        });
    });
});