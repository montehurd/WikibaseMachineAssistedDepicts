'use strict';

var TemplateRenderingDOMLessGroupWidget = require( './../base/TemplateRenderingDOMLessGroupWidget.js' );
var	SuggestionBaseWidget = function WikibaseMachineAssistedDepictsSuggestionBaseWidget( config ) {
	config = config || {};
	SuggestionBaseWidget.parent.call( this, $.extend( {}, config ) );

	this.suggestionData = config.suggestionData;
};
OO.inheritClass( SuggestionBaseWidget, TemplateRenderingDOMLessGroupWidget );

SuggestionBaseWidget.prototype.emitProgressive = function () {
	this.emit( 'add' );
};

SuggestionBaseWidget.prototype.emitDestructive = function () {
	this.emit( 'remove' );
};

module.exports = SuggestionBaseWidget;
