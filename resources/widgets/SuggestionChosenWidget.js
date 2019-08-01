'use strict';

var SuggestionBaseWidget = require( './SuggestionBaseWidget.js' );
var TemplateRenderer = require( './../TemplateRenderer.js' );
var	SuggestionChosenWidget = function WikibaseMachineAssistedDepictsSuggestionChosenWidget( config ) {
	SuggestionChosenWidget.parent.call( this, $.extend( {}, config ) );
	this.render();
};
OO.inheritClass( SuggestionChosenWidget, SuggestionBaseWidget );
OO.mixinClass( SuggestionChosenWidget, TemplateRenderer );

SuggestionChosenWidget.prototype.render = function () {
	var suggestionLabel = new OO.ui.LabelWidget( {
		label: this.suggestionData.text,
		classes: [ 'todo-info' ]
	} );

	var subtractButton = new OO.ui.ButtonWidget( {
		classes: [ 'wbmi-item-remove' ],
		title: mw.message( 'wikibasemediainfo-statements-item-remove' ).text(),
		flags: 'destructive',
		icon: 'close',
		framed: false
	}).on( 'click', this.emitDestructive, null, this);

	this.renderTemplate(
		'resources/widgets/SuggestionChosenWidget.mustache+dom',
		this.$element,
		{
			suggestionLabel: suggestionLabel,
			subtractButton: subtractButton
		}
	);
};

module.exports = SuggestionChosenWidget;
