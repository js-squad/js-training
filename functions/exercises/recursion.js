// Implement the following function that computes the power of numbers where
// it arguments are guaranted to follow the following rules
// base: >= 0
// exponent: >= 0

function power(base, exponent) {
    // complete with implementation (base case + recursive case)
}

// DO NOT MODIFY FROM HERE
var assertEqual = require("./assert-equal");

assertEqual.many([
    [
        "power(0, 0)",
        power(0, 0),
        1
    ],
    [
        "power(0, 1)",
        power(0, 1),
        0
    ],
    [
        "power(0, 2)",
        power(0, 2),
        0
    ],
    [
        "power(1, 0)",
        power(1, 0),
        1
    ],
    [
        "power(1, 1)",
        power(1, 1),
        1
    ],
    [
        "power(1, 2)",
        power(1, 2),
        1
    ],
    [
        "power(2, 0)",
        power(2, 0),
        1
    ],
    [
        "power(2, 1)",
        power(2, 1),
        2
    ],
    [
        "power(2, 2)",
        power(2, 2),
        4
    ],
    [
        "power(2, 3)",
        power(2, 3),
        8
    ],
]);

console.log("You did it, great!");
