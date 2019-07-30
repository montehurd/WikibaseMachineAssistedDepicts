( function () {

	'use strict';

	var ImageDepictsSuggestionsPanel = require( './widgets/ImageDepictsSuggestionsPanel.js' );
	var ImageData = require( './datamodel/ImageData.js' );
	var SuggestionData = require( './datamodel/SuggestionData.js' );

	var randomDescription = function() {
		var array = [
    	'This is a thing',
    	'This is another such thing',
			'This is some other stuff',
			'This is a dodad'
		];
		var randomNumber = Math.floor(Math.random()*array.length);
		return array[randomNumber];
	};

	var randomSuggestions = function() {
		var array = 'this,that,other,bird,dog,cat,fish,horse,goat,frog,soup,chicken,stick,sky,mountain'.split(',');
		array = $.map( array, function( string ) {
			return new SuggestionData(string);
		});
		var shuffled = array.sort(function(){return .5 - Math.random()});
		return shuffled.slice(0, Math.floor(Math.random() * array.length));
	};

	var extractImageDataFromQueryResponse = function(response) {
		return $.map( response.query.pages, function( page ) {
			return !page.imageinfo ? null : new ImageData(page.title, page.imageinfo[0].thumburl, randomDescription(), randomSuggestions());
		});
	};

	var handleQueryResponse = function(response) {
		var imageDataArray = extractImageDataFromQueryResponse(response);

		var imageDepictsSuggestionsPanel = new ImageDepictsSuggestionsPanel( {
			labelTop: 'top 123',
			imageDataArray: imageDataArray,
			labelBottom: 'bottom 456'
		} );

		$( '#content' ).append(
			imageDepictsSuggestionsPanel.$element
		);
	};

	var showFailureMessage = function() {
		$('#content').append('<p>Oh no, something went wrong!</p>');
	};

	var sampleQueryPageURL = "https://en.wikipedia.org//w/api.php?action=query&format=json&prop=imageinfo&generator=querypage&formatversion=2&iiprop=url&iiurlwidth=320&iiurlparam=&gqppage=Uncategorizedimages&gqplimit=15&origin=*";

	$.getJSON(sampleQueryPageURL)
		.done(handleQueryResponse)
	 	.fail(showFailureMessage);

}() );
