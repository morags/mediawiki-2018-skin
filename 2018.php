<?php
/**
 * This PHP entry point is deprecated. Please use wfLoadSkin() and the skin.json file
 * instead. See https://www.mediawiki.org/wiki/Manual:Extension_registration for more details.
 */
if ( !function_exists( 'wfLoadSkin' ) ) {
	die( 'The 2018 skin requires MediaWiki 1.25 or newer.' );
}

wfLoadSkin( '2018' );
