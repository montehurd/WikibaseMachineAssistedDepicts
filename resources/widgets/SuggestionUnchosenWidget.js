'use strict';

var SuggestionBaseWidget = require( './SuggestionBaseWidget.js' );

var	SuggestionUnchosenWidget = function WikibaseMachineAssistedDepictsSuggestionUnchosenWidget( config ) {
	SuggestionUnchosenWidget.parent.call( this, $.extend( {}, config ) );
	this.render();
};
OO.inheritClass( SuggestionUnchosenWidget, SuggestionBaseWidget );

SuggestionUnchosenWidget.prototype.render = function () {
	var addButton = new OO.ui.ButtonWidget( {
		title: mw.message( 'wikibasemachineassisteddepicts-suggestion-confirm-title', this.suggestionData.text ).text(),
		icon: 'add',
		framed: false
	}).on( 'click', this.emitProgressive, null, this);

	var suggestionLabel = new OO.ui.LabelWidget( {
		label: this.suggestionData.text
	} );

	var subtractButton = new OO.ui.ButtonWidget( {
		title: mw.message( 'wikibasemachineassisteddepicts-suggestion-reject-title', this.suggestionData.text ).text(),
		icon: 'subtract',
		framed: false
	}).on( 'click', this.emitDestructive, null, this);

	this.renderTemplate(
		'resources/widgets/SuggestionUnchosenWidget.mustache+dom',
		{
			addButton: addButton,
			suggestionLabel: suggestionLabel,
			subtractButton: subtractButton
		}
	);
};

module.exports = SuggestionUnchosenWidget;
