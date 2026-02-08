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

				const pageUrl = getPageUrl();

				const maybeParentAnchor = image.closest( 'a' );
				if ( null !== maybeParentAnchor ) {
					const maybeParentAnchorUrl = maybeParentAnchor.getAttribute( 'href' );
					if (
						maybeParentAnchorUrl &&
						maybeParentAnchorUrl.match( /\.(jpeg|jpg|gif|png)$/i )
					) {
						imageUrl = maybeParentAnchorUrl;
						description =
							maybeParentAnchor.getAttribute( 'title' ) ?? description;
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
						encodeURIComponent( pageUrl ) +
						'&media=' +
						encodeURIComponent( dataPinUrl ?? imageUrl ) +
						'&description=' +
						encodeURIComponent( dataPinDescription ?? description ),
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
		navigator
			.share( {
				title: title || '',
				text: text || '',
				url: url || '',
			} )
			.catch( ( err ) => {
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
		const dataPinDescription = image
			? image.getAttribute( 'data-pin-description' )
			: null;
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
	 * Cache of image URL -> { blob, extension } for synchronous Web Share (image-only).
	 * Preloaded only when the webshare button is hovered or touched.
	 */
	const imageBlobCache = new Map();
	const IMAGE_BLOB_CACHE_MAX = 10;

	/**
	 * Preload an image as a blob and store in cache. Evicts oldest entries when over limit.
	 *
	 * @param {string} imageUrl Image URL to fetch.
	 */
	const preloadImageBlob = ( imageUrl ) => {
		if ( ! imageUrl || imageBlobCache.has( imageUrl ) ) {
			return;
		}
		const ext = imageUrl.split( '.' ).pop().toLowerCase().split( '?' )[ 0 ] || 'png';
		fetch( imageUrl )
			.then( ( response ) => response.blob() )
			.then( ( blob ) => {
				while ( imageBlobCache.size >= IMAGE_BLOB_CACHE_MAX ) {
					const firstKey = imageBlobCache.keys().next().value;
					if ( firstKey !== undefined ) {
						imageBlobCache.delete( firstKey );
					}
				}
				imageBlobCache.set( imageUrl, { blob, extension: ext } );
			} )
			.catch( () => {} );
	};

	/**
	 * Start preloading the image for this webshare button (on hover or touch). Only when image-only is enabled.
	 *
	 * @param {Element} el Webshare button element.
	 */
	const startPreloadForButton = ( el ) => {
		if ( ! config.enable_webshare_image_only ) {
			return;
		}
		const parent = el.closest( '.has-pin-image-wrapper' );
		if ( ! parent ) {
			return;
		}
		const payload = getSharePayloadFromWrapper( parent );
		if ( payload.imageUrl ) {
			preloadImageBlob( payload.imageUrl );
		}
	};

	/**
	 * Webshare Button.
	 * Preload image blob on hover (pointerenter) or touch (touchstart) so share() can use it in the user gesture.
	 * Use pointerdown and touchend so share() runs in the same user gesture.
	 */
	const webshareButton = document.querySelectorAll( '.has-pin-svg-webshare' );
	if ( null !== webshareButton ) {
		webshareButton.forEach( ( el ) => {
			el.addEventListener( 'pointerenter', () => startPreloadForButton( el ) );
			el.addEventListener( 'touchstart', () => startPreloadForButton( el ), {
				passive: true,
			} );

			const handleWebShare = ( event ) => {
				if ( event.type === 'pointerdown' && event.pointerType === 'touch' ) {
					return;
				}

				const parent = event.target.closest( '.has-pin-image-wrapper' );
				if ( ! parent ) {
					return;
				}
				event.preventDefault();
				event.stopPropagation();

				const payload = getSharePayloadFromWrapper( parent );

				if ( config.enable_webshare_image_only ) {
					const cached = imageBlobCache.get( payload.imageUrl );
					if ( cached ) {
						const file = new File( [ cached.blob ], `image.${ cached.extension }`, {
							type: cached.blob.type || 'image/' + cached.extension,
						} );
						navigator
							.share( {
								files: [ file ],
							} )
							.catch( ( err ) => {
								if ( err.name !== 'AbortError' ) {
									console.warn( 'Highlight and Share: Web Share failed', err );
								}
								doShareUrl(
									payload.title,
									'',
									payload.imageUrl || payload.shareUrl
								);
							} );
					} else {
						doShareUrl(
							payload.title,
							'',
							payload.imageUrl || payload.shareUrl
						);
					}
				} else {
					// Avoid duplicate: use text only when it differs from title.
					const shareText = payload.text !== payload.title ? payload.text : '';
					doShareUrl( payload.title, shareText, payload.shareUrl );
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
			};

			el.addEventListener( 'pointerdown', handleWebShare, { capture: true } );
			el.addEventListener(
				'touchend',
				( e ) => {
					e.preventDefault();
					handleWebShare( e );
				},
				{ capture: true, passive: false }
			);
			el.addEventListener( 'click', ( e ) => e.preventDefault() );
		} );
	}
}() );
