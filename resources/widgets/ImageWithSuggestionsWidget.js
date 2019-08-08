'use strict';

var TemplateRenderingDOMLessGroupWidget = require( './../base/TemplateRenderingDOMLessGroupWidget.js' );
var SuggestionGroupWidget = require( './SuggestionGroupWidget.js' );
var SuggestionGroupModeEnum = require( './../models/SuggestionGroupModeEnum.js' );

var	ImageWithSuggestionsWidget = function WikibaseMachineAssistedDepictsImageWithSuggestionsWidget( config ) {
	ImageWithSuggestionsWidget.parent.call( this, $.extend( {}, config ) );
	this.$element.addClass('wbmad-image-with-suggestions');
	this.imageData = config.imageData;
	this.suggestions = this.imageData.suggestions;
	this.suggestionsOriginal = deepArrayCopy( this.suggestions );
	this.suggestionsConfirmed = [];
	this.suggestionsRejected = [];

	this.suggestionGroupWidget = new SuggestionGroupWidget({
		suggestionGroupMode: SuggestionGroupModeEnum.DEFAULT,
		suggestionDataArray: this.suggestions
	} )
	.connect( this, {
		itemAdd: 'onConfirmSuggestion',
		itemRemove: 'onRejectSuggestion'
	} );

	this.confirmedSuggestionGroupWidget = new SuggestionGroupWidget({
		suggestionGroupMode: SuggestionGroupModeEnum.CONFIRMED,
		suggestionDataArray: this.suggestionsConfirmed,
		useSuggestionChosenWidgets: true
	})
	.connect( this, {
		itemRemove: 'onRejectConfirmedSuggestion'
	} );

	this.rejectedSuggestionGroupWidget = new SuggestionGroupWidget({
		suggestionGroupMode: SuggestionGroupModeEnum.REJECTED,
		suggestionDataArray: this.suggestionsRejected,
		useSuggestionChosenWidgets: true
	})
	.connect( this, {
		itemRemove: 'onRejectedRejectedSuggestion'
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
	this.suggestionGroupWidget.suggestionDataArray = this.suggestions;
	this.confirmedSuggestionGroupWidget.suggestionDataArray = this.suggestionsConfirmed;
	this.rejectedSuggestionGroupWidget.suggestionDataArray = this.suggestionsRejected;
	this.suggestionGroupWidget.render();
	this.confirmedSuggestionGroupWidget.render();
	this.rejectedSuggestionGroupWidget.render();
}

ImageWithSuggestionsWidget.prototype.onConfirmSuggestion = function (suggestionWidget) {
	moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestions, this.suggestionsConfirmed);
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onRejectSuggestion = function (suggestionWidget) {
	moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestions, this.suggestionsRejected);
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onRejectConfirmedSuggestion = function (suggestionWidget) {
	moveItemBetweenArrays(suggestionWidget.suggestionData, this.suggestionsConfirmed, this.suggestions);
	this.rerenderGroups();
};

ImageWithSuggestionsWidget.prototype.onRejectedRejectedSuggestion = function (suggestionWidget) {
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
		this.imageData.thumburl.split('/').pop() +
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

ImageWithSuggestionsWidget.prototype.render = function () {
	var imageDescriptionLabel = new OO.ui.LabelWidget( {
		label: this.imageData.description
	} );
	var suggestionsLabel = new OO.ui.LabelWidget( {
		label: mw.message( 'wikibasemachineassisteddepicts-suggestions-heading' ).text()
	} );
	var confirmedLabel = new OO.ui.LabelWidget( {
		label: mw.message( 'wikibasemachineassisteddepicts-suggestions-confirmed-heading' ).text()
	} );
	var rejectedLabel = new OO.ui.LabelWidget( {
		label: mw.message( 'wikibasemachineassisteddepicts-suggestions-rejected-heading' ).text()
	} );

	var buttonConfirmAll = new OO.ui.ButtonWidget( {
		classes: ['wbmad-button-confirm-all'],
		title: mw.message( 'wikibasemachineassisteddepicts-confirm-all-title' ).text(),
		label: mw.message( 'wikibasemachineassisteddepicts-confirm-all' ).text()
	} )
	.on('click', this.onConfirmAll, [], this );

	var buttonRejectAll = new OO.ui.ButtonWidget( {
		classes: ['wbmad-button-reject-all'],
		title: mw.message( 'wikibasemachineassisteddepicts-reject-all-title' ).text(),
		label: mw.message( 'wikibasemachineassisteddepicts-reject-all' ).text()
	} )
	.on('click', this.onRejectAll, [], this );

	var buttonReset = new OO.ui.ButtonWidget( {
		classes: ['wbmad-button-reset'],
		title: mw.message( 'wikibasemachineassisteddepicts-reset-title' ).text(),
		label: mw.message( 'wikibasemachineassisteddepicts-reset' ).text()
	} )
	.on('click', this.onReset, [], this );

	var buttonFinish = new OO.ui.ButtonWidget( {
		classes: ['wbmad-button-save'],
		title: mw.message( 'wikibasemachineassisteddepicts-save-title' ).text(),
		label: mw.message( 'wikibasemachineassisteddepicts-save' ).text()
	} )
	.on('click', this.onSave, [], this );

	this.renderTemplate(
		'resources/widgets/ImageWithSuggestionsWidget.mustache+dom',
		{
			imageDescriptionLabel: imageDescriptionLabel,
			suggestionsLabel: suggestionsLabel,
			confirmedLabel: confirmedLabel,
			rejectedLabel: rejectedLabel,
			suggestions: this.suggestionGroupWidget,
			suggestionsConfirmed: this.confirmedSuggestionGroupWidget,
			suggestionsRejected: this.rejectedSuggestionGroupWidget,
			thumburl: this.imageData.thumburl,
			buttonConfirmAll: buttonConfirmAll,
			buttonRejectAll: buttonRejectAll,
			buttonReset: buttonReset,
			buttonFinish: buttonFinish
		}
	);
};

module.exports = ImageWithSuggestionsWidget;
