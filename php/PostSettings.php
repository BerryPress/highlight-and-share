<?php
/**
 * Per-post Highlight and Share settings (sidebar / meta box).
 *
 * Registers _has_post_settings meta, Classic Editor meta box, and helpers
 * for Block Editor panel and frontend. One key per feature: highlight_sharing (social sharing via highlight),
 * image_sharing (later); values: disabled | default | enabled.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Post settings (per-post HAS controls).
 */
class PostSettings {

	/**
	 * Meta key for the serialized post settings array.
	 *
	 * @var string
	 */
	const META_KEY = '_has_post_settings';

	/**
	 * Allowed keys in the post settings array.
	 *
	 * @var array
	 */
	const ALLOWED_KEYS = array(
		'highlight_sharing',
		'image_sharing',
		'headline_sharing',
	);

	/**
	 * Allowed values for each key.
	 *
	 * @var array
	 */
	const ALLOWED_VALUES = array( 'disabled', 'default', 'enabled' );

	/**
	 * Run the class.
	 */
	public static function run() {
		add_action( 'init', array( PostSettings::class, 'register_meta' ), 15 );
		add_action( 'add_meta_boxes', array( PostSettings::class, 'register_classic_meta_box' ), 10, 2 );
		add_action( 'save_post', array( PostSettings::class, 'save_classic_meta_box' ), 10, 2 );
		add_filter( 'has_highlight_sharing_enabled_for_post', array( PostSettings::class, 'filter_highlight_sharing_for_post' ), 10, 2 );
	}

	/**
	 * Filter social sharing via highlight per post: disabled / default / enabled.
	 *
	 * Use this filter when deciding whether to load or show highlight sharing
	 * for a post. Pass the global/default enabled state as $enabled.
	 *
	 * @param bool $enabled  Whether highlight sharing is enabled (e.g. from global option).
	 * @param int  $post_id  Post ID.
	 * @return bool Effective enabled state for this post.
	 */
	public static function filter_highlight_sharing_for_post( $enabled, $post_id ) {
		$value = self::get( $post_id, 'highlight_sharing', 'default' );
		if ( 'disabled' === $value ) {
			return false;
		}
		if ( 'enabled' === $value ) {
			return true;
		}
		return (bool) $enabled;
	}

	/**
	 * Post types that show the HAS sidebar (panel or meta box).
	 *
	 * All public post types. Keeps logic simple; no per–post-type opt-in.
	 *
	 * @return array List of post type slugs.
	 */
	public static function get_supported_post_types() {
		$post_types = array_keys( get_post_types( array( 'public' => true ), 'names' ) );

		/**
		 * Filter: has_post_settings_supported_post_types
		 *
		 * Allow others to modify the list of post types that show the HAS sidebar.
		 *
		 * @param array $post_types List of post type slugs.
		 * @return array List of post type slugs.
		 * @since 6.0.0
		 */
		$post_types_supported = apply_filters( 'has_post_settings_supported_post_types', $post_types );
		return $post_types_supported;
	}

	/**
	 * Register _has_post_settings meta for each supported post type.
	 */
	public static function register_meta() {
		$post_types = self::get_supported_post_types();
		foreach ( $post_types as $post_type ) {
			if ( ! post_type_exists( $post_type ) ) {
				continue;
			}
			add_post_type_support( $post_type, 'custom-fields' );
			register_meta(
				$post_type,
				self::META_KEY,
				array(
					'show_in_rest'      => array(
						'schema' => array(
							'type'       => 'object',
							'properties' => array(
								'highlight_sharing' => array(
									'type' => 'string',
									'enum' => array( 'disabled', 'default', 'enabled' ),
								),
								'image_sharing'     => array(
									'type' => 'string',
									'enum' => array( 'disabled', 'default', 'enabled' ),
								),
								'headline_sharing'  => array(
									'type' => 'string',
									'enum' => array( 'disabled', 'default', 'enabled' ),
								),
							),
						),
					),
					'single'            => true,
					'type'              => 'object',
					'default'           => array(),
					'auth_callback'     => function ( $allowed, $meta_key, $post_id ) {
						return current_user_can( 'edit_post', $post_id );
					},
					'sanitize_callback' => array( PostSettings::class, 'sanitize_post_settings' ),
				)
			);
		}
	}

	/**
	 * Sanitize post settings meta: only allow known keys and allowed values.
	 *
	 * @param mixed $value Incoming value (array from REST or form).
	 * @return array Sanitized array.
	 */
	public static function sanitize_post_settings( $value ) {
		if ( ! is_array( $value ) ) {
			return array();
		}
		$out = array();
		foreach ( self::ALLOWED_KEYS as $key ) {
			if ( ! isset( $value[ $key ] ) || ! is_string( $value[ $key ] ) ) {
				continue;
			}
			$val = strtolower( trim( $value[ $key ] ) );
			if ( in_array( $val, self::ALLOWED_VALUES, true ) ) {
				$out[ $key ] = $val;
			}
		}
		return $out;
	}

	/**
	 * Default values for each setting key.
	 *
	 * @return array Key => default value.
	 */
	public static function get_defaults() {
		$defaults = array();
		foreach ( self::ALLOWED_KEYS as $key ) {
			$defaults[ $key ] = 'default';
		}
		return $defaults;
	}

	/**
	 * Get a single post setting value.
	 *
	 * @param int    $post_id Post ID.
	 * @param string $key     Setting key (e.g. highlight_sharing).
	 * @param string $default_value Default if key not set or invalid.
	 * @return string 'disabled' | 'default' | 'enabled'.
	 */
	public static function get( $post_id, $key, $default_value = 'default' ) {
		if ( ! in_array( $key, self::ALLOWED_KEYS, true ) ) {
			return $default_value;
		}
		$all = self::get_all( $post_id );
		$val = isset( $all[ $key ] ) ? $all[ $key ] : $default_value;
		return in_array( $val, self::ALLOWED_VALUES, true ) ? $val : $default_value;
	}

	/**
	 * Get all post settings for a post (merged with defaults).
	 *
	 * @param int $post_id Post ID.
	 * @return array Key => value.
	 */
	public static function get_all( $post_id ) {
		$raw = get_post_meta( $post_id, self::META_KEY, true );
		if ( ! is_array( $raw ) ) {
			$raw = array();
		}
		return array_merge( self::get_defaults(), $raw );
	}

	/**
	 * Whether the current post uses the block editor (so we show panel vs meta box).
	 *
	 * @param \WP_Post $post Post object.
	 * @return bool True if block editor is used for this post.
	 */
	public static function use_block_editor_for_post( $post ) {
		return (bool) apply_filters( 'use_block_editor_for_post', use_block_editor_for_post( $post ), $post );
	}

	/**
	 * Register the Classic Editor meta box only when post uses Classic Editor.
	 *
	 * @param string   $post_type Post type.
	 * @param \WP_Post $post      Post object.
	 */
	public static function register_classic_meta_box( $post_type, $post ) {
		$supported = self::get_supported_post_types();
		if ( ! in_array( $post_type, $supported, true ) ) {
			return;
		}
		if ( ! $post instanceof \WP_Post ) {
			return;
		}
		if ( self::use_block_editor_for_post( $post ) ) {
			return;
		}
		add_meta_box(
			'has_post_settings',
			__( 'Highlight and Share', 'highlight-and-share' ),
			array( PostSettings::class, 'render_classic_meta_box' ),
			$post_type,
			'side',
			'default',
			array( '__back_compat_meta_box' => true )
		);
	}

	/**
	 * Render the Classic Editor meta box (radio group: Disabled | Default | Enabled).
	 *
	 * @param \WP_Post $post Post object.
	 * @param array    $box Meta box args.
	 */
	public static function render_classic_meta_box( $post, $box ) {
		wp_nonce_field( 'has_post_settings_save', 'has_post_settings_nonce' );
		$settings = self::get_all( $post->ID );
		$options  = array(
			'disabled' => __( 'Disabled', 'highlight-and-share' ),
			'default'  => __( 'Default', 'highlight-and-share' ),
			'enabled'  => __( 'Enabled', 'highlight-and-share' ),
		);
		?>
		<div class="has-post-settings-meta-box">
			<p class="has-post-settings-label"><?php esc_html_e( 'Social Sharing via Highlight', 'highlight-and-share' ); ?></p>
			<fieldset class="has-post-settings-fieldset">
				<?php
				$current = isset( $settings['highlight_sharing'] ) ? $settings['highlight_sharing'] : 'default';
				foreach ( $options as $value => $label ) {
					$id = 'has_highlight_sharing_' . $value;
					?>
					<label for="<?php echo esc_attr( $id ); ?>" style="display: block; margin-bottom: 4px;">
						<input type="radio" name="has_post_settings[highlight_sharing]" id="<?php echo esc_attr( $id ); ?>" value="<?php echo esc_attr( $value ); ?>" <?php checked( $current, $value ); ?> />
						<?php echo esc_html( $label ); ?>
					</label>
					<?php
				}
				?>
			</fieldset>
		</div>
		<?php
	}

	/**
	 * Save Classic Editor meta box.
	 *
	 * @param int      $post_id Post ID.
	 * @param \WP_Post $post    Post object.
	 */
	public static function save_classic_meta_box( $post_id, $post ) {
		if ( ! isset( $_POST['has_post_settings_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['has_post_settings_nonce'] ) ), 'has_post_settings_save' ) ) {
			return;
		}
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}
		$supported = self::get_supported_post_types();
		if ( ! in_array( $post->post_type, $supported, true ) ) {
			return;
		}
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
		if ( ! isset( $_POST['has_post_settings'] ) || ! is_array( $_POST['has_post_settings'] ) ) {
			return;
		}
		$raw       = array_map( 'sanitize_text_field', wp_unslash( $_POST['has_post_settings'] ) );
		$sanitized = self::sanitize_post_settings( $raw );
		update_post_meta( $post_id, self::META_KEY, $sanitized );
	}
}
