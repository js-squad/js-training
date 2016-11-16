// Create a function that given an array of elements, return another array
// where each position contains a function that returns the element in
// that corresponding index

function getGetters(elements) {
    // complete with implementation
}

// DO NOT MODIFY FROM HERE
var assertEqual = require("./assert-equal");

assertEqual.many([
    [
        'getGetters(["a", "b", "c", "d", "e"])',
        ["a", "b", "c", "d", "e"],
    ],
    [
        'getGetters([])',
        [],
    ],
    [
        'getGetters([5, 4, 3, 2, 1])',
        [5, 4, 3, 2, 1],
    ]
].map(function (incomplete) {
    return [
        incomplete[0],
        getGetters(incomplete[1]).map(function (getter) {
            return getter();
        }),
        incomplete[1]
    ];
}));

console.log("You did it, great!");
