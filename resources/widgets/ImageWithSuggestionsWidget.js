'use strict';

var TemplateRenderingDOMLessGroupWidget = require( './../base/TemplateRenderingDOMLessGroupWidget.js' );
var SuggestionsRejectedGroupWidget = require( './SuggestionsRejectedGroupWidget.js' );
var SuggestionsGroupWidget = require( './SuggestionsGroupWidget.js' );

var	ImageWithSuggestionsWidget = function WikibaseMachineAssistedDepictsImageWithSuggestionsWidget( config ) {
	ImageWithSuggestionsWidget.parent.call( this, $.extend( {}, config ) );
	this.$element.addClass('wbmad-image-with-suggestions');
	this.imageData = config.imageData;
	this.suggestions = this.imageData.suggestions;
	this.originalSuggestions = deepArrayCopy( this.suggestions );
	this.confirmedSuggestions = [];
	this.rejectedSuggestions = [];
	this.imageTitle = this.imageData.title.split(':').pop();

	this.suggestionGroupWidget = new SuggestionsGroupWidget({
		label: mw.message( 'wikibasemachineassisteddepicts-suggestions-heading' ).text(),
		suggestionDataArray: this.originalSuggestions,
		confirmedSuggestionDataArray: this.confirmedSuggestions,
		rejectedSuggestionDataArray: this.rejectedSuggestions
	} )
	.connect( this, {
		confirmSuggestion: 'onConfirmSuggestion',
		unconfirmSuggestion: 'onUnconfirmSuggestion',
		rejectSuggestion: 'onRejectSuggestion'
	} );

	this.rejectedSuggestionGroupWidget = new SuggestionsRejectedGroupWidget({
		label: mw.message( 'wikibasemachineassisteddepicts-suggestions-rejected-heading' ).text(),
		suggestionDataArray: this.rejectedSuggestions,
		useSuggestionChosenWidgets: true
	})
	.connect( this, {
		unrejectSuggestion: 'onUnrejectSuggestion'
	} );

	this.imageDescriptionLabel = new OO.ui.LabelWidget( {
		label: this.imageTitle
	} );

	this.closeButton = new OO.ui.ButtonWidget( {
		classes: ['wbmad-close-button'],
		title: mw.message( 'wikibasemachineassisteddepicts-close-title', this.imageTitle ).text(),
		icon: 'close',
		framed: false
	} )
	.on('click', this.onClose, [], this );

	this.resetButton = new OO.ui.ButtonWidget( {
		classes: ['wbmad-button-reset'],
		title: mw.message( 'wikibasemachineassisteddepicts-reset-title' ).text(),
		label: mw.message( 'wikibasemachineassisteddepicts-reset' ).text(),
		framed: false,
		disabled: true
	} )
	.on('click', this.onReset, [], this );

	this.finishButton = new OO.ui.ButtonWidget( {
		classes: ['wbmad-button-save'],
		title: mw.message( 'wikibasemachineassisteddepicts-save-title' ).text(),
		label: mw.message( 'wikibasemachineassisteddepicts-save' ).text(),
		disabled: true,
		flags: [
			'primary',
			'progressive'
		]
	} )
	.on('click', this.onSave, [], this );

	this.render();
};
OO.inheritClass( ImageWithSuggestionsWidget, TemplateRenderingDOMLessGroupWidget );

var deepArrayCopy = function (array) {
	return $.extend( true, [], array );
};

ImageWithSuggestionsWidget.prototype.getOriginalSuggestions = function () {
	return deepArrayCopy( this.originalSuggestions );
};

var moveItemBetweenArrays = function (item, fromArray, toArray) {
	if (toArray.indexOf(item) === -1) {
		toArray.push(item);
		var fromIndex = fromArray.indexOf(item);
		if (fromIndex > -1) {
		  fromArray.splice(fromIndex, 1);
		}
	};
};

ImageWithSuggestionsWidget.prototype.rerenderGroups = function () {
	this.suggestionGroupWidget.suggestionDataArray = this.originalSuggestions;
	this.suggestionGroupWidget.confirmedSuggestionDataArray = this.confirmedSuggestions;
	this.suggestionGroupWidget.rejectedSuggestionDataArray = this.rejectedSuggestions;
	this.rejectedSuggestionGroupWidget.suggestionDataArray = this.rejectedSuggestions;
	this.suggestionGroupWidget.render();
	this.rejectedSuggestionGroupWidget.render();
	var isAnythingSelected = ( this.confirmedSuggestions.length > 0 || this.rejectedSuggestions.length > 0 );
	this.finishButton.setDisabled( !isAnythingSelected );
	this.resetButton.setDisabled( !isAnythingSelected );
}

ImageWithSuggestionsWidget.prototype.onConfirmSuggestion = function (suggestionWidget) {
	moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestions, this.confirmedSuggestions);
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onRejectSuggestion = function (suggestionWidget) {
	moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestions, this.rejectedSuggestions);
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onUnconfirmSuggestion = function (suggestionWidget) {
	moveItemBetweenArrays(suggestionWidget.suggestionData, this.confirmedSuggestions, this.suggestions);
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onUnrejectSuggestion = function (suggestionWidget) {
	moveItemBetweenArrays(suggestionWidget.suggestionData, this.rejectedSuggestions, this.suggestions);
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onConfirmAll = function () {
	this.suggestions = [];
	this.confirmedSuggestions = this.getOriginalSuggestions();
	this.rejectedSuggestions = [];
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onRejectAll = function () {
	this.suggestions = [];
	this.confirmedSuggestions = [];
	this.rejectedSuggestions = this.getOriginalSuggestions();
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onReset = function () {
	this.suggestions = this.getOriginalSuggestions();
	this.confirmedSuggestions = [];
	this.rejectedSuggestions = [];
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.getSaveDebugString = function () {
	return '' +
		'IMAGE:' +
		'\n' +
		this.imageTitle +
		'\n\n' +
		'DEPICTS:' +
		'\n' +
		$.map( this.confirmedSuggestions, function( suggestion ) {
			return suggestion.text;
		}).join(', ') +
		'\n\n' +
		'DOESN\'T DEPICT:' +
		'\n' +
		$.map( this.rejectedSuggestions, function( suggestion ) {
			return suggestion.text;
		}).join(', ');
};

ImageWithSuggestionsWidget.prototype.onSave = function () {
	// TODO: wire up to middleware 'save' endpoint once it exists
	if ( confirm( this.getSaveDebugString() ) ) {
		this.$element.slideUp();
	};
};

ImageWithSuggestionsWidget.prototype.onClose = function () {
	this.$element.slideUp();
};

ImageWithSuggestionsWidget.prototype.render = function () {
	this.renderTemplate(
		'resources/widgets/ImageWithSuggestionsWidget.mustache+dom',
		{
			closeButton: this.closeButton,
			imageDescriptionLabel: this.imageDescriptionLabel,
			imageTagTitle: this.imageTitle + '\n' + this.imageData.description,
			suggestions: this.suggestionGroupWidget,
			rejectedSuggestions: this.rejectedSuggestionGroupWidget,
			thumburl: this.imageData.thumburl,
			resetButton: this.resetButton,
			finishButton: this.finishButton
		}
	);
};

module.exports = ImageWithSuggestionsWidget;
