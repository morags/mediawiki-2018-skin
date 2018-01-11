<?php
/**
 * SkinTemplate class for the 2018 skin
 *
 * @ingroup Skins
 */
class Skin2018 extends SkinTemplate {
	public $skinname = '2018', $stylename = '2018',
		$template = '2018Template', $useHeadElement = true;

	/**
	 * Add CSS via ResourceLoader
	 *
	 * @param $out OutputPage
	 */
	public function initPage( OutputPage $out ) {

		$out->addMeta( 'viewport', 'width=device-width, initial-scale=1.0' );

		$out->addModuleStyles( array(
			'mediawiki.skinning.interface',
			'mediawiki.skinning.content.externallinks',
			'skins.2018'
		) );
		$out->addModules( array(
			'skins.2018.js'
		) );
	}

	/**
	 * @param $out OutputPage
	 */
	function setupSkinUserCss( OutputPage $out ) {
		parent::setupSkinUserCss( $out );
	}
}
