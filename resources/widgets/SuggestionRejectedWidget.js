'use strict';

var SuggestionBaseWidget = require( './SuggestionBaseWidget.js' );

var	SuggestionRejectedWidget = function WikibaseMachineAssistedDepictsSuggestionRejectedWidget( config ) {
	SuggestionRejectedWidget.parent.call( this, $.extend( {}, config ) );
	this.$element.addClass('wbmad-suggestion-rejected');
	this.render();
};
OO.inheritClass( SuggestionRejectedWidget, SuggestionBaseWidget );

SuggestionRejectedWidget.prototype.render = function () {
	var suggestionLabel = new OO.ui.LabelWidget( {
		label: this.suggestionData.text
	} );

	var subtractButton = new OO.ui.ButtonWidget( {
		title: mw.message( 'wikibasemachineassisteddepicts-suggestion-reject-undo-title', this.suggestionData.text ).text(),
		icon: 'close',
		framed: false
	})
	.on( 'click', this.emitDestructive, null, this);

	this.renderTemplate(
		'resources/widgets/SuggestionRejectedWidget.mustache+dom',
		{
			suggestionLabel: suggestionLabel,
			subtractButton: subtractButton
		}
	);
};

module.exports = SuggestionRejectedWidget;
