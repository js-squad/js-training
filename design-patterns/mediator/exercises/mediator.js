

var fn1 = function() {
	console.log();
}

var fn2 = function() {

}

setInterval(function() {
	if(fn1.called) {
		if(fn2.called) {
			if(fn3.called) {
				console.log('sequence finished');
			}
		}
	}
})


// unknown number of sources to an unknown number of handlers




// Event aggregator

on('.lala', fn);


function on(selector, event, fn) {
	console.log('Adding handler to ' + document.querySelectorAll(selector).length + ' DOM elements');
	Array.prototype.forEach.call(document.querySelectorAll(selector), function(elem) {
		elem.addEventListener(event, fn);
	});
}


function on(selector, event, fn) {
	// uses only DOM API to find all the elements in the website that matches the selector
	// and attachs the function to each element of the DOM
}