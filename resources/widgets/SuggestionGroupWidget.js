'use strict';

var DOMLessGroupWidget = require( 'wikibase.mediainfo.base' ).DOMLessGroupWidget;
var SuggestionWidget = require( './SuggestionWidget.js' );
var	SuggestionGroupWidget = function WikibaseMachineAssistedDepictsSuggestionGroupWidget( config ) {
	config = config || {};

	this.suggestionDataArray = config.suggestionDataArray;

	SuggestionGroupWidget.parent.call( this, $.extend( {}, config ) );
	DOMLessGroupWidget.call( this, $.extend( {}, config ) );

	this.aggregate( {
		add: 'itemAdd'
	} );

	this.connect( this, {
		itemAdd: 'onItemAdd'
	} );

	this.aggregate( {
		remove: 'itemRemove'
	} );

	this.connect( this, {
		itemRemove: 'onItemRemove'
	} );

	this.render();
};
OO.inheritClass( SuggestionGroupWidget, OO.ui.Widget );
OO.mixinClass( SuggestionGroupWidget, DOMLessGroupWidget );

SuggestionGroupWidget.prototype.onItemAdd = function (suggestionWidget) {
	// alert(suggestionWidget.suggestionData.text);
};

SuggestionGroupWidget.prototype.onItemRemove = function (suggestionWidget) {
	// alert(suggestionWidget.suggestionData.text);
};

SuggestionGroupWidget.prototype.render = function () {
	var suggestionsWidgets = $.map( this.suggestionDataArray, function( suggestionData ) {
		return new SuggestionWidget({suggestionData: suggestionData});
	});

	this.addItems(suggestionsWidgets);

	var data = {
		suggestions: suggestionsWidgets
	};

	var template = mw.template.get(
		'ext.WikibaseMachineAssistedDepicts',
		'resources/widgets/SuggestionGroupWidget.mustache+dom'
	);

	var $container = template.render( data );

	this.$element.empty().append( $container );
};

module.exports = SuggestionGroupWidget;
