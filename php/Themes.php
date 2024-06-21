<?php
/**
 * Helper functions for the plugin.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Class Themes
 */
class Themes {

	/**
	 * Get the default theme colors.
	 */
	public static function get_default_theme_colors() {
		// Return colors for each social network. Each has a slug, value, and label.
		$colors = array(
			array(
				'slug'  => 'twitter',
				'color' => '#1da1f2',
				'label' => __( 'Twitter', 'highlight-and-share' ),
			),
			array(
				'slug'  => 'facebook',
				'color' => '#3b5998',
				'label' => __( 'Facebook', 'highlight-and-share' ),
			),
			array(
				'slug'  => 'linkedin',
				'color' => '#0077b5',
				'label' => __( 'LinkedIn', 'highlight-and-share' ),
			),
			array(
				'slug'  => 'reddit',
				'color' => '#ff4500',
				'label' => __( 'Reddit', 'highlight-and-share' ),
			),
			/* Telegram */
			array(
				'slug'  => 'telegram',
				'color' => '#0088cc',
				'label' => __( 'Telegram', 'highlight-and-share' ),
			),
			/* LinkedIn */
			array(
				'slug'  => 'linkedin',
				'color' => '#0077b5',
				'label' => __( 'LinkedIn', 'highlight-and-share' ),
			),
			/* Pinterest */
			array(
				'slug'  => 'pinterest',
				'color' => '#E7011D',
				'label' => __( 'Pinterest', 'highlight-and-share' ),
			),
			/* Webshare */
			array(
				'slug'  => 'webshare',
				'color' => '#f58f2f',
				'label' => __( 'Webshare', 'highlight-and-share' ),
			),
			/* WhatsApp */
			array(
				'slug'  => 'whatsapp',
				'color' => '#25d366',
				'label' => __( 'WhatsApp', 'highlight-and-share' ),
			),
			/* Black */
			array(
				'slug'  => 'black',
				'color' => '#000000',
				'label' => __( 'Black', 'highlight-and-share' ),
			),
			/* White */
			array(
				'slug'  => 'white',
				'color' => '#ffffff',
				'label' => __( 'White', 'highlight-and-share' ),
			),
			/* Purple */
			array(
				'slug'  => 'theme-purple',
				'color' => '#8364E8',
				'label' => __( 'Purple', 'highlight-and-share' ),
			),
			/* Black */
			array(
				'slug'  => 'theme-black',
				'color' => '#333',
				'label' => __( 'Black', 'highlight-and-share' ),
			),
			/* Blue */
			array(
				'slug'  => 'theme-blue',
				'color' => '#0009c1',
				'label' => __( 'Blue', 'highlight-and-share' ),
			),
			/* Green */
			array(
				'slug'  => 'theme-green',
				'color' => '#03ac27',
				'label' => __( 'Green', 'highlight-and-share' ),
			),
			/* Cyan */
			array(
				'slug'  => 'theme-cyan',
				'color' => '#0091b0',
				'label' => __( 'Cyan', 'highlight-and-share' ),
			),
			/* Magenta */
			array(
				'slug'  => 'theme-magenta',
				'color' => '#c700c7',
				'label' => __( 'Magenta', 'highlight-and-share' ),
			),
		);

		/**
		 * Filter the default theme colors.
		 *
		 * @param array $colors Array of theme colors
		 */
		$colors = apply_filters(
			'has_default_theme_color_palette',
			$colors
		);
		return $colors;
	}

	/**
	 * Return CSS rule for inline highlighting.
	 */
	public static function get_inline_highlight_css() {
		$block_editor_options = Options::get_block_editor_options();
		$inline_styles = sprintf(
			'.has-inline-text { background-color: %1$s; color: %2$s; }.has-inline-text:hover { background-color: %3$s; color: %4$s; }',
			$block_editor_options['inline_highlight_background_color'] ?? '#ffefb1',
			$block_editor_options['inline_highlight_text_color'] ?? '#000000',
			$block_editor_options['inline_highlight_background_color_hover'] ?? '#fcd63c',
			$block_editor_options['inline_highlight_text_color_hover'] ?? '#000000'
		);
		return $inline_styles;
	}

	/**
	 * Get the main themes.
	 */
	public static function get_main_themes() {
		$default_themes = array(
			'off'                    => esc_html__( 'Off', 'highligh-and-share' ),
			'default'                => esc_html__( 'Default', 'highlight-and-share' ),
			'brand-colors'           => esc_html__( 'Brand Colors (Icons Only)', 'highlight-and-share' ),
			'colorful-circles'       => esc_html__( 'Colorful Circles (Icons Only)', 'highlight-and-share' ),
			'colorful-glass-circles' => esc_html__( 'Colorful Glass Circles (Icons Only)', 'highlight-and-share' ),
			'black'                  => esc_html__( 'Black (Icons Only)', 'highlight-and-share' ),
			'purple'                 => esc_html__( 'Purple (Icons Only)', 'highlight-and-share' ),
			'white'                  => esc_html__( 'White (Icons Only)', 'highlight-and-share' ),
			'cyan'                   => esc_html__( 'Cyan (Icons Only)', 'highlight-and-share' ),
			'magenta'                => esc_html__( 'Magenta (Icons Only)', 'highlight-and-share' ),
			'blue'                   => esc_html__( 'Blue (Icons Only)', 'highlight-and-share' ),
			'green'                  => esc_html__( 'Green (Icons Only)', 'highlight-and-share' ),
		);

		/**
		 * Filter: has_main_themes
		 *
		 * Modify the available default themes.
		 *
		 * @param array $default_themes slug -> label associative array.
		 */
		return apply_filters( 'has_main_themes', $default_themes );
	}
}
