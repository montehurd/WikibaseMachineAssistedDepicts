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

	this.$element.on( {
		click: this.emitUnrejectSuggestion.bind( this )
	} );

	this.renderTemplate(
		'resources/widgets/SuggestionRejectedWidget.mustache+dom',
		{
			suggestionLabel: suggestionLabel
		}
	);
};

module.exports = SuggestionRejectedWidget;
