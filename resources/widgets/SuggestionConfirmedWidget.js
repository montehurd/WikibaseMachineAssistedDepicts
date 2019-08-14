'use strict';

var SuggestionBaseWidget = require( './SuggestionBaseWidget.js' );

var	SuggestionConfirmedWidget = function WikibaseMachineAssistedDepictsSuggestionConfirmedWidget( config ) {
	SuggestionConfirmedWidget.parent.call( this, $.extend( {}, config ) );
	this.$element.addClass('wbmad-suggestion-confirmed');
	this.render();
};
OO.inheritClass( SuggestionConfirmedWidget, SuggestionBaseWidget );

SuggestionConfirmedWidget.prototype.render = function () {
	var suggestionLabel = new OO.ui.LabelWidget( {
		label: this.suggestionData.text
	} );

	var subtractButton = new OO.ui.ButtonWidget( {
		title: mw.message( 'wikibasemachineassisteddepicts-suggestion-confirm-undo-title', this.suggestionData.text ).text(),
		icon: 'check',
		framed: false
	} );

	this.$element.on( {
		click: this.emitUnconfirmSuggestion.bind( this )
	} );

	this.renderTemplate(
		'resources/widgets/SuggestionConfirmedWidget.mustache+dom',
		{
			suggestionLabel: suggestionLabel,
			subtractButton: subtractButton
		}
	);
};

module.exports = SuggestionConfirmedWidget;
