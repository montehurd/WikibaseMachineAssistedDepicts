'use strict';

var DOMLessGroupWidget = require( 'wikibase.mediainfo.base' ).DOMLessGroupWidget

var	SuggestionWidget = function WikibaseMachineAssistedDepictsSuggestionWidget( config ) {
		config = config || {};

		this.suggestion = config.suggestion;

		SuggestionWidget.parent.call( this, $.extend( {}, config ) );
		DOMLessGroupWidget.call( this, $.extend( {}, config ) );

		this.render();
	};
OO.inheritClass( SuggestionWidget, OO.ui.Widget );
OO.mixinClass( SuggestionWidget, DOMLessGroupWidget );




SuggestionWidget.prototype.onAddButtonClick = function () {
	this.emit( 'add' );
};


SuggestionWidget.prototype.render = function () {
	var subtractButton,
		addButton,
		suggestionLabel,
		data,
		template,
		$container;





	var self = this;


	addButton = new OO.ui.ButtonWidget( {
		classes: [ 'wbmi-item-remove' ],
		title: mw.message( 'wikibasemachineassisteddepicts-summary' ).text(),
		flags: 'destructive',
		icon: 'add',
		framed: false
	});
	// } ).on( 'click', function(){
	//
	// 	self.emit( 'choose123' );
	//
	// } );

	addButton.connect( this, {
			click: 'onAddButtonClick'
	} );




	suggestionLabel = new OO.ui.LabelWidget( {
		label: this.suggestion.text,
		classes: [ 'todo-info' ]
	} );

	subtractButton = new OO.ui.ButtonWidget( {
		classes: [ 'wbmi-item-remove' ],
		title: mw.message( 'wikibasemediainfo-statements-item-remove' ).text(),
		flags: 'destructive',
		icon: 'subtract',
		framed: false
	} );

	template = mw.template.get(
		'ext.WikibaseMachineAssistedDepicts',
		'templates/SuggestionWidget.mustache+dom'
	);

	data = {
		addButton: addButton,
		suggestionLabel: suggestionLabel,
		subtractButton: subtractButton
	};

	// Render ItemWidget template
	$container = template.render( data );

	// Attach event listeners to nodes in template
	// $container.find( '.wbmi-entity-primary' ).on( 'click', this.toggleItemProminence.bind( this ) );

	this.$element.empty().append( $container );
};

module.exports = SuggestionWidget;
