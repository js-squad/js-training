function countOccurrences(string, substr) {
    // complete with implementation
}

function uppercaseFirst(string) {
    // complete with implementation
}

// DO NOT MODIFY FROM HERE
var assertEqual = require("./assert-equal");

var tests = {};

tests["countOccurences tests"] = [
    [
        'countOccurrences("", "")',
        countOccurrences("", ""),
        0
    ],
    [
        'countOccurrences("something", "")',
        countOccurrences("something", ""),
        0
    ],
    [
        'countOccurrences("something", "some")',
        countOccurrences("something", "some"),
        1
    ],
    [
        'countOccurrences("something something", "s")',
        countOccurrences("something something", "s"),
        2
    ],
    [
        'countOccurrences("something something", "some")',
        countOccurrences("something something", "some"),
        2
    ],
];

tests["uppercaseFirst tests"] = [
    [
        'uppercaseFirst("")',
        uppercaseFirst(""),
        ""
    ],
    [
        'uppercaseFirst("1")',
        uppercaseFirst("1"),
        "1"
    ],
    [
        'uppercaseFirst("something")',
        uppercaseFirst("something"),
        "Something"
    ],
    [
        'uppercaseFirst("something 1")',
        uppercaseFirst("something 1"),
        "Something 1"
    ],
    [
        'uppercaseFirst("something another")',
        uppercaseFirst("something another"),
        "Something Another"
    ],
];

assertEqual.manyIn(tests);

console.log("You did it, great!");
