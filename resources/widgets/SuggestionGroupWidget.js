'use strict';

var TemplateRenderingDOMLessGroupWidget = require( './../base/TemplateRenderingDOMLessGroupWidget.js' );
var SuggestionWidget = require( './SuggestionWidget.js' );
var SuggestionConfirmedWidget = require( './SuggestionConfirmedWidget.js' );
var SuggestionRejectedWidget = require( './SuggestionRejectedWidget.js' );
var SuggestionGroupModeEnum = require( './../models/SuggestionGroupModeEnum.js' );

var SuggestionGroupWidget = function WikibaseMachineAssistedDepictsSuggestionGroupWidget( config ) {
	SuggestionGroupWidget.parent.call( this, $.extend( {}, config ) );
	this.$element.addClass('wbmad-suggestion-group');
	this.suggestionGroupMode = config.suggestionGroupMode;
	this.suggestionDataArray = config.suggestionDataArray;
	this.aggregate( {
		add: 'itemAdd',
		remove: 'itemRemove'
	} );
	this.render();
};
OO.inheritClass( SuggestionGroupWidget, TemplateRenderingDOMLessGroupWidget );

SuggestionGroupWidget.prototype.getSuggestionForSuggestionData = function (suggestionData) {
	switch( this.suggestionGroupMode ) {
		case SuggestionGroupModeEnum.CONFIRMED:
			return new SuggestionConfirmedWidget( { suggestionData: suggestionData } );
			break;
		case SuggestionGroupModeEnum.REJECTED:
			return new SuggestionRejectedWidget( { suggestionData: suggestionData } );
			break;
		default:
			return new SuggestionWidget( { suggestionData: suggestionData } );
	}
};

SuggestionGroupWidget.prototype.render = function () {
	var suggestionsWidgets = $.map( this.suggestionDataArray, this.getSuggestionForSuggestionData.bind(this));
	this.addItems(suggestionsWidgets);
	this.renderTemplate(
		'resources/widgets/SuggestionGroupWidget.mustache+dom',
		{
			suggestions: suggestionsWidgets
		}
	);
};

module.exports = SuggestionGroupWidget;
