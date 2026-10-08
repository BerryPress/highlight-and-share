<?php
register_setting( 'my_options_group', 'my_option_name' ); // Error.
register_setting( 'my_options_group', 'my_option_name', 10 ); // Error.
register_setting( 'my_options_group', 'my_option_name', false ); // Error.
register_setting( 'my_options_group', 'my_option_name', 'absint' ); // Good.
register_setting('my_options_group','my_option_name', 'sanitize_text_field' ); // Good.
register_setting('my_options_group', 'my_option_name', [ 'sanitize_callback' => 'sanitize_text_field']); // Warning.
$args = array( 'sanitize_callback' => 'absint' );
register_setting( 'my_options_group', 'my_option_name', $args ); // Warning.

class TestClass {
	public function register_setting() {
	}
}

$obj = new TestClass();
$obj->register_setting(); // Good.

register_setting('my_options_group', 'my_option_name',array(&$this,'validate')); // Warning.

register_setting(
		'my_options_group',
		$setting_key,
		array(
				'sanitize_callback' => $setting['sanitize_callback']
		)
); // Warning.
