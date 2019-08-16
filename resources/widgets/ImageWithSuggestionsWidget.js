'use strict';

var TemplateRenderingDOMLessGroupWidget = require( './../base/TemplateRenderingDOMLessGroupWidget.js' );
var SuggestionsRejectedGroupWidget = require( './SuggestionsRejectedGroupWidget.js' );
var SuggestionsGroupWidget = require( './SuggestionsGroupWidget.js' );

var	ImageWithSuggestionsWidget = function WikibaseMachineAssistedDepictsImageWithSuggestionsWidget( config ) {
	ImageWithSuggestionsWidget.parent.call( this, $.extend( {}, config ) );
	this.$element.addClass('wbmad-image-with-suggestions');
	this.imageData = config.imageData;
	this.suggestions = this.imageData.suggestions;
	this.suggestionsOriginal = deepArrayCopy( this.suggestions );
	this.suggestionsConfirmed = [];
	this.suggestionsRejected = [];
	this.imageTitle = this.imageData.title.split(':').pop();

	this.suggestionGroupWidget = new SuggestionsGroupWidget({
		label: mw.message( 'wikibasemachineassisteddepicts-suggestions-heading' ).text(),
		suggestionDataArray: this.suggestionsOriginal,
		suggestionDataArrayConfirmed: this.suggestionsConfirmed,
		suggestionDataArrayRejected: this.suggestionsRejected
	} )
	.connect( this, {
		confirmSuggestion: 'onConfirmSuggestion',
		unconfirmSuggestion: 'onUnconfirmSuggestion',
		rejectSuggestion: 'onRejectSuggestion'
	} );

	this.rejectedSuggestionGroupWidget = new SuggestionsRejectedGroupWidget({
		label: mw.message( 'wikibasemachineassisteddepicts-suggestions-rejected-heading' ).text(),
		suggestionDataArray: this.suggestionsRejected,
		useSuggestionChosenWidgets: true
	})
	.connect( this, {
		unrejectSuggestion: 'onUnrejectSuggestion'
	} );

	this.render();
};
OO.inheritClass( ImageWithSuggestionsWidget, TemplateRenderingDOMLessGroupWidget );

var deepArrayCopy = function (array) {
	return $.extend( true, [], array );
};

ImageWithSuggestionsWidget.prototype.getOriginalSuggestions = function () {
	return deepArrayCopy( this.suggestionsOriginal );
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
	this.suggestionGroupWidget.suggestionDataArray = this.suggestionsOriginal;
	this.suggestionGroupWidget.suggestionDataArrayConfirmed = this.suggestionsConfirmed;
	this.suggestionGroupWidget.suggestionDataArrayRejected = this.suggestionsRejected;
	this.rejectedSuggestionGroupWidget.suggestionDataArray = this.suggestionsRejected;
	this.suggestionGroupWidget.render();
	this.rejectedSuggestionGroupWidget.render();
	var isAnythingSelected = ( this.suggestionsConfirmed.length > 0 || this.suggestionsRejected.length > 0 );
	this.buttonFinish.setDisabled( !isAnythingSelected );
	this.buttonReset.setDisabled( !isAnythingSelected );
}

ImageWithSuggestionsWidget.prototype.onConfirmSuggestion = function (suggestionWidget) {
	moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestions, this.suggestionsConfirmed);
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onRejectSuggestion = function (suggestionWidget) {
	moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestions, this.suggestionsRejected);
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onUnconfirmSuggestion = function (suggestionWidget) {
	moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestionsConfirmed, this.suggestions);
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onUnrejectSuggestion = function (suggestionWidget) {
	moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestionsRejected, this.suggestions);
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onConfirmAll = function () {
	this.suggestions = [];
	this.suggestionsConfirmed = this.getOriginalSuggestions();
	this.suggestionsRejected = [];
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onRejectAll = function () {
	this.suggestions = [];
	this.suggestionsConfirmed = [];
	this.suggestionsRejected = this.getOriginalSuggestions();
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onReset = function () {
	this.suggestions = this.getOriginalSuggestions();
	this.suggestionsConfirmed = [];
	this.suggestionsRejected = [];
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
		$.map( this.suggestionsConfirmed, function( suggestion ) {
			return suggestion.text;
		}).join(', ') +
		'\n\n' +
		'DOESN\'T DEPICT:' +
		'\n' +
		$.map( this.suggestionsRejected, function( suggestion ) {
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
	var imageDescriptionLabel = new OO.ui.LabelWidget( {
		label: this.imageTitle
	} );

	var buttonClose = new OO.ui.ButtonWidget( {
		classes: ['wbmad-button-close'],
		title: mw.message( 'wikibasemachineassisteddepicts-close-title', this.imageTitle ).text(),
		icon: 'close',
		framed: false
	} )
	.on('click', this.onClose, [], this );

	this.buttonReset = new OO.ui.ButtonWidget( {
		classes: ['wbmad-button-reset'],
		title: mw.message( 'wikibasemachineassisteddepicts-reset-title' ).text(),
		label: mw.message( 'wikibasemachineassisteddepicts-reset' ).text(),
		framed: false,
		disabled: true
	} )
	.on('click', this.onReset, [], this );

	this.buttonFinish = new OO.ui.ButtonWidget( {
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

	this.renderTemplate(
		'resources/widgets/ImageWithSuggestionsWidget.mustache+dom',
		{
			buttonClose: buttonClose,
			imageDescriptionLabel: imageDescriptionLabel,
			imageTagTitle: this.imageTitle + '\n' + this.imageData.description,
			suggestions: this.suggestionGroupWidget,
			suggestionsRejected: this.rejectedSuggestionGroupWidget,
			thumburl: this.imageData.thumburl,
			buttonReset: this.buttonReset,
			buttonFinish: this.buttonFinish
		}
	);
};

module.exports = ImageWithSuggestionsWidget;
