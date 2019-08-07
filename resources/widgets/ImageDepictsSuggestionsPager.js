'use strict';

var TemplateRenderingDOMLessGroupWidget = require( './../base/TemplateRenderingDOMLessGroupWidget.js' );
var ImageDepictsSuggestionsPage = require( './ImageDepictsSuggestionsPage.js' );
var SuggestionData = require( './../models/SuggestionData.js' );
var ImageData = require( './../models/ImageData.js' );

var	ImageDepictsSuggestionsPager = function WikibaseMachineAssistedDepictsImageDepictsSuggestionsPager( config ) {
	ImageDepictsSuggestionsPager.parent.call( this, $.extend( {}, config ) );
	this.$element.addClass('wbmad-image-depicts-suggestions-pager');
	this.render();
	$(window).scroll(this.fetchAndShowPageIfScrolledToBottom.bind(this));
	this.fetchAndShowPage();
};
OO.inheritClass( ImageDepictsSuggestionsPager, TemplateRenderingDOMLessGroupWidget );

ImageDepictsSuggestionsPager.prototype.render = function () {
	this.renderTemplate(
		'resources/widgets/ImageDepictsSuggestionsPager.mustache+dom',
		{}
	);
};

var isScrolledToBottom = function() {
	return ( $( window ).scrollTop() + $( window ).height() == $( document ).height() );
}

ImageDepictsSuggestionsPager.prototype.fetchAndShowPageIfScrolledToBottom = function () {
	if ( !isScrolledToBottom() ) {
		return;
	}
	this.fetchAndShowPage();
}

var queryURLWithCountAndOffset = function( count, offset ) {
	// TODO: switch to middleware endpoint once it exists
	var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=imageinfo&generator=querypage&formatversion=2&iiprop=url&iiurlwidth=320&iiurlparam=&gqppage=Uncategorizedimages&origin=*"
		+ "&gqplimit=" + count;
	if (offset == 0) {
		return url;
	}
	return url
		+ "&gqpoffset=" + (count * offset)
		+ "&continue=gqpoffset||";
}

var randomDescription = function() {
	var array = [
		'This is a thing',
		'This is another such thing',
		'This is some other stuff',
		'This is a dodad'
	];
	var randomNumber = Math.floor( Math.random() * array.length );
	return array[randomNumber];
};

var randomSuggestions = function() {
	var array = 'this,that,other,bird,dog,cat,fish,horse,goat,frog,soup,chicken,stick,sky,mountain,house,beach,face,eye,book,shirt,watch,hair,arm,bricks,map,hand,window,floor,lamp,river,can,logo,bottle,form,stamp,chart,graph,lines'.split(',');
	array = $.map( array, function( string ) {
		return new SuggestionData( string );
	});
	var shuffled = array.sort( function () {
		return .5 - Math.random();
	});
	return shuffled.slice( 0, Math.min( 15, Math.floor( Math.random() * array.length ) + 5 ) );
};

var getImageDataForQueryResponsePage = function( page ) {
	// TODO: grab actual description and suggestions from middleware endpoint once it exists, then delete the random methods
	return !page.imageinfo ? null : new ImageData( page.title, page.imageinfo[0].thumburl, randomDescription(), randomSuggestions() );
};

ImageDepictsSuggestionsPager.prototype.showPageForQueryResponse = function( response ) {
	$( '#wbmad-image-depicts-suggestions-pages' ).append(
			new ImageDepictsSuggestionsPage({
				imageDataArray: $.map( response.query.pages, getImageDataForQueryResponsePage )
			}).$element
	);
};

ImageDepictsSuggestionsPager.prototype.fetchAndShowPage = function () {
	$.getJSON( queryURLWithCountAndOffset(10, $( '.wbmad-image-depicts-suggestions-page' ).length) )
		.done( this.showPageForQueryResponse.bind(this) )
		.fail( showFailureMessage );
};

var showFailureMessage = function() {
	// FIXME
	// $( '#content' ).append( '<p>Oh no, something went wrong!</p>' );
};

module.exports = ImageDepictsSuggestionsPager;
