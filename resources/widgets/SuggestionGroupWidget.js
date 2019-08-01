'use strict';

var DOMLessGroupWidget = require( 'wikibase.mediainfo.base' ).DOMLessGroupWidget;
var SuggestionUnchosenWidget = require( './SuggestionUnchosenWidget.js' );
var SuggestionChosenWidget = require( './SuggestionChosenWidget.js' );
var TemplateRenderer = require( './../TemplateRenderer.js' );
var	SuggestionGroupWidget = function WikibaseMachineAssistedDepictsSuggestionGroupWidget( config ) {
	config = config || {};

	this.suggestionDataArray = config.suggestionDataArray;
	this.isChosen = !!config.isChosen;

	SuggestionGroupWidget.parent.call( this, $.extend( {}, config ) );
	DOMLessGroupWidget.call( this, $.extend( {}, config ) );

	this.aggregate( {
		add: 'itemAdd',
		remove: 'itemRemove'
	} );

	this.render();
};
OO.inheritClass( SuggestionGroupWidget, OO.ui.Widget );
OO.mixinClass( SuggestionGroupWidget, DOMLessGroupWidget );
OO.mixinClass( SuggestionGroupWidget, TemplateRenderer );

SuggestionGroupWidget.prototype.render = function () {
	var self = this;
	var suggestionsWidgets = $.map( this.suggestionDataArray, function( suggestionData ) {

		if (self.isChosen) {
			return new SuggestionChosenWidget({suggestionData: suggestionData});
		}else{
			return new SuggestionUnchosenWidget({suggestionData: suggestionData});
		}

	});

	this.addItems(suggestionsWidgets);

	this.renderTemplate(
		'resources/widgets/SuggestionGroupWidget.mustache+dom',
		this.$element,
		{
			suggestions: suggestionsWidgets
		}
	);
};

module.exports = SuggestionGroupWidget;
