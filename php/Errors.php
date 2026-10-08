<?php
/**
 * Helper functions for the plugin.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Errors
 */
class Errors {

	/**
	 * Highlight and Share Errors
	 *
	 * @var array $errors Highlight and Share errors.
	 */
	private static $errors = false;

	/**
	 * Class constructor. Initialize errors.
	 */
	public function _construct() {
		// Get errors for email.
		self::$errors['could_not_send'] = esc_html__( 'Could not send the e-mail', 'highlight-and-share' );
		self::$errors['invalid_email']  = esc_html__( 'Not a valid e-mail address', 'highlight-and-share' );
		self::$errors['email_sent']     = esc_html__( 'Your email has been sent', 'highlight-and-share' );
		self::$errors['nonce_invalid']  = esc_html__( 'Could not process your request', 'highlight-and-share' );
		self::$errors['name']           = esc_html__( 'You must supply a name', 'highlight-and-share' );
	}

	/**
	 * Class runner.
	 */
	public function run() {
	}

	/**
	 * Get an error message
	 *
	 * Get an error message based on a passed key
	 *
	 * @since 6.0.0
	 * @access public
	 *
	 * @param  string $key Key to retrieve.
	 * @return string key value
	 */
	public static function get_error( $key ) {
		if ( isset( self::$errors[ $key ] ) ) {
			return self::$errors[ $key ];
		} else {
			return '';
		}
	}
}
