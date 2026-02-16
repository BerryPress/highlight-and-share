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

		// Frontend: enqueue headline link-icon CSS and body class for link_icon_always_visible.
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_headlines_styles' ), 10 );
		add_filter( 'body_class', array( $this, 'body_class_headlines' ), 10 );
	}

	/**
	 * Whether headlines may run on this request (enabled, singular, supported post type).
	 * Used for content processing, enqueue, and body class.
	 *
	 * @return bool True if headlines can run.
	 */
	private function can_parse_headlines() {
		if ( is_feed() ) {
			return false;
		}
		$options = Options::get_headlines_options();
		if ( empty( $options['enable_headlines'] ) ) {
			return false;
		}
		if ( ! is_singular() ) {
			return false;
		}
		$supported      = isset( $options['supported_post_types'] ) && is_array( $options['supported_post_types'] )
			? array_keys( array_filter( $options['supported_post_types'] ) )
			: array( 'post' );
		$global_enabled = in_array( get_post_type(), $supported, true );

		/**
		 * Filter: has_headlines_enabled_for_post
		 *
		 * Per-post override (sidebar / meta box): disabled, default, or enabled.
		 *
		 * @param bool $enabled Global headlines enabled state for this context.
		 * @param int  $post_id Current post ID.
		 * @return bool Whether headlines should run for this post.
		 */
		return (bool) apply_filters( 'has_headlines_enabled_for_post', $global_enabled, get_the_ID() );
	}

	/**
	 * Process content for headlines: add IDs to headings (when enabled) and data-has-headline-share.
	 * Only runs when enable_headlines is on and post type is supported.
	 *
	 * @param string $content Post content.
	 * @return string Filtered content.
	 */
	public function process_headlines_content( $content ) {
		if ( ! $this->can_parse_headlines() ) {
			return $content;
		}
		$options = Options::get_headlines_options();
		if ( ! empty( $options['auto_generate_ids'] ) ) {
			$content = Headlines_Helper::add_ids_to_headings( $content, $options );
		}

		$only_with_id = empty( $options['auto_generate_ids'] );
		$content      = Headlines_Helper::add_data_attributes( $content, $options, $only_with_id );

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
				++$enabled_count;
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
					--$to_disable;
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
	 * Enqueue frontend headline link-icon styles and headline-sharing script when the feature is enabled.
	 */
	public function enqueue_headlines_styles() {
		if ( ! $this->can_parse_headlines() ) {
			return;
		}
		$plugin_url = Functions::get_plugin_url( 'dist/has-headlines.css' );
		$version    = defined( 'HIGHLIGHT_AND_SHARE_VERSION' ) ? HIGHLIGHT_AND_SHARE_VERSION : false;
		wp_enqueue_style(
			'has-headlines',
			$plugin_url,
			array(),
			$version
		);

		wp_enqueue_script(
			'has-headline-sharing',
			Functions::get_plugin_url( 'dist/has-headline-sharing.js' ),
			array(),
			$version,
			true
		);
		wp_localize_script( 'has-headline-sharing', 'hasHeadlineSharing', $this->get_headline_share_config() );
	}

	/**
	 * Build config for headline-sharing.js: page URL/title, prefix/suffix, and enabled networks (slug, label, shareUrlTemplate, requiresPopup).
	 *
	 * @return array Config for hasHeadlineSharing.
	 */
	private function get_headline_share_config() {
		global $post;
		$page_url   = is_singular() && $post ? get_permalink( $post ) : '';
		$page_title = is_singular() && $post ? get_the_title( $post ) : '';
		$settings   = Options::get_plugin_options();
		$prefix     = isset( $settings['sharing_prefix'] ) ? stripslashes( sanitize_text_field( $settings['sharing_prefix'] ) ) : '';
		$suffix     = isset( $settings['sharing_suffix'] ) ? stripslashes( sanitize_text_field( $settings['sharing_suffix'] ) ) : '';
		$twitter    = isset( $settings['twitter'] ) ? trim( sanitize_text_field( $settings['twitter'] ) ) : '';

		$headline_options = Options::get_headlines_options();
		$network_order    = isset( $headline_options['network_order'] ) && is_array( $headline_options['network_order'] )
			? $headline_options['network_order']
			: array();
		$social_defaults  = isset( $headline_options['social_defaults'] ) && is_array( $headline_options['social_defaults'] )
			? $headline_options['social_defaults']
			: array();
		$all_networks     = Options::get_social_network_defaults();
		$networks         = array();
		$max              = 4;
		$count            = 0;
		foreach ( $network_order as $slug ) {
			if ( $count >= $max ) {
				break;
			}
			if ( empty( $social_defaults[ $slug ]['enabled'] ) || empty( $all_networks[ $slug ] ) ) {
				continue;
			}
			$label      = isset( $social_defaults[ $slug ]['label'] ) ? $social_defaults[ $slug ]['label'] : ( $all_networks[ $slug ]['label_text'] ?? $slug );
			$template   = isset( $all_networks[ $slug ]['share_url_template'] ) ? $all_networks[ $slug ]['share_url_template'] : '#';
			$template   = (string) apply_filters( 'has_headline_share_url_template', $template, $slug );
			$networks[] = array(
				'slug'             => $slug,
				'label'            => $label,
				'shareUrlTemplate' => $template,
				'requiresPopup'    => ! empty( $all_networks[ $slug ]['requires_popup'] ),
			);
			++$count;
		}

		return array(
			'pageUrl'         => $page_url,
			'pageTitle'       => $page_title,
			'prefix'          => $prefix,
			'suffix'          => $suffix,
			'twitterUsername' => $twitter,
			'networks'        => $networks,
		);
	}

	/**
	 * Add body class when "Link icon always visible" is enabled (for headline ::after CSS).
	 *
	 * @param array $classes Existing body classes.
	 * @return array Modified body classes.
	 */
	public function body_class_headlines( $classes ) {
		if ( ! $this->can_parse_headlines() ) {
			return $classes;
		}
		$options = Options::get_headlines_options();
		if ( ! empty( $options['link_icon_always_visible'] ) ) {
			$classes[] = 'has-headline-link-icon-always-visible';
		}
		return $classes;
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
