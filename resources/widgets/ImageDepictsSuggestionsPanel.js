'use strict';

var DOMLessGroupWidget = require( 'wikibase.mediainfo.base' ).DOMLessGroupWidget;
var ImageWithSuggestionsWidget = require( './ImageWithSuggestionsWidget.js' );
var	ImageDepictsSuggestionsPanel = function WikibaseMachineAssistedDepictsImageDepictsSuggestionsPanel( config ) {
	config = config || {};

	this.labelTop = config.labelTop;
	this.labelBottom = config.labelBottom;
	this.imageDataArray = config.imageDataArray;

	ImageDepictsSuggestionsPanel.parent.call( this, $.extend( {}, config ) );
	DOMLessGroupWidget.call( this, $.extend( {}, config ) );

	this.render();
};
OO.inheritClass( ImageDepictsSuggestionsPanel, OO.ui.Widget );
OO.mixinClass( ImageDepictsSuggestionsPanel, DOMLessGroupWidget );

ImageDepictsSuggestionsPanel.prototype.render = function () {
	var labelTop = new OO.ui.LabelWidget( {
		label: this.labelTop,
		classes: [ 'todo-info' ]
	} );

	var labelBottom = new OO.ui.LabelWidget( {
		label: this.labelBottom,
		classes: [ 'todo-info' ]
	} );

	var template = mw.template.get(
		mw.config.get( 'moduleID' ),
		'resources/widgets/ImageDepictsSuggestionsPanel.mustache+dom'
	);

	var imageWithSuggestionsWidgets = $.map( this.imageDataArray, function( imageData ) {
		return new ImageWithSuggestionsWidget({imageData: imageData});
	});

	this.addItems(imageWithSuggestionsWidgets);

	var $container = template.render( {
		labelTop: labelTop,
		imageWithSuggestionsWidgets: imageWithSuggestionsWidgets,
		labelBottom: labelBottom
	} );

	// Attach event listeners to nodes in template
	// $container.find( '.wbmi-entity-primary' ).on( 'click', this.toggleItemProminence.bind( this ) );

	this.$element.empty().append( $container );
};

module.exports = ImageDepictsSuggestionsPanel;
