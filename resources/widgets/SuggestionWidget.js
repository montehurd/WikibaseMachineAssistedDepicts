'use strict';

var SuggestionBaseWidget = require( './SuggestionBaseWidget.js' );

var	SuggestionWidget = function WikibaseMachineAssistedDepictsSuggestionWidget( config ) {
	SuggestionWidget.parent.call( this, $.extend( {}, config ) );
	this.$element.addClass('wbmad-suggestion');
	this.render();
};
OO.inheritClass( SuggestionWidget, SuggestionBaseWidget );

SuggestionWidget.prototype.render = function () {
	var suggestionLabel = new OO.ui.LabelWidget( {
		label: this.suggestionData.text
	} );

	var subtractButton = new OO.ui.ButtonWidget( {
		title: mw.message( 'wikibasemachineassisteddepicts-suggestion-reject-title', this.suggestionData.text ).text(),
		icon: 'close',
		framed: false
	}).on( 'click', this.emitRejectSuggestion, null, this);

	this.$element.on( {
		click: this.emitConfirmSuggestion.bind( this )
	} );

	this.renderTemplate(
		'resources/widgets/SuggestionWidget.mustache+dom',
		{
			suggestionLabel: suggestionLabel,
			subtractButton: subtractButton
		}
	);
};

module.exports = SuggestionWidget;
