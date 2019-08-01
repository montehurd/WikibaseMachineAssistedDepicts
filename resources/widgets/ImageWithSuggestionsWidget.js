'use strict';

var TemplateRenderingDOMLessGroupWidget = require( './../base/TemplateRenderingDOMLessGroupWidget.js' );
var SuggestionGroupWidget = require( './SuggestionGroupWidget.js' );

var	ImageWithSuggestionsWidget = function WikibaseMachineAssistedDepictsImageWithSuggestionsWidget( config ) {
	ImageWithSuggestionsWidget.parent.call( this, $.extend( {}, config ) );
	this.imageData = config.imageData;
	this.suggestions = this.imageData.suggestions;
	this.suggestionsOriginal = this.deepArrayCopy( this.suggestions );
	this.suggestionsConfirmed = [];
	this.suggestionsRejected = [];
	this.render();
};
OO.inheritClass( ImageWithSuggestionsWidget, TemplateRenderingDOMLessGroupWidget );

ImageWithSuggestionsWidget.prototype.deepArrayCopy = function (array) {
	return $.extend( true, [], array );
};

ImageWithSuggestionsWidget.prototype.getOriginalSuggestions = function () {
	return this.deepArrayCopy( this.suggestionsOriginal );
};

ImageWithSuggestionsWidget.prototype.moveItemBetweenArrays = function (item, fromArray, toArray) {
	if (toArray.indexOf(item) === -1) {
		toArray.push(item);
		var fromIndex = fromArray.indexOf(item);
		if (fromIndex > -1) {
		  fromArray.splice(fromIndex, 1);
		}
	};
};

ImageWithSuggestionsWidget.prototype.onConfirmSuggestion = function (suggestionWidget) {
	this.moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestions, this.suggestionsConfirmed);
	this.render();
};

ImageWithSuggestionsWidget.prototype.onRejectSuggestion = function (suggestionWidget) {
	this.moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestions, this.suggestionsRejected);
	this.render();
};

ImageWithSuggestionsWidget.prototype.onRejectConfirmedSuggestion = function (suggestionWidget) {
	this.moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestionsConfirmed, this.suggestions);
	this.render();
};

ImageWithSuggestionsWidget.prototype.onRejectedRejectedSuggestion = function (suggestionWidget) {
	this.moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestionsRejected, this.suggestions);
	this.render();
};

ImageWithSuggestionsWidget.prototype.onConfirmAll = function () {
	this.suggestions = [];
	this.suggestionsConfirmed = this.getOriginalSuggestions();
	this.suggestionsRejected = [];
	this.render();
};

ImageWithSuggestionsWidget.prototype.onRejectAll = function () {
	this.suggestions = [];
	this.suggestionsConfirmed = [];
	this.suggestionsRejected = this.getOriginalSuggestions();
	this.render();
};

ImageWithSuggestionsWidget.prototype.onReset = function () {
	this.suggestions = this.getOriginalSuggestions();
	this.suggestionsConfirmed = [];
	this.suggestionsRejected = [];
	this.render();
};

ImageWithSuggestionsWidget.prototype.render = function () {
	var imageDescriptionLabel = new OO.ui.LabelWidget( {
		label: this.imageData.description
	} );

	var buttonConfirmAll = new OO.ui.ButtonWidget( {
		label: 'confirm all' // mw.message( 'wikibasemachineassisteddepicts-summary' ).text()
	} )
	.on('click', this.onConfirmAll, [], this );

	var buttonRejectAll = new OO.ui.ButtonWidget( {
		label: 'reject all' // mw.message( 'wikibasemachineassisteddepicts-summary' ).text()
	} )
	.on('click', this.onRejectAll, [], this );

	var buttonReset = new OO.ui.ButtonWidget( {
		label: 'reset' // mw.message( 'wikibasemachineassisteddepicts-summary' ).text()
	} )
	.on('click', this.onReset, [], this );

	var buttonFinish = new OO.ui.ButtonWidget( {
		label: 'finish' // mw.message( 'wikibasemachineassisteddepicts-summary' ).text()
	} );

	var suggestionGroupWidget = new SuggestionGroupWidget({
		suggestionDataArray: this.suggestions
	} )
	.connect( this, {
		itemAdd: 'onConfirmSuggestion',
		itemRemove: 'onRejectSuggestion'
	} );

	var confirmedSuggestionGroupWidget = new SuggestionGroupWidget({
		suggestionDataArray: this.suggestionsConfirmed,
		useSuggestionChosenWidgets: true
	})
	.connect( this, {
		itemRemove: 'onRejectConfirmedSuggestion'
	} );

	var rejectedSuggestionGroupWidget = new SuggestionGroupWidget({
		suggestionDataArray: this.suggestionsRejected,
		useSuggestionChosenWidgets: true
	})
	.connect( this, {
		itemRemove: 'onRejectedRejectedSuggestion'
	} );

	this.renderTemplate(
		'resources/widgets/ImageWithSuggestionsWidget.mustache+dom',
		{
			imageDescriptionLabel: imageDescriptionLabel,
			suggestions: suggestionGroupWidget,
			suggestionsConfirmed: confirmedSuggestionGroupWidget,
			suggestionsRejected: rejectedSuggestionGroupWidget,
			thumburl: this.imageData.thumburl,
			buttonConfirmAll: buttonConfirmAll,
			buttonRejectAll: buttonRejectAll,
			buttonReset: buttonReset,
			buttonFinish: buttonFinish
		}
	);
};

module.exports = ImageWithSuggestionsWidget;
