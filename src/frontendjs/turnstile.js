/* eslint-disable padded-blocks */
/**
 * Turnstile JS functionality.
 */

/**
 * This is the main callback for Cloudflare.
 */
let turnstileHasBeenCalled = false;
window.hasInitTurnstile = () => {
	turnstileHasBeenCalled = true;

	// Get submit button.
	const submitButton = document.querySelector( '#has-recaptcha-submit' );
	if ( null === submitButton ) {
		return;
	}

	// Check that turnstile is present.
	if ( typeof turnstile === 'undefined' ) {
		return;
	}

	/**
	 * This is the callback for when the user has filled out the textarea.
	 * We wait until the textarea is filled out to load turnstile to avoid the 300 second timeout of the token.
	 */
	const turnstileBeginRender = () => {

		// Now init turnstile.
		const widgetId = turnstile.render( '#has-turnstile', {
			sitekey: hasCfTurnstileLocal.sitekey,
			callback: ( token ) => {
				setTimeout( () => {
					// Reset the widget.
					turnstile.reset( widgetId );
				}, 300000 ); // 300 seconds (5 mins).
			},
			size: hasCfTurnstileLocal.size,
			theme: hasCfTurnstileLocal.theme,
			language: hasCfTurnstileLocal.language,
		} );
	};
	turnstileBeginRender();
};

document.addEventListener( 'DOMContentLoaded', () => {
	if ( ! turnstileHasBeenCalled ) {
		window.hasInitTurnstile();
	}
} );
