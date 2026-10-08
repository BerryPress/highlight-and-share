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
 * Class Hashtags
 */
class Hashtags {

	/**
	 * Class runner.
	 */
	public function run() {
		add_action( 'init', array( $this, 'init' ), 9 );
	}

	/**
	 * Main plugin initialization
	 *
	 * Initialize admin menus, options,and scripts
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see __construct
	 */
	public function init() {
		$settings = Options::get_plugin_options();

		// Register Hashtags Taxonomy.
		$labels = array(
			'name'                       => _x( 'Hashtags', 'Taxonomy General Name', 'highlight-and-share' ),
			'singular_name'              => _x( 'Hashtag', 'Taxonomy Singular Name', 'highlight-and-share' ),
			'menu_name'                  => __( 'Hashtags', 'highlight-and-share' ),
			'all_items'                  => __( 'All Hashtags', 'highlight-and-share' ),
			'parent_item'                => __( 'Parent Hashtag', 'highlight-and-share' ),
			'parent_item_colon'          => __( 'Hashtag:', 'highlight-and-share' ),
			'new_item_name'              => __( 'New Hashtag', 'highlight-and-share' ),
			'add_new_item'               => __( 'Add New Hashtag', 'highlight-and-share' ),
			'edit_item'                  => __( 'Edit Hashtag', 'highlight-and-share' ),
			'update_item'                => __( 'Update Hashtag', 'highlight-and-share' ),
			'view_item'                  => __( 'View Hashtag', 'highlight-and-share' ),
			'separate_items_with_commas' => __( 'Separate hash tags with commas', 'highlight-and-share' ),
			'add_or_remove_items'        => __( 'Add or remove hash tags', 'highlight-and-share' ),
			'choose_from_most_used'      => __( 'Choose from the most used', 'highlight-and-share' ),
			'popular_items'              => __( 'Popular Hashtags', 'highlight-and-share' ),
			'search_items'               => __( 'Search Hashtags', 'highlight-and-share' ),
			'not_found'                  => __( 'Not Found', 'highlight-and-share' ),
			'no_terms'                   => __( 'No items', 'highlight-and-share' ),
			'items_list'                 => __( 'Items list', 'highlight-and-share' ),
			'items_list_navigation'      => __( 'Items list navigation', 'highlight-and-share' ),
		);
		$args   = array(
			'labels'            => $labels,
			'hierarchical'      => false,
			'public'            => true,
			'show_ui'           => true,
			'show_admin_column' => false,
			'show_in_nav_menus' => false,
			'show_tagcloud'     => false,
			'rewrite'           => false,
			'show_in_rest'      => true,
			'show_in_menu'      => false,
		);

		if ( ! $settings['enable_hashtags'] ) {
			return false;
		}

		/**
		 * Allow others to modify the taxonomy args for hashtags.
		 */
		$args = apply_filters( 'has_hashtags_taxonomy_args', $args );

		/**
		 * Filter: has_hashtags_post_types
		 *
		 * Allow others to programmatically add or substract post types that hashtags are enabled for.
		 *
		 * @param array Index array of post type slugs.
		 */
		$supported_post_types = apply_filters(
			'has_hashtags_post_types',
			array(
				'post',
				'page',
			)
		);

		/**
		 * Filter: has_show_hashtags_taxonomy
		 *
		 * Allow others to turn off hashtags.
		 *
		 * @param bool true to disable hashtags, false to not.
		 */
		if ( apply_filters( 'has_show_hashtags_taxonomy', true ) ) {
			register_taxonomy( 'hashtags', $supported_post_types, $args );
		}

	}

	/**
	 * Retrieve hashtags for a post/page.
	 *
	 * @param int    $post_id The post ID to retrieve hashtags for.
	 * @param string $output The type of output to return. Accepts 'string' or 'array'.
	 *
	 * @return array|string Hashtags.
	 */
	public static function get_hashtags( $post_id, $output = 'string' ) {
		$options = Options::get_plugin_options();
		if ( ! $options['enable_hashtags'] ) {
			return '';
		}
		$hashtags_raw = wp_get_object_terms( $post_id, 'hashtags' );

		if ( empty( $hashtags_raw ) ) {
			return '';
		}

		$hashtags = array();
		foreach ( $hashtags_raw as $hashtag_term ) {
			// Strip out pound sign in case it was entered accidentally.
			$hashtag = str_replace( '#', '', $hashtag_term->name );

			// Check for white-space.
			$hashtag = preg_replace( '/\s+/', '', $hashtag );
			$hashtag = sanitize_text_field( $hashtag );

			// Populate hashtags.
			$hashtags[] = $hashtag;
		}
		if ( 'string' === $output ) {
			return implode( ',', $hashtags );
		}

		return $hashtags;
	}
}
