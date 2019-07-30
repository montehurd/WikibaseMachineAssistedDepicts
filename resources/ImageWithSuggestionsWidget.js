'use strict';

var DOMLessGroupWidget = require( 'wikibase.mediainfo.base' ).DOMLessGroupWidget;
var SuggestionWidget = require( './SuggestionWidget.js' );

var	ImageWithSuggestionsWidget = function WikibaseMachineAssistedDepictsImageWithSuggestionsWidget( config ) {
		config = config || {};

		this.thumburl = config.data.thumburl;
		this.description = config.data.description;
		this.suggestions = config.data.suggestions;

		ImageWithSuggestionsWidget.parent.call( this, $.extend( {}, config ) );
		DOMLessGroupWidget.call( this, $.extend( {}, config ) );





		// this.connect( this, { choose123: 'choose456' } );
		// this.connect( this, { choose123: [ 'choose123', this ] } );


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
		alert(this.thumburl + ' === ' + suggestionWidget.suggestion.text);
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
		label: this.description,
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


// var addHandler = function(suggestion) {
// 	alert(this + ' ' + suggestion.text );
// };




	var suggestionsWidgets = $.map( this.suggestions, function( suggestion ) {
		return new SuggestionWidget({suggestion: suggestion/*, addHandler: addHandler*/});
	});



this.addItems(suggestionsWidgets);


	data = {
		imageDescriptionLabel: imageDescriptionLabel,
		suggestions: suggestionsWidgets,
		thumburl: this.thumburl,
		buttonConfirmAll: buttonConfirmAll,
		buttonRejectAll: buttonRejectAll,
		buttonFinish: buttonFinish
	};

	// Render ItemWidget template
	$container = template.render( data );





	// this.on( 'choose123', function ( data ) {
	// 		alert('heya');
	// } );



	// $container.find( '#test987' ).on( 'click', alert( 'next-step' ) );



// alert($container.find( '#suggestionWidget' ).length);
	// var ui = this;
	// $container.find( '#suggestionWidget' )[0].on( 'click', ui.emit( 'next-step' ) );

	// this.on( 'click', function () {
	// 	alert('boop!');
	// } );








	this.$element.empty().append( $container );
};







// ImageWithSuggestionsWidget.prototype.addLanguageInput = function () {
// 	alert('wa');
// }



/*
this.ui.on( 'next-step', function () {
	step.moveNext();
} );


this.nextButton = new OO.ui.ButtonWidget( {
	classes: [ 'mwe-upwiz-button-next' ],
	label: mw.message( 'mwe-upwiz-next' ).text(),
	flags: [ 'progressive', 'primary' ]
} ).on( 'click', function () {
	ui.emit( 'next-step' );
} );
*/




//class="suggestionWidget"
//
// <div id="suggestionsAvailable">
// <div id="suggestionsChosen">
//




module.exports = ImageWithSuggestionsWidget;
