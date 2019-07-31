'use strict';

var DOMLessGroupWidget = require( 'wikibase.mediainfo.base' ).DOMLessGroupWidget;
// var SuggestionWidget = require( './SuggestionWidget.js' );
var SuggestionGroupWidget = require( './SuggestionGroupWidget.js' );
var	ImageWithSuggestionsWidget = function WikibaseMachineAssistedDepictsImageWithSuggestionsWidget( config ) {
	config = config || {};

	this.imageData = config.imageData;

this.suggestions = this.imageData.suggestions;
this.suggestionsConfirmed = [];
this.suggestionsRejected = [];
//this.selectedSuggestionGroupWidget = null;

	ImageWithSuggestionsWidget.parent.call( this, $.extend( {}, config ) );
	DOMLessGroupWidget.call( this, $.extend( {}, config ) );

	// this.aggregate( {
	// 	add: 'itemAdd'
	// } );
	//
	// this.connect( this, {
	// 	itemAdd: 'onItemAdd'
	// } );

	this.render();
};
OO.inheritClass( ImageWithSuggestionsWidget, OO.ui.Widget );
OO.mixinClass( ImageWithSuggestionsWidget, DOMLessGroupWidget );

ImageWithSuggestionsWidget.prototype.moveItemBetweenArrays = function (item, fromArray, toArray) {
	if (toArray.indexOf(item) === -1) {
		toArray.push(item);
		var fromIndex = fromArray.indexOf(item);
		if (fromIndex > -1) {
		  fromArray.splice(fromIndex, 1);
		}
	};
};

ImageWithSuggestionsWidget.prototype.onItemAdd = function (suggestionWidget) {
	this.moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestions, this.suggestionsConfirmed);
	this.render();
};

ImageWithSuggestionsWidget.prototype.onItemRemove = function (suggestionWidget) {
	this.moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestions, this.suggestionsRejected);
	this.render();
};





ImageWithSuggestionsWidget.prototype.onConfirmedSuggestionRemove = function (suggestionWidget) {
	this.moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestionsConfirmed, this.suggestions);
	this.render();
};

ImageWithSuggestionsWidget.prototype.onRejectedSuggestionRemove = function (suggestionWidget) {
	this.moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestionsRejected, this.suggestions);
	this.render();
};





ImageWithSuggestionsWidget.prototype.render = function () {
	var imageDescriptionLabel = new OO.ui.LabelWidget( {
		label: this.imageData.description,
		classes: [ 'todo-info' ]
	} );

	var buttonConfirmAll = new OO.ui.ButtonWidget( {
		classes: [ 'wbmi-item-remove' ],
		label: 'confirm all' // mw.message( 'wikibasemachineassisteddepicts-summary' ).text()
	} );

	var buttonRejectAll = new OO.ui.ButtonWidget( {
		classes: [ 'wbmi-item-remove' ],
		label: 'reject all' // mw.message( 'wikibasemachineassisteddepicts-summary' ).text()
	} );

	var buttonFinish = new OO.ui.ButtonWidget( {
		classes: [ 'wbmi-item-remove' ],
		label: 'finish' // mw.message( 'wikibasemachineassisteddepicts-summary' ).text()
	} );

	var template = mw.template.get(
		'ext.WikibaseMachineAssistedDepicts',
		'resources/widgets/ImageWithSuggestionsWidget.mustache+dom'
	);



	var suggestionGroupWidget = new SuggestionGroupWidget({suggestionDataArray: this.suggestions});
	suggestionGroupWidget.connect( this, {
		itemAdd: 'onItemAdd'
	} );
	suggestionGroupWidget.connect( this, {
		itemRemove: 'onItemRemove'
	} );



	var confirmedSuggestionGroupWidget = new SuggestionGroupWidget({suggestionDataArray: this.suggestionsConfirmed});
	confirmedSuggestionGroupWidget.connect( this, {
		itemRemove: 'onConfirmedSuggestionRemove'
	} );





	var rejectedSuggestionGroupWidget = new SuggestionGroupWidget({suggestionDataArray: this.suggestionsRejected});
	rejectedSuggestionGroupWidget.connect( this, {
		itemRemove: 'onRejectedSuggestionRemove'
	} );




	// var suggestionsWidgets = $.map( this.suggestions, function( suggestionData ) {
	// 	return new SuggestionWidget({suggestionData: suggestionData});
	// });
	//
	// this.addItems(suggestionsWidgets);

	var data = {
		imageDescriptionLabel: imageDescriptionLabel,
		suggestions: suggestionGroupWidget, // suggestionsWidgets,
		suggestionsConfirmed: confirmedSuggestionGroupWidget, // suggestionsWidgets,
		suggestionsRejected: rejectedSuggestionGroupWidget, // suggestionsWidgets,
		thumburl: this.imageData.thumburl,
		buttonConfirmAll: buttonConfirmAll,
		buttonRejectAll: buttonRejectAll,
		buttonFinish: buttonFinish
	};

	var $container = template.render( data );

	this.$element.empty().append( $container );
};

module.exports = ImageWithSuggestionsWidget;
