'use strict';

var TemplateRenderingDOMLessGroupWidget = require( './../base/TemplateRenderingDOMLessGroupWidget.js' );
var ImageWithSuggestionsWidget = require( './ImageWithSuggestionsWidget.js' );

var	ImageDepictsSuggestionsPanel = function WikibaseMachineAssistedDepictsImageDepictsSuggestionsPanel( config ) {
	ImageDepictsSuggestionsPanel.parent.call( this, $.extend( {}, config ) );
	this.$element.addClass('wbmad-image-depicts-suggestions');
	this.imageDataArray = config.imageDataArray;
	this.render();
};
OO.inheritClass( ImageDepictsSuggestionsPanel, TemplateRenderingDOMLessGroupWidget );

ImageDepictsSuggestionsPanel.prototype.getImageWithSuggestionsWidgetForImageData = function ( imageData ) {
	return new ImageWithSuggestionsWidget({
		imageData: imageData
	});
};

ImageDepictsSuggestionsPanel.prototype.render = function () {
	var imageWithSuggestionsWidgets = $.map( this.imageDataArray, this.getImageWithSuggestionsWidgetForImageData.bind( this ));
	this.addItems(imageWithSuggestionsWidgets);
	this.renderTemplate(
		'resources/widgets/ImageDepictsSuggestionsPanel.mustache+dom',
		{
			imageWithSuggestionsWidgets: imageWithSuggestionsWidgets
		}
	);
};

module.exports = ImageDepictsSuggestionsPanel;
