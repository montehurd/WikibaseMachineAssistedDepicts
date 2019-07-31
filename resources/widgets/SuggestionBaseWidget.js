'use strict';

var DOMLessGroupWidget = require( 'wikibase.mediainfo.base' ).DOMLessGroupWidget;
var	SuggestionBaseWidget = function WikibaseMachineAssistedDepictsSuggestionBaseWidget( config ) {
	config = config || {};

	this.suggestionData = config.suggestionData;

	SuggestionBaseWidget.parent.call( this, $.extend( {}, config ) );
	DOMLessGroupWidget.call( this, $.extend( {}, config ) );
};
OO.inheritClass( SuggestionBaseWidget, OO.ui.Widget );
OO.mixinClass( SuggestionBaseWidget, DOMLessGroupWidget );

SuggestionBaseWidget.prototype.emitProgressive = function () {
	this.emit( 'add' );
};

SuggestionBaseWidget.prototype.emitDestructive = function () {
	this.emit( 'remove' );
};

module.exports = SuggestionBaseWidget;
