console.log('js sourced');
$(onReady);

function onReady() {
	console.log('jq sourced');
	getImages();
	postImages();
}

// start of get
var getImages = function() {
	// test get call to server
	$.ajax({
		type: 'GET',
		url: '/images',
		// start of success
		success: function(response) {
			console.log('back from get call with:', response);
		} // end of success
	}); // end of Ajax get
}; // end of get

// start of POST
var postImages = function() {
	// test Ajax get call to server
	var objToSend = {
		thing: 'meow'
	};
	$.ajax({
		type: 'POST',
		url: '/images',
		data: objToSend,
		// start of success
		success: function(response) {
			console.log('back from post:', response);
		} // end success
	}); // end Ajax call to server
}; // end of POST
