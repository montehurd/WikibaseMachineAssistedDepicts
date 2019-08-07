'use strict';

var TemplateRenderingDOMLessGroupWidget = require( './../base/TemplateRenderingDOMLessGroupWidget.js' );
var ImageWithSuggestionsWidget = require( './ImageWithSuggestionsWidget.js' );

var	ImageDepictsSuggestionsPage = function WikibaseMachineAssistedDepictsImageDepictsSuggestionsPage( config ) {
	ImageDepictsSuggestionsPage.parent.call( this, $.extend( {}, config ) );
	this.$element.addClass('wbmad-image-depicts-suggestions-page');
	this.imageDataArray = config.imageDataArray;
	this.render();
};
OO.inheritClass( ImageDepictsSuggestionsPage, TemplateRenderingDOMLessGroupWidget );

var getImageWithSuggestionsWidgetForImageData = function ( imageData ) {
	return new ImageWithSuggestionsWidget({
		imageData: imageData
	});
};

ImageDepictsSuggestionsPage.prototype.render = function () {
	var imageWithSuggestionsWidgets = $.map( this.imageDataArray, getImageWithSuggestionsWidgetForImageData );
	this.addItems(imageWithSuggestionsWidgets);
	this.renderTemplate(
		'resources/widgets/ImageDepictsSuggestionsPage.mustache+dom',
		{
			imageWithSuggestionsWidgets: imageWithSuggestionsWidgets
		}
	);
};

module.exports = ImageDepictsSuggestionsPage;
