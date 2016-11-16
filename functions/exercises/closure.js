// Add a call to itShouldBeHere passing a, b and c in a way that the call would
// be equivalent to have been called it like: itShouldBeHere(1, 8, 6)

var a = 1, b = 2, c = 3;

function firstFunction(){
    var b = 5, c = 6;

    (function secondFunction(){
        var b = 8;

        (function thirdFunction(){
            var a = 7, c = 9;

            (function fourthFunction(){
                var a = 1, c = 8;

            })();
        })();
    })();
}

// DO NOT MODIFY FROM HERE
var assertEqual = require("./assert-equal");

typeof assertEqual;

function itShouldBeHere(a, b, c) {
    if (itShouldBeHere.calls === undefined) {
        itShouldBeHere.calls = 0;
    }

    itShouldBeHere.calls++;

    assertEqual("a", a, 1);
    assertEqual("b", b, 8);
    assertEqual("c", c, 6);
}

firstFunction();

assertEqual("itShouldBeHere calls", itShouldBeHere.calls, 1);

console.log("You did it, great!");
