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
	this.titleLabel = new OO.ui.LabelWidget( {
		label: config.label,
		classes: [ 'wbmad-suggestion-group-title-label' ]
	} );
	this.render();
};
OO.inheritClass( SuggestionGroupWidget, TemplateRenderingDOMLessGroupWidget );

SuggestionGroupWidget.prototype.getSuggestionWidgetForSuggestionData = function (suggestionData) {
	switch( this.suggestionGroupMode ) {
		case SuggestionGroupModeEnum.CONFIRMED:
			return new SuggestionConfirmedWidget( {
				suggestionData: suggestionData
			} );
			break;
		case SuggestionGroupModeEnum.REJECTED:
			return new SuggestionRejectedWidget( {
				suggestionData: suggestionData
			} );
			break;
		default:
			return new SuggestionWidget( {
				suggestionData: suggestionData
			} );
	}
};

SuggestionGroupWidget.prototype.render = function () {
	var suggestionsWidgets = $.map( this.suggestionDataArray, this.getSuggestionWidgetForSuggestionData.bind( this ) );
	this.addItems( suggestionsWidgets );
	// this.$element.css( 'display', this.suggestionDataArray.length > 0 ? 'block' : 'none' );
	this.renderTemplate(
		'resources/widgets/SuggestionGroupWidget.mustache+dom',
		{
			titleLabel: this.titleLabel,
			suggestions: suggestionsWidgets
		}
	);
};

module.exports = SuggestionGroupWidget;
