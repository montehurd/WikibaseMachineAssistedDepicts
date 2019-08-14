'use strict';

var TemplateRenderingDOMLessGroupWidget = require( './../base/TemplateRenderingDOMLessGroupWidget.js' );

var	SuggestionBaseWidget = function WikibaseMachineAssistedDepictsSuggestionBaseWidget( config ) {
	config.classes = ['wbmad-suggestion-base'];
	SuggestionBaseWidget.parent.call( this, $.extend( {}, config ) );
	this.suggestionData = config.suggestionData;
};
OO.inheritClass( SuggestionBaseWidget, TemplateRenderingDOMLessGroupWidget );

SuggestionBaseWidget.prototype.emitConfirmSuggestion = function () {
	this.emit( 'confirmSuggestion' );
};
SuggestionBaseWidget.prototype.emitUnconfirmSuggestion = function () {
	this.emit( 'unconfirmSuggestion' );
};
SuggestionBaseWidget.prototype.emitRejectSuggestion = function () {
	this.emit( 'rejectSuggestion' );
};
SuggestionBaseWidget.prototype.emitUnrejectSuggestion = function () {
	this.emit( 'unrejectSuggestion' );
};

module.exports = SuggestionBaseWidget;
