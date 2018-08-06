<?php
/**
 * SkinTemplate class for the 2018 skin
 *
 * @ingroup Skins
 */
class Skin2018 extends SkinTemplate {
	public $skinname = '2018';
	public $stylename = '2018';
	public $template = 'Skin2018Template';

	/**
	 * Add CSS via ResourceLoader
	 *
	 * @param $out OutputPage
	 */
	public function initPage( OutputPage $out ) {
		$out->addMeta( 'viewport', 'width=device-width, initial-scale=1.0' );

		$out->addModuleStyles( [
			// 'mediawiki.skinning.elements',
			// 'mediawiki.skinning.content',
			// 'mediawiki.skinning.interface',
			'mediawiki.skinning.content.externallinks',
			'skins.2018'
		 ] );
		$out->addModules( [
			'skins.2018.js'
		 ] );
	}

	/**
	 * @param $out OutputPage
	 */
	function setupSkinUserCss( OutputPage $out ) {
		parent::setupSkinUserCss( $out );
	}
}
