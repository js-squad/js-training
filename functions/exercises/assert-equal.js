var assert = require("assert");

function assertEqual(description, actual, expected) {
    assert.deepStrictEqual(
        actual,
        expected,
        "Expected "
        + description
        + " to be "
        + expected
        + ", but instead is: "
        + actual
    );
}

assertEqual.many = function (comparisons) {
    comparisons.forEach(function(comparison) {
        assertEqual.apply(undefined, comparison);
    });
};

assertEqual.manyIn = function (tests) {
    Object.keys(tests).forEach(function (description) {
        var comparisons = tests[description];

        console.log(description);

        assertEqual.many(comparisons);
    });
};

module.exports = assertEqual;