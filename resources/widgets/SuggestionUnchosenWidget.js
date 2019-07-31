'use strict';

var SuggestionBaseWidget = require( './SuggestionBaseWidget.js' );
var	SuggestionUnchosenWidget = function WikibaseMachineAssistedDepictsSuggestionUnchosenWidget( config ) {
	SuggestionUnchosenWidget.parent.call( this, $.extend( {}, config ) );
	this.render();
};
OO.inheritClass( SuggestionUnchosenWidget, SuggestionBaseWidget );

SuggestionUnchosenWidget.prototype.render = function () {
	var addButton = new OO.ui.ButtonWidget( {
		classes: [ 'wbmi-item-remove' ],
		title: mw.message( 'wikibasemachineassisteddepicts-summary' ).text(),
		flags: 'destructive',
		icon: 'add',
		framed: false
	}).on( 'click', this.emitProgressive, null, this);

	var suggestionLabel = new OO.ui.LabelWidget( {
		label: this.suggestionData.text,
		classes: [ 'todo-info' ]
	} );

	var subtractButton = new OO.ui.ButtonWidget( {
		classes: [ 'wbmi-item-remove' ],
		title: mw.message( 'wikibasemediainfo-statements-item-remove' ).text(),
		flags: 'destructive',
		icon: 'subtract',
		framed: false
	}).on( 'click', this.emitDestructive, null, this);

	var template = mw.template.get(
		'ext.WikibaseMachineAssistedDepicts',
		'resources/widgets/SuggestionUnchosenWidget.mustache+dom'
	);

	var $container = template.render( {
		addButton: addButton,
		suggestionLabel: suggestionLabel,
		subtractButton: subtractButton
	} );

	this.$element.empty().append( $container );
};

module.exports = SuggestionUnchosenWidget;
