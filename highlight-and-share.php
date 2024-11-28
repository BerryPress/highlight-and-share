<?php // phpcs:ignore

/*
 * Plugin Name: Highlight and Share
 * Plugin URI: https://dlxplugins.com/plugins/highlight-and-share/
 * Description: Select text, inline highlight, or use a Click to Share block and show social networks.
 * Author: DLX Plugins
 * Version: 5.0.2
 * Requires at least: 5.1
 * Requires PHP: 7.2
 * Author URI: https://dlxplugins.com/plugins/highlight-and-share/
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: highlight-and-share
 * Contributors: ronalfy
 */

namespace DLXPlugins\HAS;

define( 'HIGHLIGHT_AND_SHARE_VERSION', '5.0.2' );
define( 'HIGHLIGHT_AND_SHARE_FILE', __FILE__ );

// Support for site-level autoloading.
if ( file_exists( __DIR__ . '/lib/autoload.php' ) ) {
	require_once __DIR__ . '/lib/autoload.php';
}

/**
 * Highlight and Share Main Class
 */
class Highlight_And_Share {
	/**
	 * Highlight and Share instance.
	 *
	 * @var Highlight_And_Share $instance Instance of Highlight and Share class.
	 */
	private static $instance = null;

	/**
	 * Return an instance of the class
	 *
	 * Return an instance of the Highlight and Share Class.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return Highlight_And_Share class instance.
	 */
	public static function get_instance() {
		if ( null == self::$instance ) { // phpcs:ignore
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Class constructor.
	 *
	 * Initialize plugin and load text domain for internationalization
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function __construct() {

		// For the icons on older version of HAS.
		$this->maybe_migrate_icons();

		// Set up init action to load the plugin.
		add_action( 'init', array( $this, 'init' ) );
	}

	/**
	 * Initialize the plugin.
	 *
	 * Load the plugin text domain for translation.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function init() {
		// i18n initialization.
		load_plugin_textdomain( 'highlight-and-share', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
	}

	/**
	 * Migrates icon variable to be positive
	 *
	 * Migrates icon variable to be positive
	 *
	 * @since 2.4.0
	 * @access public
	 */
	private function maybe_migrate_icons() {
		$migrated_option = get_option( 'has_icons_migrated', false );
		if ( false === $migrated_option ) {
			$options = get_option( 'highlight-and-share', false );
			if ( false !== $options && isset( $options['icons'] ) && false === $options['icons'] ) {
				$options['icons'] = true;
				update_option( 'highlight-and-share', $options );
				$this->options = $options;
				update_option( 'has_icons_migrated', 'true' );
			}
		}
	}
}

add_action( 'plugins_loaded', 'DLXPlugins\HAS\highlightshare_instantiate' );
/**
 * Instantiate the HAS class.
 */
function highlightshare_instantiate() {
	Highlight_And_Share::get_instance();

	// Gutenberg block.
	$blocks = new Blocks();
	$blocks->run();

	// Init admin panel settings.
	$admin_panel = new Admin();
	$admin_panel->run();

	// Register hashtags taxonomy.
	$hashtags = new Hashtags();
	$hashtags->run();

	// Frontend scripts/actions.
	$frontend = new Frontend();
	$frontend->run();

	// Errors.
	$errors = new Errors();
	$errors->run();

	// Emails.
	$emails = new Emails();
	$emails->run();

	// Adobe fonts.
	$adobe_fonts = new Adobe_Fonts();
	$adobe_fonts->run();

	// Adobe fonts.
	$block_presets = new Presets();
	$block_presets->run();
}
