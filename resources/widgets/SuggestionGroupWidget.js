'use strict';

var DOMLessGroupWidget = require( 'wikibase.mediainfo.base' ).DOMLessGroupWidget;
var SuggestionUnchosenWidget = require( './SuggestionUnchosenWidget.js' );
var SuggestionChosenWidget = require( './SuggestionChosenWidget.js' );
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

	var template = mw.template.get(
		mw.config.get( 'moduleID' ),
		'resources/widgets/SuggestionGroupWidget.mustache+dom'
	);

	var $container = template.render( {
		suggestions: suggestionsWidgets
	} );

	this.$element.empty().append( $container );
};

module.exports = SuggestionGroupWidget;
