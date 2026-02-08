/**
 * Image sharing (Pinterest and Web Share API) for Highlight and Share.
 *
 * Runs independently of the main highlight-and-share script. Expects global
 * has_image_sharing (from wp_localize_script) with enable_webshare_image_only.
 */
( function() {
	'use strict';

	if ( 'undefined' === typeof has_image_sharing ) {
		return;
	}

	const config = has_image_sharing;

	/**
	 * Get page URL from HAS placeholder or current window.
	 *
	 * @return {string} Page URL.
	 */
	const getPageUrl = () => {
		const placeholder = document.querySelector( '.has-social-placeholder' );
		if ( placeholder && placeholder.dataset.url ) {
			return placeholder.dataset.url;
		}
		return window.location.href;
	};

	/**
	 * Listen for Image Sharing Events and enable webshare if available (hidden by default).
	 */
	if ( 'undefined' !== typeof navigator.share ) {
		const webshare = document.querySelectorAll( '.has-pin-svg-webshare' );
		if ( null !== webshare ) {
			webshare.forEach( ( el ) => {
				el.style.display = 'inline-block';
			} );
		}
	}

	// Show all the Pinterest icons. Note, this is so that the Pinterest icon doesn't flash when first loading in.
	const pinterestSvgs = document.querySelectorAll( '.has-pin-svg-pinterest' );
	if ( null !== pinterestSvgs ) {
		pinterestSvgs.forEach( ( el ) => {
			el.style.display = 'inline-block';
		} );
	}

	/**
	 * Listen for Image Sharing Events (Pinterest).
	 */
	const imageShare = document.querySelectorAll( '.has-pin-svg-pinterest' );
	if ( null !== imageShare ) {
		imageShare.forEach( ( el ) => {
			el.addEventListener( 'click', ( event ) => {
				event.preventDefault();

				const parent = event.target.closest( '.has-pin-image-wrapper' );
				if ( null === parent ) {
					return;
				}

				const image = parent.querySelector( 'img' );
				let imageUrl = image.getAttribute( 'src' );
				const dataPinUrl = image.getAttribute( 'data-pin-url' );
				let description = image.getAttribute( 'alt' );
				const dataPinDescription = image.getAttribute( 'data-pin-description' );

				let pageUrl = getPageUrl();

				const maybeParentAnchor = image.closest( 'a' );
				if ( null !== maybeParentAnchor ) {
					const maybeParentAnchorUrl = maybeParentAnchor.getAttribute( 'href' );
					if ( maybeParentAnchorUrl && maybeParentAnchorUrl.match( /\.(jpeg|jpg|gif|png)$/i ) ) {
						imageUrl = maybeParentAnchorUrl;
						description = maybeParentAnchor.getAttribute( 'title' ) ?? description;
					}
				}

				if ( 'undefined' !== typeof dataLayer ) {
					dataLayer.push( {
						event: 'highlight-and-share',
						hasSharePostUrl: imageUrl,
						hasSharePostTitle: description,
						hasShareType: 'image',
						hasSocialNetwork: 'pinterest',
					} );
				}

				window.open(
					'https://www.pinterest.com/pin/create/button/?url=' +
						encodeURIComponent( pageUrl ) + '&media=' + encodeURIComponent( dataPinUrl ?? imageUrl ) + '&description=' + encodeURIComponent( dataPinDescription ?? description ),
					'Highlight and Share',
					'width=575,height=430,toolbar=false,menubar=false,location=false,status=false'
				);
			} );
		} );
	}

	/**
	 * Run Web Share for URL (title, text, url). Call this in the same synchronous turn as the user gesture.
	 *
	 * @param {string} title Title.
	 * @param {string} text  Text.
	 * @param {string} url   URL.
	 */
	const doShareUrl = ( title, text, url ) => {
		navigator.share( {
			title: title || '',
			text: text || '',
			url: url || '',
		} ).catch( ( err ) => {
			if ( err.name !== 'AbortError' ) {
				console.warn( 'Highlight and Share: Web Share failed', err );
			}
		} );
	};

	/**
	 * Build share payload from wrapper. Minimal DOM reads so we can share() immediately.
	 *
	 * @param {Element} wrapper .has-pin-image-wrapper element.
	 * @return {{ title: string, text: string, shareUrl: string, imageUrl: string }} Payload.
	 */
	const getSharePayloadFromWrapper = ( wrapper ) => {
		const image = wrapper.querySelector( 'img' );
		const dataPinUrl = image ? image.getAttribute( 'data-pin-url' ) : null;
		let description = image ? image.getAttribute( 'alt' ) : '';
		const dataPinDescription = image ? image.getAttribute( 'data-pin-description' ) : null;
		let imageUrl = image ? image.getAttribute( 'src' ) : '';
		const pageUrl = getPageUrl();
		const shareUrl = dataPinUrl || pageUrl;
		const title = dataPinDescription || description || '';
		const text = dataPinDescription || description || '';
		const maybeParentAnchor = image ? image.closest( 'a' ) : null;
		if ( maybeParentAnchor ) {
			const href = maybeParentAnchor.getAttribute( 'href' );
			if ( href && href.match( /\.(jpeg|jpg|gif|png|webp)$/i ) ) {
				imageUrl = href;
				description = maybeParentAnchor.getAttribute( 'title' ) || description;
			}
		}
		return { title, text, shareUrl, imageUrl };
	};

	/**
	 * Webshare Button.
	 * Use pointerdown so share() runs in the same user gesture (click can be too late on some browsers).
	 */
	const webshareButton = document.querySelectorAll( '.has-pin-svg-webshare' );
	if ( null !== webshareButton ) {
		webshareButton.forEach( ( el ) => {
			const handleWebShare = ( event ) => {
				const parent = event.target.closest( '.has-pin-image-wrapper' );
				if ( ! parent ) {
					return;
				}
				event.preventDefault();
				event.stopPropagation();

				const payload = getSharePayloadFromWrapper( parent );

				// Share must run in the same synchronous turn as the user gesture. Call before anything else.
				if ( ! config.enable_webshare_image_only ) {
					doShareUrl( payload.title, payload.text, payload.shareUrl );
				}

				if ( 'undefined' !== typeof dataLayer ) {
					dataLayer.push( {
						event: 'highlight-and-share',
						hasSharePostUrl: payload.shareUrl,
						hasSharePostTitle: payload.title,
						hasShareType: 'image',
						hasSocialNetwork: 'webshare',
					} );
				}

				if ( ! config.enable_webshare_image_only ) {
					return;
				}

				// Image-only: try async file share; fallback to URL share on failure.
				const imageExtension = payload.imageUrl.split( '.' ).pop().toLowerCase().split( '?' )[ 0 ];
				fetch( payload.imageUrl )
					.then( ( response ) => response.blob() )
					.then( ( blob ) => new File( [ blob ], `image.${ imageExtension }`, { type: 'image/' + imageExtension } ) )
					.then( ( imageFile ) => navigator.share( { title: payload.title, text: payload.text, files: [ imageFile ] } ) )
					.catch( ( err ) => {
						if ( err.name === 'NotAllowedError' || err.name === 'SecurityError' ) {
							doShareUrl( payload.title, payload.text, payload.shareUrl );
						} else if ( err.name !== 'AbortError' ) {
							console.warn( 'Highlight and Share: Web Share (image) failed, falling back to URL', err );
							doShareUrl( payload.title, payload.text, payload.shareUrl );
						}
					} );
			};

			el.addEventListener( 'pointerdown', handleWebShare, { capture: true } );
			el.addEventListener( 'click', ( event ) => {
				event.preventDefault();
			} );
		} );
	}
}() );
