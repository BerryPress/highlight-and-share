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
class Blocks {

	/**
	 * Main class runner.
	 *
	 * @return Blocks.
	 */
	public static function run() {
		$self = new self();

		// Get block editor options.
		$options = Options::get_block_editor_options();

		// Enqueue inline highlighting script if enabled.
		if ( (bool) $options['enable_inline_highlighting'] ) {
			add_action( 'enqueue_block_editor_assets', array( $self, 'enqueue_inline_highlighting_script' ) );
		}

		// Register the block if enabled.
		if ( (bool) $options['enable_blocks'] ) {
			add_action( 'init', array( $self, 'register_block' ) );
			add_action( 'enqueue_block_editor_assets', array( $self, 'register_block_assets' ) );
			add_action( 'enqueue_block_assets', array( $self, 'enqueue_frontend_assets' ) );
			add_action( 'wp_enqueue_scripts', array( $self, 'register_font_scripts' ) );
			add_action( 'admin_enqueue_scripts', array( $self, 'register_font_scripts' ) );
		}
		return $self;
	}

	/**
	 * Registers the block on server.
	 */
	public function register_block() {

		register_block_type(
			Functions::get_plugin_dir( 'build/blocks/click-to-share/block.json' ),
			array(
				'render_callback' => array( $this, 'frontend' ),
			)
		);
	}

	/**
	 * Register frontend scripts/styles.
	 */
	public function enqueue_frontend_assets() {
		if ( ! is_admin() && has_block( 'has/click-to-share' ) ) {
			wp_register_style(
				'has-style-frontend-css',
				Functions::get_plugin_url( 'dist/has-cts-style.css' ),
				array(),
				HIGHLIGHT_AND_SHARE_VERSION,
				'all'
			);
		}
	}

	/**
	 * Enqueue inline highlighting script in the block editor.
	 */
	public function enqueue_inline_highlighting_script() {
		$deps = require_once Functions::get_plugin_dir( 'build/has-inline-highlighting.asset.php' );
		wp_enqueue_script(
			'has-inline-highlighting-js',
			Functions::get_plugin_url( 'build/has-inline-highlighting.js' ),
			$deps['dependencies'],
			$deps['version'],
			true
		);
	}

	/**
	 * Register all block assets.
	 */
	public function register_block_assets() {
		wp_register_style(
			'has-style-admin-css',
			Functions::get_plugin_url( 'dist/has-cts-editor.css' ),
			array(),
			HIGHLIGHT_AND_SHARE_VERSION,
			'all'
		);
		wp_add_inline_style(
			'has-style-admin-css',
			Themes::get_inline_highlight_css()
		);
		$deps = require_once Functions::get_plugin_dir( 'build/has-click-to-share.asset.php' );
		wp_register_script(
			'has-click-to-share',
			Functions::get_plugin_url( 'build/has-click-to-share.js' ),
			$deps['dependencies'],
			$deps['version'],
			true
		);
		$color_palette = array();
		$settings      = \WP_Theme_JSON_Resolver::get_theme_data()->get_settings();
		if ( isset( $settings['color']['palette']['theme'] ) ) {
			$color_palette = $settings['color']['palette']['theme'];
		}

		// Get adobe fonts.
		$block_editor_options = Options::get_block_editor_options( true );
		$adobe_fonts          = $block_editor_options['adobe_fonts'] ?? array();

		// Get current user ID.
		$current_user_id = get_current_user_id();
		wp_localize_script(
			'has-click-to-share',
			'has_gutenberg',
			array(
				'svg'                               => Functions::get_plugin_url( 'img/share.svg' ),
				'colorPalette'                      => Themes::get_default_theme_colors(),
				'adobeFonts'                        => $adobe_fonts,
				'adobeFontsUrl'                     => Adobe_Fonts::$typekit_css_url,
				'adobeProjectId'                    => $block_editor_options['adobe_project_id'] ?? '',
				'cssFolder'                         => esc_url( functions::get_plugin_url( '/dist/' ) ),
				'blockPresetsNonceRetrieve'         => wp_create_nonce( 'has_load_presets' ),
				'blockPresetsNonceSave'             => wp_create_nonce( 'has_save_presets' ),
				'canEditOthersPosts'                => current_user_can( 'edit_others_posts' ),
				'hasHiddenColorSyncNotice'          => (bool) get_user_meta( get_current_user_id(), 'has_hidden_color_sync_notice', true ),
				'hasHiddenColorSyncNoticeSaveNonce' => wp_create_nonce( 'has_hidden_color_sync_notice_save_' . $current_user_id ),
			)
		);
		wp_set_script_translations( 'has-click-to-share', 'highlight-and-share' );
		do_action( 'has_enqueue_block_styles_scripts' );
	}

	/**
	 * Register font scripts.
	 *
	 * @param string $hook Hook name.
	 */
	public function register_font_scripts( $hook ) {
		global $post;

		$can_enqueue = false;

		// Check to see if we're in the admin and in the post editor.
		if ( is_admin() && ( isset( $post->post_content ) ) ) {
			$can_enqueue = true;
		}

		if ( ! ( is_singular() || is_page() ) && ! $can_enqueue ) {
			return;
		}

		// Get array of all fonts used in blocks.
		$blocks      = parse_blocks( $post->post_content );
		$block_fonts = Functions::get_block_fonts( $blocks );

		// Enqueue fonts.
		foreach ( $block_fonts as $block_font ) {
			if ( 'web' === $block_font['fontType'] ) {
				continue;
			}
			if ( 'adobe' === $block_font['fontType'] ) {
				$block_editor_options = Options::get_block_editor_options( true );
				$adobe_project_id     = $block_editor_options['adobe_project_id'] ?? '';
				if ( ! empty( $adobe_project_id ) ) {
					$adobe_fonts_url = esc_url( Adobe_Fonts::$typekit_css_url . '/' . $adobe_project_id . '.css' );
					wp_enqueue_style(
						'has-adobe-fonts',
						$adobe_fonts_url,
						array(),
						HIGHLIGHT_AND_SHARE_VERSION,
						'all'
					);
					continue;
				}
			}
			if ( 'google' === $block_font['fontType'] ) {
				$font_slug = $block_font['fontFamilySlug'];
				wp_enqueue_style(
					'has-google-font-' . $font_slug,
					esc_url( Functions::get_plugin_url( 'dist/has-gfont-' . $font_slug . '.css' ) ),
					array(),
					HIGHLIGHT_AND_SHARE_VERSION,
					'all'
				);
				continue;
			}
		}
	}

	/**
	 * Output Click to Share Gutenberg block on the front-end.
	 *
	 * @param array  $attributes Array of attributes for the Gutenberg block.
	 * @param string $content Content of the innerblocks.
	 */
	public function frontend( $attributes, $content ) {
		global $post;
		if ( '' === $attributes['uniqueId'] ) {
			return $this->get_legacy_frontend( $attributes );
		}
		ob_start();
		?>
		<style>
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> {
				border-style: solid;
				border-color: <?php echo esc_attr( $attributes['borderColor'] ); ?>;
				transition: all 0.3s ease-in-out;
				max-width: <?php echo $this->get_hierarchical_value( $attributes['maximumWidth'], 'mobile', '', 'width' ); ?><?php echo $this->get_hierarchical_value( $attributes['maximumWidth'], 'mobile', '', 'unit' ); ?>;
				overflow: hidden;
				border-width: <?php echo esc_attr( $this->build_dimensions_css( $attributes['borderWidth'], 'mobile' ) ); ?>;
				border-radius: <?php echo esc_attr( $this->build_dimensions_css( $attributes['borderRadiusSize'], 'mobile' ) ); ?>;
				margin: <?php echo esc_attr( $this->build_dimensions_css( $attributes['marginSize'], 'mobile', true ) ); ?>;
				transition: all 0.3s ease-in-out;
			}
			@media screen and (min-width: 728px) {
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> {
					max-width: <?php echo $this->get_hierarchical_value( $attributes['maximumWidth'], 'tablet', '', 'width' ); ?><?php echo $this->get_hierarchical_value( $attributes['maximumWidth'], 'tablet', '', 'unit' ); ?>;
					border-width: <?php echo esc_attr( $this->build_dimensions_css( $attributes['borderWidth'], 'tablet' ) ); ?>;
					border-radius: <?php echo esc_attr( $this->build_dimensions_css( $attributes['borderRadiusSize'], 'tablet' ) ); ?>;
					margin: <?php echo esc_attr( $this->build_dimensions_css( $attributes['marginSize'], 'tablet', true ) ); ?>;
				}
			}
			@media screen and (min-width: 1024px) {
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> {
					max-width: <?php echo $this->get_hierarchical_value( $attributes['maximumWidth'], 'desktop', '', 'width' ); ?><?php echo $this->get_hierarchical_value( $attributes['maximumWidth'], 'desktop', '', 'unit' ); ?>;
					border-width: <?php echo esc_attr( $this->build_dimensions_css( $attributes['borderWidth'], 'desktop' ) ); ?>;
					border-radius: <?php echo esc_attr( $this->build_dimensions_css( $attributes['borderRadiusSize'], 'desktop' ) ); ?>;
					margin: <?php echo esc_attr( $this->build_dimensions_css( $attributes['marginSize'], 'desktop', true ) ); ?>;
				}
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> {
				transition: all 0.3s ease-in-out;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta,
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-text {
				position: relative;
				z-index: 2;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-wrapper  {
				padding: <?php echo esc_attr( $this->build_dimensions_css( $attributes['paddingSize'], 'mobile' ) ); ?>;
				position: relative;
			}
			@media screen and (min-width: 728px) {
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-wrapper {
					padding: <?php echo esc_attr( $this->build_dimensions_css( $attributes['paddingSize'], 'tablet' ) ); ?>;
				}
			}
			@media screen and (min-width: 1024px) {
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-wrapper {
					padding: <?php echo esc_attr( $this->build_dimensions_css( $attributes['paddingSize'], 'desktop' ) ); ?>;
				}
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>.has-background-color  {
				background-color: <?php echo esc_attr( $attributes['backgroundColor'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>.has-background-color:hover  {
				background-color: <?php echo esc_attr( $attributes['backgroundColorHover'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>.has-background-gradient  {
				background: <?php echo esc_attr( $attributes['backgroundGradient'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>.has-background-gradient:hover  {
				background: <?php echo esc_attr( $attributes['backgroundGradientHover'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> {
				border-color: <?php echo esc_attr( $attributes['borderColor'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>:hover {
				border-color: <?php echo esc_attr( $attributes['borderColorHover'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta {
				color: <?php echo esc_attr( $attributes['shareTextColor'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>:hover .has-click-to-share-cta {
				color: <?php echo esc_attr( $attributes['shareTextColorHover'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-text,
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-text p {
				color: <?php echo esc_attr( $attributes['textColor'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>:hover .has-click-to-share-text,
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>:hover .has-click-to-share-text p {
				color: <?php echo esc_attr( $attributes['textColorHover'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta svg {
				color: <?php echo esc_attr( $attributes['iconColor'] ); ?>;
				fill: <?php echo esc_attr( $attributes['iconColor'] ); ?>;
				width: <?php echo esc_attr( $attributes['iconSizeResponsive']['mobile'] ); ?>px;
				height: auto;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>:hover .has-click-to-share-cta svg {
				color: <?php echo esc_attr( $attributes['iconColorHover'] ); ?>;
				fill: <?php echo esc_attr( $attributes['iconColorHover'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta,
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta p {
				font-family: "<?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'desktop', 'fontFamily' ) ); ?>";
				font-size: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'mobile', 'fontSize' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'mobile', 'fontSizeUnit' ) ); ?>;
				font-weight: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'mobile', 'fontWeight' ) ); ?>;
				line-height: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'mobile', 'lineHeight' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'mobile', 'lineHeightUnit' ) ); ?>;
				letter-spacing: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'mobile', 'letterSpacing' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'mobile', 'letterSpacingUnit' ) ); ?>;
				text-transform: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'mobile', 'textTransform' ) ); ?>;

			}
			@media screen and (min-width: 728px) {
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta,
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta p {
					font-family: "<?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'desktop', 'fontFamily' ) ); ?>";
					font-size: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'tablet', 'fontSize' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'mobile', 'fontSizeUnit' ) ); ?>;
					font-weight: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'tablet', 'fontWeight' ) ); ?>;
					line-height: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'tablet', 'lineHeight' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'mobile', 'lineHeightUnit' ) ); ?>;
					letter-spacing: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'tablet', 'letterSpacing' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'mobile', 'letterSpacingUnit' ) ); ?>;
					text-transform: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'tablet', 'textTransform' ) ); ?>;
				}
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta svg {
					width: <?php echo esc_attr( $attributes['iconSizeResponsive']['tablet'] ); ?>px;
				}
			}
			@media screen and (min-width: 1024px) {
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta,
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta p {
					font-family: "<?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'desktop', 'fontFamily' ) ); ?>";
					font-size: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'desktop', 'fontSize' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'mobile', 'fontSizeUnit' ) ); ?>;
					font-weight: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'desktop', 'fontWeight' ) ); ?>;
					line-height: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'desktop', 'lineHeight' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'mobile', 'lineHeightUnit' ) ); ?>;
					letter-spacing: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'desktop', 'letterSpacing' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'mobile', 'letterSpacingUnit' ) ); ?>;
					text-transform: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyShareText'], 'desktop', 'textTransform' ) ); ?>;
				}
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta svg {
					width: <?php echo esc_attr( $attributes['iconSizeResponsive']['desktop'] ); ?>px;
				}
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta-text {
				display: <?php echo esc_attr( $attributes['showClickToShareText']['mobile'] ? 'inline' : 'none' ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta-svg {
				display: <?php echo esc_attr( $attributes['showClickToShareIcon']['mobile'] ? 'inline-flex' : 'none' ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-text,
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-text p {
				font-family: "<?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'desktop', 'fontFamily' ) ); ?>";
				font-size: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'mobile', 'fontSize' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'mobile', 'fontSizeUnit' ) ); ?>;
				font-weight: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'mobile', 'fontWeight' ) ); ?>;
				line-height: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'mobile', 'lineHeight' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'mobile', 'lineHeightUnit' ) ); ?>;
				letter-spacing: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'mobile', 'letterSpacing' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'mobile', 'letterSpacingUnit' ) ); ?>;
				text-transform: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'mobile', 'textTransform' ) ); ?>;

			}
			@media screen and (min-width: 728px) {
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta-svg {
				display: <?php echo esc_attr( $attributes['showClickToShareIcon']['tablet'] ? 'inline-flex' : 'none' ); ?>;
			}
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta-text {
					display: <?php echo esc_attr( $attributes['showClickToShareText']['tablet'] ? 'inline' : 'none' ); ?>;
				}
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-text,
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-text p {
					font-family: "<?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'desktop', 'fontFamily' ) ); ?>";
					font-size: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'tablet', 'fontSize' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'mobile', 'fontSizeUnit' ) ); ?>;
					font-weight: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'tablet', 'fontWeight' ) ); ?>;
					line-height: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'tablet', 'lineHeight' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'mobile', 'lineHeightUnit' ) ); ?>;
					letter-spacing: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'tablet', 'letterSpacing' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'mobile', 'letterSpacingUnit' ) ); ?>;
					text-transform: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'tablet', 'textTransform' ) ); ?>;
				}
			}
			@media screen and (min-width: 1024px) {
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta-svg {
					display: <?php echo esc_attr( $attributes['showClickToShareIcon']['desktop'] ? 'inline-flex' : 'none' ); ?>;
				}
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta-text {
					display: <?php echo esc_attr( $attributes['showClickToShareText']['desktop'] ? 'inline' : 'none' ); ?>;
				}
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-text,
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-text p {
					font-family: "<?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'desktop', 'fontFamily' ) ); ?>";
					font-size: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'desktop', 'fontSize' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'mobile', 'fontSizeUnit' ) ); ?>;
					font-weight: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'desktop', 'fontWeight' ) ); ?>;
					line-height: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'desktop', 'lineHeight' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'mobile', 'lineHeightUnit' ) ); ?>;
					letter-spacing: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'desktop', 'letterSpacing' ) ); ?><?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'mobile', 'letterSpacingUnit' ) ); ?>;
					text-transform: <?php echo esc_attr( $this->get_hierarchical_typography( $attributes['typographyQuote'], 'desktop', 'textTransform' ) ); ?>;
				}
			}
			<?php
			if ( 'image' === $attributes['backgroundType'] ) :
				?>
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>.has-background-image {
					background-color: <?php echo esc_attr( $attributes['backgroundImage']['backgroundColor'] ); ?>;
				}
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>.has-background-image .has-click-to-share-wrapper:after {
					display: block;
					content: '';
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 1;
					background-image: url('<?php echo esc_url( $attributes['backgroundImage']['url'] ); ?>');
					background-position: <?php echo esc_attr( $attributes['backgroundImage']['backgroundPosition'] ); ?>;
					background-repeat: <?php echo esc_attr( $attributes['backgroundImage']['backgroundRepeat'] ); ?>;
					background-size: <?php echo esc_attr( $attributes['backgroundImage']['backgroundSize'] ); ?>;
					opacity: <?php echo esc_attr( $attributes['backgroundImage']['backgroundOpacity'] ); ?>;
				}
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>.has-background-image .has-click-to-share-wrapper:hover:after {
					opacity: <?php echo esc_attr( $attributes['backgroundImage']['backgroundOpacityHover'] ); ?>;
				}
				<?php
			endif;
			?>
			/* resume here */
		</style>
		<?php
		if ( ! wp_style_is( 'has-style-frontend-css', 'registered' ) ) {
			wp_register_style(
				'has-style-frontend-css',
				Functions::get_plugin_url( 'dist/has-cts-style.css' ),
				array(),
				HIGHLIGHT_AND_SHARE_VERSION,
				'all'
			);
			wp_print_styles( array( 'has-style-frontend-css' ) );
		}
		?>
		<?php
		$container_classes = array(
			'has-click-to-share',
			'align' . $attributes['align'],
		);
		if ( 'image' === $attributes['backgroundType'] ) {
			$container_classes[] = 'has-background-image';
		}
		if ( 'solid' === $attributes['backgroundType'] ) {
			$container_classes[] = 'has-background-color';
		}
		if ( 'gradient' === $attributes['backgroundType'] ) {
			$container_classes[] = 'has-background-gradient';
		}

		// Get the share text for data attribute and JS sharing.
		$share_content         = ! empty( $content ) ? $content : $attributes['shareText'];
		$share_content         = wp_strip_all_tags( $share_content );
		$share_content_trimmed = preg_replace( '/\n+/', "\n\n", trim( $share_content ) ); // Replace newline chars with single newline.

		// Get the custom share text if available.
		$custom_share_text = ! empty( $attributes['customShareText'] ) ? $attributes['customShareText'] : '';
		if ( ! empty( $custom_share_text ) ) {
			$custom_share_text = wp_strip_all_tags( $custom_share_text );
			$custom_share_text = preg_replace( '/\n+/', "\n\n", trim( $custom_share_text ) ); // Replace newline chars with single newline.

			// Override trimmed share content.
			$share_content_trimmed = $custom_share_text;
		}
		?>
		<div class='<?php echo esc_attr( implode( ' ', $container_classes ) ); ?>' id="<?php echo esc_attr( $attributes['uniqueId'] ); ?>">
			<div class="has-click-to-share-wrapper">
				<div class="has-click-to-share-text" data-text-full="<?php echo esc_attr( $share_content_trimmed ); ?>">
					<?php
					// Make sure shareText isn't empty. If it is, use InnerBlocks content instead.
					if ( empty( $content ) && ! empty( $attributes['shareText'] ) ) {
						echo wp_kses_post( $attributes['shareText'] );
					} elseif ( ! empty( $content ) ) {
						echo wp_kses_post( $content );
					}
					?>
				</div>
				<div class='has-click-to-share-cta'>
					<?php
					echo '<span class="has-click-to-share-cta-text">';
					echo wp_kses_post( $attributes['clickText'] );
					echo '</span>';
					if ( (bool) $attributes['showClickToShare'] && (bool) $attributes['showIcon'] ) {
						echo '&nbsp;';
					}
					$icon = $attributes['icon'];
					if ( (bool) $attributes['showIcon'] ) {
						?>
						<span class="has-click-to-share-cta-svg"><?php echo wp_kses( $attributes['icon'], Functions::get_kses_allowed_html( true ) ); ?></span>
						<?php
					}
					?>
				</div>
				<a class="has-click-prompt" href="#" data-title="<?php echo esc_attr( $post->post_title ); ?>" data-url="<?php echo esc_url( get_permalink( $post->ID ) ); ?>">
				</a>
			</div>
		</div>
		<?php

		return ob_get_clean();
	}

	/**
	 * Output Click to Share Gutenberg block on the front-end (legacy markup).
	 *
	 * @param array $attributes Array of attributes for the Gutenberg block.
	 */
	public function get_legacy_frontend( $attributes ) {
		ob_start();
		global $post;
		$share_content         = wp_strip_all_tags( $attributes['shareText'] );
		$share_content_trimmed = preg_replace( '/\n+/', "\n\n", trim( $share_content ) ); // Replace newline chars with single newline.
		?>
		<div class='has-click-to-share' style="padding: <?php echo esc_attr( $attributes['padding'] ); ?>px; border: <?php echo esc_attr( $attributes['border'] . 'px solid ' . $attributes['borderColor'] ); ?>; border-radius: <?php echo esc_attr( $attributes['borderRadius'] ); ?>px; background-color: <?php echo esc_attr( $attributes['backgroundColor'] ); ?>; color: <?php echo esc_attr( $attributes['textColor'] ); ?>; max-width: <?php echo esc_attr( $attributes['maxWidth'] ); ?>%; margin-left: <?php echo esc_attr( $attributes['marginLeft'] ); ?>px; margin-right: <?php echo esc_attr( $attributes['marginRight'] ); ?>px; margin-bottom: <?php echo esc_attr( $attributes['marginBottom'] ); ?>px; margin-Top: <?php echo esc_attr( $attributes['marginTop'] ); ?>px; <?php echo 'center' === $attributes['alignment'] ? 'margin: ' . esc_attr( $attributes['marginTop'] ) . 'px auto ' . esc_attr( $attributes['marginBottom'] ) . 'px auto;' : ''; ?><?php echo 'left' === $attributes['alignment'] ? 'float: left;' : ''; ?><?php echo 'right' === $attributes['alignment'] ? 'float: right;' : ''; ?>">
			<div class="has-click-to-share-wrapper">
				<div class="has-click-to-share-text" style="color: <?php echo esc_attr( $attributes['textColor'] ); ?>; font-size: <?php echo esc_attr( $attributes['fontSize'] ); ?>px; font-weight: <?php echo esc_attr( $attributes['fontWeight'] ); ?>" data-text-full="<?php echo esc_attr( $share_content_trimmed ); ?>">
					<?php echo wp_kses_post( $attributes['shareText'] ); ?>
				</div>
				<div class='has-click-to-share-cta' style="font-size: <?php echo esc_attr( $attributes['clickShareFontSize'] ); ?>px; color: <?php echo esc_attr( $attributes['textColor'] ); ?>">
				<?php echo wp_kses_post( $attributes['clickText'] ); ?> <svg width="<?php echo esc_attr( $attributes['clickShareFontSize'] ); ?>px" height="<?php echo esc_attr( $attributes['clickShareFontSize'] ); ?>px" class="has-cts-block-icon"><use xlink:href="#has-share-icon"></use></svg>
				</div>
				<a class="has-click-prompt" href="#" data-title="<?php echo esc_attr( $post->post_title ); ?>" data-url="<?php echo esc_url( get_permalink( $post->ID ) ); ?>" data-text-full="<?php echo esc_attr( $share_content_trimmed ); ?>">
				</a>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Build the CSS for the dimensions components.
	 *
	 * @param array  $sizes {
	 *   An array of sizes.
	 *
	 *   @type string $top The top dimension.
	 *   @type string $right The right dimension.
	 *   @type string $bottom The bottom dimension.
	 *   @type string $left The left dimension.
	 *   @type string $unit The dimensikon's unit.
	 * }
	 * @param string $screen_size Screen size (desktop|mobile|tablet).
	 * @param bool   $is_margin   Whether the dimension is a margin or not (so we do not set left/right margins).
	 *
	 * @return string The CSS for the dimensions.
	 */
	public function build_dimensions_css( $sizes, $screen_size = 'desktop', $is_margin = false ) {
		$dimensions = $sizes[ $screen_size ];

		if ( 'desktop' === $screen_size ) {
			$css = $this->get_dimensions_shorthand(
				$dimensions['top'],
				$dimensions['right'],
				$dimensions['bottom'],
				$dimensions['left'],
				$dimensions['unit'],
				$is_margin
			);
			return $css;
		}
		if ( 'tablet' === $screen_size || 'mobile' === $screen_size ) {
			$css = $this->get_dimensions_shorthand(
				$this->get_hierarchical_value( $sizes, $screen_size, $dimensions['top'], 'top' ),
				$this->get_hierarchical_value( $sizes, $screen_size, $dimensions['right'], 'right' ),
				$this->get_hierarchical_value( $sizes, $screen_size, $dimensions['bottom'], 'bottom' ),
				$this->get_hierarchical_value( $sizes, $screen_size, $dimensions['left'], 'left' ),
				$this->get_hierarchical_value_unit( $sizes, $screen_size, $dimensions['unit'], 'unit' ),
				$is_margin
			);
			return $css;
		}

		return '';
	}

	/**
	 * Return a hierarchical unit value.
	 *
	 * @param array  $sizes {
	 *   An array of sizes.
	 *
	 *   @type string $top The top dimension.
	 *   @type string $right The right dimension.
	 *   @type string $bottom The bottom dimension.
	 *   @type string $left The left dimension.
	 *   @type string $unit The dimensikon's unit.
	 * }
	 * @param string $screen_size Screen size (desktop|mobile|tablet).
	 * @param string $value       The unit value (px, em, rem).
	 *
	 * @return string The unit to use.
	 */
	public function get_hierarchical_value_unit( $sizes, $screen_size, $value ) {
		// Check mobile screen size.
		if ( 'mobile' === $screen_size && null === $value ) {
			if ( null === $sizes['tablet']['unit'] ) {
				return $sizes['desktop']['unit'];
			}
			return $sizes['tablet']['unit'];
		}
		if ( 'tablet' === $screen_size && null === $value ) {
			return $sizes['desktop']['unit'];
		}
		if ( null === $value ) {
			return 'px';
		}
		return $value;
	}

	/**
	 * Get the hierarchical value for the dimension and screen size.
	 *
	 * @param array  $sizes {
	 *   An array of sizes.
	 *
	 *   @type string $top The top dimension.
	 *   @type string $right The right dimension.
	 *   @type string $bottom The bottom dimension.
	 *   @type string $left The left dimension.
	 *   @type string $unit The dimensikon's unit.
	 * }
	 * @param string $screen_size Screen size (desktop|mobile|tablet).
	 * @param string $value       The dimension value.
	 * @param string $type        The dimension type (top|right|bottom|left).
	 *
	 * @return string The value of the dimension type.
	 */
	public function get_hierarchical_value( $sizes, $screen_size, $value, $type ) {
		// Check mobile screen size.
		if ( 'mobile' === $screen_size && '' === $value ) {
			// Check tablet.
			if ( '' !== $sizes['tablet'][ $type ] ) {
				return $sizes['tablet'][ $type ];
			} elseif ( '' !== $sizes['desktop'][ $type ] ) {
				// Check desktop.
				return $sizes['desktop'][ $type ];
			}
		}

		// Check tablet screen size.
		if ( 'tablet' === $screen_size && '' === $value ) {
			if ( '' !== $sizes['desktop'][ $type ] ) {
				// Check desktop.
				return $sizes['desktop'][ $type ];
			}
		}

		if ( 'desktop' === $screen_size && '' === $value ) {
			if ( isset( $sizes['desktop'][ $type ] ) ) {
				return $sizes['desktop'][ $type ];
			}
		}

		if ( '' !== $value ) {
			return $value;
		}

		return '0';
	}

	/**
	 * Get the hierarchical value for the dimension and screen size.
	 *
	 * @param array  $typography_settings {
	 *   An array of typography settings.
	 *
	 *   @type string $fontFamily        The Font Family.
	 *   @type string $fontFamilySlug    Font Family slug.
	 *   @type string $fontSize          The font size.
	 *   @type string $fontSizeUnit      The font size unit.
	 *   @type string $fontWeight        Font weight (100, 200, etc.).
	 *   @type string $lineHeight        The line height.
	 *   @type string $lineHeightUnit    The line height unit.
	 *   @type string $textTransform     The text transform (uppercase, lowercase, etc.).
	 *   @type string $letterSpacing     The letter spacing.
	 *   @type string $letterSpacingUnit The letter spacing unit.
	 *   @type string $fontType          The font type (google|adobe|web).
	 *   @type string $fontFallback      The font fallback.
	 * }
	 * @param string $screen_size Screen size (desktop|mobile|tablet).
	 * @param string $type        The dimension type (top|right|bottom|left).
	 *
	 * @return string The value of the typography type.
	 */
	public function get_hierarchical_typography( $typography_settings, $screen_size, $type ) {
		// Check mobile screen size.
		if ( 'mobile' === $screen_size && '' === $typography_settings[ $screen_size ][ $type ] ) {
			// Check tablet.
			if ( '' !== $typography_settings['tablet'][ $type ] ) {
				return $typography_settings['tablet'][ $type ];
			} elseif ( '' !== $typography_settings['desktop'][ $type ] ) {
				// Check desktop.
				return $typography_settings['desktop'][ $type ];
			}
		}

		// Check tablet screen size.
		if ( 'tablet' === $screen_size && '' === $typography_settings[ $screen_size ][ $type ] ) {
			if ( '' !== $typography_settings['desktop'][ $type ] ) {
				// Check desktop.
				return $typography_settings['desktop'][ $type ];
			}
		}

		if ( '' !== $typography_settings[ $screen_size ][ $type ] ) {
			return $typography_settings[ $screen_size ][ $type ];
		}

		return '';
	}

	/**
	 * Return dimensions shorthand.
	 *
	 * @param string $top   The top dimension.
	 * @param string $right The right dimension.
	 * @param string $bottom The bottom dimension.
	 * @param string $left The left dimension.
	 * @param string $unit The dimensions's unit.
	 * @param bool   $is_margin Whether margin is set so left right values are not set.
	 *
	 * @return string The shorthand CSS for the dimensions.
	 */
	public function get_dimensions_shorthand( $top, $right, $bottom, $left, $unit, $is_margin = false ) {
		if ( '' === $top && '' === $right && '' === $bottom && '' === $left ) {
			return;
		}

		$top    = ( 0 !== (float) $top && '' !== $top ) ? (float) $top . $unit . ' ' : '0 ';
		$right  = ( 0 !== (float) $right && '' !== $right ) ? (float) $right . $unit . ' ' : '0 ';
		$bottom = ( 0 !== (float) $bottom && '' !== $bottom ) ? (float) $bottom . $unit . ' ' : '0 ';
		$left   = ( 0 !== (float) $left && '' !== $left ) ? (float) $left . $unit . ' ' : '0 ';

		if ( $right === $left ) {
			$left = '';

			if ( $top === $bottom ) {

				if ( $top === $right ) {
					$right = '';
				}
			}
		}

		if ( $is_margin ) {
			$right = ' auto ';
			$left  = ' auto ';
		}

		$output = $top . $right . $bottom . $left;
		return trim( $output );
	}
}
