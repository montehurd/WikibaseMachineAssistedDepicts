'use strict';

var	TemplateRenderer = function WikibaseMachineAssistedDepictsTemplateRenderer() {
};

TemplateRenderer.prototype.renderTemplate = function (templatePath, element, data) {
	element
		.empty()
		.append(
			mw.template
			.get( mw.config.get( 'moduleID' ), templatePath )
			.render( data )
		);
};

module.exports = TemplateRenderer;
