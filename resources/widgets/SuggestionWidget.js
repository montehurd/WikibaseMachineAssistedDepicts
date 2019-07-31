'use strict';

var DOMLessGroupWidget = require( 'wikibase.mediainfo.base' ).DOMLessGroupWidget;
var	SuggestionWidget = function WikibaseMachineAssistedDepictsSuggestionWidget( config ) {
	config = config || {};

	this.suggestionData = config.suggestionData;

	SuggestionWidget.parent.call( this, $.extend( {}, config ) );
	DOMLessGroupWidget.call( this, $.extend( {}, config ) );

	this.render();
};
OO.inheritClass( SuggestionWidget, OO.ui.Widget );
OO.mixinClass( SuggestionWidget, DOMLessGroupWidget );

SuggestionWidget.prototype.render = function () {
	var addButton = new OO.ui.ButtonWidget( {
		classes: [ 'wbmi-item-remove' ],
		title: mw.message( 'wikibasemachineassisteddepicts-summary' ).text(),
		flags: 'destructive',
		icon: 'add',
		framed: false
	})
	.on( 'click', function () {
		this.emit( 'add' );
	}, null, this);

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
	} )
	.on( 'click', function () {
		this.emit( 'remove' );
	}, null, this);

	var template = mw.template.get(
		'ext.WikibaseMachineAssistedDepicts',
		'resources/widgets/SuggestionWidget.mustache+dom'
	);

	var data = {
		addButton: addButton,
		suggestionLabel: suggestionLabel,
		subtractButton: subtractButton
	};

	// Render ItemWidget template
	var $container = template.render( data );

	// Attach event listeners to nodes in template
	// $container.find( '.wbmi-entity-primary' ).on( 'click', this.toggleItemProminence.bind( this ) );

	this.$element.empty().append( $container );
};

module.exports = SuggestionWidget;
