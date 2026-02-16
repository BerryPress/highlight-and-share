<?php
/**
 * Headlines feature: share section headings via link icon and share menu.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Class Headlines
 */
class Headlines {

	/**
	 * Option key for headlines options.
	 *
	 * @var string
	 */
	const OPTION_KEY = 'highlight-and-share-headline-options';

	/**
	 * Class runner.
	 */
	public static function run() {
		$instance = new self();
		$instance->init();
	}

	/**
	 * Initialize hooks.
	 */
	public function init() {
		// AJAX handlers for admin tab.
		add_action( 'wp_ajax_has_load_headlines_tab', array( $this, 'ajax_load_headlines_tab' ) );
		add_action( 'wp_ajax_has_save_headlines_tab', array( $this, 'ajax_save_headlines_tab' ) );
		add_action( 'wp_ajax_has_reset_headlines_tab', array( $this, 'ajax_reset_headlines_tab' ) );

		// Content filter for ID generation and data-attributes (when feature enabled).
		add_filter( 'the_content', array( $this, 'process_headlines_content' ), 100 );
	}

	/**
	 * Process content for headlines: add IDs to headings and data-has-headline-share.
	 * Only runs when enable_headlines and auto_generate_ids are on.
	 *
	 * @param string $content Post content.
	 * @return string Filtered content.
	 */
	public function process_headlines_content( $content ) {
		$options = Options::get_headlines_options();
		if ( empty( $options['enable_headlines'] ) || empty( $options['auto_generate_ids'] ) ) {
			return $content;
		}

		// Stub: full ID generation and data-attribute injection will be implemented later.
		return $content;
	}

	/**
	 * Load headlines tab data via AJAX.
	 */
	public function ajax_load_headlines_tab() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_load_headlines_tab' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Security check failed', 'highlight-and-share' ) ) );
		}

		$options = Options::get_headlines_options( true );
		$values  = $this->map_defaults_to_js( stripslashes_deep( $options ) );

		wp_send_json_success( array( 'values' => $values ) );
	}

	/**
	 * Save headlines tab data via AJAX.
	 */
	public function ajax_save_headlines_tab() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_save_headlines_tab' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Security check failed', 'highlight-and-share' ) ) );
		}

		$form_data = filter_input( INPUT_POST, 'form_data', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );
		if ( empty( $form_data ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid form data', 'highlight-and-share' ) ) );
		}

		$form_data = Functions::to_underlines_recursive( $form_data );
		$form_data = Functions::sanitize_array_recursive( $form_data );
		$existing  = Options::get_headlines_options( true );
		$settings  = array_replace_recursive( $existing, $form_data );

		// Enforce max 4 networks. Copy and Webshare (locked) count toward limit.
		$social_defaults = isset( $settings['social_defaults'] ) ? $settings['social_defaults'] : array();
		$enabled_count   = 0;
		foreach ( $social_defaults as $slug => &$net ) {
			if ( ! empty( $net['enabled'] ) ) {
				$enabled_count++;
			}
		}
		unset( $net );
		$max = 4;
		if ( $enabled_count > $max ) {
			$to_disable = $enabled_count - $max;
			// Disable non-locked networks from the end of the list.
			$slugs = array_reverse( array_keys( $social_defaults ) );
			foreach ( $slugs as $slug ) {
				if ( $to_disable <= 0 ) {
					break;
				}
				$net = &$social_defaults[ $slug ];
				if ( ! empty( $net['locked'] ) ) {
					continue;
				}
				if ( ! empty( $net['enabled'] ) ) {
					$net['enabled'] = false;
					$to_disable--;
				}
			}
			unset( $net );
			$settings['social_defaults'] = $social_defaults;
		}

		update_option( self::OPTION_KEY, $settings );

		$fresh  = Options::get_headlines_options( true );
		$values = $this->map_defaults_to_js( stripslashes_deep( $fresh ) );

		wp_send_json_success( array( 'values' => $values ) );
	}

	/**
	 * Reset headlines tab to defaults via AJAX.
	 */
	public function ajax_reset_headlines_tab() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_reset_headlines_tab' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Security check failed', 'highlight-and-share' ) ) );
		}

		$defaults = Options::get_headlines_defaults();
		update_option( self::OPTION_KEY, $defaults );

		$values = $this->map_defaults_to_js( stripslashes_deep( $defaults ) );

		wp_send_json_success( array( 'values' => $values ) );
	}

	/**
	 * Map PHP snake_case keys to JS camelCase for form consumption.
	 *
	 * @param array $options Array of options.
	 * @return array Mapped options.
	 */
	private function map_defaults_to_js( $options ) {
		return Functions::to_camelcase_recursive( $options );
	}
}
