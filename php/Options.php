<?php
/**
 * Set up the blocks and their attributes.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Helper class for registering blocks.
 */
class Options {
	/**
	 * Highlight and Share Options
	 *
	 * @var array $options Highlight and Share options.
	 */
	private static $options = false;

	/**
	 * Highlight and Share email options.
	 *
	 * @var array $options Highlight and Share email options..
	 */
	private static $options_emails = false;

	/**
	 * Highlight and Share Social Networks.
	 *
	 * @var array $options Highlight and Share options.
	 */
	private static $options_social_networks = false;

	/**
	 * Highlight and Share Theme Options.
	 *
	 * @var array $options Highlight and Share theme options.
	 */
	private static $options_theme = false;

	/**
	 * Highlight and Share Block Editor Options.
	 *
	 * @var array $options_block_editor Highlight and Share Block Editor options.
	 */
	private static $options_block_editor = false;

	/**
	 * Highlight and Share Image Options.
	 *
	 * @var array $options_image Highlight and Share Image options.
	 */
	private static $options_image = false;

	/**
	 * Highlight and Share Options
	 *
	 * @var array $instance Highlight and Share options.
	 */
	private static $instance = false;
	/**
	 * Main class runner.
	 *
	 * @return Options.
	 */
	public static function run() {
		$self = new self();
		add_action( 'init', array( $self, 'register_block' ) );
		add_action( 'enqueue_block_editor_assets', array( $self, 'register_block_assets' ) );
		add_action( 'enqueue_block_assets', array( $self, 'enqueue_frontend_assets' ) );
		$self->instance = $self;
		return $self;
	}

	/**
	 * Get email setting options.
	 */
	public static function get_email_settings_defaults() {
		return array(
			'enable_logged_in_only'     => false,
			'akismet_enabled'           => true,
			'recaptcha_enabled'         => false,
			'recaptcha_site_key'        => '',
			'recaptcha_secret_key'      => '',
			'recaptcha_score_threshold' => 0.5,
			'from_name'                 => get_bloginfo( 'name' ),
			'from_email'                => get_bloginfo( 'admin_email' ),
			'email_send_type'           => 'form', // can be form|mailto.
			/* Translators: %1$s is the share type (highlight, quote, etc), %2$s is the site name. */
			'email_subject'             => sprintf( __( 'Check out this %1$s from %2$s', 'highlight-and-share' ), '{{share_type}}', '{{site_name}}' ),
			'email_body'                => _x( "{{from_name}} ({{from_email}}) wants to share a link with you\r\n\n{{share_text}}\r\n\r\n{{post_title}}\r\n{{post_url}}", 'email body with template tags', 'highlight-and-share' ),
			'email_modal_title'         => __( 'Share this {{share_type}}', 'highlight-and-share' ),
		);
	}

	/**
	 * Retrieve local networks from storage.
	 */
	public static function get_social_network_defaults() {
		$social_networks = array(
			'twitter'  => array(
				'label'      => __( 'Twitter', 'highlight-and-share' ),
				'slug'       => 'twitter',
				'color'      => '#000000',
				'background' => '#fff',
				'order'      => 0,
				'custom'     => false,
			),
			'facebook' => array(
				'label'      => __( 'Facebook', 'highlight-and-share' ),
				'slug'       => 'facebook',
				'color'      => '#3b5998',
				'background' => '#fff',
				'order'      => 1,
				'custom'     => false,
			),
			'whatsapp' => array(
				'label'      => __( 'WhatsApp', 'highlight-and-share' ),
				'slug'       => 'whatsapp',
				'color'      => '#25d366',
				'background' => '#fff',
				'order'      => 2,
				'custom'     => false,
			),
			'reddit'   => array(
				'label'      => __( 'reddit', 'highlight-and-share' ),
				'slug'       => 'reddit',
				'color'      => '#ff4500',
				'background' => '#fff',
				'order'      => 3,
				'custom'     => false,
			),
			'telegram' => array(
				'label'      => __( 'Telegram', 'highlight-and-share' ),
				'slug'       => 'telegram',
				'color'      => '#0088cc',
				'background' => '#fff',
				'order'      => 4,
				'custom'     => false,
			),
			'linkedin' => array(
				'label'      => __( 'LinkedIn', 'highlight-and-share' ),
				'slug'       => 'linkedin',
				'color'      => '#0077b5',
				'background' => '#fff',
				'order'      => 5,
				'custom'     => false,
			),
			'xing'     => array(
				'label'      => __( 'Xing', 'highlight-and-share' ),
				'slug'       => 'xing',
				'color'      => '#006567',
				'background' => '#fff',
				'order'      => 6,
				'custom'     => false,
			),
			'tumblr'   => array(
				'label'      => __( 'Tumblr', 'highlight-and-share' ),
				'slug'       => 'tumblr',
				'color'      => '#000000',
				'background' => '#fff',
				'order'      => 7,
				'custom'     => false,
			),
			'mastodon' => array(
				'label'      => __( 'Mastodon', 'highlight-and-share' ),
				'slug'       => 'mastodon',
				'color'      => '#605CF5',
				'background' => '#fff',
				'order'      => 8,
				'custom'     => false,
			),
			'copy'     => array(
				'label'      => __( 'Copy', 'highlight-and-share' ),
				'slug'       => 'copy',
				'color'      => '#000',
				'background' => '#fff',
				'order'      => 9,
				'custom'     => false,
			),
			'email'    => array(
				'label'      => __( 'Email', 'highlight-and-share' ),
				'slug'       => 'email',
				'color'      => '#000',
				'background' => '#fff',
				'order'      => 10,
				'custom'     => false,
			),
			'webshare' => array(
				'label'      => __( 'Share', 'highlight-and-share' ),
				'slug'       => 'webshare',
				'color'      => '#000',
				'background' => '#e17713',
				'order'      => 11,
				'custom'     => false,
			),
			'threads'  => array(
				'label'      => __( 'Threads', 'highlight-and-share' ),
				'slug'       => 'threads',
				'color'      => '#333',
				'background' => '#FFF',
				'order'      => 12,
				'custom'     => false,
			),
			'bluesky'  => array(
				'label'      => __( 'BlueSky', 'highlight-and-share' ),
				'slug'       => 'bluesky',
				'color'      => '#1285FE',
				'background' => '#F2F9FF',
				'order'      => 14,
				'custom'     => false,
			),
		);

		/**
		 * Filter the default social networks.
		 *
		 * @param $social_networks array The default social networks.
		 */
		$social_networks = apply_filters( 'has_social_network_defaults', $social_networks );
		return $social_networks;
	}

	/**
	 * Get Block Editor Defaults.
	 */
	public static function get_block_editor_defaults() {
		$defaults = array(
			'enable_blocks'                              => true,
			'enable_adobe_fonts'                         => false,
			'adobe_fonts'                                => array(),
			'adobe_project_id'                           => '',
			'enable_inline_highlighting'                 => true,
			'inline_highlight_background_color'          => '#ffefb1',
			'inline_highlight_background_color_hover'    => '#fcd63c',
			'inline_highlight_text_color'                => '#000000',
			'inline_highlight_text_color_hover'          => '#000000',
			'inline_highlight_tooltips_text'             => __( 'Click to Share This Highlight', 'highlight-and-share' ),
			'inline_highlight_show_tooltips'             => false,
			'inline_highlight_tooltips_text_color'       => '#FFFFFF',
			'inline_highlight_tooltips_background_color' => '#000000',

		);
		return $defaults;
	}

	/**
	 * Get default options for custom themes.
	 */
	public static function get_theme_defaults() {
		$defaults = array(
			'theme'                     => 'default',
			'icons_only'                => true, /* custom theme option */
			'orientation'               => 'horizontal',
			'show_tooltips'             => true,
			'tooltips_text_color'       => '#FFFFFF',
			'tooltips_background_color' => '#000000',
			'group_icons'               => true,  /* custom theme option */
			'background_color'          => '#000000', /* only applicable if icons are grouped */
			'background_color_hover'    => '#333333', /* only applicable if icons are grouped */
			'icon_colors_group'         => '#FFFFFF', /* only applicable if icons are grouped */
			'icon_colors_group_hover'   => '#FFFFFF', /* only applicable if icons are grouped */
			'border_radius_group'       => array( /* only applicable if icons are grouped */
				'attrTop'       => 0,
				'attrRight'     => 0,
				'attrBottom'    => 0,
				'attrLeft'      => 0,
				'attrUnit'      => 'px',
				'attrSyncUnits' => false,
			),
			'icon_border_radius'        => array( /* only applicable if icons are NOT grouped */
				'attrTop'       => 0,
				'attrRight'     => 0,
				'attrBottom'    => 0,
				'attrLeft'      => 0,
				'attrUnit'      => 'px',
				'attrSyncUnits' => false,
			),
			'font_size'                 => 14,
			'icon_padding'              => array( /* Applicable to grouped and ungrouped icons */
				'attrTop'       => 12,
				'attrRight'     => 20,
				'attrBottom'    => 12,
				'attrLeft'      => 20,
				'attrUnit'      => 'px',
				'attrSyncUnits' => false,
			),
			'icon_size'                 => 25, /* Applicable to grouped and ungrouped icons */
			'icon_gap'                  => 0, /* Applicable to ungrouped icons */
			'icon_colors'               => array( /* Social Icon Colors */
				'twitter'  => array(
					'label'            => _x( 'X', 'X social network formerly Twitter', 'highlight-and-share' ),
					'slug'             => 'twitter',
					'background'       => '#FEFEFE',
					'background_hover' => '#FFFFFF',
					'icon_color'       => '#000000',
					'icon_color_hover' => '#000000',
				),
				'facebook' => array(
					'label'            => __( 'Facebook', 'highlight-and-share' ),
					'slug'             => 'facebook',
					'background'       => '#3b5998',
					'background_hover' => '#2d4373',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'whatsapp' => array(
					'label'            => __( 'WhatsApp', 'highlight-and-share' ),
					'slug'             => 'whatsapp',
					'background'       => '#25d366',
					'background_hover' => '#1fbf4f',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'reddit'   => array(
					'label'            => __( 'Reddit', 'highlight-and-share' ),
					'slug'             => 'reddit',
					'background'       => '#ff4500',
					'background_hover' => '#e63f00',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'telegram' => array(
					'label'            => __( 'Telegram', 'highlight-and-share' ),
					'slug'             => 'telegram',
					'background'       => '#0088cc',
					'background_hover' => '#006b9f',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'mastodon' => array(
					'label'            => __( 'Mastodon', 'highlight-and-share' ),
					'slug'             => 'mastodon',
					'background'       => '#605CF5',
					'background_hover' => '#4c49c3',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'tumblr'   => array(
					'label'            => __( 'Tumblr', 'highlight-and-share' ),
					'slug'             => 'tumblr',
					'background'       => '#000000',
					'background_hover' => '#333333',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'linkedin' => array(
					'label'            => __( 'LinkedIn', 'highlight-and-share' ),
					'slug'             => 'linkedin',
					'background'       => '#0077b5',
					'background_hover' => '#005983',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'xing'     => array(
					'label'            => __( 'Xing', 'highlight-and-share' ),
					'slug'             => 'xing',
					'background'       => '#006567',
					'background_hover' => '#004c4c',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'copy'     => array(
					'label'            => __( 'Copy', 'highlight-and-share' ),
					'slug'             => 'copy',
					'background'       => '#000',
					'background_hover' => '#000',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'email'    => array(
					'label'            => __( 'Email', 'highlight-and-share' ),
					'slug'             => 'email',
					'background'       => '#000',
					'background_hover' => '#000',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'webshare' => array(
					'label'            => __( 'Share', 'highlight-and-share' ),
					'slug'             => 'webshare',
					'background'       => '#f58f2f',
					'background_hover' => '#e17713',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'threads'  => array(
					'label'            => __( 'Threads', 'highlight-and-share' ),
					'slug'             => 'threads',
					'background'       => '#333',
					'background_hover' => '#000',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'bluesky'  => array(
					'label'            => __( 'BlueSky', 'highlight-and-share' ),
					'slug'             => 'bluesky',
					'background'       => '#F2F9FF',
					'background_hover' => '#F2F9FF',
					'icon_color'       => '#1285FE',
					'icon_color_hover' => '#28323E',
				),
			),
		);
		return $defaults;
	}

	/**
	 * Get default options for pinterest/webshare sharing.
	 */
	public static function get_image_defaults() {
		$defaults = array(
			'enable_image_sharing'         => false,
			'enable_pinterest_sharing'     => true,
			'enable_webshare_sharing'      => true,
			'supported_post_types'         => array(
				'post' => true,
			),
			'location'                     => 'top-left',
			'exclude_leading_image'        => false,
			'show_on_hover'                => true,
			'pinterest_button_color'       => '#E7011D',
			'pinterest_button_color_hover' => '#BE0319',
			'pinterest_icon_color'         => '#FFFFFF',
			'pinterest_icon_color_hover'   => '#FFFFFF',
			'pinterest_text_color'         => '#FFFFFF',
			'pinterest_text_color_hover'   => '#FFFFFF',
			'webshare_icon_color'          => '#FFFFFF',
			'webshare_icon_color_hover'    => '#FFFFFF',
			'webshare_button_color'        => '#f58f2f',
			'webshare_button_color_hover'  => '#e17713',
			'webshare_text_color'          => '#FFFFFF',
			'webshare_text_color_hover'    => '#FFFFFF',
			'webshare_share_image_only'    => false,
			'button_shape'                 => 'round', /* can be round, square, circular */
			'show_button_labels'           => true,
			'pinterest_button_label'       => __( 'Pin it', 'highlight-and-share' ),
			'webshare_button_label'        => __( 'Share', 'highlight-and-share' ),
			'exclusions'                   => '',
		);
		return $defaults;
	}

	/**
	 * Get the image options for Pinterest/Webshare sharing.
	 *
	 * @param bool $force Force a refresh of the options.
	 *
	 * @return array Image options.
	 */
	public static function get_image_options( $force = false ) {
		if ( false === self::$options_image || $force ) {
			$settings = get_option( 'highlight-and-share-image-options' );
		} else {
			$settings = self::$options_image;
		}

		$defaults = self::get_image_defaults();

		if ( false === $settings || ! is_array( $settings ) ) {
			update_option( 'highlight-and-share-image-options', $defaults );
			return $defaults;
		}

		// Merge two multi-dimensional arrays (defaults, and from settings).
		$settings = array_replace_recursive( $defaults, $settings );

		self::$options_image = $settings;
		return $settings;
	}

	/**
	 * Get default options.
	 */
	public static function get_defaults() {
		$defaults = array(
			'js_content'                       => '',
			'element_content'                  => '',
			'id_content'                       => '',
			'wrapper_classes'                  => '',
			'twitter'                          => '',
			'show_twitter'                     => true,
			'show_facebook'                    => true,
			'show_linkedin'                    => false,
			'show_ok'                          => false,
			'show_vk'                          => false,
			'enable_emails'                    => false,
			'show_copy'                        => false,
			'show_whats_app'                   => false,
			'show_xing'                        => false,
			'enable_mobile'                    => true,
			'show_reddit'                      => false,
			'show_telegram'                    => false,
			'show_tumblr'                      => false,
			'show_signal'                      => false,
			'show_webshare'                    => false,
			'show_mastodon'                    => false,
			'show_threads'                     => false,
			'show_bluesky'                     => false,
			'enable_webshare_inline_highlight' => false,
			'enable_webshare_click_to_share'   => false,
			'enable_content'                   => true,
			'enable_excerpt'                   => true,
			'enable_hashtags'                  => true,
			'shortlinks'                       => false,
			'icons'                            => false,
			'enable_comments'                  => false,
			'theme'                            => 'default',
			'sharing_prefix'                   => '',
			'sharing_suffix'                   => '',
			'whatsapp_api_endpoint'            => 'app', // Can also we 'web'.
			'whatsapp_can_share_url'           => true,
			'twitter_label'                    => _x( 'Share This', 'X social network formerly Twitter', 'highlight-and-share' ),
			'twitter_tooltip'                  => _x( 'Share on X', 'X social network formerly Twitter', 'highlight-and-share' ),
			'facebook_label'                   => __( 'Facebook', 'highlight-and-share' ),
			'facebook_tooltip'                 => __( 'Share on Facebook', 'highlight-and-share' ),
			'linkedin_label'                   => __( 'LinkedIn', 'highlight-and-share' ),
			'linkedin_tooltip'                 => __( 'Share on LinkedIn', 'highlight-and-share' ),
			'ok_label'                         => __( 'OK', 'highlight-and-share' ),
			'ok_tooltip'                       => __( 'Share on OK', 'highlight-and-share' ),
			'vk_label'                         => __( 'VK', 'highlight-and-share' ),
			'vk_tooltip'                       => __( 'Share on VK', 'highlight-and-share' ),
			'whatsapp_label'                   => __( 'WhatsApp', 'highlight-and-share' ),
			'whatsapp_tooltip'                 => __( 'Share on WhatsApp', 'highlight-and-share' ),
			'threads_label'                    => __( 'Threads', 'highlight-and-share' ),
			'threads_tooltip'                  => __( 'Share on Threads', 'highlight-and-share' ),
			'bluesky_label'                    => __( 'BlueSky', 'highlight-and-share' ),
			'bluesky_tooltip'                  => __( 'Share on BlueSky', 'highlight-and-share' ),
			'reddit_label'                     => __( 'Reddit', 'highlight-and-share' ),
			'reddit_tooltip'                   => __( 'Share on Reddit', 'highlight-and-share' ),
			'telegram_label'                   => __( 'Telegram', 'highlight-and-share' ),
			'telegram_tooltip'                 => __( 'Share on Telegram', 'highlight-and-share' ),
			'signal_label'                     => __( 'Signal', 'highlight-and-share' ),
			'signal_tooltip'                   => __( 'Share on Signal', 'highlight-and-share' ),
			'xing_label'                       => __( 'Xing', 'highlight-and-share' ),
			'xing_tooltip'                     => __( 'Share on Xing', 'highlight-and-share' ),
			'copy_label'                       => __( 'Copy', 'highlight-and-share' ),
			'copy_tooltip'                     => __( 'Copy Selection', 'highlight-and-share' ),
			'email_label'                      => __( 'Email', 'highlight-and-share' ),
			'email_tooltip'                    => __( 'Share via email', 'highlight-and-share' ),
			'tumblr_label'                     => __( 'Tumblr', 'highlight-and-share' ),
			'tumblr_tooltip'                   => __( 'Share on Tumblr', 'highlight-and-share' ),
			'webshare_label'                   => __( 'Share', 'highlight-and-share' ),
			'webshare_tooltip'                 => __( 'Share This', 'highlight-and-share' ),
			'mastodon_label'                   => __( 'Mastodon', 'highlight-and-share' ),
			'mastodon_tooltip'                 => __( 'Share on Mastodon', 'highlight-and-share' ),
		);
		return $defaults;
	}

	/**
	 * Initialize and return plugin options.
	 *
	 * Return an array of plugin options.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param bool $force Force a refresh of the options.
	 *
	 * @return array Plugin options
	 */
	public static function get_plugin_options( $force = false ) {
		if ( false === self::$options ) {
			$settings = get_option( 'highlight-and-share' );
		} else {
			$settings = self::$options;
		}

		// Port old settings to new settings.
		if ( ! isset( $settings['show_whats_app'] ) ) {
			$settings['show_whats_app'] = $settings['show_whatsapp'] ?? false;
		}
		if ( ! isset( $settings['enable_emails'] ) ) {
			$settings['enable_emails'] = $settings['show_email'] ?? false;
		}

		$defaults = self::get_defaults();

		if ( false === $settings || ! is_array( $settings ) ) {
			update_option( 'highlight-and-share', $defaults );
			return $defaults;
		}

		$settings      = wp_parse_args( $settings, $defaults );
		self::$options = $settings;
		return $settings;
	}

	/**
	 * Initialize and return email options.
	 *
	 * Return an array of email options.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param bool $force Force a refresh of the options.
	 *
	 * @return array Plugin options
	 */
	public static function get_email_options( $force = false ) {
		if ( false === self::$options_emails || $force ) {
			$settings = get_option( 'highlight-and-share-email-settings' );
		} else {
			$settings = self::$options_emails;
		}

		$defaults = self::get_email_settings_defaults();

		if ( false === $settings || ! is_array( $settings ) ) {
			update_option( 'highlight-and-share-email-settings', $defaults );
			return $defaults;
		}

		$settings             = wp_parse_args( $settings, $defaults );
		self::$options_emails = $settings;
		return $settings;
	}

	/**
	 * Return the social network options.
	 *
	 * @since 3.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param bool $force Force a refresh of the options.
	 *
	 * @return array Plugin options
	 */
	public static function get_plugin_options_social_networks( $force = false ) {
		if ( false === self::$options_social_networks || $force ) {
			$settings = get_option( 'highlight-and-share-social-networks', array() );
		} else {
			$settings = self::$options_social_networks;
		}

		$defaults = self::get_social_network_defaults();
		if ( false === $settings || ! is_array( $settings ) ) {
			update_option( 'highlight-and-share-social-networks', $defaults );
		}

		// Merge two multi-dimensional arrays (defaults, and from settings).
		$settings = array_replace_recursive( $defaults, $settings );

		// Add enabled/disabled state from main options.
		$plugin_options                  = self::get_plugin_options();
		$settings['twitter']['enabled']  = (bool) apply_filters( 'has_show_twitter', ( $plugin_options['show_twitter'] ?? false ) );
		$settings['facebook']['enabled'] = (bool) apply_filters( 'has_show_facebook', ( $plugin_options['show_facebook'] ?? false ) );
		$settings['linkedin']['enabled'] = (bool) apply_filters( 'has_show_linkedin', ( $plugin_options['show_linkedin'] ?? false ) );
		$settings['email']['enabled']    = (bool) apply_filters( 'has_show_email', ( $plugin_options['enable_emails'] ?? false ) );
		$settings['copy']['enabled']     = (bool) apply_filters( 'has_show_copy', ( $plugin_options['show_copy'] ?? false ) );
		$settings['whatsapp']['enabled'] = (bool) apply_filters( 'has_show_whatsapp', ( $plugin_options['show_whats_app'] ?? false ) );
		$settings['xing']['enabled']     = (bool) apply_filters( 'has_show_xing', ( $plugin_options['show_xing'] ?? false ) );
		$settings['reddit']['enabled']   = (bool) apply_filters( 'has_show_reddit', ( $plugin_options['show_reddit'] ?? false ) );
		$settings['tumblr']['enabled']   = (bool) apply_filters( 'has_show_tumblr', ( $plugin_options['show_tumblr'] ?? false ) );
		$settings['telegram']['enabled'] = (bool) apply_filters( 'has_show_telegram', ( $plugin_options['show_telegram'] ?? false ) );
		$settings['webshare']['enabled'] = (bool) apply_filters( 'has_show_webshare', ( $plugin_options['show_webshare'] ?? false ) );
		$settings['mastodon']['enabled'] = (bool) apply_filters( 'has_show_mastodon', ( $plugin_options['show_mastodon'] ?? false ) );
		$settings['threads']['enabled']  = (bool) apply_filters( 'has_show_threads', ( $plugin_options['show_threads'] ?? false ) );
		$settings['bluesky']['enabled']  = (bool) apply_filters( 'has_show_bluesky', ( $plugin_options['show_bluesky'] ?? false ) );

		// Now sort the arrays based on order.
		array_multisort( array_column( $settings, 'order' ), SORT_ASC, $settings );

		self::$options_social_networks = $settings;
		return $settings;
	}

	/**
	 * Return the social network options.
	 *
	 * @since 3.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param bool $force Force a refresh of the options.
	 *
	 * @return array Plugin options
	 */
	public static function get_theme_options( $force = false ) {
		if ( false === self::$options_theme || $force ) {
			$settings = get_option( 'highlight-and-share-theme-options' );
		} else {
			$settings = self::$options_theme;
		}

		$defaults = self::get_theme_defaults();

		if ( false === $settings || ! is_array( $settings ) ) {
			// Add theme option from old options into new one.
			$options           = self::get_plugin_options();
			$defaults['theme'] = sanitize_text_field( $options['theme'] );
			update_option( 'highlight-and-share-theme-options', $defaults );
			return $defaults;
		}

		// Merge two multi-dimensional arrays (defaults, and from settings).
		$settings = array_replace_recursive( $defaults, $settings );

		self::$options_theme = $settings;
		return $settings;
	}

	/**
	 * Return the social network options.
	 *
	 * @since 3.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param bool $force Force a refresh of the options.
	 *
	 * @return array Plugin options
	 */
	public static function get_block_editor_options( $force = false ) {
		if ( false === self::$options_block_editor || $force ) {
			$settings = get_option( 'highlight-and-share-block-editor-options' );
		} else {
			$settings = self::$options_block_editor;
		}

		$defaults = self::get_block_editor_defaults();

		if ( false === $settings || ! is_array( $settings ) ) {
			// Add theme option from old options into new one.
			$options = self::get_block_editor_defaults();
			update_option( 'highlight-and-share-block-editor-options', $defaults );
			return $defaults;
		}

		// Merge two multi-dimensional arrays (defaults, and from settings).
		$settings = array_replace_recursive( $defaults, $settings );

		self::$options_block_editor = $settings;
		return $settings;
	}
}
