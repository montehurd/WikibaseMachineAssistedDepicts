'use strict';

var SuggestionBaseWidget = require( './SuggestionBaseWidget.js' );
var	SuggestionChosenWidget = function WikibaseMachineAssistedDepictsSuggestionChosenWidget( config ) {
	SuggestionChosenWidget.parent.call( this, $.extend( {}, config ) );
	this.render();
};
OO.inheritClass( SuggestionChosenWidget, SuggestionBaseWidget );

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

	var template = mw.template.get(
		'ext.WikibaseMachineAssistedDepicts',
		'resources/widgets/SuggestionChosenWidget.mustache+dom'
	);

	var $container = template.render({
		suggestionLabel: suggestionLabel,
		subtractButton: subtractButton
	});

	this.$element.empty().append( $container );
};

module.exports = SuggestionChosenWidget;
