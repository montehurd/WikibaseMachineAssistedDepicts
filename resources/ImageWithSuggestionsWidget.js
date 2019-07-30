'use strict';

var DOMLessGroupWidget = require( 'wikibase.mediainfo.base' ).DOMLessGroupWidget;
var SuggestionWidget = require( './SuggestionWidget.js' );
var	ImageWithSuggestionsWidget = function WikibaseMachineAssistedDepictsImageWithSuggestionsWidget( config ) {
	config = config || {};

	this.imageData = config.imageData;

	ImageWithSuggestionsWidget.parent.call( this, $.extend( {}, config ) );
	DOMLessGroupWidget.call( this, $.extend( {}, config ) );

	this.aggregate( {
		add: 'itemAdd'
	} );

	this.connect( this, {
		itemAdd: 'onItemAdd'
	} );

	this.render();
};
OO.inheritClass( ImageWithSuggestionsWidget, OO.ui.Widget );
OO.mixinClass( ImageWithSuggestionsWidget, DOMLessGroupWidget );

ImageWithSuggestionsWidget.prototype.onItemAdd = function (suggestionWidget) {
	alert(this.imageData.thumburl + ' \n\n ' + suggestionWidget.suggestionData.text);
};

ImageWithSuggestionsWidget.prototype.render = function () {
	var imageDescriptionLabel,
		template,
		data,
		buttonConfirmAll,
		buttonRejectAll,
		buttonFinish,
		$container;

	imageDescriptionLabel = new OO.ui.LabelWidget( {
		label: this.imageData.description,
		classes: [ 'todo-info' ]
	} );

	buttonConfirmAll = new OO.ui.ButtonWidget( {
		classes: [ 'wbmi-item-remove' ],
		label: 'confirm all' // mw.message( 'wikibasemachineassisteddepicts-summary' ).text()
	} );

	buttonRejectAll = new OO.ui.ButtonWidget( {
		classes: [ 'wbmi-item-remove' ],
		label: 'reject all' // mw.message( 'wikibasemachineassisteddepicts-summary' ).text()
	} );

	buttonFinish = new OO.ui.ButtonWidget( {
		classes: [ 'wbmi-item-remove' ],
		label: 'finish' // mw.message( 'wikibasemachineassisteddepicts-summary' ).text()
	} );

	template = mw.template.get(
		'ext.WikibaseMachineAssistedDepicts',
		'templates/ImageWithSuggestionsWidget.mustache+dom'
	);

	var suggestionsWidgets = $.map( this.imageData.suggestions, function( suggestionData ) {
		return new SuggestionWidget({suggestionData: suggestionData});
	});

	this.addItems(suggestionsWidgets);

	data = {
		imageDescriptionLabel: imageDescriptionLabel,
		suggestions: suggestionsWidgets,
		thumburl: this.imageData.thumburl,
		buttonConfirmAll: buttonConfirmAll,
		buttonRejectAll: buttonRejectAll,
		buttonFinish: buttonFinish
	};

	$container = template.render( data );

	this.$element.empty().append( $container );
};

module.exports = ImageWithSuggestionsWidget;
