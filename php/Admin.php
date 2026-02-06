<?php
/**
 * Helper functions for the plugin.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Class Admin
 */
class Admin {

	/**
	 * Class runner.
	 */
	public function run() {
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
		// Plugin settings.
		add_filter( 'plugin_action_links_' . plugin_basename( Functions::get_plugin_file() ), array( $this, 'add_settings_link' ) );

		// Save and retrieve settings tab content.
		add_action( 'wp_ajax_has_save_settings_tab', array( $this, 'ajax_save_settings_tab' ) );
		add_action( 'wp_ajax_has_retrieve_settings_tab', array( $this, 'ajax_retrieve_settings_tab' ) );
		add_action( 'wp_ajax_has_reset_settings_tab', array( $this, 'ajax_reset_settings_tab' ) );

		// Retrieve appearance settings for context.
		add_action( 'wp_ajax_has_retrieve_appearance_settings_context', array( $this, 'ajax_retrieve_appearance_settings_context' ) );
		add_action( 'wp_ajax_has_save_appearance_settings', array( $this, 'ajax_has_save_appearance_settings' ) );
		add_action( 'wp_ajax_has_reset_appearance_settings', array( $this, 'ajax_has_reset_appearance_settings' ) );

		// Retrieve block editor defaults.
		add_action( 'wp_ajax_has_retrieve_block_editor_tab', array( $this, 'ajax_retrieve_block_editor_tab' ) );

		// Save and reset social icon order.
		add_action( 'wp_ajax_has_save_social_icon_order', array( $this, 'ajax_save_social_icon_order' ) );
		add_action( 'wp_ajax_has_reset_social_icon_order', array( $this, 'ajax_reset_social_icon_order' ) );

		// Save and reset block editor options.
		add_action( 'wp_ajax_has_save_block_editor_options', array( $this, 'ajax_save_block_editor_options' ) );
		add_action( 'wp_ajax_has_reset_block_editor_options', array( $this, 'ajax_reset_block_editor_options' ) );

		// Retrieve, save, and reset recaptcha options.
		add_action( 'wp_ajax_has_save_emails_tab', array( $this, 'ajax_save_emails_tab' ) );
		add_action( 'wp_ajax_has_retrieve_emails_tab', array( $this, 'ajax_retrieve_emails_tab' ) );
		add_action( 'wp_ajax_has_reset_emails_tab', array( $this, 'ajax_reset_emails_tab' ) );

		// User meta handlers for admin user meta (panel states, first_installed, etc.).
		add_action( 'wp_ajax_has_get_admin_user_meta', array( $this, 'ajax_get_admin_user_meta' ) );
		add_action( 'wp_ajax_has_set_admin_user_meta', array( $this, 'ajax_set_admin_user_meta' ) );

		// Retrieve, save, and reset recaptcha options.
		add_action( 'wp_ajax_has_save_images_options', array( $this, 'ajax_save_images_options' ) );
		add_action( 'wp_ajax_has_retrieve_images_options', array( $this, 'ajax_retrieve_images_options' ) );
		add_action( 'wp_ajax_has_reset_images_options', array( $this, 'ajax_reset_images_options' ) );

		// For HAS styling in the admin.
		add_action( 'admin_body_class', array( $this, 'add_admin_body_class' ) );
	}

	/**
	 * Add a settings link to the plugin's options.
	 *
	 * Add a settings link on the WordPress plugin's page.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param array $links Array of plugin options.
	 * @return array $links Array of plugin options
	 */
	public function add_settings_link( $links ) {
		$settings_link   = sprintf( '<a href="%s">%s</a>', esc_url( admin_url( 'options-general.php?page=highlight-and-share' ) ), _x( 'Settings', 'Plugin settings link on the plugins page', 'highlight-and-share' ) );
		$appearance_link = sprintf( '<a href="%s">%s</a>', esc_url( admin_url( 'options-general.php?page=highlight-and-share&tab=appearance' ) ), _x( 'Configure Theme', 'Plugin settings link on the plugins page', 'highlight-and-share' ) );
		$docs_link       = sprintf( '<a href="%s">%s</a>', esc_url( 'https://has.dlxplugins.com' ), _x( 'Documentation', 'Plugin settings link on the plugins page', 'highlight-and-share' ) );
		$has_landing     = sprintf( '<a href="%s" style="color: #f60098;">%s</a>', esc_url( 'https://dlxplugins.com/plugins/highlight-and-share/' ), _x( 'Visit Site', 'Plugin settings link on the plugins page', 'highlight-and-share' ) );

		array_unshift( $links, $has_landing );
		array_unshift( $links, $docs_link );
		array_unshift( $links, $settings_link );
		return $links;
	}

	/**
	 * Save Block Editor Options.
	 */
	public function ajax_save_block_editor_options() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_save_block_editor' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array() );
		}

		$block_editor_options = filter_input( INPUT_POST, 'formData', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );

		$converted_options = array();
		foreach ( $block_editor_options as $key => $value ) {
			$key = sanitize_key( Functions::to_underlines( $key ) );

			if ( is_bool( $value ) || 'true' === $value || 'false' === $value ) {
				// Convert string to boolean.
				$value                     = (bool) filter_var( $value, FILTER_VALIDATE_BOOLEAN );
				$converted_options[ $key ] = $value;
			} elseif ( is_numeric( $value ) || is_int( $value ) ) {

				$converted_options[ $key ] = absint( $value );
			} elseif ( is_array( $value ) ) {
				$converted_options[ $key ] = array_map( 'sanitize_text_field', $value );
			} else {
				$converted_options[ $key ] = $value;
			}
		}

		if ( true === $converted_options['enable_adobe_fonts'] ) {
			$converted_options['adobe_fonts'] = Adobe_Fonts::get_adobe_fonts( $converted_options['adobe_project_id'] );
			if ( is_wp_error( $converted_options['adobe_fonts'] ) ) {
				wp_send_json_error( $converted_options['adobe_fonts'] );
			}
		}
		update_option( 'highlight-and-share-block-editor-options', $converted_options );

		wp_send_json_success( $this->map_defaults_to_js( stripslashes_deep( $converted_options ) ) );
	}

	/**
	 * Save Highlight and Share settings options (for emails).
	 */
	public function ajax_save_emails_tab() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_save_email_settings' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Security check failed', 'highlight-and-share' ) ) );
		}

		// Existing settings.
		$existing_settings = Options::get_email_options( true );
		$form_data         = filter_input( INPUT_POST, 'form_data', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );

		// Get email body as this needs to be sanitized separately as a text area with newlines.
		$email_body = $form_data['emailBody'];
		$email_body = wp_kses_post( $email_body );

		// Sanitize the rest.
		$form_data = Functions::sanitize_array_recursive( $form_data );

		// Add email body to form data.
		$form_data['emailBody'] = $email_body;

		// Update settings.
		$settings = array_replace_recursive( $existing_settings, $form_data );

		// Get into array_key format.
		$overrides = array();
		foreach ( $settings as $key => $value ) {
			$overrides[ sanitize_key( Functions::to_underlines( $key ) ) ] = $value;
		}

		// Update options.
		update_option( 'highlight-and-share-email-settings', $overrides );

		wp_send_json_success( $this->map_defaults_to_js( stripslashes_deep( $overrides ) ) );
	}

	/**
	 * Retrieve email settings in the emails tab.
	 */
	public function ajax_retrieve_emails_tab() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_retrieve_email_settings' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Security check failed', 'highlight-and-share' ) ) );
		}

		// Get saved options.
		$options = Options::get_email_options( true );

		// Get Akismet optioons.
		$akismet_api_key_valid = false;
		if ( class_exists( 'Akismet' ) ) {
			$akismet_api_key = \Akismet::get_api_key();
			if ( $akismet_api_key ) {
				$akismet_api_key_valid = true;
			}
		}
		$return = array(
			'values'  => $this->map_defaults_to_js(
				stripslashes_deep( $options ),
			),
			'akismet' => array(
				'apiKeyValid' => $akismet_api_key_valid,
				'isInstalled' => class_exists( 'Akismet' ),
			),
		);
		wp_send_json_success( $return );
	}

	/**
	 * Reset the admin emails option.
	 */
	public function ajax_reset_emails_tab() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_reset_email_settings' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Security check failed', 'highlight-and-share' ) ) );
		}

		// Get saved options. Then write over it with the defaults (wp_parse_args in reverse).
		$defaults = Options::get_email_settings_defaults();
		update_option( 'highlight-and-share-email-settings', $defaults );

		// Send the data home.
		wp_send_json_success( $this->map_defaults_to_js( stripslashes_deep( $defaults ) ) );
	}

	/**
	 * Save Highlight and Share settings options (for images).
	 */
	public function ajax_save_images_options() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_save_images' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Security check failed', 'highlight-and-share' ) ) );
		}

		// Existing settings.
		$existing_settings = Options::get_image_options( true );
		$form_data         = filter_input( INPUT_POST, 'formData', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );

		// Sanitize the rest.
		$form_data = Functions::sanitize_array_recursive( $form_data );

		$settings = array_replace_recursive( $existing_settings, $form_data );

		// Get into array_key format.
		$overrides = array();
		foreach ( $settings as $key => $value ) {
			$overrides[ sanitize_key( Functions::to_underlines( $key ) ) ] = $value;
		}

		// Update options.
		update_option( 'highlight-and-share-image-options', $overrides );

		wp_send_json_success( $form_data );
	}

	/**
	 * Retrieve images settings in the imagess tab.
	 */
	public function ajax_retrieve_images_options() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_retrieve_images' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Security check failed', 'highlight-and-share' ) ) );
		}

		// Get saved options.
		$options = Options::get_image_options( true );
		$return  = $this->map_defaults_to_js(
			stripslashes_deep( $options ),
		);
		wp_send_json_success( $return );
	}

	/**
	 * Reset the admin emails option.
	 */
	public function ajax_reset_images_options() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_reset_images' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Security check failed', 'highlight-and-share' ) ) );
		}

		// Get saved options. Then write over it with the defaults (wp_parse_args in reverse).
		$defaults = Options::get_image_defaults();
		update_option( 'highlight-and-share-image-options', $defaults );

		// Send the data home.
		wp_send_json_success( $this->map_defaults_to_js( stripslashes_deep( $defaults ) ) );
	}

	/**
	 * Retrieve Highlight and Share settings options.
	 */
	public function ajax_retrieve_settings_tab() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_retrieve_settings' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array() );
		}

		$options = Options::get_plugin_options( true );
		$return  = array(
			'socialNetworks' => Options::get_plugin_options_social_networks(),
			'values'         => $this->map_defaults_to_js(
				stripslashes_deep( $options ),
			),
		);
		wp_send_json_success( $return );
	}

	/**
	 * Save Highlight and Share settings options.
	 */
	public function ajax_save_settings_tab() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_save_settings' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array() );
		}

		$form_data = $_POST['form_data']; // expect array.
		$form_data = Functions::to_underlines_recursive( $form_data );
		$form_data = Functions::sanitize_array_recursive( $form_data );

		// Form data are sanitized. Save the options.
		update_option( 'highlight-and-share', $form_data );
		$this->clear_frontend_cache();

		// Retrieve fresh options.
		$options = Options::get_plugin_options( true );
		$return  = array(
			'socialNetworks' => Options::get_plugin_options_social_networks( true ),
			'values'         => $this->map_defaults_to_js(
				stripslashes_deep( $options ),
			),
		);
		wp_send_json_success( $return );
	}

	/**
	 * Reset the admin settings option.
	 */
	public function ajax_reset_settings_tab() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_reset_settings' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array() );
		}

		delete_option( 'highlight-and-share' );
		$this->clear_frontend_cache();

		// Retrieve fresh options.
		$options = Options::get_plugin_options( true );

		// Send the data home.
		$return = array(
			'socialNetworks' => Options::get_plugin_options_social_networks( true ),
			'values'         => $this->map_defaults_to_js(
				stripslashes_deep( $options ),
			),
		);
		wp_send_json_success( $return );
	}

	/**
	 * Maps PHP name values to JS name values.
	 *
	 * @param array $options Array of options and values.
	 *
	 * @return array Key/Value of mapped options.
	 */
	private function map_defaults_to_js( $options ) {
		$js_option_names = array();
		/**
		 * Can't change the default names of the options because they are used elsewhere.
		 */
		foreach ( $options as $option_name => $option_value ) {
			if ( is_array( $option_value ) ) {
				$option_value = $this->map_defaults_to_js( $option_value );
			}
			$js_option_names[ Functions::to_camelcase( $option_name ) ] = $option_value;
		}
		return $js_option_names;
	}

	/**
	 * Initialize options page
	 *
	 * Create plugin options page and callback
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 */
	public function add_admin_menu() {
		add_options_page( _x( 'Highlight and Share', 'Plugin Name - Settings Page Title', 'highlight-and-share' ), _x( 'Highlight and Share', 'Plugin Name - Menu Item', 'highlight-and-share' ), 'manage_options', 'highlight-and-share', array( $this, 'options_page' ) );
	}

	/**
	 * Get a loading SVG state.
	 */
	private function get_loading_svg() {
		$svg = '<div class="has-load-static-svg"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="26.349px" height="26.35px" viewBox="0 0 26.349 26.35" style="enable-background:new 0 0 26.349 26.35;" xml:space="preserve"><g><g><circle cx="13.792" cy="3.082" r="3.082"/><circle cx="13.792" cy="24.501" r="1.849"/><circle cx="6.219" cy="6.218" r="2.774"/><circle cx="21.365" cy="21.363" r="1.541"/><circle cx="3.082" cy="13.792" r="2.465"/><circle cx="24.501" cy="13.791" r="1.232"/><path d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05 C6.902,18.996,5.537,18.988,4.694,19.84z"/><circle cx="21.364" cy="6.218" r="0.924"/></g></g></svg></div>';
		return $svg;
	}

	/**
	 * Output options page HTML.
	 *
	 * Output option page HTML and fields/sections.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see add_admin_menu
	 */
	public function options_page() {
		?>
		<div class="has-form-wrapper">
			<header>
				<div class="has-admin-container-wrap">
					<div class="has-logo-wrapper">
						<h2 id="has-logo" style="display: flex; align-items: center;"><img 
						width="450" height="113" src="<?php echo esc_url( Functions::get_plugin_url( '/img/plugin-logo-horizontal.png' ) ); ?>" alt="Higlight and Share" /></h2>
					</div>
					<div class="header__btn-wrap">
						<a class=" has__btn-primary" href="https://has.dlxplugins.com"><i class="dashicons dashicons-media-document"></i> <?php esc_html_e( 'Documentation', 'highlight-and-share' ); ?></a>
						<a class=" has__btn-primary" href="
						<?php
						$user = get_user_by( 'id', get_current_user_id() );
						echo esc_url_raw(
							add_query_arg(
								array(
									'product'   => 'Highlight and Share',
									'firstname' => $user->first_name,
									'lastname'  => $user->last_name ?? '',
									'email'     => $user->user_email,
									'site'      => get_site_url(),
								),
								'https://dlxplugins.com/support/'
							)
						);
						?>
						" target="_blank" rel="noopener noreferrer"><i class="dashicons dashicons-external"></i> <?php esc_html_e( 'Support', 'highlight-and-share' ); ?></a>
					</div>
				</div>
			</header>
			<?php
			$current_tab       = Functions::get_admin_tab();
			$sharing_tab_class = array( 'nav-tab' );
			if ( null === $current_tab || 'sharing' === $current_tab ) {
				$sharing_tab_class[] = 'nav-tab-active';
			}
			$settings_tab_class = array( 'nav-tab' );
			if ( 'settings' === $current_tab ) {
				$settings_tab_class[] = 'nav-tab-active';
			}
			$appearance_tab_class = array( 'nav-tab' );
			if ( 'appearance' === $current_tab ) {
				$appearance_tab_class[] = 'nav-tab-active';
			}
			$block_editor_tab_class = array( 'nav-tab' );
			if ( 'block-editor' === $current_tab ) {
				$block_editor_tab_class[] = 'nav-tab-active';
			}
			$image_tab_class = array( 'nav-tab' );
			if ( 'images' === $current_tab ) {
				$image_tab_class[] = 'nav-tab-active';
			}
			$emails_tab_class = array( 'nav-tab' );
			if ( 'emails' === $current_tab ) {
				$emails_tab_class[] = 'nav-tab-active';
			}
			$support_tab_class = array( 'nav-tab' );
			if ( 'support' === $current_tab ) {
				$support_tab_class[] = 'nav-tab-active';
			}
			?>


			<div class="has-admin-container-body-wrapper">
				<div class="has-admin-container-body">
					<nav class="nav-tab-wrapper">
						<a class="<?php echo esc_attr( implode( ' ', $sharing_tab_class ) ); ?>" href="<?php echo esc_url( Functions::get_settings_url( 'sharing' ) ); ?>"><?php esc_html_e( 'Sharing', 'highlight-and-share' ); ?></a>
						<a class="<?php echo esc_attr( implode( ' ', $image_tab_class ) ); ?>" href="<?php echo esc_url( Functions::get_settings_url( 'images' ) ); ?>"><?php esc_html_e( 'Images', 'highlight-and-share' ); ?></a>
						<a class="<?php echo esc_attr( implode( ' ', $emails_tab_class ) ); ?>" href="<?php echo esc_url( Functions::get_settings_url( 'emails' ) ); ?>"><?php esc_html_e( 'Emails', 'highlight-and-share' ); ?></a>
						<a class="<?php echo esc_attr( implode( ' ', $support_tab_class ) ); ?>" href="<?php echo esc_url( Functions::get_settings_url( 'support' ) ); ?>"><?php esc_html_e( 'Support', 'highlight-and-share' ); ?></a>
					</nav>
					<?php
					if ( null === $current_tab || 'sharing' === $current_tab ) {
						?>
						<div class="has-admin-container-body__content">
							<div id="has-sharing-admin">
								<?php echo wp_kses( $this->get_loading_svg(), Functions::get_kses_allowed_html() ); ?>
							</div>
						</div>
						<?php
					}
					if ( 'images' === $current_tab ) {
						// No wrapper as there are separate wrappers for each section. A wrapper is included in the loader.
						?>
						<div id="has-images-admin-settings">
							<?php echo wp_kses( $this->get_loading_svg(), Functions::get_kses_allowed_html() ); ?>
						</div>
						<?php
					}
					if ( 'emails' === $current_tab ) {
						// No wrapper as there are separate wrappers for each section. A wrapper is included in the loader.
						?>
						<div id="has-emails-admin-settings"><div class="has-admin-container-body__content"><?php echo wp_kses( $this->get_loading_svg(), Functions::get_kses_allowed_html() ); ?></div></div>
						<?php
					}
					if ( 'support' === $current_tab ) {
						// No wrapper as there are separate wrappers for each section. A wrapper is included in the loader.
						?>
						<div id="has-support-admin-settings"><div class="has-admin-container-body__content"><?php echo wp_kses( $this->get_loading_svg(), Functions::get_kses_allowed_html() ); ?></div></div>
						<?php
					}
					?>
				</div>
				<div id="has-admin-container-slot"></div>
			</div>
		</div>
		<?php
	}

	/**
	 * Enqueue the HAS admin stylesheet.
	 *
	 * @param string $hook The hook for the settings page admin menu.
	 */
	public function enqueue_admin_scripts( $hook ) {
		if ( 'settings_page_highlight-and-share' === $hook ) {
			wp_enqueue_style(
				'has-admin-css',
				Functions::get_plugin_url( '/dist/has-admin-style.css' ),
				array(),
				HIGHLIGHT_AND_SHARE_VERSION,
				'all'
			);

			wp_enqueue_style(
				'has-admin-themes',
				Functions::get_plugin_url( '/dist/has-themes.css' ),
				array(),
				HIGHLIGHT_AND_SHARE_VERSION,
				'all'
			);

			// Determine if we want to enqueue the sharing React script.
			$enqueue_sharing = false;
			$current_tab     = Functions::get_admin_tab();
			if ( null === $current_tab || 'sharing' === $current_tab ) {
				$enqueue_sharing = true;
			}
			if ( $enqueue_sharing ) {
				$deps = require_once Functions::get_plugin_dir( 'dist/has-admin-sharing.asset.php' );
				wp_enqueue_script(
					'has-sharing-admin-js',
					Functions::get_plugin_url( '/dist/has-admin-sharing.js' ),
					$deps['dependencies'],
					$deps['version'],
					true
				);

				// Get public post types for post type selector.
				$post_types          = get_post_types(
					array(
						'public' => true,
					),
					'objects'
				);
				$excluded_post_types = array( 'attachment', 'revision', 'nav_menu_item' );
				$post_types          = array_filter(
					$post_types,
					function ( $post_type ) use ( $excluded_post_types ) {
						return ! in_array( $post_type->name, $excluded_post_types, true );
					}
				);

				// Format post types into label|value pairs.
				$post_types = array_map(
					function ( $post_type ) {
						return array(
							'label' => $post_type->label,
							'value' => $post_type->name,
						);
					},
					$post_types
				);

				$panel_states = $this->get_initial_panel_states_for_js();

				wp_localize_script(
					'has-sharing-admin-js',
					'hasSharingAdmin',
					array(
						'userMetaNonce'      => wp_create_nonce( 'has_admin_user_meta' ),
						'retrieveNonce'      => wp_create_nonce( 'has_retrieve_settings' ),
						'saveNonce'          => wp_create_nonce( 'has_save_settings' ),
						'resetNonce'         => wp_create_nonce( 'has_reset_settings' ),
						'postTypes'          => $post_types,
						'themes'             => Themes::get_main_themes(),
						'colors'             => Themes::get_default_theme_colors(),
						'themeOptionsCustom' => Options::get_theme_options(),
						'panelStates'        => $panel_states,
					)
				);
			}

			// Determine if we want to enqueue the settings React script.
			$enqueue_settings = false;
			$current_tab      = Functions::get_admin_tab();
			if ( 'settings' === $current_tab ) {
				$enqueue_settings = true;
			}
			if ( $enqueue_settings ) {
				$deps = require_once Functions::get_plugin_dir( 'dist/has-admin-settings.asset.php' );
				wp_enqueue_script(
					'has-settings-admin-js',
					Functions::get_plugin_url( '/dist/has-admin-settings.js' ),
					$deps['dependencies'],
					$deps['version'],
					true
				);
				wp_localize_script(
					'has-settings-admin-js',
					'hasSettingsAdmin',
					array(
						'saveNonce'          => wp_create_nonce( 'has_save_settings' ),
						'retrieveNonce'      => wp_create_nonce( 'has_retrieve_settings' ),
						'resetNonce'         => wp_create_nonce( 'has_reset_settings' ),
						'themes'             => Themes::get_main_themes(),
						'colors'             => Themes::get_default_theme_colors(),
						'themeOptionsCustom' => Options::get_theme_options(),
					)
				);
			}

			// Determine if we're loading the support tab.
			$enqueue_support = false;
			$current_tab     = Functions::get_admin_tab();
			if ( null !== $current_tab && 'support' === $current_tab ) {
				$enqueue_support = true;
			}
			if ( $enqueue_support ) {
				$deps = require_once Functions::get_plugin_dir( 'dist/has-admin-support.asset.php' );
				wp_enqueue_script(
					'has-support-admin-js',
					Functions::get_plugin_url( '/dist/has-admin-support.js' ),
					$deps['dependencies'],
					$deps['version'],
					true
				);
				wp_localize_script(
					'has-support-admin-js',
					'hasSupportAdmin',
					array(
						'saveNonce'          => wp_create_nonce( 'has_save_support' ),
						'retrieveNonce'      => wp_create_nonce( 'has_retrieve_support' ),
						'videoPlayImg'       => Functions::get_plugin_url( '/img/has-video-play-button.webp' ),
						'videoPlayImgWidth'  => 450,
						'videoPlayImgHeight' => 243,
					)
				);
				wp_enqueue_script(
					'has-fancybox-js',
					Functions::get_plugin_url( '/js/fancybox.umd.js' ),
					array(),
					Functions::get_plugin_version(),
					true
				);

				wp_enqueue_style(
					'has-fancybox-css',
					Functions::get_plugin_url( '/js/fancybox.css' ),
					array(),
					Functions::get_plugin_version(),
					'all'
				);
			}

			// Determine if we're loading the appearance tab.
			$enqueue_images = false;
			$current_tab    = Functions::get_admin_tab();
			if ( null !== $current_tab && 'images' === $current_tab ) {
				$enqueue_images = true;
			}
			if ( $enqueue_images ) {
				$deps = require_once Functions::get_plugin_dir( 'dist/has-admin-images.asset.php' );
				wp_enqueue_script(
					'has-images-admin-js',
					Functions::get_plugin_url( '/dist/has-admin-images.js' ),
					$deps['dependencies'],
					$deps['version'],
					true
				);

				// Get public post types.
				$post_types          = get_post_types(
					array(
						'public' => true,
					),
					'objects'
				);
				$excluded_post_types = array( 'attachment', 'revision', 'nav_menu_item' );
				$post_types          = array_filter(
					$post_types,
					function ( $post_type ) use ( $excluded_post_types ) {
						return ! in_array( $post_type->name, $excluded_post_types, true );
					}
				);

				// Format post types into label|value pairs.
				$post_types = array_map(
					function ( $post_type ) {
						return array(
							'label' => $post_type->label,
							'value' => $post_type->name,
						);
					},
					$post_types
				);
				wp_localize_script(
					'has-images-admin-js',
					'hasImagesAdmin',
					array(
						'saveNonce'     => wp_create_nonce( 'has_save_images' ),
						'retrieveNonce' => wp_create_nonce( 'has_retrieve_images' ),
						'resetNonce'    => wp_create_nonce( 'has_reset_images' ),
						'postTypes'     => $post_types,
						'defaultColors' => Themes::get_default_theme_colors(),
					)
				);
			}

			// Determine if we're loading the block editor tab.
			$enqueue_block_editor = false;
			$current_tab          = Functions::get_admin_tab();
			if ( null !== $current_tab && 'block-editor' === $current_tab ) {
				$enqueue_block_editor = true;
			}
			if ( $enqueue_block_editor ) {
				$deps = require_once Functions::get_plugin_dir( 'dist/has-admin-block-editor.asset.php' );
				wp_enqueue_script(
					'has-block-editor-admin-js',
					Functions::get_plugin_url( '/dist/has-admin-block-editor.js' ),
					$deps['dependencies'],
					$deps['version'],
					true
				);
				wp_localize_script(
					'has-block-editor-admin-js',
					'hasBlockEditorAdmin',
					array(
						'saveNonce'     => wp_create_nonce( 'has_save_block_editor' ),
						'retrieveNonce' => wp_create_nonce( 'has_retrieve_block_editor' ),
						'resetNonce'    => wp_create_nonce( 'has_reset_block_editor' ),
						'colors'        => Themes::get_default_theme_colors(),
					)
				);
			}

			// Determine if we're loading the emails tab.
			$enqueue_emails = false;
			$current_tab    = Functions::get_admin_tab();
			if ( null !== $current_tab && 'emails' === $current_tab ) {
				$enqueue_emails = true;
			}
			if ( $enqueue_emails ) {
				$deps = require_once Functions::get_plugin_dir( 'dist/has-admin-emails.asset.php' );
				wp_enqueue_script(
					'has-emails-admin-js',
					Functions::get_plugin_url( '/dist/has-admin-emails.js' ),
					$deps['dependencies'],
					$deps['version'],
					true
				);
				wp_localize_script(
					'has-emails-admin-js',
					'hasEmailsAdmin',
					array(
						'saveNonce'     => wp_create_nonce( 'has_save_email_settings' ),
						'retrieveNonce' => wp_create_nonce( 'has_retrieve_email_settings' ),
						'resetNonce'    => wp_create_nonce( 'has_reset_email_settings' ),
					)
				);
			}
		}
	}

	/**
	 * Retrieve Theme Preview Html. HTML compatible with Photoswipe script.
	 *
	 * $see https://photoswipe.com/
	 */
	public static function output_main_themes_admin_html() {
		$themes = Themes::get_main_themes();

		// Need image dimensions for Photoswipe:  https://photoswipe.com/.
		$preview_dimensions = array(
			'brand'         => array(
				'width'  => 864,
				'height' => 384,
			),
			'black'         => array(
				'width'  => 838,
				'height' => 342,
			),
			'blue'          => array(
				'width'  => 838,
				'height' => 342,
			),
			'circle-glass'  => array(
				'width'  => 944,
				'height' => 382,
			),
			'color-circles' => array(
				'width'  => 1054,
				'height' => 368,
			),
			'color-circles' => array(
				'width'  => 1054,
				'height' => 368,
			),
			'default'       => array(
				'width'  => 2378,
				'height' => 654,
			),
			'green'         => array(
				'width'  => 822,
				'height' => 294,
			),
			'cyan'          => array(
				'width'  => 848,
				'height' => 320,
			),
			'magenta'       => array(
				'width'  => 830,
				'height' => 318,
			),
			'purple'        => array(
				'width'  => 868,
				'height' => 346,
			),
			'white'         => array(
				'width'  => 868,
				'height' => 350,
			),
		);

		foreach ( $themes as $slug => $label ) {
			$dimensions = $preview_dimensions[ $slug ] ?? array();

			if ( empty( $dimensions ) ) {
				continue;
			}

			add_filter( 'safe_style_css', array( '\DLXPlugins\HAS\Functions', 'safe_css' ) );

			$allowed_html = wp_kses_allowed_html( 'post' );

			echo wp_kses(
				sprintf(
					'<li><a class="has-gallery-image" href="%1$s" data-pswp-width="%2$s" data-pswp-height="%3$s"><img src="%1$s" style="display: none" />%4$s</a><div style="display: none" class="pswp-caption-content" aria-hidden="true">%4$s</div></li>',
					esc_url( Functions::get_plugin_url( '/img/screenshot-' . $slug . '.png' ) ),
					esc_attr( $preview_dimensions[ $slug ]['width'] ),
					esc_attr( $preview_dimensions[ $slug ]['height'] ),
					esc_html( $label ),
				),
				$allowed_html
			);
			remove_filter( 'safe_style_css', array( '\DLXPlugins\HAS\Functions', 'safe_css' ) );
		}
	}

	/**
	 * Add class to body class in the admin if on the appearances sub tab.
	 *
	 * @param string $classes Space seperated string of body classes.
	 *
	 * @return string $classes.
	 */
	public function add_admin_body_class( $classes ) {
		$screen = get_current_screen();
		if ( 'settings_page_highlight-and-share' === $screen->id ) {
			$classes .= ' has-body';
		}
		return $classes;
	}

	/**
	 * Clear frontend cache when settings are saved or reset.
	 */
	private function clear_frontend_cache() {
		wp_cache_delete( 'has_frontend_html', 'highlight-and-share' );
	}

	/**
	 * Get admin user meta value via AJAX.
	 *
	 * Returns admin user meta with defaults merged.
	 *
	 * @return void
	 */
	public function ajax_get_admin_user_meta() {
		check_ajax_referer( 'has_admin_user_meta', 'nonce' );

		// Check caps.
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'You do not have permission to access this resource.', 'highlight-and-share' ) ) );
			return;
		}

		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			wp_send_json_error( array( 'message' => __( 'User not authenticated.', 'highlight-and-share' ) ) );
			return;
		}

		$user_meta_key = 'has_admin_user_meta';
		$stored_value  = get_user_meta( $user_id, $user_meta_key, true );

		// Get defaults and merge with stored value.
		$defaults = $this->get_admin_user_meta_defaults();
		if ( empty( $stored_value ) || ! is_array( $stored_value ) ) {
			$stored_value = array();
		}

		// Normalize panel_states from old meta that may have duplicate camelCase + snake_case keys.
		$stored_value = $this->normalize_stored_panel_states( $stored_value );

		// Merge defaults with stored values.
		$merged_value = array_replace_recursive( $defaults, $stored_value );

		// Sanitize the merged value.
		$sanitized_value = $this->sanitize_admin_user_meta( $merged_value );

		// Convert panel_states to camelCase for JS.
		$sanitized_value['panel_states'] = Functions::to_camelcase_recursive( $sanitized_value['panel_states'] );

		wp_send_json_success( $sanitized_value );
	}

	/**
	 * Get panel states for the current user (camelCase for JS).
	 *
	 * Used to pass panel state on initial page load so panels render correctly before any AJAX.
	 *
	 * @return array Panel states keyed by camelCase panel ID (e.g. socialNetworks => true).
	 */
	public function get_initial_panel_states_for_js() {
		$user_id = get_current_user_id();
		if ( ! $user_id || ! current_user_can( 'manage_options' ) ) {
			return array();
		}

		$user_meta_key = 'has_admin_user_meta';
		$stored_value  = get_user_meta( $user_id, $user_meta_key, true );
		$defaults      = $this->get_admin_user_meta_defaults();

		if ( empty( $stored_value ) || ! is_array( $stored_value ) ) {
			$stored_value = array();
		}

		$stored_value = $this->normalize_stored_panel_states( $stored_value );
		$merged_value = array_replace_recursive( $defaults, $stored_value );
		$sanitized    = $this->sanitize_admin_user_meta( $merged_value );
		$panel_states = isset( $sanitized['panel_states'] ) ? $sanitized['panel_states'] : $defaults['panel_states'];

		$panel_states = Functions::to_camelcase_recursive( $panel_states );
		return $panel_states;
	}

	/**
	 * Set admin user meta value via AJAX.
	 *
	 * @return void
	 */
	public function ajax_set_admin_user_meta() {
		check_ajax_referer( 'has_admin_user_meta', 'nonce' );

		// Check caps.
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'You do not have permission to access this resource.', 'highlight-and-share' ) ) );
			return;
		}

		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			wp_send_json_error( array( 'message' => __( 'User not authenticated.', 'highlight-and-share' ) ) );
			return;
		}

		$value = filter_input( INPUT_POST, 'value', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );
		$value = $this->normalize_stored_panel_states( $value );
		if ( false === $value || ! is_array( $value ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid value.', 'highlight-and-share' ) ) );
			return;
		}

		// Convert panel_states from camelCase (JS) to snake_case for storage.
		if ( isset( $value['panel_states'] ) && is_array( $value['panel_states'] ) ) {
			// Sanitise boolean values.
			$value['panel_states'] = Functions::sanitize_array_recursive( $value['panel_states'] );
			$value['panel_states'] = Functions::to_underlines_recursive( $value['panel_states'] );
		}

		// Get defaults and merge with incoming value.
		$defaults     = $this->get_admin_user_meta_defaults();
		$merged_value = array_replace_recursive( $defaults, $value );

		// Sanitize the merged value before storing.
		$sanitized_value = $this->sanitize_admin_user_meta( $merged_value );

		$user_meta_key = 'has_admin_user_meta';
		update_user_meta( $user_id, $user_meta_key, $sanitized_value );

		wp_send_json_success( $sanitized_value );
	}

	/**
	 * Get default admin user meta values.
	 *
	 * @return array Default admin user meta values.
	 */
	private function get_admin_user_meta_defaults() {
		$user_id       = get_current_user_id();
		$user_meta_key = 'has_admin_user_meta';
		$stored        = get_user_meta( $user_id, $user_meta_key, true );

		// Check if first_installed already exists.
		$first_installed = '';
		if ( ! empty( $stored ) && is_array( $stored ) && isset( $stored['first_installed'] ) ) {
			$first_installed = $stored['first_installed'];
		} else {
			// Set first_installed to current date if not set.
			$first_installed = current_time( 'mysql' );
		}

		// Use snake_case for panel_states so merge with converted incoming value has no duplicate keys.
		$defaults = array(
			'first_installed' => $first_installed,
			'panel_states'    => array(
				'social_networks'     => true, // Default expanded.
				'display_rules'       => false,
				'appearance'          => false,
				'preview'             => true, // Default expanded.
				'block_editor'        => false,
				'inline_highlighting' => false,
				'advanced'            => false,
			),
		);

		return $defaults;
	}

	/**
	 * Normalize stored panel_states to snake_case only (no duplicate keys).
	 *
	 * Fixes old user meta that was saved with both camelCase and snake_case keys.
	 * When both exist for a panel, prefers camelCase (last value from frontend).
	 *
	 * @param array $stored_value Raw stored user meta.
	 * @return array Stored value with panel_states normalized to snake_case only.
	 */
	private function normalize_stored_panel_states( $stored_value ) {
		if ( empty( $stored_value['panel_states'] ) || ! is_array( $stored_value['panel_states'] ) ) {
			return $stored_value;
		}

		$allowed_panels = array(
			'social_networks',
			'display_rules',
			'appearance',
			'preview',
			'block_editor',
			'inline_highlighting',
			'advanced',
		);

		$defaults   = $this->get_admin_user_meta_defaults();
		$normalized = array();

		foreach ( $allowed_panels as $panel_id ) {
			$camel_key = Functions::to_camelcase( $panel_id );
			$raw       = $stored_value['panel_states'][ $camel_key ] ?? $stored_value['panel_states'][ $panel_id ] ?? null;
			if ( null !== $raw ) {
				$normalized[ $panel_id ] = filter_var( $raw, FILTER_VALIDATE_BOOLEAN );
			} else {
				$normalized[ $panel_id ] = $defaults['panel_states'][ $panel_id ] ?? false;
			}
		}

		$stored_value['panel_states'] = $normalized;
		return $stored_value;
	}

	/**
	 * Sanitize admin user meta data structure.
	 *
	 * Heavily sanitizes all values according to their expected types.
	 *
	 * @param mixed $value Raw value to sanitize.
	 * @return array Sanitized admin user meta array.
	 */
	private function sanitize_admin_user_meta( $value ) {
		if ( ! is_array( $value ) ) {
			return $this->get_admin_user_meta_defaults();
		}

		$sanitized = array();

		// Sanitize first_installed (date string).
		if ( isset( $value['first_installed'] ) ) {
			$first_installed = sanitize_text_field( $value['first_installed'] );
			// Validate it's a valid date format.
			if ( ! empty( $first_installed ) && strtotime( $first_installed ) !== false ) {
				$sanitized['first_installed'] = $first_installed;
			} else {
				// Use current date if invalid.
				$sanitized['first_installed'] = current_time( 'mysql' );
			}
		} else {
			// Use current date if not set.
			$sanitized['first_installed'] = current_time( 'mysql' );
		}

		// Sanitize panel_states (keys are snake_case for storage).
		if ( isset( $value['panel_states'] ) && is_array( $value['panel_states'] ) ) {
			// Whitelist of allowed panel IDs (snake_case).
			$allowed_panels = array(
				'social_networks',
				'display_rules',
				'appearance',
				'preview',
				'block_editor',
				'inline_highlighting',
				'advanced',
			);

			$sanitized['panel_states'] = array();

			// Only process whitelisted panel IDs.
			foreach ( $allowed_panels as $panel_id ) {
				if ( isset( $value['panel_states'][ $panel_id ] ) ) {
					// Form data sends booleans as strings "true"/"false"; (bool) "false" is true in PHP.
					$sanitized['panel_states'][ $panel_id ] = filter_var(
						$value['panel_states'][ $panel_id ],
						FILTER_VALIDATE_BOOLEAN
					);
				} else {
					// Use default if not set.
					$defaults                               = $this->get_admin_user_meta_defaults();
					$sanitized['panel_states'][ $panel_id ] = $defaults['panel_states'][ $panel_id ] ?? false;
				}
			}
		} else {
			// Use defaults if panel_states is not set or invalid.
			$defaults                  = $this->get_admin_user_meta_defaults();
			$sanitized['panel_states'] = $defaults['panel_states'];
		}

		return $sanitized;
	}
}
