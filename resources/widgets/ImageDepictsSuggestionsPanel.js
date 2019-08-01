'use strict';

var TemplateRenderingDOMLessGroupWidget = require( './../base/TemplateRenderingDOMLessGroupWidget.js' );
var ImageWithSuggestionsWidget = require( './ImageWithSuggestionsWidget.js' );
var	ImageDepictsSuggestionsPanel = function WikibaseMachineAssistedDepictsImageDepictsSuggestionsPanel( config ) {
	config = config || {};
	ImageDepictsSuggestionsPanel.parent.call( this, $.extend( {}, config ) );

	this.labelTop = config.labelTop;
	this.labelBottom = config.labelBottom;
	this.imageDataArray = config.imageDataArray;

	this.render();
};
OO.inheritClass( ImageDepictsSuggestionsPanel, TemplateRenderingDOMLessGroupWidget );

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
		{
			labelTop: labelTop,
			imageWithSuggestionsWidgets: imageWithSuggestionsWidgets,
			labelBottom: labelBottom
		}
	);
};

module.exports = ImageDepictsSuggestionsPanel;
