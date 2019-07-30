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

/*
		$username = $request->getText( 'username' );
		$output->addWikiTextAsInterface( $username );


		$output->addWikiTextAsInterface( $request->getText( 'password' ) );
		$output->addWikiTextAsInterface( $request->getCheck( 'rememberme' ) );


		$mayDepict = ['goat', 'horse', 'fish'];

		$buttons = array_map( function ( $value, $key ) {
			return new \OOUI\FieldLayout(
				new \OOUI\TextInputWidget( [
					'name' => 'depicts',
					'value' => "$value $key",
				] ),
				[
					'label' => 'Depicts',
					'align' => 'top',
				]
			);
			}, $mayDepict, array_keys($mayDepict) );




//		$linky = \SpecialPage::getTitleFor('PasswordReset') ->getLinkURL();
//		$wikitext = "Hello ''world''! $linky";
//		$output->addWikiTextAsInterface( $wikitext );



		$this->getOutput()->enableOOUI();
		$this->getOutput()->addModuleStyles( [ 'oojs-ui.styles.icons-moderation' ] );
*/



//		$button = new \OOUI\ButtonWidget([
//			"name" => "mwpage-username",
//			"classes" => ["mwpage-button"],
//			"label" => "Go to reset password page",
//			"href" => \SpecialPage::getTitleFor('PasswordReset') ->getLinkURL()
//		]);
//		$this->getOutput()->addHTML( "<div>$button</div>" );




/*

		$items = [
			new \OOUI\FieldsetLayout( [
				'label' => 'Form layout',
				'items' => [
					new \OOUI\FieldLayout(
						new \OOUI\TextInputWidget( [
							'name' => 'username',
							'value' => $username,
						] ),
						[
							'label' => 'User name',
							'align' => 'top',
						]
					),
					new \OOUI\FieldLayout(
						new \OOUI\TextInputWidget( [
							'name' => 'password',
							'type' => 'password',
						] ),
						[
							'label' => 'Password',
							'align' => 'top',
						]
					),
					new \OOUI\FieldLayout(
						new \OOUI\CheckboxInputWidget( [
							'name' => 'rememberme',
							'selected' => true,
						] ),
						[
							'label' => 'Remember me',
							'align' => 'inline',
						]
					),
					new \OOUI\FieldLayout(
						new \OOUI\ButtonInputWidget( [
							'name' => 'login',
							'label' => 'Log in',
							'type' => 'submit',
							'flags' => [ 'primary', 'progressive' ],
							'icon' => 'check',
						] ),
						[
							'label' => null,
							'align' => 'top',
						]
					),
//					new OOUI\IconWidget(
//						[
//							'icon' => 'block',
//							'classes' => [ 'flaggedrevs-icon' ],
//							'title' => 'Block',
//						]
//					),
				]
			] )
		];






		$this->getOutput()->addHTML( new \OOUI\FormLayout( [
			'method' => 'POST',
			'action' => '',
			'items' => array_merge($items, $buttons)
		] ) );
*/


//		\OOUI\Element::setDefaultDir( 'rtl' );               // or: 'rtl'






/*

		$add = function (int $x, int $y) : int {
			return $x + $y;
		}; //takes two integer inputs, x and y
		echo $add(1, 2);


		$stringManip = function (callable $fn, string $str) {
			return $fn($str);
		};
		echo $stringManip("strtoupper", 'foo'); //should return FOO



		$stringManipTwo = function ($str) {
			return function ($fn) use ($str) {
				return $fn($str);
			};
		};
		echo $stringManipTwo('foo2')('strtoupper'); //should return FOO as well

*/




//		const USERNAME = 'Michael';
//		const USER_PREFERENCES = [
//			'favBasketballTeam' => 'Miami Heat',
//			'favMovieFranchise' => 'Star Wars'
//		];
//		const FOUR_FACTORIAL = 24; //integer
//		const PI = 3.14159;



//	echo $GLOBALS['wgTitle'].getText('');

// mediawiki.special.upload






//		$this->getOutput()->addModules( [
//			'ext.myExtensionFARTS'
//		] );




// $depictsSuggestions = [
// 	'fish',
// 	'goat',
// 	'horse',
// 	'potato',
// 	'cheese'
// ];
//
//
//
// //		$image = $_REQUEST['image'];
// //
// 		$image = 'cat.jpg';
// 		$this->getOutput()->addJsConfigVars( [ 'image' => $image, 'depictsSuggestions' => $depictsSuggestions ] );



//		$jsConfigVars = [
//			'beep' => 'boop'
//		];
//		$this->getOutput()->addJsConfigVars( $jsConfigVars );

//		$out->addModuleStyles( $moduleStyles );

// trigger for JS!
		$this->getOutput()->addModules( [ 'ext.WikibaseMachineAssistedDepicts' ] );



		// $this->getOutput()->addHTML( "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/2018_-_Замок_в_Чорнокозинцях.jpg/640px-2018_-_Замок_в_Чорнокозинцях.jpg'>" );












	}
}
