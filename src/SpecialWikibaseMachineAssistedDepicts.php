<?php
namespace MediaWiki\Extension\WikibaseMachineAssistedDepicts;

//echo phpinfo();

class SpecialWikibaseMachineAssistedDepicts extends \SpecialPage {
	function __construct() {
		parent::__construct( 'WikibaseMachineAssistedDepicts' );
	}

	function execute( $par ) {
		$request = $this->getRequest();
		$output = $this->getOutput();
		$this->setHeaders();
		// $out->addModuleStyles( $moduleStyles );
		$moduleID = 'ext.WikibaseMachineAssistedDepicts';
 		$this->getOutput()->addJsConfigVars( [ 'moduleID' => $moduleID ] );
		$this->getOutput()->addModules( [ $moduleID ] );
	}
}
