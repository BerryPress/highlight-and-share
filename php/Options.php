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
	 * Highlight and Share Headlines Options.
	 *
	 * @var array $options_headlines Highlight and Share Headlines options.
	 */
	private static $options_headlines = false;

	/**
	 * Highlight and Share Options
	 *
	 * @var array $instance Highlight and Share options.
	 */
	private static $instance = false;
	/**
	 * Main class runner.
	 */
	public static function run() {
		add_filter( 'has_migrate_plugin_options', array( __CLASS__, 'migrate_plugin_options' ), 10, 3 );
	}

	/**
	 * Migrate plugin options.
	 *
	 * @param array  $settings The plugin options.
	 * @param string $options_version The current options version.
	 * @param string $settings_version The stored or default options version.
	 * @return array The migrated plugin options.
	 */
	public static function migrate_plugin_options( $settings, $options_version, $settings_version ) {
		// Migrate theme and block editor options.
		$theme_options_raw        = get_option( 'highlight-and-share-theme-options' );
		$block_editor_options_raw = get_option( 'highlight-and-share-block-editor-options' );
		if ( false !== $theme_options_raw && false !== $block_editor_options_raw ) {
			$theme_options        = self::get_theme_options( true );
			$block_editor_options = self::get_block_editor_options( true );

			$theme_and_block_options = array_merge( $theme_options, $block_editor_options );
			$settings                = array_replace_recursive( $settings, $theme_and_block_options );
			delete_option( 'highlight-and-share-theme-options' );
			delete_option( 'highlight-and-share-block-editor-options' );
		}

		return $settings;
	}
	/**
	 * Get email setting options.
	 */
	public static function get_email_settings_defaults() {
		return array(
			'enable_logged_in_only'     => false,
			'akismet_enabled'           => true,
			'recaptcha_enabled'         => false,
			'recaptcha_project_id'      => '',
			'recaptcha_api_key'         => '',
			'recaptcha_site_key'        => '',
			'recaptcha_score_threshold' => 0.5,
			'from_name'                 => get_bloginfo( 'name' ),
			'from_email'                => get_bloginfo( 'admin_email' ),
			'email_send_type'           => 'form', // can be form|mailto.
			/* Translators: %1$s is the share type (highlight, quote, etc), %2$s is the site name. */
			'email_subject'             => sprintf( __( 'Check out this %1$s from %2$s', 'highlight-and-share' ), '{{share_type}}', '{{site_name}}' ),
			'email_body'                => _x( "{{from_name}} ({{from_email}}) wants to share a link with you\r\n\n{{share_text}}\r\n\r\n{{post_title}}\r\n{{post_url}}", 'email body with template tags', 'highlight-and-share' ),
			'email_modal_title'         => __( 'Share this {{share_type}}', 'highlight-and-share' ),
			'turnstile_enabled'         => false,
			'turnstile_sitekey'         => '',
			'turnstile_secret'          => '',
			'turnstile_theme'           => 'dark',
			'turnstile_language'        => 'en',
			'turnstile_widget_size'     => 'normal',
		);
	}

	/**
	 * Retrieve local networks from storage.
	 */
	public static function get_social_network_defaults() {
		$social_networks = array(
			'twitter'  => array(
				'label'               => __( 'X', 'highlight-and-share' ),
				'slug'                => 'twitter',
				'color'               => '#000000',
				'background'          => '#fff',
				'order'               => 0,
				'custom'              => false,
				'css_class'           => 'has_twitter',
				'allows_text_sharing' => true,
				'icon_id'             => 'has-twitter-icon',
				'label_text'          => _x( 'Share This', 'X social network formerly Twitter', 'highlight-and-share' ),
				'tooltip_text'        => _x( 'Share on X', 'X social network formerly Twitter', 'highlight-and-share' ),
				'enabled_option_key'  => 'show_twitter',
				'share_url_template'  => 'https://x.com/intent/tweet?via=%username%&url=%url%&text=%prefix%%text%%suffix%&hashtags=%hashtags%',
				'requires_popup'      => true,
				'icon_colors'         => array(
					'background'       => '#FEFEFE',
					'background_hover' => '#FFFFFF',
					'icon_color'       => '#000000',
					'icon_color_hover' => '#000000',
				),
			),
			'facebook' => array(
				'label'               => __( 'Facebook', 'highlight-and-share' ),
				'slug'                => 'facebook',
				'color'               => '#3b5998',
				'background'          => '#fff',
				'order'               => 1,
				'custom'              => false,
				'css_class'           => 'has_facebook',
				'allows_text_sharing' => false,
				'icon_id'             => 'has-facebook-icon',
				'label_text'          => __( 'Facebook', 'highlight-and-share' ),
				'tooltip_text'        => __( 'Share on Facebook', 'highlight-and-share' ),
				'enabled_option_key'  => 'show_facebook',
				'share_url_template'  => 'https://www.facebook.com/sharer/sharer.php?u=%url%&t=%title%',
				'requires_popup'      => true,
				'icon_colors'         => array(
					'background'       => '#3b5998',
					'background_hover' => '#2d4373',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
			),
			'whatsapp' => array(
				'label'               => __( 'WhatsApp', 'highlight-and-share' ),
				'slug'                => 'whatsapp',
				'color'               => '#25d366',
				'background'          => '#fff',
				'order'               => 2,
				'custom'              => false,
				'css_class'           => 'has_whatsapp',
				'allows_text_sharing' => true,
				'icon_id'             => 'has-whatsapp-icon',
				'label_text'          => __( 'WhatsApp', 'highlight-and-share' ),
				'tooltip_text'        => __( 'Share on WhatsApp', 'highlight-and-share' ),
				'enabled_option_key'  => 'show_whats_app',
				'share_url_template'  => 'https://api.whatsapp.com/send?text=%prefix%%text%%suffix%: %url%',
				'requires_popup'      => true,
				'icon_colors'         => array(
					'background'       => '#25d366',
					'background_hover' => '#1fbf4f',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
			),
			'reddit'   => array(
				'label'               => __( 'Reddit', 'highlight-and-share' ),
				'slug'                => 'reddit',
				'color'               => '#ff4500',
				'background'          => '#fff',
				'order'               => 3,
				'custom'              => false,
				'css_class'           => 'has_reddit',
				'allows_text_sharing' => false,
				'icon_id'             => 'has-reddit-icon',
				'label_text'          => __( 'Reddit', 'highlight-and-share' ),
				'tooltip_text'        => __( 'Share on Reddit', 'highlight-and-share' ),
				'enabled_option_key'  => 'show_reddit',
				'share_url_template'  => 'https://www.reddit.com/submit?resubmit=true&url=%url%&title=%title%',
				'requires_popup'      => true,
				'icon_colors'         => array(
					'background'       => '#ff4500',
					'background_hover' => '#e63f00',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
			),
			'telegram' => array(
				'label'               => __( 'Telegram', 'highlight-and-share' ),
				'slug'                => 'telegram',
				'color'               => '#0088cc',
				'background'          => '#fff',
				'order'               => 4,
				'custom'              => false,
				'css_class'           => 'has_telegram',
				'allows_text_sharing' => true,
				'icon_id'             => 'has-telegram-icon',
				'label_text'          => __( 'Telegram', 'highlight-and-share' ),
				'tooltip_text'        => __( 'Share on Telegram', 'highlight-and-share' ),
				'enabled_option_key'  => 'show_telegram',
				'share_url_template'  => 'https://t.me/share/url?url=%url%&text=%prefix%%text%%suffix%',
				'requires_popup'      => true,
				'icon_colors'         => array(
					'background'       => '#0088cc',
					'background_hover' => '#006b9f',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
			),
			'linkedin' => array(
				'label'               => __( 'LinkedIn', 'highlight-and-share' ),
				'slug'                => 'linkedin',
				'color'               => '#0077b5',
				'background'          => '#fff',
				'order'               => 5,
				'custom'              => false,
				'css_class'           => 'has_linkedin',
				'allows_text_sharing' => false,
				'icon_id'             => 'has-linkedin-icon',
				'label_text'          => __( 'LinkedIn', 'highlight-and-share' ),
				'tooltip_text'        => __( 'Share on LinkedIn', 'highlight-and-share' ),
				'enabled_option_key'  => 'show_linkedin',
				'share_url_template'  => 'https://www.linkedin.com/sharing/share-offsite/?mini=true&url=%url%&title=%title%',
				'requires_popup'      => true,
				'icon_colors'         => array(
					'background'       => '#0077b5',
					'background_hover' => '#005983',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
			),
			'xing'     => array(
				'label'               => __( 'Xing', 'highlight-and-share' ),
				'slug'                => 'xing',
				'color'               => '#006567',
				'background'          => '#fff',
				'order'               => 6,
				'custom'              => false,
				'css_class'           => 'has_xing',
				'allows_text_sharing' => false,
				'icon_id'             => 'has-xing-icon',
				'label_text'          => __( 'Xing', 'highlight-and-share' ),
				'tooltip_text'        => __( 'Share on Xing', 'highlight-and-share' ),
				'enabled_option_key'  => 'show_xing',
				'share_url_template'  => 'https://www.xing.com/spi/shares/new?url=%url%',
				'requires_popup'      => true,
				'icon_colors'         => array(
					'background'       => '#006567',
					'background_hover' => '#004c4c',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
			),
			'tumblr'   => array(
				'label'               => __( 'Tumblr', 'highlight-and-share' ),
				'slug'                => 'tumblr',
				'color'               => '#000000',
				'background'          => '#fff',
				'order'               => 7,
				'custom'              => false,
				'css_class'           => 'has_tumblr',
				'allows_text_sharing' => true,
				'icon_id'             => 'has-tumblr',
				'label_text'          => __( 'Tumblr', 'highlight-and-share' ),
				'tooltip_text'        => __( 'Share on Tumblr', 'highlight-and-share' ),
				'enabled_option_key'  => 'show_tumblr',
				'share_url_template'  => 'https://tumblr.com/widgets/share/tool?canonicalUrl=%url%&content=%prefix%%text%%suffix%&title=%title%&posttype=quote',
				'requires_popup'      => true,
				'icon_colors'         => array(
					'background'       => '#000000',
					'background_hover' => '#333333',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
			),
			'mastodon' => array(
				'label'               => __( 'Mastodon', 'highlight-and-share' ),
				'slug'                => 'mastodon',
				'color'               => '#605CF5',
				'background'          => '#fff',
				'order'               => 8,
				'custom'              => false,
				'css_class'           => 'has_mastodon',
				'allows_text_sharing' => true,
				'icon_id'             => 'has-mastodon',
				'label_text'          => __( 'Mastodon', 'highlight-and-share' ),
				'tooltip_text'        => __( 'Share on Mastodon', 'highlight-and-share' ),
				'enabled_option_key'  => 'show_mastodon',
				'share_url_template'  => 'https://mastodon.social/share?text=%prefix%%text%%suffix%: %url%',
				'requires_popup'      => false, // Opens in same window, not popup.
				'icon_colors'         => array(
					'background'       => '#605CF5',
					'background_hover' => '#4c49c3',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
			),
			'copy'     => array(
				'label'               => __( 'Copy', 'highlight-and-share' ),
				'slug'                => 'copy',
				'color'               => '#000',
				'background'          => '#fff',
				'order'               => 9,
				'custom'              => false,
				'css_class'           => 'has_copy',
				'allows_text_sharing' => true,
				'icon_id'             => 'has-copy-icon',
				'label_text'          => __( 'Copy', 'highlight-and-share' ),
				'tooltip_text'        => __( 'Copy Selection', 'highlight-and-share' ),
				'enabled_option_key'  => 'show_copy',
				'share_url_template'  => '#', // Handled by JavaScript via clipboard API.
				'requires_popup'      => false,
				'icon_colors'         => array(
					'background'       => '#000',
					'background_hover' => '#000',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
			),
			'email'    => array(
				'label'               => __( 'Email', 'highlight-and-share' ),
				'slug'                => 'email',
				'color'               => '#000',
				'background'          => '#fff',
				'order'               => 10,
				'custom'              => false,
				'css_class'           => 'has_email',
				'allows_text_sharing' => true,
				'icon_id'             => 'has-email-icon',
				'label_text'          => __( 'Email', 'highlight-and-share' ),
				'tooltip_text'        => __( 'Share via email', 'highlight-and-share' ),
				'enabled_option_key'  => 'enable_emails',
				'share_url_template'  => '', // Handled dynamically (mailto vs form).
				'requires_popup'      => false,
				'icon_colors'         => array(
					'background'       => '#000',
					'background_hover' => '#000',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
			),
			'webshare' => array(
				'label'               => __( 'Web Share', 'highlight-and-share' ),
				'slug'                => 'webshare',
				'color'               => '#000',
				'background'          => '#e17713',
				'order'               => 11,
				'custom'              => false,
				'css_class'           => 'has_webshare',
				'allows_text_sharing' => true,
				'icon_id'             => 'has-webshare-icon',
				'label_text'          => __( 'Share', 'highlight-and-share' ),
				'tooltip_text'        => __( 'Share This', 'highlight-and-share' ),
				'enabled_option_key'  => 'show_webshare',
				'share_url_template'  => '#', // Handled by JavaScript via Web Share API.
				'requires_popup'      => false,
				'icon_colors'         => array(
					'background'       => '#f58f2f',
					'background_hover' => '#e17713',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
			),
			'threads'  => array(
				'label'               => __( 'Threads', 'highlight-and-share' ),
				'slug'                => 'threads',
				'color'               => '#333',
				'background'          => '#FFF',
				'order'               => 12,
				'custom'              => false,
				'css_class'           => 'has_threads',
				'allows_text_sharing' => true,
				'icon_id'             => 'has-threads',
				'label_text'          => __( 'Threads', 'highlight-and-share' ),
				'tooltip_text'        => __( 'Share on Threads', 'highlight-and-share' ),
				'enabled_option_key'  => 'show_threads',
				'share_url_template'  => 'https://www.threads.net/intent/post?text=%threadstext%',
				'requires_popup'      => true,
				'icon_colors'         => array(
					'background'       => '#333',
					'background_hover' => '#000',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
			),
			'bluesky'  => array(
				'label'               => __( 'BlueSky', 'highlight-and-share' ),
				'slug'                => 'bluesky',
				'color'               => '#1285FE',
				'background'          => '#F2F9FF',
				'order'               => 14,
				'custom'              => false,
				'css_class'           => 'has_bluesky',
				'allows_text_sharing' => true,
				'icon_id'             => 'has-bluesky',
				'label_text'          => __( 'BlueSky', 'highlight-and-share' ),
				'tooltip_text'        => __( 'Share on BlueSky', 'highlight-and-share' ),
				'enabled_option_key'  => 'show_bluesky',
				'share_url_template'  => 'https://bsky.app/intent/compose?text=%blueskytext%',
				'requires_popup'      => true,
				'icon_colors'         => array(
					'background'       => '#F2F9FF',
					'background_hover' => '#F2F9FF',
					'icon_color'       => '#1285FE',
					'icon_color_hover' => '#28323E',
				),
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
	protected static function get_block_editor_defaults() {
		$defaults = array(
			'enable_blocks'                              => true,
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
	protected static function get_theme_defaults() {
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
		);

		// Derive icon_colors from network registry.
		$social_networks = self::get_social_network_defaults();
		$icon_colors     = array();
		$network_order   = array();
		foreach ( $social_networks as $slug => $network ) {
			$icon_colors[ $slug ]                    = array(
				'label'            => $network['label'] ?? '',
				'slug'             => $slug,
				'background'       => $network['icon_colors']['background'] ?? '#000',
				'background_hover' => $network['icon_colors']['background_hover'] ?? '#000',
				'icon_color'       => $network['icon_colors']['icon_color'] ?? '#fff',
				'icon_color_hover' => $network['icon_colors']['icon_color_hover'] ?? '#fff',
			);
			$network_order[ $network['order'] ?? 0 ] = $slug;
		}
		$network_order = array_unique( $network_order );
		ksort( $network_order );
		$defaults['icon_colors']   = $icon_colors;
		$defaults['network_order'] = $network_order;
		return $defaults;
	}

	/**
	 * Get default options for pinterest/webshare sharing.
	 */
	public static function get_image_defaults() {
		$defaults = array(
			'enable_image_sharing'                     => false,
			'enable_image_sharing_on_excerpts'         => false,
			'enable_image_sharing_on_archive_featured' => false,
			'enable_pinterest_sharing'                 => true,
			'enable_webshare_sharing'                  => true,
			'supported_post_types'                     => array(
				'post' => true,
			),
			'location'                                 => 'top-left',
			'exclude_leading_image'                    => false,
			'show_on_hover'                            => true,
			'pinterest_button_color'                   => '#E7011D',
			'pinterest_button_color_hover'             => '#BE0319',
			'pinterest_icon_color'                     => '#FFFFFF',
			'pinterest_icon_color_hover'               => '#FFFFFF',
			'pinterest_text_color'                     => '#FFFFFF',
			'pinterest_text_color_hover'               => '#FFFFFF',
			'webshare_icon_color'                      => '#FFFFFF',
			'webshare_icon_color_hover'                => '#FFFFFF',
			'webshare_button_color'                    => '#f58f2f',
			'webshare_button_color_hover'              => '#e17713',
			'webshare_text_color'                      => '#FFFFFF',
			'webshare_text_color_hover'                => '#FFFFFF',
			'webshare_share_image_only'                => false,
			'button_shape'                             => 'round', /* can be round, square, circular */
			'show_button_labels'                       => true,
			'pinterest_button_label'                   => __( 'Pin it', 'highlight-and-share' ),
			'webshare_button_label'                    => __( 'Share', 'highlight-and-share' ),
			'exclusions'                               => '',
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
	 * Get headlines defaults. social_defaults includes only networks with text sharing enabled.
	 * Copy, Webshare, and X (Twitter) enabled by default. Copy and Webshare are locked.
	 *
	 * @return array Headlines defaults.
	 */
	public static function get_headlines_defaults() {
		$social_defaults = array();
		$networks        = self::get_social_network_defaults();
		$network_order   = array();

		foreach ( $networks as $slug => $network ) {
			if ( empty( $network['allows_text_sharing'] ) ) {
				continue;
			}
			$enabled = in_array( $slug, array( 'copy', 'webshare', 'twitter' ), true );
			$locked  = in_array( $slug, array( 'copy' ), true );
			$label   = isset( $network['label_text'] ) ? $network['label_text'] : $network['label'];
			if ( 'copy' === $slug ) {
				$label = __( 'Copy Link', 'highlight-and-share' );
			}
			if ( 'webshare' === $slug ) {
				$label = __( 'Share This', 'highlight-and-share' );
			}
			$social_defaults[ $slug ] = array(
				'enabled' => $enabled,
				'locked'  => $locked,
				'label'   => $label,
			);
			if ( $enabled ) {
				$network_order[] = $slug;
			}
		}

		// Append remaining text-sharing networks to network_order.
		foreach ( $networks as $slug => $network ) {
			if ( empty( $network['allows_text_sharing'] ) ) {
				continue;
			}
			if ( ! in_array( $slug, $network_order, true ) ) {
				$network_order[] = $slug;
			}
		}

		$defaults = array(
			'enable_headlines'         => false,
			'auto_generate_ids'        => false,
			'enabled_heading_levels'   => array( 'h2', 'h3', 'h4' ),
			'supported_post_types'     => array( 'post' => true ),
			'exclusion_selectors'      => '',
			'social_defaults'          => $social_defaults,
			'network_order'            => $network_order,
			'link_icon_always_visible' => false,
			'display_mode'             => 'rows', /* can be rows (default) or grid */
			'theme'                    => 'light', /* can be light (default) or dark */
		);

		return $defaults;
	}

	/**
	 * Get the headlines options.
	 *
	 * @param bool $force Force a refresh of the options.
	 *
	 * @return array Headlines options.
	 */
	public static function get_headlines_options( $force = false ) {
		if ( false === self::$options_headlines || $force ) {
			$settings = get_option( 'highlight-and-share-headline-options' );
		} else {
			$settings = self::$options_headlines;
		}

		$defaults = self::get_headlines_defaults();

		if ( false === $settings || ! is_array( $settings ) ) {
			update_option( 'highlight-and-share-headline-options', $defaults );
			return $defaults;
		}

		$settings                  = array_replace_recursive( $defaults, $settings );
		$settings['network_order'] = array_unique( (array) ( $settings['network_order'] ?? array() ) );

		// Restore social_defaults from defaults if empty (e.g. corrupted/migrated data).
		if ( empty( $settings['social_defaults'] ) || ! is_array( $settings['social_defaults'] ) ) {
			$settings['social_defaults'] = $defaults['social_defaults'];
			$settings['network_order']   = $defaults['network_order'];
		}

		// Sort social_defaults by slug.
		ksort( $settings['social_defaults'] );

		self::$options_headlines = $settings;

		return $settings;
	}

	/**
	 * Get default options.
	 */
	public static function get_defaults() {
		$defaults              = array(
			'options_version'                  => 0,
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
			'excluded_post_types'              => array(),
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
		$theme_defaults        = self::get_theme_defaults();
		$block_editor_defaults = self::get_block_editor_defaults();

		return array_merge( $defaults, $theme_defaults, $block_editor_defaults );
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
		if ( false === self::$options || $force ) {
			$settings = get_option( 'highlight-and-share', array() );
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

		$settings = array_replace_recursive( $defaults, $settings );
		// Force network_order key to be unique.
		$settings['network_order'] = array_unique( $settings['network_order'] );

		$options_version = HIGHLIGHT_AND_SHARE_OPTIONS_VERSION;
		if ( $options_version !== $settings['options_version'] ) {
			/**
			 * Filter to migrate plugin options.
			 *
			 * @param array $settings The plugin options.
			 * @param string $options_version The current options version.
			 * @param string $settings_version The stored or default settings version.
			 * @return array The migrated plugin options.
			 */
			$settings                    = apply_filters( 'has_migrate_plugin_options', $settings, $options_version, $settings['options_version'] );
			$settings['options_version'] = sanitize_text_field( $options_version );
			update_option( 'highlight-and-share', $settings );
		}

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
	 * Get enabled state for a network from main options.
	 *
	 * @param string $network_slug Network slug.
	 * @param array  $network_def  Network definition from registry.
	 * @return bool Whether network is enabled.
	 */
	private static function get_network_enabled_state( $network_slug, $network_def ) {
		$plugin_options = self::get_plugin_options();
		$option_key     = $network_def['enabled_option_key'] ?? "show_{$network_slug}";

		// Handle special cases.
		if ( 'email' === $network_slug ) {
			$option_key = 'enable_emails';
		}

		$enabled = $plugin_options[ $option_key ] ?? false;

		// Apply filter.
		$filter_name = 'has_show_' . $network_slug;
		return (bool) apply_filters( $filter_name, $enabled );
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

		// Ensure labels remain the same as the defaults.
		foreach ( $defaults as $network_slug => $network_def ) {
			$settings[ $network_slug ]['label'] = $network_def['label'];
		}

		// Loop through networks and set enabled state.
		foreach ( $settings as $network_slug => &$network_def ) {
			$network_def['enabled'] = self::get_network_enabled_state( $network_slug, $network_def );
		}
		unset( $network_def ); // Break reference.

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
			$settings = $defaults;
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
			$settings = $defaults;
		}

		// Merge two multi-dimensional arrays (defaults, and from settings).
		$settings = array_replace_recursive( $defaults, $settings );

		self::$options_block_editor = $settings;
		return $settings;
	}
}
