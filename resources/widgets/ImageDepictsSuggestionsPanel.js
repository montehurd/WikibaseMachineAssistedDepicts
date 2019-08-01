'use strict';

var DOMLessGroupWidget = require( 'wikibase.mediainfo.base' ).DOMLessGroupWidget;
var ImageWithSuggestionsWidget = require( './ImageWithSuggestionsWidget.js' );
var TemplateRenderer = require( './../TemplateRenderer.js' );
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
OO.mixinClass( ImageDepictsSuggestionsPanel, TemplateRenderer );

ImageDepictsSuggestionsPanel.prototype.render = function () {
	var labelTop = new OO.ui.LabelWidget( {
		label: this.labelTop,
		classes: [ 'todo-info' ]
	} );

	var labelBottom = new OO.ui.LabelWidget( {
		label: this.labelBottom,
		classes: [ 'todo-info' ]
	} );

	var imageWithSuggestionsWidgets = $.map( this.imageDataArray, function( imageData ) {
		return new ImageWithSuggestionsWidget({imageData: imageData});
	});

	this.addItems(imageWithSuggestionsWidgets);

	this.renderTemplate(
		'resources/widgets/ImageDepictsSuggestionsPanel.mustache+dom',
		this.$element,
		{
			labelTop: labelTop,
			imageWithSuggestionsWidgets: imageWithSuggestionsWidgets,
			labelBottom: labelBottom
		}
	);
};

module.exports = ImageDepictsSuggestionsPanel;
