'use strict';

var TemplateRenderingDOMLessGroupWidget = require( './../base/TemplateRenderingDOMLessGroupWidget.js' );
var SuggestionUnchosenWidget = require( './SuggestionUnchosenWidget.js' );
var SuggestionChosenWidget = require( './SuggestionChosenWidget.js' );

var	SuggestionGroupWidget = function WikibaseMachineAssistedDepictsSuggestionGroupWidget( config ) {
	SuggestionGroupWidget.parent.call( this, $.extend( {}, config ) );
	this.suggestionDataArray = config.suggestionDataArray;
	this.useSuggestionChosenWidgets = !!config.useSuggestionChosenWidgets;
	this.aggregate( {
		add: 'itemAdd',
		remove: 'itemRemove'
	} );
	this.render();
};
OO.inheritClass( SuggestionGroupWidget, TemplateRenderingDOMLessGroupWidget );

SuggestionGroupWidget.prototype.render = function () {
	var self = this;
	var suggestionsWidgets = $.map( this.suggestionDataArray, function( suggestionData ) {
		if (self.useSuggestionChosenWidgets) {
			return new SuggestionChosenWidget({suggestionData: suggestionData});
		}else{
			return new SuggestionUnchosenWidget({suggestionData: suggestionData});
		}
	});

	this.addItems(suggestionsWidgets);

	this.renderTemplate(
		'resources/widgets/SuggestionGroupWidget.mustache+dom',
		{
			suggestions: suggestionsWidgets
		}
	);
};

module.exports = SuggestionGroupWidget;
