<?php
/**
 * Set up helper functions for Adobe Fonts.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Helper class for registering Adobe Fonts.
 */
class Adobe_Fonts {

	/**
	 * Typekit CSS URL.
	 *
	 * @var string The typekit CSS URL.
	 */
	public static $typekit_css_url = 'https://use.typekit.net/';

	/**
	 * Determine if we've already prefetched adobe fonts.
	 *
	 * @var bool $has_prefetched true if fetched, false if not.
	 */
	private static $has_prefetched = false;
	/**
	 * Main class runner.
	 *
	 * @return Ajax.
	 */
	public static function run() {
		$self = new self();

		// For saving/resetting the default options.
		add_action( 'wp_ajax_has_retrieve_remote_adobe_fonts', array( static::class, 'ajax_retrieve_remote_adobe_fonts' ) );
		add_action( 'wp_ajax_has_save_remote_adobe_fonts', array( static::class, 'ajax_retrieve_remote_adobe_fonts' ) );

		add_action( 'wp_head', array( static::class, 'add_dns_prefetch' ), 1 );
		add_action( 'wp_enqueue_scripts', array( static::class, 'enqueue_adobe_fonts' ) );
		add_action( 'admin_head', array( static::class, 'add_dns_prefetch' ), 1 );
		add_action( 'admin_enqueue_scripts', array( static::class, 'enqueue_adobe_fonts' ) );

		return $self;
	}

	/**
	 * Check to see if we need to load the Adobe Fonts.
	 *
	 * @param string $location Can be frontend or admin.
	 *
	 * @return bool True if we can load the Adobe Fonts.
	 */
	public static function can_enqueue( $location = 'frontend' ) {
		if ( ! Functions::is_adobe_fonts_enabled() ) {
			return false;
		}

		// Check admin if we're in the block editor.
		global $post;
		if ( is_admin() && ( isset( $post->post_content ) ) && 'admin' === $location ) {
			return true;
		}

		// Check frontend if we're on the frontend of the site and an adobe font is present.
		if ( ! is_admin() && ( isset( $post->post_content ) ) && 'frontend' === $location ) {
			$blocks      = parse_blocks( $post->post_content );
			$block_fonts = Functions::get_block_fonts( $blocks );
			foreach ( $block_fonts as $block_font ) {
				if ( 'adobe' === $block_font['fontType'] ) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Adds DNS prefetch for the typekit CSS URL.
	 */
	public static function add_dns_prefetch() {
		if ( self::$has_prefetched ) {
			return;
		}
		if ( ! self::can_enqueue( 'frontend' ) && ! self::can_enqueue( 'admin' ) ) {
			return;
		}
		$typekit_css_url = rtrim( self::$typekit_css_url, '/' );
		echo '<link rel="dns-prefetch" href="' . esc_url( $typekit_css_url ) . '">';
		echo '<link rel="preconnect" href="' . esc_url( $typekit_css_url ) . '" crossorigin="anonymous">';

		$preload_url = self::get_adobe_fonts_url();
		if ( ! empty( $preload_url ) ) {
			echo '<link rel="preload" href="' . esc_url( $preload_url ) . '" crossorigin="anonymous" as="font">';
		}
		self::$has_prefetched = true;
	}

	/**
	 * Enqueue adobe font scripts based on project id.
	 *
	 * @param string $project_id The project id.
	 */
	public static function enqueue_adobe_fonts( $project_id = '' ) {
		if ( ! self::can_enqueue( 'frontend' ) && ! self::can_enqueue( 'admin' ) ) {
			return;
		}
		$adobe_fonts_url = '';
		// Retrieve project ID if empty.
		if ( empty( $project_id ) ) {
			$adobe_fonts_url = self::get_adobe_fonts_url();
		}
		// If still empty, return.
		if ( empty( $adobe_fonts_url ) ) {
			return;
		}

		wp_enqueue_style(
			'has-adobe-fonts',
			esc_url(
				$adobe_fonts_url
			),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
	}

	/**
	 * Get the URL to adobe fonts with passed project ID.
	 *
	 * @return string URL for adobe fonts with project ID.
	 */
	public static function get_adobe_fonts_url() {
		// Retrieve project ID if empty.
		$options    = Options::get_plugin_options( true );
		$project_id = $options['adobe_project_id'];
		// If still empty, return.
		if ( empty( $project_id ) ) {
			return '';
		}

		$adobe_fonts_url = sprintf(
			'%s%s.css',
			self::$typekit_css_url,
			$project_id
		);

		return $adobe_fonts_url;
	}

	/**
	 * Get registered Adobe Fonts.
	 *
	 * @param string $project_id Adobe project ID.
	 *
	 * @return array|WP_Error Registered Adobe Fonts or WP_Error on failure.
	 */
	public static function get_adobe_fonts( $project_id ) {
		$project_id = sanitize_text_field( $project_id );

		$adobe_fonts_url = 'https://typekit.com/api/v1/json/kits/' . $project_id . '/published';

		$response = wp_remote_get(
			esc_url( $adobe_fonts_url ),
			array(
				'timeout' => '30',
			)
		);

		// Make sure there is no error and we've received a valid status code.
		if ( is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) !== 200 ) {
			return new \WP_Error( 'has_adobe_fonts_error', __( 'Could not connect to the Adobe Fonts API. The project ID may be incorrect.', 'highlight-and-share' ) );
		}

		$font_data     = json_decode( wp_remote_retrieve_body( $response ), true );
		$font_families = $font_data['kit']['families'] ?? false;

		// Make sure we have font families.
		if ( ! $font_families ) {
			return new \WP_Error( 'has_adobe_fonts_error', __( 'There appears to be no fonts for the project ID.', 'highlight-and-share' ) );
		}

		// Now interate over the fonts.
		$fonts = array();
		foreach ( $font_families as $font_family ) {
			// Retrieve fallback CSS.
			$fallback       = $font_family['css_stack'];
			$fallback_regex = '/,(.*+)$/';
			$fallback_css   = '';
			preg_match( $fallback_regex, $fallback, $matches );
			if ( $matches && isset( $matches[1] ) ) {
				$fallback_css = $matches[1];
			}
			$fonts[] = array(
				'name'     => sanitize_text_field( $font_family['name'] ),
				'slug'     => sanitize_text_field( $font_family['slug'] ),
				'family'   => sanitize_text_field( current( $font_family['css_names'] ) ),
				'fallback' => sanitize_text_field( $fallback_css ),
				'type'     => 'adobe',
			);
		}
		return $fonts;
	}

	/**
	 * Retrieve the theme size options.
	 */
	public static function ajax_retrieve_remote_adobe_fonts() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_save_block_editor' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array() );
		}

		// Get the project/kit ID.
		$project_id = sanitize_text_field( filter_input( INPUT_POST, 'project_id', FILTER_DEFAULT ) );

		// Get project fonts.
		$fonts = self::get_adobe_fonts( $project_id );
		if ( is_wp_error( $fonts ) ) {
			wp_send_json_error( $fonts );
		}

		// Retrieve options and add fonts.
		$options                     = Options::get_plugin_options( true );
		$options['adobe_fonts']      = $fonts;
		$options['adobe_project_id'] = $project_id;
		update_option( 'highlight-and-share-block-editor-options', $options );

		wp_send_json_success( $fonts );
	}
}
