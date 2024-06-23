<?php
/**
 * Helper functions for the plugin.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Class Frontend
 */
class Frontend {

	/**
	 * Class runner.
	 */
	public function run() {
		add_action( 'wp', array( $this, 'wp_loaded' ), 15 );
	}

	/**
	 * When WP is loaded, output scripts.
	 */
	public function wp_loaded() {
		// Disable if on a feed.
		if ( is_feed() ) {
			return;
		}

		$settings = Options::get_plugin_options();

		/**
		 * Filter: has_show_facebook
		 *
		 * Hide or show the Facebook sharing option.
		 *
		 * @param bool true to show Facebook, false to not.
		 */
		$show_facebook = (bool) apply_filters( 'has_show_facebook', $settings['show_facebook'] );

		/**
		 * Filter: has_show_twitter
		 *
		 * Hide or show the Twitter sharing option.
		 *
		 * @param bool true to show Twitter, false to not.
		 */
		$show_twitter = (bool) apply_filters( 'has_show_twitter', $settings['show_twitter'] );

		/**
		 * Filter: has_show_linkedin
		 *
		 * Hide or show the LinkedIn sharing option.
		 *
		 * @param bool true to show LinkedIn, false to not.
		 */
		$show_linkedin = (bool) apply_filters( 'has_show_linkedin', $settings['show_linkedin'] );
		$show_ok       = (bool) apply_filters( 'has_show_ok', $settings['show_ok'] );
		$show_vk       = (bool) apply_filters( 'has_show_vk', $settings['show_vk'] );

		/**
		 * Filter: has_show_email
		 *
		 * Hide or show the email sharing option.
		 *
		 * @param bool true to show email, false to not.
		 */
		$show_email = (bool) apply_filters( 'has_show_email', $settings['show_email'] ?? $settings['enable_emails'] );

		/**
		 * Filter: has_show_tumblr
		 *
		 * Hide or show the Tumblr sharing option.
		 *
		 * @param bool true to show Tumblr, false to not.
		 */
		$show_tumblr = (bool) apply_filters( 'has_show_tumblr', $settings['show_tumblr'] );

		/**
		 * Filter: has_show_copy
		 *
		 * Hide or show the copy option.
		 *
		 * @param bool true to show copy feature, false to not.
		 */
		$show_copy = (bool) apply_filters( 'has_show_copy', $settings['show_copy'] );

		/**
		 * Filter: has_show_reddit
		 *
		 * Hide or show the reddit option.
		 *
		 * @param bool true to show reddit social network, false to not.
		 */
		$show_reddit = (bool) apply_filters( 'has_show_reddit', isset( $settings['show_reddit'] ) ? $settings['show_reddit'] : false );

		/**
		 * Filter: has_show_telegram
		 *
		 * Hide or show the Telegram option.
		 *
		 * @param bool true to show Telegram feature, false to not.
		 */
		$show_telegram = (bool) apply_filters( 'has_show_telegram', isset( $settings['show_telegram'] ) ? $settings['show_telegram'] : false );

		/**
		 * Filter: has_show_whatsapp
		 *
		 * Hide or show the WhatsApp option.
		 *
		 * @param bool true to show WhatsApp feature, false to not.
		 */
		$show_whatsapp = (bool) apply_filters( 'has_show_whatsapp', isset( $settings['show_whats_app'] ) ? $settings['show_whats_app'] : false );

		/**
		 * Filter: has_show_webshare
		 *
		 * Hide or show the Webshare option.
		 *
		 * @param bool true to show WhatsApp feature, false to not.
		 */
		$show_webshare = (bool) apply_filters( 'has_show_webshare', isset( $settings['show_webshare'] ) ? $settings['show_webshare'] : false );

		/**
		 * Filter: has_show_mastodon
		 *
		 * Hide or show the Mastodon option.
		 *
		 * @param bool true to show Mastodon feature, false to not.
		 */
		$show_mastodon = (bool) apply_filters( 'has_show_mastodon', isset( $settings['show_mastodon'] ) ? $settings['show_mastodon'] : false );

		/**
		 * Filter: has_show_threads
		 *
		 * Hide or show the Mastodon option.
		 *
		 * @param bool true to show Mastodon feature, false to not.
		 */
		$show_threads = (bool) apply_filters( 'has_show_threads', isset( $settings['show_threads'] ) ? $settings['show_threads'] : false );

		/**
		 * Filter: has_show_bluesky
		 *
		 * Hide or show the Bluesky option.
		 *
		 * @param bool true to show Bluesky feature, false to not.
		 */
		$show_bluesky = (bool) apply_filters( 'has_show_bluesky', isset( $settings['show_bluesky'] ) ? $settings['show_bluesky'] : false );

		// Placeholder for signal.
		$show_signal = false;

		// If no social network is active, exit.
		if ( ! $show_facebook && ! $show_twitter && ! $show_linkedin && ! $show_ok && ! $show_email && ! $show_copy && ! $show_reddit && ! $show_telegram && ! $show_whatsapp && ! $show_tumblr && ! $show_webshare && ! $show_mastodon && ! $show_threads && ! $show_bluesky ) {
			return;
		}

		// Load scripts.
		add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts' ) );

		// Load html.
		add_action( 'wp_footer', array( $this, 'add_footer_html' ) );

		// Load in comments.
		add_filter( 'comment_text', array( $this, 'add_comment_area_html' ) );

		// Add Pinterest and Web Share to image tags. WP 6.2 and up.
		add_filter( 'the_content', array( $this, 'add_image_sharing_html' ), 5 );
		add_filter( 'et_pb_post_content_shortcode_output', array( $this, 'add_image_sharing_html' ), 11 );

		// For the Click to Share Shortcode.
		add_shortcode( 'has_click_to_share', array( $this, 'output_shortcode' ) );

		/**
		 * Filter: has_enable_content
		 *
		 * Whether Highlight and Share will work on regular post or page content.
		 *
		 * @param bool true to enable HAS on post content, false to not.
		 */
		if ( apply_filters( 'has_enable_content', (bool) $settings['enable_content'] ) ) {
			add_filter( 'the_content', array( $this, 'content_area' ) );
		}

		/**
		 * Filter: has_enable_excerpt
		 *
		 * Whether Highlight and Share will work on post excerpts.
		 *
		 * @param bool true to enable HAS on excerpts, false to not.
		 */
		if ( apply_filters( 'has_enable_excerpt', (bool) $settings['enable_excerpt'] ) ) {
			add_filter( 'the_excerpt', array( $this, 'excerpt_area' ) );
		}
	}

	/**
	 * Output the Click to Share Shortcode.
	 *
	 * @param array  $atts    Shortcode attributes.
	 * @param string $content Shortcode content.
	 *
	 * @return string Shortcode output.
	 */
	public function output_shortcode( $atts, $content ) {
		$shortcode_defaults = array(
			'unique_id'                => 'has-' . uniqid(),
			'theme'                    => 'default',
			'align'                    => 'center',
			'margin'                   => '0px',
			'show_click_to_share'      => 'true',
			'show_click_to_share_text' => 'true',
			'show_icon'                => 'true',
			'icon_size'                => 'medium', /* can be small|medium|large */
			'custom_share_text'        => '',
			'background_color'         => '',
			'background_color_hover'   => '',
			'icon'                     => 'has-share-1',
			'icon_color'               => '',
			'icon_color_hover'         => '',
			'text_color'               => '',
			'text_color_hover'         => '',
			'share_text_color'         => '',
			'share_text_color_hover'   => '',
			'font_family'              => 'Lato', /* can be: Josefin Sans, Karla, Lato, Montserrat, Open Sans,Playfair Display, Raleway, Roboto, Source Sans Pro. */
			'button_font_family'       => 'Lato', /* can be: Josefin Sans, Karla, Lato, Montserrat, Open Sans,Playfair Display, Raleway, Roboto, Source Sans Pro. */
			'font_size'                => 'medium', /* can be small|medium|large */
			'click_share_font_size'    => 'medium', /* can be small|medium|large */
			'click_text'               => 'Click to Share',
			'padding'                  => '',
			'border'                   => '',
			'border_hover'             => '',
			'border_radius'            => '',
			'max_width'                => '',
		);

		// Parse attributes.
		$attributes = shortcode_atts( $shortcode_defaults, $atts );

		// Get font slug.
		$font_slug = sanitize_title( $attributes['font_family'] );

		// If font exists and isn't enqueued, print it.
		if ( file_exists( Functions::get_plugin_dir( 'dist/has-gfont-' . $font_slug . '.css' ) ) ) {
			if ( ! wp_style_is( 'has-google-font-' . $font_slug, 'done' ) ) {
				wp_register_style(
					'has-google-font-' . $font_slug,
					esc_url( Functions::get_plugin_url( 'dist/has-gfont-' . $font_slug . '.css' ) ),
					array(),
					HIGHLIGHT_AND_SHARE_VERSION,
					'all'
				);
				wp_print_styles( array( 'has-google-font-' . $font_slug ) );
			}
		}

		// Get button font slug.
		$button_font_slug = sanitize_title( $attributes['button_font_family'] );
		if ( file_exists( Functions::get_plugin_dir( 'dist/has-gfont-' . $button_font_slug . '.css' ) ) ) {
			if ( ! wp_style_is( 'has-google-font-' . $button_font_slug, 'done' ) ) {
				wp_register_style(
					'has-google-font-' . $button_font_slug,
					esc_url( Functions::get_plugin_url( 'dist/has-gfont-' . $button_font_slug . '.css' ) ),
					array(),
					HIGHLIGHT_AND_SHARE_VERSION,
					'all'
				);
				wp_print_styles( array( 'has-google-font-' . $button_font_slug ) );
			}
		}

		// Get click to share text.
		$share_content        = $content;
		$custom_share_content = $attributes['custom_share_text'];

		// Let's format the share content.
		$share_content        = wp_kses_post( $content );
		$custom_share_content = sanitize_text_field( \wp_strip_all_tags( $custom_share_content ) );
		if ( empty( $custom_share_content ) ) {
			$custom_share_content = sanitize_text_field( \wp_strip_all_tags( $share_content ) );
		}

		// Let's get container classes.
		$container_classes = array(
			'has-click-to-share',
			'has-cts-shortcode',
			'has-cts-shortcode-theme-' . $attributes['theme'],
			'has-cts-shortcode-align-' . $attributes['align'],
			'has-cts-shortcode-icon-size-' . $attributes['icon_size'],
			'has-cts-shortcode-font-size-' . $attributes['font_size'],
			'has-cts-shortcode-button-font-size-' . $attributes['click_share_font_size'],
		);

		// Add custom styling per-shortcode.
		$css_vars = array();
		if ( ! empty( $attributes['background_color'] ) ) {
			$css_vars['--has-cts-background'] = $attributes['background_color'];
		}
		if ( ! empty( $attributes['background_color_hover'] ) ) {
			$css_vars['--has-cts-background-hover'] = $attributes['background_color_hover'];
		}
		if ( ! empty( $attributes['icon_color'] ) ) {
			$css_vars['--has-cts-icon-color'] = $attributes['icon_color'];
		}
		if ( ! empty( $attributes['icon_color_hover'] ) ) {
			$css_vars['--has-cts-icon-color-hover'] = $attributes['icon_color_hover'];
		}
		if ( ! empty( $attributes['text_color'] ) ) {
			$css_vars['--has-cts-text-color'] = $attributes['text_color'];
		}
		if ( ! empty( $attributes['text_color_hover'] ) ) {
			$css_vars['--has-cts-text-color-hover'] = $attributes['text_color_hover'];
		}
		if ( ! empty( $attributes['share_text_color'] ) ) {
			$css_vars['--has-cts-share-text-color'] = $attributes['share_text_color'];
		}
		if ( ! empty( $attributes['share_text_color_hover'] ) ) {
			$css_vars['--has-cts-share-text-color-hover'] = $attributes['share_text_color_hover'];
		}
		if ( ! empty( $attributes['margin'] ) ) {
			$css_vars['--has-cts-margin'] = $attributes['margin'];
		}
		if ( ! empty( $attributes['padding'] ) ) {
			$css_vars['--has-cts-padding'] = $attributes['padding'];
		}
		if ( ! empty( $attributes['border'] ) ) {
			$css_vars['--has-cts-border'] = $attributes['border'];
		}
		if ( ! empty( $attributes['border_hover'] ) ) {
			$css_vars['--has-cts-border-hover'] = $attributes['border_hover'];
		}
		if ( ! empty( $attributes['border_radius'] ) ) {
			$css_vars['--has-cts-border-radius'] = $attributes['border_radius'];
		}
		if ( ! empty( $attributes['max_width'] ) ) {
			$css_vars['--has-cts-max-width'] = $attributes['max_width'];
		}
		if ( ! empty( $attributes['font_family'] ) ) {
			$css_vars['--has-cts-font-family'] = $attributes['font_family'];
		}
		if ( ! empty( $attributes['button_font_family'] ) ) {
			$css_vars['--has-cts-button-font-family'] = $attributes['button_font_family'];
		}
		ob_start();
		// Print styles if not already done.
		if ( ! wp_style_is( 'has-shortcode-themes', 'done' ) ) {
			wp_print_styles( array( 'has-shortcode-themes' ) );
		}

		// Print custom CSS.
		if ( ! empty( $css_vars ) ) {
			?>
			<style>
				.has-cts-shortcode#<?php echo esc_attr( $attributes['unique_id'] ); ?> {
					<?php
					foreach ( $css_vars as $css_var => $css_value ) {
						echo $css_var . ': ' . $css_value . ';';
					}
					?>
				}
			</style>
			<?php
		}
		// Print Footer SVGs.
		add_action( 'wp_footer', array( $this, 'output_shortcode_footer_svgs' ) );
		?>
		<div class='<?php echo esc_attr( implode( ' ', $container_classes ) ); ?>' id="<?php echo esc_attr( $attributes['unique_id'] ); ?>">
			<div class="has-cts-wrapper">
				<div class="has-click-to-share-text" data-text-full="<?php echo esc_attr( $custom_share_content ); ?>">
					<?php
					echo wp_kses_post( $share_content );
					?>
				</div>
				<?php
				if ( 'true' === $attributes['show_click_to_share'] ) :
					?>
					<div class='has-click-to-share-cta'>
						<?php
						if ( 'true' === $attributes['show_click_to_share_text'] ) {
							echo '<span class="has-click-to-share-cta-text">';
							echo wp_kses_post( $attributes['click_text'] );
							echo '</span>';
							if ( 'true' === $attributes['show_click_to_share'] && 'true' === $attributes['show_icon'] ) {
								echo '&nbsp;';
							}
						}
						$icon = $attributes['icon'];
						if ( 'true' === $attributes['show_icon'] ) {
							?>
							<span class="has-click-to-share-cta-svg">
								<?php
								// Doing switch statement here because of width/height ratio needs to respect viewbox.
								switch ( $icon ) {
									case 'has-share-1':
										?>
										<svg aria-hidden="true" width="24px" height="26.8px">
											<use xlink:href="#has-share-1"></use>
										</svg>
										<?php
										break;
									case 'has-share-2':
										?>
										<svg aria-hidden="true" width="24px" height="25.1px">
											<use xlink:href="#has-share-2"></use>
										</svg>
										<?php
										break;
									case 'has-share-3':
										?>
										<svg aria-hidden="true" width="24px" height="26.9px">
											<use xlink:href="#has-share-3"></use>
										</svg>
										<?php
										break;
									case 'has-share-4':
										?>
										<svg aria-hidden="true" width="24px" height="13.4px">
											<use xlink:href="#has-share-4"></use>
										</svg>
										<?php
										break;
									case 'has-share-5':
										?>
										<svg aria-hidden="true" width="24px" height="16.9px">
											<use xlink:href="#has-share-5"></use>
										</svg>
										<?php
										break;
									case 'has-share-6':
										?>
										<svg aria-hidden="true" width="24px" height="33.4px">
											<use xlink:href="#has-share-6"></use>
										</svg>
										<?php
										break;
									case 'has-share-7':
										?>
										<svg aria-hidden="true" width="24px" height="24px">
											<use xlink:href="#has-share-7"></use>
										</svg>
										<?php
										break;
									case 'has-share-8':
										?>
										<svg aria-hidden="true" width="24px" height="22.9px">
											<use xlink:href="#has-share-8"></use>
										</svg>
										<?php
										break;
									case 'has-share-9':
										?>
										<svg aria-hidden="true" width="24px" height="27.4px">
											<use xlink:href="#has-share-9"></use>
										</svg>
										<?php
										break;
									default:
										?>
										<svg aria-hidden="true" width="24px" height="26.8px">
											<use xlink:href="#has-share-1"></use>
										</svg>
										<?php
										break;
								}
								?>
							</span>
							<?php
						}
						?>
					</div>
					<?php
				endif;

				global $post;
				?>
				<a class="has-click-prompt" href="#" data-title="<?php echo esc_attr( $post->post_title ); ?>" data-url="<?php echo esc_url( get_permalink( $post->ID ) ); ?>">
				</a>
			</div>
		</div>
		<?php
		$shortcode_output = ob_get_clean();
		return $shortcode_output;
	}

	/**
	 * Add Pinterest/Webshare to image tags where applicable.
	 *
	 * @param string $content The content HTML.
	 */
	public function add_image_sharing_html( $content ) {
		// If we're not in the loop, bail.
		if ( is_admin() || is_feed() || ( ! is_singular() && ! is_page() && ! is_single() ) ) {
			return $content;
		}
		$options = Options::get_image_options();

		// If image sharing is not enabled, exit early.
		if ( ! (bool) $options['enable_image_sharing'] ) {
			return $content;
		}

		// Load for supported post types.
		$post_types = $options['supported_post_types'];
		// Get enabled post types.
		$supported_post_types = array();
		foreach ( $post_types as $post_type => $enabled ) {
			if ( $enabled ) {
				$supported_post_types[] = $post_type;
			}
		}
		$supported_post_types = apply_filters( 'has_pin_supported_post_types', $supported_post_types );
		$can_show_on_post     = in_array( get_post_type(), $supported_post_types, true );

		// If we're not on a supported post type, bail.
		if ( ! $can_show_on_post ) {
			return $content;
		}

		$dom = new \DOMDocument( '1.0', 'UTF-8' );
		try {
			libxml_use_internal_errors( true );
			@ $dom->loadHTML( '<?xml encoding="utf-8" ?>' . $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD ); // phpcs:ignore 
			libxml_clear_errors();

		} catch ( \Exception $e ) {
			return $content;
		}
		$options = Options::get_image_options();

		// Get core exclusions.
		$core_exclusions = array(
			'has-no-pin',
		);

		$can_show_pinterest    = (bool) $options['enable_pinterest_sharing'];
		$can_show_webshare     = (bool) $options['enable_webshare_sharing'];
		$show_on_hover         = (bool) $options['show_on_hover'];
		$sharing_location      = $options['location'];
		$show_button_labels    = (bool) $options['show_button_labels'];
		$exclude_leading_image = (bool) $options['exclude_leading_image'];
		$button_shape          = $options['button_shape'];

		// Get image wrapper CSS classes.
		$css_classes = array( 'has-pin-image-wrapper' );
		if ( 'top-left' === $sharing_location ) {
			$css_classes[] = 'has-pin-top-left';
		}
		if ( 'top-right' === $sharing_location ) {
			$css_classes[] = 'has-pin-top-right';
		}
		if ( 'bottom-left' === $sharing_location ) {
			$css_classes[] = 'has-pin-bottom-left';
		}
		if ( 'bottom-right' === $sharing_location ) {
			$css_classes[] = 'has-pin-bottom-right';
		}
		if ( 'center-center' === $sharing_location ) {
			$css_classes[] = 'has-pin-center-center';
		}
		if ( $show_on_hover ) {
			$css_classes[] = 'has-pin-show-on-hover';
		}
		$css_classes = apply_filters( 'has_pin_image_css_classes', $css_classes );

		// Get SVG wrapper CSS.
		$sharing_wrapper_css = array( 'has-pin-sharing-icons' );
		if ( $show_button_labels ) {
			$sharing_wrapper_css[] = 'has-icon-label';
		}
		if ( 'round' === $button_shape ) {
			$sharing_wrapper_css[] = 'has-appearance-round';
		}
		if ( 'square' === $button_shape ) {
			$sharing_wrapper_css[] = 'has-appearance-square';
		}
		if ( 'circle' === $button_shape ) {
			$sharing_wrapper_css[] = 'has-appearance-circle';
		}

		// Get all images.
		$images   = $dom->getElementsByTagName( 'img' );
		$can_skip = false;
		foreach ( $images as $image ) {
			// Skip leading image if enabled.
			if ( $exclude_leading_image && ! $can_skip ) {
				$can_skip = true;
				continue;
			}

			/**
			 * Filter: has_pin_core_exclusions
			 *
			 * Add core exclusions to the image sharing.
			 *
			 * @param array $core_exclusions Array of core exclusions.
			 */
			$core_exclusions = apply_filters( 'has_pin_core_exclusions', $core_exclusions );
			// Get image innerHTML.
			$image_element  = $dom->saveHTML( $image );
			$parent_element = $image->parentNode; // Can possibly be an anchor or figure tag.
			if ( 'a' === $parent_element->tagName ) {
				$parent_element = $parent_element->parentNode; // Can possibly be a figure tag.

				// If the parent is a figure tag, try to get its parent, which can also be a figure (gallery).
				if ( isset( $parent_element->tagName ) && 'figure' === $parent_element->tagName ) {
					$maybe_new_parent_element = $parent_element->parentNode;
					if ( isset( $maybe_new_parent_element->tagName ) && 'figure' === $maybe_new_parent_element->tagName ) {
						$parent_element = $maybe_new_parent_element;
					}
				}
			} elseif ( isset( $parent_element->tagName ) && 'figure' === $parent_element->tagName ) {
				// Try to get its parent, which may possibly be a gallery.
				$maybe_new_parent_element = $parent_element->parentNode;
				if ( isset( $maybe_new_parent_element->tagName ) && 'figure' === $maybe_new_parent_element->tagName ) {
					$parent_element = $maybe_new_parent_element;
				}
			}
			$parent_html = '';
			if ( $parent_element ) {
				$parent_html = $dom->saveHTML( $parent_element );
			}

			// Merge core and user exclusions.
			$exclusions = array_merge( $core_exclusions, array_map( 'trim', explode( ',', sanitize_text_field( $options['exclusions'] ) ) ) ); // failing here.

			$exclusions = array_unique( array_filter( $exclusions ) );

			// Check for exclusions.
			$found_exclusion = false;
			if ( ! empty( $exclusions ) ) {
				foreach ( $exclusions as $exclusion ) {
					if ( false !== strpos( $image_element, $exclusion ) || false !== strpos( $parent_html, $exclusion ) ) {
						$found_exclusion = true;
					}
				}
			}
			if ( $found_exclusion ) {
				continue;
			}

			// Create wrapper span.
			$wrapper = $dom->createElement( 'span' );
			$wrapper->setAttribute( 'class', implode( ' ', $css_classes ) );

			// Wrap around the image.
			$image->parentNode->replaceChild( $wrapper, $image );
			$wrapper->appendChild( $image );

			// Now create child SVG to go adjacent to image tag.
			$svg = $dom->createElement( 'span' );
			$svg->setAttribute( 'class', implode( ' ', $sharing_wrapper_css ) );

			// Set span inner html.
			if ( $can_show_pinterest ) {
				if ( $show_button_labels ) {
					$pin_label     = $options['pinterest_button_label'];
					$svg_inner_tag = $dom->createElement( 'span' );
					$svg_inner_tag->setAttribute( 'class', 'has-pin-svg-pinterest has-pin-button' );
					$svg_inner_tag->setAttribute( 'style', 'display: none;' );
					$svg_inner_tag->setAttribute( 'aria-hidden', 'true' );
					$svg_use = $dom->createElement( 'use' );
					$svg_use->setAttribute( 'xlink:href', '#has-pinterest' );
					$svg_use_wrapper = $dom->createElement( 'svg' );
					$svg_use_wrapper->setAttribute( 'class', 'has-icon' );
					$svg_use_wrapper->appendChild( $svg_use );
					$svg_inner_tag->appendChild( $svg_use_wrapper );
					$svg_span = $dom->createElement( 'span' );
					$svg_span->setAttribute( 'className', 'has-icon-label' );
					$svg_span->nodeValue = esc_html( $pin_label );
					$svg_inner_tag->appendChild( $svg_span );
					$svg->appendChild( $svg_inner_tag );
				} else {
					$svg_inner_tag = $dom->createElement( 'span' );
					$svg_inner_tag->setAttribute( 'class', 'has-pin-svg-pinterest has-pin-button' );
					$svg_inner_tag->setAttribute( 'style', 'display: none;' );
					$svg_inner_tag->setAttribute( 'aria-hidden', 'true' );
					$svg_use = $dom->createElement( 'use' );
					$svg_use->setAttribute( 'xlink:href', '#has-pinterest' );
					$svg_use_wrapper = $dom->createElement( 'svg' );
					$svg_use_wrapper->setAttribute(
						'class',
						'has-icon
					'
					);
					$svg_use_wrapper->appendChild( $svg_use );
					$svg_inner_tag->appendChild( $svg_use_wrapper );
					$svg->appendChild( $svg_inner_tag );
				}
			}
			if ( $can_show_webshare ) {
				if ( $show_button_labels ) {
					$webshare_label = $options['webshare_button_label'];
					$svg_inner_tag  = $dom->createElement( 'span' );
					$svg_inner_tag->setAttribute( 'class', 'has-pin-svg-webshare has-pin-button' );
					$svg_inner_tag->setAttribute( 'aria-hidden', 'true' );
					$svg_inner_tag->setAttribute( 'style', 'display: none;' );
					$svg_use = $dom->createElement( 'use' );
					$svg_use->setAttribute( 'xlink:href', '#has-webshare-icon' );
					$svg_use_wrapper = $dom->createElement( 'svg' );
					$svg_use_wrapper->setAttribute( 'class', 'has-icon' );
					$svg_use_wrapper->appendChild( $svg_use );
					$svg_inner_tag->appendChild( $svg_use_wrapper );
					$svg_span = $dom->createElement( 'span' );
					$svg_span->setAttribute( 'className', 'has-icon-label' );
					$svg_span->nodeValue = esc_html( $webshare_label );
					$svg_inner_tag->appendChild( $svg_span );
					$svg->appendChild( $svg_inner_tag );
				} else {
					$svg_inner_tag = $dom->createElement( 'span' );
					$svg_inner_tag->setAttribute( 'class', 'has-pin-svg-webshare has-pin-button' );
					$svg_inner_tag->setAttribute( 'style', 'display: none;' );
					$svg_inner_tag->setAttribute( 'aria-hidden', 'true' );
					$svg_inner_tag->setAttribute( 'style', 'display: none;' );
					$svg_use = $dom->createElement( 'use' );
					$svg_use->setAttribute( 'xlink:href', '#has-webshare-icon' );
					$svg_use_wrapper = $dom->createElement( 'svg' );
					$svg_use_wrapper->setAttribute( 'class', 'has-icon' );
					$svg_use_wrapper->appendChild( $svg_use );
					$svg_inner_tag->appendChild( $svg_use_wrapper );
					$svg->appendChild( $svg_inner_tag );
				}
			}
			// Now place SVG inside the parent span after the image.
			$wrapper->appendChild( $svg );
		}

		$new_html = $dom->saveHTML();

		return $new_html;
	}

	/**
	 * Add Highlight and Share placeholder to comments.
	 *
	 * @param string $comment_content Comment content.
	 *
	 * @return string Updated comment content.
	 */
	public function add_comment_area_html( $comment_content ) {
		$options             = Options::get_plugin_options();
		$enable_for_comments = (bool) $options['enable_comments'];
		$enable_shortlinks  = (bool) $options['shortlinks'];

		if ( ! $enable_for_comments ) {
			return $comment_content;
		}

		// Get the comment permalink.
		$comment_permalink = get_comment_link();
		if ( $enable_shortlinks ) {
			$shortlink = wp_get_shortlink();
			if ( ! empty( $shortlink ) ) {
				$comment_permalink = $shortlink . '#comment-' . get_comment_ID();
			}
		}

		// Create a div with the class and data attributes.
		$comment_content .= sprintf(
			'<div class="has-comment-placeholder" data-comment-url="%s" data-title="%s" style="width: 0; height: 0; display: none; overflow: hidden;" aria-hidden="true"></div>',
			esc_url( $comment_permalink ),
			esc_attr( get_the_title() ),
			esc_attr( Hashtags::get_hashtags( get_the_ID() ) )
		);

		return $comment_content;
	}

	/**
	 * Add a class and data attribute around the main content.
	 *
	 * Add a class and data attribute around the main content.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param string $content Main post content.
	 * @return string $content Modified
	 */
	public function content_area( $content ) {
		global $post;
		if ( ! in_the_loop() ) {
			return $content;
		}
		if ( ! is_object( $post ) ) {
			return $content;
		}
		if ( is_admin() ) {
			return $content;
		}

		// Get post vars.
		$post_id          = $post->ID;
		$url              = Functions::get_content_url( $post_id );
		$title            = get_the_title( $post_id );
		$is_legacy_markup = $this->is_legacy_content_loop_markup( $post_id ); // Determine if we're in legacy markup mode (wrap everything in a div) or not.

		// Get wrapper classes.
		$has_wrapper_classes = array(
			'has-content-area',
		);

		// Retrieve wrapper classes from options.
		$class_dots_regex = '/\./';
		$options          = Options::get_plugin_options();
		$wrapper_classes  = $options['wrapper_classes'] ?? '';
		if ( ! empty( $wrapper_classes ) ) {
			$wrapper_classes     = preg_replace( $class_dots_regex, '', $wrapper_classes );
			$wrapper_classes     = array_map( 'trim', explode( ',', $wrapper_classes ) );
			$has_wrapper_classes = array_merge( $has_wrapper_classes, $wrapper_classes );
		}

		/**
		 * Filter: has_content_wrapper_classes
		 *
		 * Add classes to the post wrapper container for the content area.
		 *
		 * @since 4.5.0
		 *
		 * @param array $has_wrapper_classes Index array of classes.
		 * @param int   $post_id             Post ID.
		 * @param bool  $is_legacy_markup    Whether we're in legacy markup mode or not.
		 */
		$has_wrapper_classes = apply_filters( 'has_content_wrapper_classes', $has_wrapper_classes, $post_id, $is_legacy_markup );

		$hashtags = Hashtags::get_hashtags( $post_id );

		if ( true === $is_legacy_markup ) {
			$content = sprintf(
				'<div class="has-social-placeholder %s" data-url="%s" data-title="%s" data-hashtags="%s" data-post-id="%s">%s</div>',
				esc_attr( implode( ' ', $has_wrapper_classes ) ),
				esc_attr( $url ),
				esc_attr( $title ),
				esc_attr( implode( ' ', $has_wrapper_classes ) ),
				esc_attr( $post_id ),
				$content
			);
		} else {
			// Add an empty div right below the content.
			$content = sprintf(
				'%s<div class="has-social-placeholder %s" data-url="%s" data-title="%s" data-hashtags="%s" data-post-id="%s"></div>',
				$content,
				esc_attr( implode( ' ', $has_wrapper_classes ) ),
				esc_attr( $url ),
				esc_attr( $title ),
				esc_attr( $hashtags ),
				esc_attr( $post_id )
			);
		}

		return $content;
	}

	/**
	 * Add a class and data attribute around the main excerpts.
	 *
	 * Add a class and data attribute around the main excerpts.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param string $content Main excerpt content.
	 * @return string $content Modified
	 */
	public function excerpt_area( $content ) {
		global $post;
		if ( ! in_the_loop() ) {
			return $content;
		}
		if ( ! is_object( $post ) ) {
			return $content;
		}
		if ( is_admin() ) {
			return $content;
		}

		$post_id = $post->ID;
		$url     = Functions::get_content_url( $post_id );
		$title   = get_the_title( $post_id );
		$content = sprintf( '<div class="has-excerpt-area" data-url="%s" data-title="%s" data-hashtags="%s">%s</div>', esc_url( $url ), esc_attr( $title ), esc_attr( Hashtags::get_hashtags( $post_id ) ), $content );
		return $content;
	}

	/**
	 * Check to see if the legacy content loop markup is enabled.
	 *
	 * This filter is used to determine whether to use the legacy content loop markup, which wraps a div around the content.
	 *
	 * @param int $post_id The Post ID to check. 0 if no post ID is found.
	 *
	 * @since 4.5.0
	 *
	 * @return bool true if legacy is enabled, false if not.
	 */
	public function is_legacy_content_loop_markup( $post_id = 0 ) {
		/**
		 * Filter: has_legacy_content_loop_markup.
		 *
		 * Whether to use the legacy content loop markup, which wraps a div around the content.
		 *
		 * @param bool $legacy_markup Whether to use the legacy content loop markup, which wraps a div around the content.
		 * @param int  $post_id       The Post ID to check. Post ID is zero if no post ID is found.
		 */
		return (bool) apply_filters( 'has_legacy_content_loop_markup', false, $post_id );
	}

	/**
	 * Add general interface and SVG sprites.
	 */
	public function add_footer_html() {

		// Get cached HTML.
		$maybe_cached_html = wp_cache_get( 'has_frontend_html', 'highlight-and-share' );
		if ( $maybe_cached_html ) {
			echo $maybe_cached_html;
			$this->get_footer_svgs();
			return;
		}
		$social_networks_ordered = Options::get_plugin_options_social_networks(); // ordered social networks (appearances tab).
		$theme_options           = Options::get_theme_options(); // appearance options (appearances tab).
		$settings                = Options::get_plugin_options(); // main plugin options (settings tab).
		$email_options           = Options::get_email_options(); // email options (emails tab).

		// Get HAS container classes.
		$has_container_classes = array(
			'highlight-and-share-wrapper',
			'theme-' . $theme_options['theme'],
		);
		// Check for horizontal vs vertical orientation.
		if ( 'vertical' === $theme_options['orientation'] ) {
			$has_container_classes[] = 'orientation-vertical';
		} else {
			$has_container_classes[] = 'orientation-horizontal';
		}
		// Determine if labels are enabled.
		if ( 'default' === $theme_options['theme'] || ( 'custom' === $theme_options['theme'] && false === (bool) $theme_options['icons_only'] ) ) {
			$has_container_classes[] = 'show-has-labels';
		} else {
			$has_container_classes[] = 'hide-has-labels';
		}

		// Tooltip styles.
		ob_start();
		?>
		<style>
			.highlight-and-share-wrapper div.has-tooltip:hover:after {
				background-color: <?php echo esc_attr( $theme_options['tooltips_background_color'] ); ?> !important;
				color: <?php echo esc_attr( $theme_options['tooltips_text_color'] ); ?> !important;
			}
		</style>
		<?php
		$tooltip_styles = ob_get_clean();

		// Get custom theme styles.
		$custom_styles = false;
		if ( 'custom' === $theme_options['theme'] ) {
			ob_start();
			?>
			<style>
			<?php
			if ( true === (bool) $theme_options['group_icons'] ) :
				?>
					.highlight-and-share-wrapper {
						background-color: <?php echo esc_attr( $theme_options['background_color'] ); ?> !important;
					}
					.highlight-and-share-wrapper div a {
						color:<?php echo esc_attr( $theme_options['icon_colors_group'] ); ?> !important;
						background-color:<?php echo esc_attr( $theme_options['background_color'] ); ?> !important;
					}
					.highlight-and-share-wrapper div a:hover {
						color:<?php echo esc_attr( $theme_options['icon_colors_group_hover'] ); ?> !important;
						background-color:<?php echo esc_attr( $theme_options['background_color_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper div:first-of-type a {
						border-top-left-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrTop'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
						border-bottom-left-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrTop'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
					}
					.highlight-and-share-wrapper div:last-of-type a {
						border-bottom-right-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrTop'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
						border-top-right-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrTop'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
					}
				<?php
			endif;
			if ( true === (bool) $theme_options['border_radius_group']['attrSyncUnits'] ) :
				?>
					.highlight-and-share-wrapper {
						border-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrTop'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
					}
				<?php
			else :
				?>
					.highlight-and-share-wrapper,
					.highlight-and-share-wrapper a {
						border-top-left-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrTop'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
						border-top-right-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrRight'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
						border-bottom-right-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrBottom'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
						border-bottom-left-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrLeft'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
					}
				<?php
			endif;
			if ( true !== (bool) $theme_options['group_icons'] ) :
				?>
					.highlight-and-share-wrapper .has_twitter a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['twitter']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['twitter']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_twitter a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['twitter']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['twitter']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_facebook a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['facebook']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['facebook']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_facebook a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['facebook']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['facebook']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_linkedin a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['linkedin']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['linkedin']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_linkedin a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['linkedin']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['linkedin']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_whatsapp a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['whatsapp']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['whatsapp']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_whatsapp a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['whatsapp']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['whatsapp']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_telegram a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['telegram']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['telegram']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_telegram a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['telegram']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['telegram']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_reddit a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['reddit']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['reddit']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_reddit a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['reddit']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['reddit']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_tumblr a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['tumblr']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['tumblr']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_tumblr a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['tumblr']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['tumblr']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_xing a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['xing']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['xing']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_xing a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['xing']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['xing']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_email a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['email']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['email']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_email a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['email']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['email']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_copy a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['copy']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['copy']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_copy a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['copy']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['copy']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_webshare a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['webshare']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['webshare']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_webshare a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['webshare']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['webshare']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_mastodon a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['mastodon']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['mastodon']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_mastodon a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['mastodon']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['mastodon']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_threads a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['threads']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['threads']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_threads a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['threads']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['threads']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_bluesky a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['bluesky']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['bluesky']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_bluesky a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['bluesky']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['bluesky']['background_hover'] ); ?> !important;
					}
				<?php
				if ( true === (bool) $theme_options['icon_border_radius']['attrSyncUnits'] ) :
					?>
						.highlight-and-share-wrapper div a {
							border-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrTop'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						}
					<?php
				else :
					?>
						.highlight-and-share-wrapper div a {
							border-top-left-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrTop'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
							border-top-right-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrRight'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
							border-bottom-right-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrBottom'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
							border-bottom-left-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrLeft'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						}
					<?php
				endif;
				if ( 'horizontal' === $theme_options['orientation'] ) :
					?>
						.highlight-and-share-wrapper div {
							margin-right: <?php echo esc_attr( $theme_options['icon_gap'] ); ?>px !important;
						}
						.highlight-and-share-wrapper div:last-child {
							margin-right: 0 !important;
						}
					<?php
				endif;
				if ( 'vertical' === $theme_options['orientation'] ) :
					?>
						.highlight-and-share-wrapper div {
							margin-bottom: <?php echo esc_attr( $theme_options['icon_gap'] ); ?>px !important;
						}
						.highlight-and-share-wrapper div:last-child {
							margin-bottom: 0 !important;
						}
					<?php
				endif;
			endif;
			if ( true === (bool) $theme_options['icon_border_radius']['attrSyncUnits'] ) :
				?>
					.highlight-and-share-wrapper div a {
						border-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrTop'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
					}
				<?php
			else :
				?>
					.highlight-and-share-wrapper div a {
						border-top-left-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrTop'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						border-top-right-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrRight'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						border-bottom-right-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrBottom'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						border-bottom-left-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrLeft'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
					}
				<?php
			endif;
			if ( true === (bool) $theme_options['icon_border_radius']['attrSyncUnits'] ) :
				?>
					.highlight-and-share-wrapper div a {
						border-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrTop'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
					}
				<?php
			else :
				?>
					.highlight-and-share-wrapper div a {
						border-top-left-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrTop'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						border-top-right-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrRight'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						border-bottom-right-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrBottom'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						border-bottom-left-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrLeft'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
					}
				<?php
			endif;
			if ( true === (bool) $theme_options['icon_padding']['attrSyncUnits'] ) :
				?>
					.highlight-and-share-wrapper div a {
						padding: <?php echo esc_attr( $theme_options['icon_padding']['attrTop'] . $theme_options['icon_padding']['attrUnit'] ); ?> !important;
					}
				<?php
			else :
				?>
					.highlight-and-share-wrapper div a {
						padding-top: <?php echo esc_attr( $theme_options['icon_padding']['attrTop'] . $theme_options['icon_padding']['attrUnit'] ); ?> !important;
						padding-right: <?php echo esc_attr( $theme_options['icon_padding']['attrRight'] . $theme_options['icon_padding']['attrUnit'] ); ?> !important;
						padding-bottom: <?php echo esc_attr( $theme_options['icon_padding']['attrBottom'] . $theme_options['icon_padding']['attrUnit'] ); ?> !important;
						padding-left: <?php echo esc_attr( $theme_options['icon_padding']['attrLeft'] . $theme_options['icon_padding']['attrUnit'] ); ?> !important;
					}
				<?php
			endif;
			?>
				.highlight-and-share-wrapper div a .has-icon {
					width: <?php echo esc_attr( $theme_options['icon_size'] ); ?>px !important;
					height: <?php echo esc_attr( $theme_options['icon_size'] ); ?>px !important;
				}
				.highlight-and-share-wrapper div a {
					font-size: <?php echo esc_attr( $theme_options['font_size'] ); ?>px !important;
				}
			</style>
			<?php
			// From: https://datayze.com/howto/minify-css-with-php.
			$custom_styles = ob_get_clean();
			$custom_styles = preg_replace( '/\/\*((?!\*\/).)*\*\//', '', $custom_styles ); // negative look ahead.
			$custom_styles = preg_replace( '/\s{2,}/', ' ', $custom_styles );
			$custom_styles = preg_replace( '/\s*([:;{}])\s*/', '$1', $custom_styles );
			$custom_styles = preg_replace( '/;}/', '}', $custom_styles );
		}

		// Get wrapper opening HTML.
		$html = sprintf(
			'<div id="has-highlight-and-share"><div class="%s">',
			esc_attr( implode( ' ', $has_container_classes ) )
		);

		if ( $custom_styles ) {
			$html .= $custom_styles;
		}
		if ( $tooltip_styles ) {
			$html .= $tooltip_styles;
		}

		// Loop through order and outout social network HTML.
		foreach ( $social_networks_ordered as $social_network ) {
			$is_enabled = (bool) $social_network['enabled'];
			if ( $is_enabled ) {
				switch ( $social_network['slug'] ) {
					case 'twitter':
						// If "via" is blank, no username will show in Twitter.
						$html .= '<div class="has_twitter ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="twitter" data-tooltip="' . esc_attr( apply_filters( 'has_twitter_tooltip', $settings['twitter_tooltip'] ) ) . '"><a href="https://x.com/intent/tweet?via=%username%&url=%url%&text=%prefix%%text%%suffix%&hashtags=%hashtags%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-twitter-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_twitter_text', $settings['twitter_label'] ) ) . '</span></a></div>';
						break;
					case 'facebook':
						$html .= '<div class="has_facebook ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="facebook" data-tooltip="' . esc_attr( apply_filters( 'has_facebook_tooltip', $settings['facebook_tooltip'] ) ) . '"><a href="https://www.facebook.com/sharer/sharer.php?u=%url%&t=%title%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-facebook-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_facebook_text', $settings['facebook_label'] ) ) . '</span></a></div>';
						break;
					case 'linkedin':
						$html .= '<div class="has_linkedin ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="linkedin" data-tooltip="' . esc_attr( apply_filters( 'has_linkedin_tooltip', $settings['linkedin_tooltip'] ) ) . '"><a href="https://www.linkedin.com/sharing/share-offsite/?mini=true&url=%url%&title=%title%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-linkedin-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_linkedin_text', $settings['linkedin_label'] ) ) . '</span></a></div>';
						break;
					case 'xing':
						$html .= '<div class="has_xing ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="xing" data-tooltip="' . esc_attr( apply_filters( 'has_xing_tooltip', $settings['xing_tooltip'] ) ) . '"><a href="https://www.xing.com/spi/shares/new?url=%url%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-xing-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_xing_text', $settings['xing_label'] ) ) . '</span></a></div>';
						break;
					case 'reddit':
						$html .= '<div class="has_reddit ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="reddit" data-tooltip="' . esc_attr( apply_filters( 'has_reddit_tooltip', $settings['reddit_tooltip'] ) ) . '"><a href="https://www.reddit.com/submit?resubmit=true&url=%url%&title=%title%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-reddit-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_reddit_text', $settings['reddit_label'] ) ) . '</span></a></div>';
						break;
					case 'tumblr':
						// If "via" is blank, no username will show in Twitter.
						$html .= '<div class="has_tumblr ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="tumblr" data-tooltip="' . esc_attr( apply_filters( 'has_tumblr_tooltip', $settings['tumblr_tooltip'] ) ) . '"><a href="https://tumblr.com/widgets/share/tool?canonicalUrl=%url%&content=%prefix%%text%%suffix%&title=%title%&posttype=quote" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-tumblr"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_tumblr_text', $settings['tumblr_label'] ) ) . '</span></a></div>';
						break;
					case 'telegram':
						$html .= '<div class="has_telegram ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="telegram" data-tooltip="' . esc_attr( apply_filters( 'has_telegram_tooltip', $settings['telegram_tooltip'] ) ) . '"><a href="https://t.me/share/url?url=%url%&text=%prefix%%text%%suffix%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-telegram-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_telegram_text', $settings['telegram_label'] ) ) . '</span></a></div>';
						break;
					case 'whatsapp':
						$whatsapp_endpoint_url      = 'whatsapp://send';
						$whatsapp_endpoint_settings = $settings['whatsapp_api_endpoint'] ?? 'app';
						$whatsapp_can_share_url     = $settings['whatsapp_can_share_url'] ?? true;
						if ( 'web' === $whatsapp_endpoint_settings ) {
							$whatsapp_endpoint_url = 'https://api.whatsapp.com/send';
						}
						/**
						 * Filter: has_whatsapp_endpoint_url
						 *
						 * Filter the endpoint URL used for WhatsApp.
						 *
						 * @param string The endpoint URL.
						 *
						 * @since 3.6.5.
						 */
						$whatsapp_endpoint_url = apply_filters(
							'has_whatsapp_endpoint_url',
							$whatsapp_endpoint_url
						);
						if ( $whatsapp_can_share_url ) {
							$html .= '<div class="has_whatsapp ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="whatsapp" data-tooltip="' . esc_attr( apply_filters( 'has_whatsapp_tooltip', $settings['whatsapp_tooltip'] ) ) . '"><a href="' . esc_url_raw( $whatsapp_endpoint_url, array( 'whatsapp', 'http', 'https' ) ) . '?text=%prefix%%text%%suffix%: %url%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-whatsapp-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_whatsapp_text', $settings['whatsapp_label'] ) ) . '</span></a></div>';
						} else {
							$html .= '<div class="has_whatsapp ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="whatsapp" data-tooltip="' . esc_attr( apply_filters( 'has_whatsapp_tooltip', $settings['whatsapp_tooltip'] ) ) . '"><a href="' . esc_url_raw( $whatsapp_endpoint_url, array( 'whatsapp', 'http', 'https' ) ) . '?text=%prefix%%text%%suffix%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-whatsapp-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_whatsapp_text', $settings['whatsapp_label'] ) ) . '</span></a></div>';
						}

						break;
					case 'copy':
						$html .= '<div class="has_copy ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="copy" data-tooltip="' . esc_attr( apply_filters( 'has_copy_tooltip', $settings['copy_tooltip'] ) ) . '"><a href="#"><svg class="has-icon" rel="nofollow"><use xlink:href="#has-copy-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_copy_text', $settings['copy_label'] ) ) . '</span></a></div>';
						break;
					case 'webshare':
						$html .= '<div class="has_webshare ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none !important;" data-type="webshare" data-tooltip="' . esc_attr( apply_filters( 'has_webshare_tooltip', $settings['webshare_tooltip'] ) ) . '"><a href="#"><svg class="has-icon" rel="nofollow"><use xlink:href="#has-webshare-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_webshare_text', $settings['webshare_label'] ) ) . '</span></a></div>';
						break;
					case 'mastodon':
						$html .= '<div class="has_mastodon ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="mastodon" data-tooltip="' . esc_attr( apply_filters( 'has_mastodon_tooltip', $settings['mastodon_tooltip'] ) ) . '"><a href="https://mastodon.social/share?text=%prefix%%text%%suffix%: %url%" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-mastodon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_mastodon_text', $settings['mastodon_label'] ) ) . '</span></a></div>';
						if ( ! wp_script_is( 'fancybox', 'enqueued' ) ) {
							wp_register_script(
								'has-fancybox-js',
								Functions::get_plugin_url( '/js/fancybox.umd.js' ),
								array(),
								Functions::get_plugin_version(),
								true
							);

							wp_register_style(
								'has-fancybox-css',
								Functions::get_plugin_url( '/js/fancybox.css' ),
								array(),
								Functions::get_plugin_version(),
								'all'
							);
						}
						break;
					case 'email':
						global $post;
						$post_id     = $post->ID ?? 0;
						$email_url   = '';
						$email_class = 'has_email_form';
						if ( 'mailto' === $email_options['email_send_type'] ) {
							$email_url = add_query_arg(
								array(
									'body'    => '%prefix%%text%%suffix%' . '%0A%0A' . '%url%',
									'subject' => __( '[Shared Post]', 'highlight-and-share' ) . ' %title%',

								),
								'mailto:'
							);
							$email_class = 'has_email_mailto';
						} else {
							$ajax_nonce = wp_create_nonce( 'has_share_email' . $post_id );
							$email_url  = admin_url( 'admin-ajax.php' );
							$email_url  = add_query_arg(
								array(
									'action'    => 'has_email_social_modal',
									'permalink' => '%url%',
									'nonce'     => $ajax_nonce,
									'text'      => '%prefix%%text%%suffix%',
									'post_id'   => $post_id,
									'type'      => '%type%',
								),
								$email_url
							);
						}
						$html .= '<div class="has_email ' . esc_attr( $email_class ) . ' ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="email" data-title="%title%" data-url="%url%" data-tooltip="' . esc_attr( apply_filters( 'has_email_tooltip', $settings['email_tooltip'] ) ) . '"><a href="' . esc_url( $email_url ) . '" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-email-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_email_text', $settings['email_label'] ) ) . '</span></a></div>';

						// Enqueue the modal script.
						if ( ! wp_script_is( 'fancybox', 'enqueued' ) && 'form' === $email_options['email_send_type'] ) {
							wp_register_script(
								'has-fancybox-js',
								Functions::get_plugin_url( '/js/fancybox.umd.js' ),
								array(),
								Functions::get_plugin_version(),
								true
							);

							wp_register_style(
								'has-fancybox-css',
								Functions::get_plugin_url( '/js/fancybox.css' ),
								array(),
								Functions::get_plugin_version(),
								'all'
							);
						}
						break;
					case 'threads':
						$html .= '<div class="has_threads ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="threads" data-tooltip="' . esc_attr( apply_filters( 'has_threads_tooltip', $settings['threads_tooltip'] ) ) . '"><a href="https://www.threads.net/intent/post?text=%threadstext%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-threads"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_threads_text', $settings['threads_label'] ) ) . '</span></a></div>';
						break;
					case 'bluesky':
						$html .= '<div class="has_bluesky ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="bluesky" data-tooltip="' . esc_attr( apply_filters( 'has_bluesky_tooltip', $settings['bluesky_tooltip'] ) ) . '"><a href="https://bsky.app/intent/compose?text=%blueskytext%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-bluesky"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_bluesky_text', $settings['bluesky_label'] ) ) . '</span></a></div>';
						break;
				}
			}
		}
		$html .= '</div><!-- #highlight-and-share-wrapper --></div><!-- #has-highlight-and-share -->';

		// Cache HTML.
		wp_cache_set( 'has_frontend_html', $html, 'highlight-and-share', HOUR_IN_SECONDS );
		echo $html;
		$this->get_footer_svgs();

		// Enqueue / print fancybox styles.
		if ( wp_script_is( 'has-fancybox-js', 'registered' ) && ! wp_script_is( 'has-fancybox-js', 'done' ) ) {
			wp_print_scripts( 'has-fancybox-js' );
			wp_print_styles( 'has-fancybox-css' );
		}
	}

	/**
	 * Output Footer SVGs for Highlight and Share shortcode.
	 */
	public function output_shortcode_footer_svgs() {
		?>
		<svg width="0" height="0" class="hidden" style="display: none;">
			<symbol id="has-share-1" viewBox="0 0 1664 1857" width="24px" height="26.8px">
				<path d="M1543.64 385.463c0 146.575-118.828 265.416-265.417 265.416-146.575 0-265.404-118.841-265.404-265.416 0-146.588 118.829-265.417 265.404-265.417 146.589 0 265.417 118.829 265.417 265.417Z" fill="currentColor"/>
				<path d="M1543.64 385.463c0 146.575-118.828 265.416-265.417 265.416-146.575 0-265.404-118.841-265.404-265.416 0-146.588 118.829-265.417 265.404-265.417 146.589 0 265.417 118.829 265.417 265.417Z" style="fill: none; stroke: currentColor; stroke-width: 107.37px;"/>
				<path d="M1543.64 1471.24c0 146.589-118.828 265.417-265.417 265.417-146.575 0-265.404-118.828-265.404-265.417 0-146.588 118.829-265.417 265.404-265.417 146.589 0 265.417 118.829 265.417 265.417Z" style="fill: currentColor; fill-rule: nonzero;"/>
				<path d="M1543.64 1471.24c0 146.589-118.828 265.417-265.417 265.417-146.575 0-265.404-118.828-265.404-265.417 0-146.588 118.829-265.417 265.404-265.417 146.589 0 265.417 118.829 265.417 265.417Z" style="fill: none; stroke: currentColor; stroke-width: 107.37px;"/>
				<path d="M650.879 988.666c0 146.589-118.828 265.416-265.403 265.416-146.589 0-265.43-118.827-265.43-265.416 0-146.576 118.841-265.416 265.43-265.416 146.575 0 265.403 118.84 265.403 265.416Z" style="fill: currentColor; fill-rule: nonzero;"/>
				<path d="M650.879 988.666c0 146.589-118.828 265.416-265.403 265.416-146.589 0-265.43-118.827-265.43-265.416 0-146.576 118.841-265.416 265.43-265.416 146.575 0 265.403 118.84 265.403 265.416Z" style="fill: none; stroke: currentColor; stroke-width: 107.37px;"/>
				<path d="m385.476 988.666 892.747-603.203" style="fill: none; fill-rule: nonzero;"/>
				<path d="m415.528 1033.16-60.117-88.971 892.76-603.216 60.117 88.971-892.76 603.216Z" style="fill: currentColor; fill-rule: nonzero;"/>
				<path d="m385.476 988.666 892.747 482.578" style="fill: none; fill-rule: nonzero;"/>
				<path d="m1252.7 1518.47-892.76-482.578 51.055-94.454 892.76 482.579-51.055 94.453Z" style="fill: currentColor; fill-rule: nonzero;"/>
			</symbol>
			<symbol id="has-share-2" viewBox="0 0 1752 1836" width="24px" height="25.1px">
				<path d="M1603.95 473.058c0 179.909-145.833 325.742-325.729 325.742S952.479 652.967 952.479 473.058c0-179.896 145.846-325.729 325.742-325.729 179.896 0 325.729 145.833 325.729 325.729Z" style="fill: currentColor; fill-rule: nonzero;"/>
				<path d="M1603.95 473.058c0 179.909-145.833 325.742-325.729 325.742S952.479 652.967 952.479 473.058c0-179.896 145.846-325.729 325.742-325.729 179.896 0 325.729 145.833 325.729 325.729Z" style="fill: none; stroke: currentColor; stroke-width: 131.77px;"/>
				<path d="M1468.85 1558.85c0 105.272-85.352 190.625-190.625 190.625-105.286 0-190.638-85.353-190.638-190.625 0-105.287 85.352-190.638 190.638-190.638 105.273 0 190.625 85.351 190.625 190.638Z" style="fill: currentColor; fill-rule: nonzero;"/>
				<path d="M1468.85 1558.85c0 105.272-85.352 190.625-190.625 190.625-105.286 0-190.638-85.353-190.638-190.625 0-105.287 85.352-190.638 190.638-190.638 105.273 0 190.625 85.351 190.625 190.638Z" style="fill: none; stroke: currentColor; stroke-width: 77.12px;"/>
				<path d="M650.879 1076.27c0 146.589-118.828 265.417-265.416 265.417-146.589 0-265.417-118.828-265.417-265.417 0-146.588 118.828-265.416 265.417-265.416 146.588 0 265.416 118.828 265.416 265.416Z" style="fill: currentColor; fill-rule: nonzero;"/>
				<path d="M650.879 1076.27c0 146.589-118.828 265.417-265.416 265.417-146.589 0-265.417-118.828-265.417-265.417 0-146.588 118.828-265.416 265.417-265.416 146.588 0 265.416 118.828 265.416 265.416Z" style="fill: none; stroke: currentColor; stroke-width: 107.37px;"/>
				<path d="m385.463 1076.27 892.76-603.216" style="fill: none; fill-rule: nonzero;"/>
				<path d="m415.515 1120.77-60.118-88.971 892.761-603.216 60.117 88.972-892.76 603.215Z" style="fill: currentColor; fill-rule: nonzero;"/>
				<path d="m385.463 1076.27 892.76 482.579" style="fill: none; fill-rule: nonzero;"/>
				<path d="m1252.69 1606.08-892.76-482.578 51.054-94.453 892.761 482.578-51.055 94.453Z" style="fill: currentColor; fill-rule: nonzero;"/>
			</symbol>
			<symbol id="has-share-3" viewBox="0 0 1512 1688" width="24px" height="26.9px">
				<path d="M1162.8 1005.12c-47.929.677-96.809 10.104-143.815 28.906-112.33 44.936-176.08-.508-273.125-52.617-116.601-62.786-9.739-206.511 61.407-256.38 185.312-129.909 340.091 23.255 512.304-63.607 116.68-58.841 192.331-181.367 192.331-312.07 0-192.617-156.693-349.323-349.297-349.349-106.497-.014-202.773 44.219-266.888 129.792C776.199 289.3 839.858 609.391 530.769 597.489c-127.526-4.908-206.497-74.973-332.864-13.359C78.334 642.425.001 765.42.001 898.818c0 192.578 156.641 349.258 349.193 349.349 100 .039 193.021-72.422 291.211-59.089 213.685 29.024 152.604 247.618 250.885 369.246 65.69 81.301 166.784 129.413 271.276 129.413 192.617 0 349.336-156.719 349.336-349.349.013-213.19-167.669-335.859-349.102-333.268Z" style="fill: currentColor; fill-rule: nonzero;"/>
			</symbol>
			<symbol id="has-share-4" viewBox="0 0 1727 958" width="24px" height="13.4px">
				<path d="m1726.64 476.563-471.836 333.71-205 145.04-3.451 2.499-.95-267.135-27.93-14.14C695.377 515.794 241.731 600.247.003 893.776 136.565 549.388 514.86 328.06 878.089 299.818h.937c26.055-2.201 52.11-3.151 77.852-3.151 10.99 0 22.292.325 33.594.95l53.372 2.513-.312-147.552L1042.894 0l683.75 476.563Z" style="fill: currentColor; fill-rule: nonzero;"/>
			</symbol>
			<symbol id="has-share-5" viewBox="0 0 1785 1261" width="24px" height="16.9px" style="fill-rule:evenodd; clip-rule:evenodd; stroke-linejoin:round; stroke-miterlimit:2;">
				<path d="M1254.75 881.745v68.281c0 93.854-76.445 170.3-170.286 170.3H310.727c-16.315 0-31.992-2.37-47.018-6.654-71.081-20.404-123.268-86.12-123.268-163.646V337.578c0-94.062 76.445-170.508 170.286-170.508h765.352c15.247-1.497 30.924-2.356 46.601-2.578l-.429-135.287c-12.448-1.51-24.909-2.356-37.787-2.356H310.727C139.581 26.849-.002 166.211-.002 337.578v612.448c0 148.399 104.792 272.943 244.166 303.437 7.084 1.719 14.389 3.008 21.902 4.076 14.609 2.149 29.427 3.229 44.661 3.229h773.737c171.146 0 310.729-139.375 310.729-310.742V782.539l-140.443 99.206Z" style="fill: currentColor; fill-rule: nonzero;"/>
				<path d="m1784.74 402.005-389.544 275.3-140.443 99.206-44.023 31.145-.638-225.273-23.62-11.81C914.819 434.857 626.407 580.026 422.41 827.63c123.906-311.601 387.396-577.448 712.943-577.448 9.453 0 18.906.208 28.346.638l45.104 2.148-.221-31.783-.43-168.568L1207.944 0l576.796 402.005Z" style="fill: currentColor; fill-rule: nonzero;"/>
			</symbol>
			<symbol id="has-share-6" viewBox="0 0 1342 1868" width="24px" height="33.4px" style="fill-rule:evenodd; clip-rule:evenodd; stroke-linejoin:round; stroke-miterlimit:2;">
				<path d="M812.812 633.503v98.776h421.12v1036.37H107.382V732.279H528.28v-98.776H-.001v1233.92h1341.3V633.503h-528.49Z" style="fill: currentColor; fill-rule: nonzero;"/>
				<path d="m1064.28 423.477-70.43 65.716L718.759 193.06V1261.2H622.34V193.27L347.249 489.195l-70.443-65.716L670.647.002l393.633 423.477Z" style="fill: currentColor; fill-rule: nonzero;"/>
			</symbol>
			<symbol id="has-share-7" viewBox="0 0 1342 1342" width="24px" height="24px" style="fill-rule:evenodd; clip-rule:evenodd; stroke-linejoin:round; stroke-miterlimit:2;">
				<path d="M1233.92 1233.92H107.37V107.37h574.011V0H.001v1341.29h1341.3V658.621h-107.383v575.299Z" style="fill: currentColor; fill-rule: nonzero;"/>
				<path d="M873.373 0v107.37h284.739L625.104 640.365l75.925 75.924 532.89-532.903v283.242h107.383V0H873.373Z" style="fill: currentColor; fill-rule: nonzero;"/>
			</symbol>
			<symbol id="has-share-8" viewBox="0 0 1590 1517" width="24px" height="22.9px" style="fill-rule:evenodd; clip-rule:evenodd; stroke-linejoin:round; stroke-miterlimit:2;">
				<path d="M953.968 1270.48c3.946 35.847 13.516 71.224 28.698 104.623-122.396 48.593-258.151 53.151-382.812 13.515a361.685 361.685 0 0 1-30.521-10.469c-10.169-3.802-20.039-7.903-29.909-12.604-12.917 24.141-29.466 46.758-49.805 67.11-111.77 111.758-293.828 111.914-405.742 0-111.914-111.914-111.758-293.972 0-405.729 37.2-37.214 82.304-61.954 129.987-74.414 35.221-9.415 71.966-11.836 107.955-7.136 61.498 7.448 120.873 34.622 167.8 81.55 64.232 64.231 91.562 151.393 81.836 235.208a397.793 397.793 0 0 0 30.977 13.659c10.182 4.101 20.351 7.604 30.677 10.937 104.922 32.956 219.27 27.643 320.859-16.25ZM1335.86 912.577c-1.056 10.781-2.735 21.562-4.701 32.044 63.464 6.068 125.572 33.554 174.323 82.305 111.901 111.914 111.901 293.815 0 405.729-111.758 111.758-293.828 111.914-405.743 0-25.364-25.352-44.791-54.206-58.763-84.883-15.495-34.922-23.997-72.279-24.909-109.636l.157-.143c-2.435-76.237 25.507-153.073 83.515-211.067 34.623-34.623 75.925-58.62 119.961-71.68a445.586 445.586 0 0 0 6.836-35.078c0-.3 0-.3.144-.144 1.822-11.236 3.19-22.33 3.802-33.867 11.236-130.286-33.099-264.817-132.865-364.583-12.149-12.148-24.596-23.385-37.656-33.711 21.25-30.677 37.343-64.076 47.825-98.555 23.086 16.706 44.948 35.534 65.756 56.341 119.192 119.206 174.323 278.49 165.208 434.896-.612 10.625-1.667 21.407-2.89 32.032ZM974.619 83.944c72.877 72.89 98.242 175.39 76.224 268.776-8.047 34.765-22.773 68.333-43.88 98.541a290.935 290.935 0 0 1-32.201 38.269c-111.914 111.914-293.815 111.914-405.729 0a291.012 291.012 0 0 1-32.201-38.269c-9.257 5.326-18.059 11.094-26.874 17.474-8.958 5.912-17.618 12.136-26.12 19.128-13.047 10.326-25.651 21.719-37.799 33.867-98.099 98.086-142.591 229.44-133.477 357.904-35.833-2.735-71.979.299-106.901 8.503-11.537-158.529 43.281-321.159 164.453-442.331 20.794-20.808 42.669-39.636 65.742-56.341l.156-.157c9.115-6.679 18.373-13.203 28.086-19.284 9.271-6.223 18.985-11.992 28.854-17.304-22.161-93.542 3.19-196.042 76.081-268.919 111.758-111.758 293.672-111.758 405.586.143Z" style="fill: currentColor; fill-rule: nonzero;"/>
			</symbol>
			<symbol id="has-share-9" viewBox="0 0 448 512" width="24px" height="27.4px">
				<path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path>
			</symbol>
		</svg>
		<?php
	}

	/**
	 * Retrieve SVGs in the footer for reference.
	 */
	private function get_footer_svgs() {
		?>
		<svg width="0" height="0" class="hidden" style="display: none;">
			<symbol aria-hidden="true" data-prefix="fas" data-icon="twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="has-twitter-icon">
				<g><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="facebook" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" id="has-facebook-icon">
				<path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="at" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="has-email-icon">
				<path fill="currentColor" d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="linkedin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-linkedin-icon">
				<path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="xing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" id="has-xing-icon">
				<path fill="currentColor" d="M162.7 210c-1.8 3.3-25.2 44.4-70.1 123.5-4.9 8.3-10.8 12.5-17.7 12.5H9.8c-7.7 0-12.1-7.5-8.5-14.4l69-121.3c.2 0 .2-.1 0-.3l-43.9-75.6c-4.3-7.8.3-14.1 8.5-14.1H100c7.3 0 13.3 4.1 18 12.2l44.7 77.5zM382.6 46.1l-144 253v.3L330.2 466c3.9 7.1.2 14.1-8.5 14.1h-65.2c-7.6 0-13.6-4-18-12.2l-92.4-168.5c3.3-5.8 51.5-90.8 144.8-255.2 4.6-8.1 10.4-12.2 17.5-12.2h65.7c8 0 12.3 6.7 8.5 14.1z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="whatsapp" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-whatsapp-icon">
				<path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="copy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-copy-icon">
				<path fill="currentColor" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="share" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-share-icon">
				<path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="reddit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="has-reddit-icon">
				<path fill="currentColor" d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="telegram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-telegram-icon">
				<path fill="currentColor" d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="signal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="has-signal-icon">
				<g>
					<path d="M97.2800192,3.739673 L100.160021,15.3787704 C88.8306631,18.1647705 77.9879854,22.6484879 68.0000023,28.6777391 L61.8399988,18.3985363 C72.8467373,11.7537029 84.7951803,6.81153332 97.2800192,3.739673 Z M158.720055,3.739673 L155.840053,15.3787704 C167.169411,18.1647705 178.012089,22.6484879 188.000072,28.6777391 L194.200075,18.3985363 C183.180932,11.7499974 171.218739,6.80771878 158.720055,3.739673 L158.720055,3.739673 Z M18.3999736,61.8351679 C11.7546212,72.8410466 6.81206547,84.7885562 3.73996516,97.2724198 L15.3799719,100.152197 C18.1661896,88.8237238 22.6502573,77.981893 28.6799796,67.9946902 L18.3999736,61.8351679 Z M11.9999699,127.990038 C11.9961044,122.172725 12.4306685,116.363392 13.2999707,110.611385 L1.43996383,108.811525 C-0.479938607,121.525138 -0.479938607,134.454937 1.43996383,147.168551 L13.2999707,145.36869 C12.4306685,139.616684 11.9961044,133.807351 11.9999699,127.990038 L11.9999699,127.990038 Z M194.160075,237.581539 L188.000072,227.302336 C178.024494,233.327885 167.195565,237.811494 155.880053,240.601305 L158.760055,252.240403 C171.231048,249.164732 183.165742,244.222671 194.160075,237.581539 L194.160075,237.581539 Z M244.000104,127.990038 C244.00397,133.807351 243.569406,139.616684 242.700103,145.36869 L254.56011,147.168551 C256.480013,134.454937 256.480013,121.525138 254.56011,108.811525 L242.700103,110.611385 C243.569406,116.363392 244.00397,122.172725 244.000104,127.990038 Z M252.260109,158.707656 L240.620102,155.827879 C237.833884,167.156352 233.349817,177.998183 227.320094,187.985385 L237.6001,194.184905 C244.249159,183.166622 249.191823,171.205364 252.260109,158.707656 L252.260109,158.707656 Z M145.380047,242.701142 C133.858209,244.43447 122.141865,244.43447 110.620027,242.701142 L108.820026,254.560223 C121.534632,256.479975 134.465442,256.479975 147.180048,254.560223 L145.380047,242.701142 Z M221.380091,196.804701 C214.461479,206.174141 206.175877,214.452354 196.800077,221.362797 L203.920081,231.022048 C214.262958,223.418011 223.404944,214.303705 231.040097,203.984145 L221.380091,196.804701 Z M196.800077,34.6172785 C206.177345,41.5338058 214.463023,49.8188367 221.380091,59.1953726 L231.040097,51.9959309 C223.429284,41.6822474 214.31457,32.5682452 204.000081,24.9580276 L196.800077,34.6172785 Z M34.619983,59.1953726 C41.5370506,49.8188367 49.8227288,41.5338058 59.1999972,34.6172785 L51.9999931,24.9580276 C41.6855038,32.5682452 32.5707896,41.6822474 24.9599774,51.9959309 L34.619983,59.1953726 Z M237.6001,61.8351679 L227.320094,67.9946902 C233.346114,77.969489 237.830073,88.7975718 240.620102,100.1122 L252.260109,97.2324229 C249.184198,84.7624043 244.241751,72.8286423 237.6001,61.8351679 L237.6001,61.8351679 Z M110.620027,13.2989317 C122.141865,11.5656035 133.858209,11.5656035 145.380047,13.2989317 L147.180048,1.43985134 C134.465442,-0.479901112 121.534632,-0.479901112 108.820026,1.43985134 L110.620027,13.2989317 Z M40.7799866,234.201801 L15.9999722,239.981353 L21.7799756,215.203275 L10.0999688,212.463487 L4.3199655,237.241566 C3.3734444,241.28318 4.58320332,245.526897 7.51859925,248.462064 C10.4539952,251.39723 14.6980441,252.606895 18.7399738,251.660448 L43.4999881,245.980888 L40.7799866,234.201801 Z M12.5999703,201.764317 L24.279977,204.484106 L28.2799793,187.305438 C22.4496684,177.507146 18.1025197,166.899584 15.3799719,155.827879 L3.73996516,158.707656 C6.34937618,169.311891 10.3154147,179.535405 15.539972,189.125297 L12.5999703,201.764317 Z M68.6000027,227.762301 L51.4199927,231.761991 L54.1399943,243.441085 L66.7800016,240.501313 C76.3706428,245.725462 86.5949557,249.691191 97.2000192,252.300398 L100.080021,240.6613 C89.0307035,237.906432 78.4495684,233.532789 68.6800027,227.682307 L68.6000027,227.762301 Z M128.000037,23.9980665 C90.1565244,24.0177003 55.3105242,44.590631 37.01511,77.715217 C18.7196958,110.839803 19.8628631,151.287212 39.9999861,183.325747 L29.9999803,225.982439 L72.660005,215.983214 C110.077932,239.548522 158.307237,236.876754 192.892851,209.322653 C227.478464,181.768552 240.856271,135.358391 226.242944,93.6248278 C211.629616,51.8912646 172.221191,23.9617202 128.000037,23.9980665 Z" fill="currentColor"></path>
				</g>
			</symbol>
			<symbol aria-hidden="true" data-prefix="ok" data-icon="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="has-ok-icon">
				<g>
					<path fill="currentColor" d="M357.1,324.5c-24.1,15.3-57.2,21.4-79.1,23.6l18.4,18.1l67,67c24.5,25.1-15.4,64.4-40.2,40.2c-16.8-17-41.4-41.6-67-67.3
						l-67,67.2c-24.8,24.2-64.7-15.5-39.9-40.2c17-17,41.4-41.6,67-67l18.1-18.1c-21.6-2.3-55.3-8-79.6-23.6
						c-28.6-18.5-41.2-29.3-30.1-51.8c6.5-12.8,24.3-23.6,48-5c0,0,31.9,25.4,83.4,25.4s83.4-25.4,83.4-25.4c23.6-18.5,41.4-7.8,48,5
						C398.3,295.1,385.7,305.9,357.1,324.5L357.1,324.5z M142,145c0-63,51.2-114,114-114s114,51,114,114c0,62.7-51.2,113.7-114,113.7
						S142,207.7,142,145L142,145z M200,145c0,30.8,25.1,56,56,56s56-25.1,56-56c0-31.1-25.1-56.2-56-56.2S200,113.9,200,145z"/>
				</g>
			</symbol>
			<symbol aria-hidden="true" data-prefix="vk" data-icon="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700" id="has-vk-icon">
				<g
					style="fill:none;fill-rule:evenodd"
					transform="translate(0,664)"
				>
					<path fill="currentColor" d="m 1073.3513,-606.40537 h 196.278 c 179.2103,0 221.8795,42.66915 221.8795,221.8795 v 196.27799 c 0,179.2103512 -42.6692,221.879451 -221.8795,221.879451 h -196.278 c -179.21038,0 -221.87951,-42.6691298 -221.87951,-221.879451 v -196.27801 c 0,-179.21035 42.66913,-221.87946 221.87951,-221.87948 z" />
					<path fill="currentColor" d="m 1375.0576,-393.98425 c 2.9513,-9.7072 0,-16.85429 -14.1342,-16.85429 h -46.6693 c -11.8763,0 -17.3521,6.16927 -20.3212,12.97854 0,0 -23.7347,56.82106 -57.3544,93.74763 -10.8806,10.66728 -15.8232,14.08081 -21.7613,14.08081 -2.969,0 -7.2715,-3.39577 -7.2715,-13.12075 v -90.83194 c 0,-11.66288 -3.4491,-16.85429 -13.3341,-16.85429 h -73.3553 c -7.4138,0 -11.8763,5.40476 -11.8763,10.54286 0,11.0406 16.8188,13.60078 18.5433,44.67814 v 67.52388 c 0,14.80973 -2.7202,17.49433 -8.6583,17.49433 -15.8231,0 -54.3143,-57.08773 -77.16,-122.40705 -4.4447,-12.71185 -8.9427,-17.83214 -20.8723,-17.83214 h -46.68718 c -13.3341,0 -16.0009,6.16925 -16.0009,12.97852 0,12.12515 15.8232,72.35973 73.69318,152.02656 38.58,54.40315 92.8942,83.89819 142.3726,83.89819 29.6729,0 33.3353,-6.54262 33.3353,-17.83216 v -41.12238 c 0,-13.10297 2.809,-15.71646 12.214,-15.71646 6.9338,0 18.7922,3.41353 46.4916,29.63728 31.6463,31.09512 36.8555,45.03372 54.6698,45.03372 h 46.6694 c 13.3341,0 20.0189,-6.54262 16.1787,-19.46781 -4.2313,-12.88962 -19.3433,-31.57515 -39.38,-53.74532 -10.8807,-12.62294 -27.2016,-26.22375 -32.1441,-33.03302 -6.9338,-8.72941 -4.9603,-12.62294 0,-20.39227 0,0 56.8566,-78.68897 62.7947,-105.41058 z" />
					<path fill="currentColor" d="m 567.69877,-429.06912 c 3.15618,-10.38133 0,-18.0247 -15.11579,-18.0247 h -49.91013 c -12.70096,0 -18.55706,6.59763 -21.73232,13.87977 0,0 -25.38286,60.76685 -61.33724,100.25768 -11.63627,11.40806 -16.92197,15.05863 -23.27242,15.05863 -3.17519,0 -7.77644,-3.63156 -7.77644,-14.0319 v -97.13948 c 0,-12.47278 -3.68869,-18.0247 -14.26014,-18.0247 h -78.44923 c -7.92857,0 -12.70097,5.78005 -12.70097,11.27491 0,11.80736 17.98666,14.54527 19.83094,47.78071 v 72.21293 c 0,15.83815 -2.9091,18.70918 -9.25948,18.70918 -16.92197,0 -58.08598,-61.05206 -82.51817,-130.90731 -4.75337,-13.59458 -9.56381,-19.07042 -22.32175,-19.07042 h -49.92915 c -14.26014,0 -17.11213,6.59763 -17.11213,13.87977 0,12.96714 16.92197,77.38454 78.81059,162.58363 41.25909,58.18101 99.34506,89.72424 152.25931,89.72424 31.73343,0 35.65018,-6.99691 35.65018,-19.07043 v -43.978 c 0,-14.01288 3.00405,-16.80786 13.0622,-16.80786 7.41521,0 20.09716,3.65057 49.71998,31.69536 33.84387,33.25443 39.41486,48.16093 58.46622,48.16093 h 49.91026 c 14.26,0 21.40913,-6.99691 17.30216,-20.81966 -4.5252,-13.78473 -20.68653,-33.76783 -42.11468,-57.47752 -11.63621,-13.49953 -29.09043,-28.04479 -34.37631,-35.32694 -7.41508,-9.33557 -5.30458,-13.4995 0,-21.80835 0,0 60.80491,-84.15334 67.15549,-112.73048 z" />
				</g>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="tumblr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" id="has-tumblr"><path fill="currentColor" d="M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z"></path></symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="share" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="has-webshare-icon"><path fill="currentColor" d="M512 208L320 384H288V288H208c-61.9 0-112 50.1-112 112c0 48 32 80 32 80s-128-48-128-176c0-97.2 78.8-176 176-176H288V32h32L512 208z"/></symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" id="has-x"><path fill="currentColor" d="M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z"></path></symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="mastodon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-mastodon"><path fill="currentColor" d="M433 179.1c0-97.2-63.7-125.7-63.7-125.7-62.5-28.7-228.6-28.4-290.5 0 0 0-63.7 28.5-63.7 125.7 0 115.7-6.6 259.4 105.6 289.1 40.5 10.7 75.3 13 103.3 11.4 50.8-2.8 79.3-18.1 79.3-18.1l-1.7-36.9s-36.3 11.4-77.1 10.1c-40.4-1.4-83-4.4-89.6-54a102.5 102.5 0 0 1 -.9-13.9c85.6 20.9 158.7 9.1 178.8 6.7 56.1-6.7 105-41.3 111.2-72.9 9.8-49.8 9-121.5 9-121.5zm-75.1 125.2h-46.6v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.3V197c0-58.5-64-56.6-64-6.9v114.2H90.2c0-122.1-5.2-147.9 18.4-175 25.9-28.9 79.8-30.8 103.8 6.1l11.6 19.5 11.6-19.5c24.1-37.1 78.1-34.8 103.8-6.1 23.7 27.3 18.4 53 18.4 175z"/></symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="threads" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-threads">
				<path fill="currentColor" d="M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c29.2 14.1 50.6 35.2 61.8 61.4c15.7 36.5 17.2 95.8-30.3 143.2c-36.2 36.2-80.3 52.5-142.6 53h-.3c-70.2-.5-124.1-24.1-160.4-70.2c-32.3-41-48.9-98.1-49.5-169.6V256v-.2C17 184.3 33.6 127.2 65.9 86.2C102.2 40.1 156.2 16.5 226.4 16h.3c70.3 .5 124.9 24 162.3 69.9c18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4c-29.2-35.8-73-54.2-130.5-54.6c-57 .5-100.1 18.8-128.2 54.4C72.1 146.1 58.5 194.3 58 256c.5 61.7 14.1 109.9 40.3 143.3c28 35.6 71.2 53.9 128.2 54.4c51.4-.4 85.4-12.6 113.7-40.9c32.3-32.2 31.7-71.8 21.4-95.9c-6.1-14.2-17.1-26-31.9-34.9c-3.7 26.9-11.8 48.3-24.7 64.8c-17.1 21.8-41.4 33.6-72.7 35.3c-23.6 1.3-46.3-4.4-63.9-16c-20.8-13.8-33-34.8-34.3-59.3c-2.5-48.3 35.7-83 95.2-86.4c21.1-1.2 40.9-.3 59.2 2.8c-2.4-14.8-7.3-26.6-14.6-35.2c-10-11.7-25.6-17.7-46.2-17.8H227c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1h.8c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3c25.6-1.4 54.6-11.4 59.5-73.2c-13.2-2.9-27.8-4.4-43.4-4.4c-4.8 0-9.6 .1-14.4 .4c-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z"/>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="bluesky" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" id="has-bluesky">
				<path fill="currentColor" d="M407.8 294.7c-3.3-.4-6.7-.8-10-1.3c3.4 .4 6.7 .9 10 1.3zM288 227.1C261.9 176.4 190.9 81.9 124.9 35.3C61.6-9.4 37.5-1.7 21.6 5.5C3.3 13.8 0 41.9 0 58.4S9.1 194 15 213.9c19.5 65.7 89.1 87.9 153.2 80.7c3.3-.5 6.6-.9 10-1.4c-3.3 .5-6.6 1-10 1.4C74.3 308.6-9.1 342.8 100.3 464.5C220.6 589.1 265.1 437.8 288 361.1c22.9 76.7 49.2 222.5 185.6 103.4c102.4-103.4 28.1-156-65.8-169.9c-3.3-.4-6.7-.8-10-1.3c3.4 .4 6.7 .9 10 1.3c64.1 7.1 133.6-15.1 153.2-80.7C566.9 194 576 75 576 58.4s-3.3-44.7-21.6-52.9c-15.8-7.1-40-14.9-103.2 29.8C385.1 81.9 314.1 176.4 288 227.1z"/>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="bluesky" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" id="has-pinterest">
				<path fill="currentColor" d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/>
			</symbol>
		</svg>
		<div id="has-mastodon-prompt" aria-hidden="true" style="display: none">
			<h3><?php esc_html_e( 'Share on Mastodon', 'highlight-and-share' ); ?></h3>
			<div class="mastodon-input-prompt">
				<form class="has-mastodon-form">
					<label><span class="has-mastodon-label"><?php esc_html_e( 'Enter your Mastodon instance URL (optional)', 'highlight-and-share' ); ?></span><input type="text" placeholder="<?php esc_attr_e( 'https://mastodon.social', 'highlight-and-share' ); ?>" tabindex="0" /></label>
					
					<button id="has-mastodon-submit" tabindex="0" class="button button-primary"><?php esc_html_e( 'Share', 'highlight-and-share' ); ?></button>
				</form>
			</div>
		</div>
		<?php
	}

	/**
	 * Load plugin scripts and styles
	 *
	 * Enqueue scripts/styles and provide localization
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 */
	public function add_scripts() {
		// Divi compatibility.
		if ( isset( $_GET['et_fb'] ) ) { // phpcs:ignore
			return;
		}
		// Beaver Builder compatibility.
		if ( isset( $_GET['fl_builder'] ) ) { // phpcs:ignore
				return;
		}
		// Elementor compatibility.
		if ( false !== strpos( $_SERVER['REQUEST_URI'], 'elementor' ) ) { // phpcs:ignore
			return;
		}
		$main_script_uri = Functions::get_plugin_url( 'dist/highlight-and-share.js' );
		wp_enqueue_script( 'highlight-and-share', $main_script_uri, array(), HIGHLIGHT_AND_SHARE_VERSION, true );
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'highlight-and-share', 'highlight-and-share' );
		}

		/**
		 * Register shortcode style.
		 */
		wp_register_style(
			'has-shortcode-themes',
			Functions::get_plugin_url( 'dist/has-shortcode-themes.css' ),
			array(),
			HIGHLIGHT_AND_SHARE_VERSION,
			'all'
		);

		// Enqueue style if shortcode is present.
		if ( has_shortcode( get_the_content(), 'has_click_to_share' ) ) {
			wp_enqueue_style( 'has-shortcode-themes' );
		}

		// Build JSON Objects.
		$settings = Options::get_plugin_options();
		$json_arr = array();

		// Facebook.
		$json_arr['show_facebook'] = (bool) apply_filters( 'has_show_facebook', $settings['show_facebook'] );
		$json_arr['show_twitter']  = (bool) apply_filters( 'has_show_twitter', $settings['show_twitter'] );
		$json_arr['show_linkedin'] = (bool) apply_filters( 'has_show_linkedin', $settings['show_linkedin'] );
		$json_arr['show_ok']       = (bool) apply_filters( 'has_show_ok', $settings['show_ok'] );
		$json_arr['show_vk']       = (bool) apply_filters( 'has_show_vk', $settings['show_vk'] );
		$json_arr['show_email']    = (bool) apply_filters( 'has_show_email', ( $settings['show_email'] ?? $settings['enable_emails'] ) );
		$json_arr['show_xing']     = (bool) apply_filters( 'has_show_xing', $settings['show_xing'] );
		$json_arr['show_copy']     = (bool) apply_filters( 'has_show_copy', $settings['show_copy'] );
		$json_arr['show_whatsapp'] = (bool) apply_filters( 'has_show_whatsapp', ( $settings['show_whatsapp'] ?? $settings['show_whats_app'] ) );
		$json_arr['show_telegram'] = (bool) apply_filters( 'has_show_telegram', $settings['show_telegram'] );
		$json_arr['show_mastodon'] = (bool) apply_filters( 'has_show_mastodon', $settings['show_mastodon'] );
		$json_arr['show_threads']  = (bool) apply_filters( 'has_show_threads', $settings['show_threads'] );
		$json_arr['show_bluesky']  = (bool) apply_filters( 'has_show_bluesky', $settings['show_bluesky'] );

		// Twitter Username.
		$json_arr['twitter_username'] = trim( sanitize_text_field( apply_filters( 'has_twitter_username', $settings['twitter'] ) ) );

		// Override the filter if no username is present for twitter.
		if ( empty( $json_arr['twitter_username'] ) ) {
			$json_arr['twitter_username'] = '';
		}

		// Check Webshare variables and add to JSON output.
		$json_arr['enable_webshare_inline_highlight'] = (bool) apply_filters( 'has_enable_webshare_inline_highlight', $settings['enable_webshare_inline_highlight'] );
		$json_arr['enable_webshare_click_to_share']   = (bool) apply_filters( 'has_enable_webshare_click_to_share', $settings['enable_webshare_click_to_share'] );

		// Check if in legacy mode.
		$json_arr['content_legacy_mode'] = $this->is_legacy_content_loop_markup();

		// Add mobile.
		if ( wp_is_mobile() ) {
			$json_arr['mobile'] = true;
		} else {
			$json_arr['mobile'] = false;
		}

		$regex_style_elements = '/([.#])/';
		$js_selector_string   = '';

		/**
		 * Filter: has_js_classes
		 *
		 * Comman-separated CSS classes (without the .) that Highlight and Share should be enabled on.
		 *
		 * @param string Comma-separated CSS classes
		 */
		$classes = apply_filters( 'has_js_classes', $settings['js_content'] ); // Pass comma separated values (e.g., entry-content,type-post,type-page).
		$classes = explode( ',', $classes );
		$classes = preg_replace( $regex_style_elements, '', $classes );
		foreach ( $classes as $index => &$string ) {
			$string = trim( $string ); // Trim.
			if ( empty( $string ) ) {
				unset( $classes[ $index ] ); // Remove empty values.
				continue;
			}
			$string = trim( esc_js( '.' . $string ) ); // Get in class format (.%s) and trim just in case.
		}

		/**
		 * Filter: has_js_ids
		 *
		 * Comman-separated CSS IDs (without the #) that Highlight and Share should be enabled on.
		 *
		 * @param string Comma-separated CSS IDs
		 */
		$ids = apply_filters( 'has_js_ids', $settings['id_content'] ); // Pass array of jQuery ID elements (without the #).
		$ids = explode( ',', $ids );
		$ids = preg_replace( $regex_style_elements, '', $ids );
		foreach ( $ids as $index => &$string ) {
			$string = trim( $string ); // Trim.
			if ( empty( $string ) ) {
				unset( $ids[ $index ] ); // Remove empty values.
				continue;
			}
			$string = trim( esc_js( '#' . $string ) ); // Get in class format (.%s) and trim just in case.
		}

		$elements = apply_filters( 'has_js_elements', $settings['element_content'] ); // Pass array of jQuery HTML elements (e.g., blockquote, article).
		$elements = explode( ',', $elements );
		$elements = preg_replace( $regex_style_elements, '', $elements );
		foreach ( $elements as $index => &$string ) {
			$string = trim( $string ); // Trim.
			if ( empty( $string ) ) {
				unset( $elements[ $index ] ); // Remove empty values.
				continue;
			}
			$string = trim( esc_js( $string ) ); // Get in class format (.%s) and trim just in case.
		}

		// Populate/Add content items.
		if ( apply_filters( 'has_enable_content', (bool) $settings['enable_content'] ) ) {
			$classes[] = '.has-content-area';
		}
		if ( apply_filters( 'has_enable_excerpt', (bool) $settings['enable_excerpt'] ) ) {
			$classes[] = '.has-excerpt-area';
		}

		// Merge the content together.
		$js_selector_string = implode( ',', array_merge( $classes, $ids, $elements ) );

		/**
		 * Filter: has_js_selectors
		 *
		 * Modify all the selectors (classes, ids, elements) that are used for Highlight and Share.
		 *
		 * @param string          Comma-separated CSS IDs, classes and HTML elements.
		 * @param array $classes  Array with CSS classes (with the .).
		 * @param array $ids      Array with CSS IDs (with the #).
		 * @param array $elements Array with HTML elements.
		 */
		$json_arr['content'] = apply_filters( 'has_js_selectors', $js_selector_string, $classes, $ids, $elements );

		/**
		 * Filter: has_twitter_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Tweet
		 */
		$json_arr['tweet_text'] = apply_filters( 'has_twitter_text', _x( 'Tweet', 'Twitter share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_facebook_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Share
		 */
		$json_arr['facebook_text'] = apply_filters( 'has_facebook_text', _x( 'Share', 'Facebook share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_linkedin_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: LinkedIn
		 */
		$json_arr['linkedin_text'] = apply_filters( 'has_linkedin_text', _x( 'LinkedIn', 'LinkedIn share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_ok_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Odnoklassniki
		 */
		$json_arr['ok_text'] = apply_filters( 'has_ok_text', _x( 'Odnoklassniki', 'Odnoklassniki share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_vk_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: VKontakte
		 */
		$json_arr['vk_text'] = apply_filters( 'has_vk_text', _x( 'VKontakte', 'VKontakte share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_mastodon_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Mastodon
		 */
		$json_arr['mastodon_text'] = apply_filters( 'has_mastodon_text', _x( 'Mastodon', 'Mastodon share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_threads_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Threads
		 */
		$json_arr['threads_text'] = apply_filters( 'has_threads_text', _x( 'Threads', 'Threads share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_bluesky_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Bluesky
		 */
		$json_arr['bluesky_text'] = apply_filters( 'has_bluesky_text', _x( 'Bluesky', 'Bluesky share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_whatsapp_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: WhatsApp
		 */
		$json_arr['whatsapp_text'] = apply_filters( 'has_whatsapp_text', _x( 'WhatsApp', 'WhatsApp share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_xing_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Xing
		 */
		$json_arr['xing_text'] = apply_filters( 'has_xing_text', _x( 'Xing', 'Xing share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_copy_text
		 *
		 * Modify the Copy label on the frontend.
		 *
		 * @param string Default: Copy
		 */
		$json_arr['copy_text'] = apply_filters( 'has_copy_text', _x( 'Copy', 'Copy share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_email_text
		 *
		 * Modify the Email label on the frontend.
		 *
		 * @param string Default: E-mail
		 */
		$json_arr['email_text'] = apply_filters( 'has_email_text', _x( 'E-mail', 'E-mail share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_webshare_text
		 *
		 * Modify the Webshare text on the frontend.
		 *
		 * @param string Default: Share
		 */
		$json_arr['webshare_text'] = apply_filters( 'has_webshare_text', _x( 'Share', 'Webshare share text', 'highlight-and-share' ) );

		// Load prefix and suffix (before/after text).
		$json_arr['prefix'] = isset( $settings['sharing_prefix'] ) ? stripslashes_deep( sanitize_text_field( $settings['sharing_prefix'] ) ) : '';
		$json_arr['suffix'] = isset( $settings['sharing_suffix'] ) ? stripslashes_deep( sanitize_text_field( $settings['sharing_suffix'] ) ) : '';

		// Get highlight tooltip options.
		$block_editor_options = Options::get_block_editor_options();
		if ( (bool) $block_editor_options['inline_highlight_show_tooltips'] ) {
			$json_arr['inline_highlight_tooltips_enabled'] = true;
			$json_arr['inline_highlight_tooltips_text']    = $block_editor_options['inline_highlight_tooltips_text'];
		} else {
			$json_arr['inline_highlight_tooltips_enabled'] = false;
			$json_arr['inline_highlight_tooltips_text']    = '';
		}

		// Get the webshare settings.
		$image_sharing_options                  = Options::get_image_options();
		$json_arr['enable_webshare_image_only'] = (bool) $image_sharing_options['webshare_share_image_only'];

		// Localize.
		wp_localize_script( 'highlight-and-share', 'highlight_and_share', $json_arr );

		/**
		 * Filter: has_load_css
		 *
		 * Whether to load Highlight and Share CSS.
		 *
		 * @param bool true for allowing CSS, false if not.
		 */
		if ( apply_filters( 'has_load_css', true ) && 'off' !== $settings['theme'] ) {

			// Add styles that don't need to be in the header or rendered above the fold.
			add_action( 'wp_footer', array( $this, 'output_footer_css' ), 1 );

			// Classes needed for CSS.
			add_filter( 'body_class', array( $this, 'add_body_class' ), 10, 2 );

			// Let's see if inline highlight tooltips are enabled.
			if ( (bool) $block_editor_options['inline_highlight_show_tooltips'] ) {
				// Load dummy stylesheet.
				wp_register_style( 'has-inline-highlight-tooltips', false );
				$inline_highlight_styles = ':root { --has-inline-highlight-tooltips-color: ' . esc_html( $block_editor_options['inline_highlight_tooltips_text_color'] ) . '; --has-inline-highlight-tooltips-background-color: ' . esc_html( $block_editor_options['inline_highlight_tooltips_background_color'] ) . '; }';
				// Add inline styles.
				wp_add_inline_style(
					'has-inline-highlight-tooltips',
					$inline_highlight_styles
				);
				wp_enqueue_style( 'has-inline-highlight-tooltips' );
			}

			// Output remaining inline styles.
			if ( true !== $this->is_legacy_content_loop_markup() ) { // Remove inline styles if legacy markup is enabled so we don't hide the wrong div.
				// Hide the placeholder div.
				wp_register_style( 'has-inline-styles', false );
				$inline_styles = '.has-social-placeholder {display: none;height: 0;width: 0;overflow: hidden;}' . Themes::get_inline_highlight_css();
				// Add inline styles.
				wp_add_inline_style(
					'has-inline-styles',
					$inline_styles
				);
				wp_enqueue_style( 'has-inline-styles' );
			}

			// Load Image Sharing CSS (if image sharing is enabled).
			$image_sharing_options = Options::get_image_options();
			$image_sharing_enabled = (bool) $image_sharing_options['enable_image_sharing'];
			if ( $image_sharing_enabled ) {
				// Get the colors.
				$image_sharing_css = (
					'.has-pin-image-wrapper {' .
					'--has-pinterest-button-color: ' . esc_html( $image_sharing_options['pinterest_button_color'] ) . ';' .
					'--has-pinterest-button-color-hover: ' . esc_html( $image_sharing_options['pinterest_button_color_hover'] ) . ';' .
					'--has-pinterest-icon-color: ' . esc_html( $image_sharing_options['pinterest_icon_color'] ) . ';' .
					'--has-pinterest-icon-color-hover: ' . esc_html( $image_sharing_options['pinterest_icon_color_hover'] ) . ';' .
					'--has-pinterest-text-color: ' . esc_html( $image_sharing_options['pinterest_text_color'] ) . ';' .
					'--has-pinterest-text-color-hover: ' . esc_html( $image_sharing_options['pinterest_text_color_hover'] ) . ';' .
					'--has-webshare-icon-color: ' . esc_html( $image_sharing_options['webshare_icon_color'] ) . ';' .
					'--has-webshare-icon-color-hover: ' . esc_html( $image_sharing_options['webshare_icon_color_hover'] ) . ';' .
					'--has-webshare-button-color: ' . esc_html( $image_sharing_options['webshare_button_color'] ) . ';' .
					'--has-webshare-button-color-hover: ' . esc_html( $image_sharing_options['webshare_button_color_hover'] ) . ';' .
					'--has-webshare-text-color: ' . esc_html( $image_sharing_options['webshare_text_color'] ) . ';' .
					'--has-webshare-text-color-hover: ' . esc_html( $image_sharing_options['webshare_text_color_hover'] ) . ';' .
					'}'
				);
				wp_register_style(
					'has-image-sharing',
					false
				);
				wp_add_inline_style(
					'has-image-sharing',
					$image_sharing_css
				);
				wp_enqueue_style( 'has-image-sharing' );
			}
		}
	}

	/**
	 * Output stylesheets in the footer that do not need to be loaded in the head.
	 *
	 * Enqueue styles
	 *
	 * @since 5.0.0
	 * @access public
	 *
	 * @see add_scripts
	 */
	public function output_footer_css() {
		wp_register_style(
			'highlight-and-share',
			Functions::get_plugin_url( 'dist/has-themes.css' ),
			array(),
			HIGHLIGHT_AND_SHARE_VERSION,
			'all'
		);
		wp_print_styles( 'highlight-and-share' );
	}

	/**
	 * Add a body class for styling.
	 *
	 * @since 3.2.11
	 *
	 * @param array $classes Array of class names.
	 * @param array $class   Array of additional classnaes added to the body.
	 *
	 * @return array Updated classnames.
	 */
	public function add_body_class( $classes, $class ) {
		$classes[] = 'has-body';
		return $classes;
	}
}
