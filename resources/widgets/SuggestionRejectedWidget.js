'use strict';

var SuggestionBaseWidget = require( './SuggestionBaseWidget.js' ),
SuggestionRejectedWidget = function WikibaseMachineAssistedDepictsSuggestionRejectedWidget( config ) {
	SuggestionRejectedWidget.parent.call( this, $.extend( {}, config ) );
	this.$element.addClass('wbmad-rejected-suggestion');

	this.suggestionLabel = new OO.ui.LabelWidget( {
		label: this.suggestionData.text
	} );

	this.closeButton = new OO.ui.ButtonWidget( {
		title: mw.message( 'wikibasemachineassisteddepicts-suggestion-reject-undo-title', this.suggestionData.text ).text(),
		icon: 'close',
		framed: false
	})

	this.$element.on( {
		click: this.emitUnrejectSuggestion.bind( this )
	} );

	this.render();
};
OO.inheritClass( SuggestionRejectedWidget, SuggestionBaseWidget );

SuggestionRejectedWidget.prototype.render = function () {
	this.renderTemplate(
		'resources/widgets/SuggestionRejectedWidget.mustache+dom',
		{
			suggestionLabel: this.suggestionLabel,
			closeButton: this.closeButton
		}
	);
};

module.exports = SuggestionRejectedWidget;
