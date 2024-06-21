import { constrainRange } from './selection';
( function() {
	'use strict';

	// Get localized var.
	const HAS = highlight_and_share;

	// Set variables.
	const prefix = HAS.prefix;
	const suffix = HAS.suffix;

	const isLegacyContentMode = HAS.content_legacy_mode;

	let currentElement = null;

	// Main HAS container in the footer. If ".highlight-and-share-wrapper" doesn't have this parent, it is a clone.
	const hasContainer = document.querySelector( '#has-highlight-and-share' );
	if ( null === hasContainer ) {
		return;
	}

	const socialNetworks =
		'.has_whatsapp, .has_facebook, .has_twitter, .has_copy, .has_reddit, .has_telegram, .has_linkedin, .has_xing, .has_signal, .has_vk, .has_tumblr, .has_mastodon, .has_email_mailto, .has_email_form, .has_threads, .has_bluesky, .has_webshare';

	// Get highlight and share container dimensions.
	const hasSharingIconsContainer = hasContainer.querySelector(
		'.highlight-and-share-wrapper'
	);

	// Populate container dimensions/width/height.
	const rect = hasSharingIconsContainer.getBoundingClientRect();
	const hasSharerWidth = rect.width;
	const hasSharerHeight = rect.height;

	/**
	 * Determine if an element is visible or not.
	 *
	 * @param {Element} element The element to check if visible or not.
	 * @return {boolean} true if visible, false if not.
	 */
	const isVisible = ( element ) => {
		const style = window.getComputedStyle( element );
		return (
			style.display !== 'none' &&
			style.visibility !== 'hidden' &&
			style.opacity !== '0'
		);
	};

	/**
	 * Remove any visible HAS containers.
	 */
	const hasRemoveVisibleElements = () => {
		const hasContainers = document.querySelectorAll(
			'.highlight-and-share-wrapper'
		);
		if ( null !== hasContainers ) {
			// Remove visible containers from dom.
			hasContainers.forEach( ( container ) => {
				// If the container is a clone, remove it. (doesn't have the parent "#has-highlight-and-share").
				if ( null === container.closest( '#has-highlight-and-share' ) ) {
					container.remove();
				}
			} );
		}
	};

	/**
	 * Replace attributes of element and child elements.
	 *
	 * @param {Element} element  The element to replace attributes on with child social networks.
	 * @param {string}  url      The URL of the post/page.
	 * @param {string}  title    The title of the post/page.
	 * @param {string}  text     Text that is selected or to be shared
	 * @param {string}  hashtags Hashtags present on the post/page.
	 * @param {string}  type     The type of trigger element (inline, selection, cta).
	 *
	 * @return {Element} The element with replaced attributes.
	 *
	 */
	const hasVariableReplace = ( element, url, title, text, hashtags, type ) => {
		const queryElements = element.querySelectorAll( socialNetworks );
		if ( null === queryElements ) {
			return element;
		}

		// Get types mapped for the modal view.
		let triggerType = '';
		if ( 'inline' === type ) {
			triggerType = 'highlight';
		} else if ( 'selection' === type ) {
			triggerType = 'selection';
		} else if ( 'cta' === type ) {
			triggerType = 'quote';
		}

		// Loop through elements.
		queryElements.forEach( ( el ) => {
			// Replace attributes in URL.
			const elementAnchor = el.querySelector( 'a' );
			let elementUrl = elementAnchor.getAttribute( 'href' );
			elementUrl = elementUrl.replace( '%url%', encodeURIComponent( url ) );
			elementUrl = elementUrl.replace(
				'%username%',
				encodeURIComponent( HAS.twitter_username )
			);
			elementUrl = elementUrl.replace( '%title%', encodeURIComponent( title ) );
			elementUrl = elementUrl.replace( '%text%', encodeURIComponent( text ) );
			elementUrl = elementUrl.replace(
				'%hashtags%',
				encodeURIComponent( hashtags )
			);
			elementUrl = elementUrl.replace(
				'%type%',
				encodeURIComponent( triggerType )
			);
			elementUrl = elementUrl.replace( '%threadstext%', '%prefix%' + encodeURIComponent( text ) + '%suffix%' + encodeURIComponent( '\n\n' + url ) );
			elementUrl = elementUrl.replace( '%blueskytext%', '%prefix%' + encodeURIComponent( text ) + '%suffix%' + encodeURIComponent( '\n\n' + url ) );
			elementUrl = elementUrl.replace( '%prefix%', encodeURIComponent( prefix ) );
			elementUrl = elementUrl.replace( '%suffix%', encodeURIComponent( suffix ) );
			elementAnchor.setAttribute( 'href', elementUrl );

			// Replace the title data attribute.
			let title_attr = el.getAttribute( 'data-title' );
			if ( null !== title_attr ) {
				title_attr = title_attr.replace( '%title%', encodeURIComponent( title ) );
				el.setAttribute( 'data-title', title_attr );
			}

			// Replace the url data attribute.
			let url_attr = el.getAttribute( 'data-url' );
			if ( null !== url_attr ) {
				url_attr = url_attr.replace( '%url%', encodeURIComponent( url ) );
				el.setAttribute( 'data-url', url_attr );
			}
		} );
	};

	/**
	 * Display the Highlight and Share Interface.
	 *
	 * @param {string}  text           Text that is selected or to be shared.
	 * @param {string}  title          The title of the post/page.
	 * @param {string}  href           The URL of the post/page.
	 * @param {string}  hashtags       Hashtags present on the post/page.
	 * @param {string}  type           The type of display (selection|inline|cta).
	 * @param {element} triggerElement The event initiator (null if no trigger element).
	 */
	const hasDisplay = (
		text,
		title,
		href,
		hashtags,
		type,
		triggerElement = null
	) => {
		// Do not show the interface if nothing is enabled.
		if (
			false === highlight_and_share.show_twitter &&
			false === highlight_and_share.show_facebook &&
			false === highlight_and_share.show_linkedin &&
			false === highlight_and_share.show_ok &&
			false === highlight_and_share.show_vk &&
			false === highlight_and_share.show_pinterest &&
			false === highlight_and_share.show_email &&
			false === highlight_and_share.show_webshare &&
			false === highlight_and_share.show_mastodon
		) {
			return;
		}

		// Remove any existing visible interfaces/containers.
		hasRemoveVisibleElements();

		// Get interface clone.
		const hasClone = hasContainer
			.querySelector( '.highlight-and-share-wrapper' )
			.cloneNode( true );
		// Style the interface via inline styles and position.
		hasClone.style.display = 'block';
		hasClone.style.position = 'absolute';
		hasClone.style.width = 'auto';
		hasClone.style.height = 'auto';
		hasClone.style[ 'z-index' ] = 10000;

		// Change to inline flex if vertical.
		if ( hasClone.classList.contains( 'orientation-vertical' ) ) {
			hasClone.style.display = 'inline-flex';
		}

		hasVariableReplace( hasClone, href, title, text, hashtags, type ); // Replaced by reference.

		// Check for webshare. Enable if available.
		if ( 'undefined' !== typeof navigator.share ) {
			const webshare = hasClone.querySelector( '.has_webshare' );
			if ( null !== webshare ) {
				webshare.style.display = 'inline-block';
			}
		}

		// Add to the end of the body element.
		document.body.appendChild( hasClone );
		switch ( type ) {
			case 'selection':
			case 'comments':
				// Position the interface.
				setHasContainerPositionSelection( hasClone, triggerElement );
				break;
			case 'inline':
				// Position the interface.
				setHasContainerPositionInline( hasClone, triggerElement );
				break;
			case 'cta':
				// Position the interface.
				setHasContainerPositionCta( hasClone, triggerElement );
				break;
		}

		// Setup event handlers for links (for desktop).
		const queryElements = document
			.querySelector( 'body' )
			.querySelectorAll(
				'.has_whatsapp, .has_facebook, .has_twitter, .has_telegram, .has_linkedin, .has_xing, .has_reddit, .has_tumblr'
			);
		if ( null !== queryElements ) {
			// Add click listeners to visible elements.
			queryElements.forEach( ( el ) => {
				if ( isVisible( el ) ) {
					el.querySelector( 'a' ).addEventListener( 'click', ( event ) => {
						event.preventDefault();

						// Get the URL.
						const url = el.querySelector( 'a' ).getAttribute( 'href' );

						// Set dataLayer event for GTM.
						if ( 'undefined' !== typeof dataLayer ) {
							// eslint-disable-next-line no-undef
							dataLayer.push( {
								event: 'highlight-and-share',
								hasShareText: text,
								hasSharePostUrl: href,
								hasSharePostTitle: title,
								hasShareType: type /* selection|cta|inline */,
								hasSocialNetwork: el.getAttribute( 'data-type' ),
							} );
						}

						window.open(
							url,
							'Highlight and Share',
							'width=575,height=430,toolbar=false,menubar=false,location=false,status=false'
						);
					} );
				}
			} );
		}

		// Set up copy event.
		const copyButtons = document.querySelectorAll( '.has_copy' );
		if ( null !== copyButtons ) {
			copyButtons.forEach( ( el ) => {
				if ( isVisible( el ) ) {
					// Remove copy element if ClipboardItem is undefined.
					if ( 'undefined' === typeof ClipboardItem ) {
						el.remove();
					} else {
						el.addEventListener( 'click', ( event ) => {
							event.preventDefault();
							// Make sure ClipboardItem is supported.
							try {
								const copyBlob = new Blob( [ text ], { type: 'text/plain' } );
								const data = [ new ClipboardItem( { [ copyBlob.type ]: copyBlob } ) ];
								navigator.clipboard.write( data );
							} catch ( e ) {
								// Copying is not supported on Mozilla (firefox).
							}

							// Change tooltip data attribute.
							el.setAttribute( 'data-tooltip', 'Copied!' );

							// Set dataLayer event for GTM.
							if ( 'undefined' !== typeof dataLayer ) {
								// eslint-disable-next-line no-undef
								dataLayer.push( {
									event: 'highlight-and-share',
									hasShareText: text,
									hasSharePostUrl: href,
									hasSharePostTitle: title,
									hasShareType: type /* selection|cta|inline */,
									hasSocialNetwork: 'copy',
								} );
							}
						} );
					}
				}
			} );
		}

		// Set up email event.
		const emailButtons = document.querySelectorAll( '.has_email_form' );
		if ( null !== emailButtons ) {
			emailButtons.forEach( ( el ) => {
				if ( isVisible( el ) ) {
					el.addEventListener( 'click', ( event ) => {
						event.preventDefault();
						const url = event.target.closest( 'a' ).getAttribute( 'href' );
						if ( 'undefined' !== typeof Fancybox ) {
							// eslint-disable-next-line no-undef
							hasRemoveVisibleElements();
							// eslint-disable-next-line no-undef
							window.highlightShareFancy = new Fancybox(
								[
									{
										src: url,
										type: 'iframe',
										preload: true,
										compact: true,
										autoFocus: true,
									},
								],
								{
									Toolbar: {
										autoEnable: false,
									},
								}
							);
						}
					} );
				}
			} );
		}

		/**
		 * Set up Mastodon Prompt.
		 */
		const mastodonButtons = document.querySelectorAll( '.has_mastodon' );
		if ( null !== mastodonButtons ) {
			mastodonButtons.forEach( ( el ) => {
				if ( isVisible( el ) ) {
					el.addEventListener( 'click', ( event ) => {
						event.preventDefault();
						const url = event.target.closest( 'a' ).getAttribute( 'href' );

						//
						if ( 'undefined' !== typeof Fancybox ) {
							// eslint-disable-next-line no-undef
							hasRemoveVisibleElements();
							// eslint-disable-next-line no-undef
							window.highlightShareFancy = new Fancybox(
								[
									{
										type: 'inline',
										compact: true,
										src: '#has-mastodon-prompt',
									},
								],
								{
									Toolbar: {
										autoEnable: false,
									},
									on: {
										done: () => {
											const fancyboxForm = document.querySelector(
												'.has-mastodon-form'
											);
											const fancyboxInput = fancyboxForm.querySelector(
												'input'
											);
											if ( null !== fancyboxInput ) {
												fancyboxInput.focus();
											}
											fancyboxForm.addEventListener( 'submit', ( event ) => {
												event.preventDefault();
												const fancyboxInputValue = fancyboxInput.value;

												// Save the value to local storage.
												localStorage.setItem(
													'highlight-and-share-mastodon',
													fancyboxInputValue
												);
												let fancyUrl = url;
												if ( '' !== fancyboxInputValue ) {
													fancyUrl = fancyUrl.replace( /mastodon\.social/i, fancyboxInputValue );
												}

												console.log( fancyUrl );

												// Now go to URL.
												window.open(
													fancyUrl,
													'Highlight and Share',
													'width=575,height=430,toolbar=false,menubar=false,location=false,status=false'
												);
											} );

											// Get local storage and populate input if available.
											const localStorageValue = localStorage.getItem(
												'highlight-and-share-mastodon'
											);
											if ( null !== localStorageValue ) {
												fancyboxInput.value = localStorageValue;
											}
										},
									},
								}
							);
						}
					} );
				}
			} );
		}

		// Set up webshare event.
		const webshareButtons = document.querySelectorAll( '.has_webshare' );
		if ( null !== webshareButtons ) {
			webshareButtons.forEach( ( el ) => {
				if ( isVisible( el ) ) {
					el.addEventListener( 'click', ( event ) => {
						event.preventDefault();
						const url = event.target.closest( 'a' ).getAttribute( 'href' );
						navigator.share( {
							title,
							text,
							url,
						} );
					} );
				}
			} );
		}
	};

	/**
	 * Set the Social Sharer container position for the current selection. This needs to run after cloned element has been appended to the dom.
	 *
	 * @param {element} element        The cloned social sharer element.
	 * @param {element} triggerElement The event initiator (null if no trigger element).
	 */
	const setHasContainerPositionSelection = ( element, triggerElement ) => {
		// Get the dimensions of the window.
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		// Get the dimensions and location of the selection.
		const selectionRect = getConstrainedRange( triggerElement ).getBoundingClientRect();
		const selectionTop = selectionRect.top; // top position relative to view port.
		const selectionLeft = selectionRect.left; // left position relative to view port.
		const selectionWidth = selectionRect.width;
		const selectionHeight = selectionRect.height;

		// Set container width to smaller than window width if larger.
		if ( element.offsetWidth > windowWidth ) {
			element.style.maxWidth = windowWidth - 20 + 'px';
			element.classList.add( 'has-no-margin-bottom' );
		}

		// Get the dimensions of the click to share container.
		const hasCloneRect = element.getBoundingClientRect();
		const hasCloneWidth = hasCloneRect.width;
		const hasCloneHeight = hasCloneRect.height;

		if ( element.classList.contains( 'orientation-vertical' ) ) {
			/**
			 * Get Vertical position.
			 */

			// Get the X position of where the HAS Sharer inteface should be displayed.
			const hasSharerX = selectionLeft + window.scrollX - ( hasCloneWidth + 15 );
			// Get the Y position of where the HAS Sharer inteface should be displayed.
			const hasSharerY =
				selectionTop +
				window.scrollY -
				hasCloneHeight / 2 +
				selectionHeight / 2;
			element.classList.add( 'has-no-margin-bottom' );
			// If clone is outside of viewport, set width.
			if ( selectionTop + window.scrollY - hasCloneHeight / 2 < 0 ) {
				element.style.display = 'grid';
				element.style.gridTemplateColumns = '1fr 1fr';

				// Get new clone width dimensions.
				const newCloneRect = element.getBoundingClientRect();

				// calculate left/top position.
				element.style.top =
					selectionTop +
					window.scrollY -
					newCloneRect.height / 2 +
					selectionHeight / 2 +
					'px';
				element.style.left =
					selectionLeft + window.scrollX - newCloneRect.width - 15 + 'px';

				// Calculate top position.
			} else if ( selectionTop + hasCloneHeight > windowHeight ) {
				element.style.display = 'grid';
				element.style.gridTemplateColumns = '1fr 1fr';

				// Get new clone width dimensions.
				const newCloneRect = element.getBoundingClientRect();

				// calculate left/top position.
				element.style.top =
					selectionTop +
					window.scrollY -
					newCloneRect.height / 2 +
					selectionHeight / 2 +
					'px';
				element.style.left =
					selectionLeft + window.scrollX - newCloneRect.width - 15 + 'px';
			} else {
				element.style.left = hasSharerX + 'px';
				element.style.top = hasSharerY + 'px';
				element.classList.remove( 'has-no-margin-bottom' );
			}
		} else {
			/**
			 * Get horizontal position.
			 */

			// Get the X position of where the HAS Sharer inteface should be displayed.
			const hasSharerX =
				selectionLeft + window.scrollX + selectionWidth / 2 - hasCloneWidth / 2;
			// Get the Y position of where the HAS Sharer inteface should be displayed.
			const hasSharerY = selectionTop + window.scrollY - hasCloneHeight - 15;

			// Determine if hasSharerX is outside of view.
			element.classList.add( 'has-no-margin-bottom' );
			if ( hasSharerX < 0 ) {
				// If so, set to 0.
				element.style.left = '15px';
			} else if ( hasSharerX + hasSharerWidth > windowWidth ) {
				// If so, set to windowWidth - hasSharerWidth.
				element.style.right = '15px';
			} else {
				// Otherwise, set to hasSharerX.
				element.style.left = hasSharerX + 'px';
				element.classList.remove( 'has-no-margin-bottom' );
			}

			// Set the left,top CSS in the clone.
			element.style.top = hasSharerY + 'px';
		}
	};

	/**
	 * Set the Social Sharer container position for the inline highlighter. This needs to run after cloned element has been appended to the dom.
	 *
	 * @param {element} element        The cloned social sharer element.
	 * @param {element} triggerElement The event initiator (null if no trigger element).
	 */
	const setHasContainerPositionInline = ( element, triggerElement ) => {
		// Get the dimensions of the window.
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		// Get the dimensions and location of the selection.
		const inlineRect = triggerElement.getBoundingClientRect();
		const inlineTop = inlineRect.top; // top position relative to view port.
		const inlineLeft = inlineRect.left; // left position relative to view port.
		const inlineWidth = inlineRect.width;
		const inlineHeight = inlineRect.height;

		// Get the dimensions of the click to share container.
		const hasCloneRect = element.getBoundingClientRect();
		const hasCloneWidth = hasCloneRect.width;
		const hasCloneHeight = hasCloneRect.height;

		if ( element.classList.contains( 'orientation-vertical' ) ) {
			/**
			 * Get Vertical position.
			 */

			// Get the X position of where the HAS Sharer inteface should be displayed.
			const hasSharerX = inlineLeft + window.scrollX - ( hasCloneWidth + 15 );
			// Get the Y position of where the HAS Sharer inteface should be displayed.
			const hasSharerY =
				inlineTop + window.scrollY - hasCloneHeight / 2 + inlineHeight / 2;
			element.classList.add( 'has-no-margin-bottom' );
			// If clone is outside of viewport, set width.
			if ( inlineTop + window.scrollY - hasCloneHeight / 2 < 0 ) {
				element.style.display = 'grid';
				element.style.gridTemplateColumns = '1fr 1fr';

				// Get new clone width dimensions.
				const newCloneRect = element.getBoundingClientRect();

				// calculate left/top position.
				element.style.top =
					inlineTop +
					window.scrollY -
					newCloneRect.height / 2 +
					inlineHeight / 2 +
					'px';
				const leftPosition =
					inlineLeft + window.scrollX - newCloneRect.width - 15;
				if ( leftPosition < 0 ) {
					element.style.left = '15px';
				} else {
					element.style.left = leftPosition + 'px';
				}

				// Calculate top position.
			} else if ( inlineTop + hasCloneHeight > windowHeight ) {
				element.style.display = 'grid';
				element.style.gridTemplateColumns = '1fr 1fr';

				// Get new clone width dimensions.
				const newCloneRect = element.getBoundingClientRect();

				// calculate left/top position.
				element.style.top =
					inlineTop +
					window.scrollY -
					newCloneRect.height / 2 +
					inlineHeight / 2 +
					'px';
				const leftPosition =
					inlineLeft + window.scrollX - newCloneRect.width - 15;
				if ( leftPosition < 0 ) {
					element.style.left = '15px';
				} else {
					element.style.left = leftPosition + 'px';
				}
			} else {
				element.style.left = hasSharerX + 'px';
				element.style.top = hasSharerY + 'px';
				element.classList.remove( 'has-no-margin-bottom' );
			}
		} else {
			// Get the X position of where the HAS Sharer inteface should be displayed.
			const hasSharerX =
				inlineLeft + window.scrollX + inlineWidth / 2 - hasCloneWidth / 2;
			// Get the Y position of where the HAS Sharer inteface should be displayed.
			const hasSharerY = inlineTop + window.scrollY - hasCloneHeight - 15;

			// Determine if hasSharerX is outside of view.
			element.classList.add( 'has-no-margin-bottom' );
			if ( hasSharerX < 0 ) {
				// If so, set to 0.
				element.style.left = '15px';
			} else if ( hasSharerX + hasSharerWidth > windowWidth ) {
				// If so, set to windowWidth - hasSharerWidth.
				element.style.right = '15px';
			} else {
				// Otherwise, set to hasSharerX.
				element.style.left = hasSharerX + 'px';
				element.classList.remove( 'has-no-margin-bottom' );
			}

			// Set the left,top CSS in the clone.
			element.style.top = hasSharerY + 'px';
		}
	};

	/**
	 * Get the constrained range.
	 *
	 * @param {Element} element The element to constrain the range to.
	 * @return {Range} The constrained range.
	 * @see https://github.com/MaxArt2501/share-this/tree/master
	 */
	const getConstrainedRange = ( element ) => {
		const _window = document.defaultView;
		const selection = _window.getSelection();
		const range = selection.rangeCount && selection.getRangeAt( 0 );
		if ( ! range ) {
			return;
		}

		const constrainedRange = constrainRange( range, element );
		if ( constrainedRange.collapsed || ! constrainedRange.getClientRects().length ) {
			return;
		}

		// eslint-disable-next-line consistent-return
		return constrainedRange;
	};

	/**
	 * Set the Social Sharer container position for the inline highlighter. This needs to run after cloned element has been appended to the dom.
	 *
	 * @param {element} element        The cloned social sharer element.
	 * @param {element} triggerElement The event initiator (null if no trigger element).
	 */
	const setHasContainerPositionCta = ( element, triggerElement ) => {
		// Get the dimensions of the window.
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		// Get the dimensions and location of the selection.
		const ctaRect = triggerElement.getBoundingClientRect();
		const ctaTop = ctaRect.top; // top position relative to view port.
		const ctaLeft = ctaRect.left; // left position relative to view port.
		const ctaWidth = ctaRect.width;
		const ctaHeight = ctaRect.height;

		// Set container width to smaller than window width if larger.
		if ( element.getBoundingClientRect().width > windowWidth ) {
			element.style.maxWidth = windowWidth - 20 + 'px';
			element.classList.add( 'has-no-margin-bottom' );
		}

		// Get the dimensions of the click to share container.
		const hasCloneRect = element.getBoundingClientRect();
		const hasCloneWidth = hasCloneRect.width;
		const hasCloneHeight = hasCloneRect.height;

		if ( element.classList.contains( 'orientation-vertical' ) ) {
			/**
			 * Get Vertical position.
			 */

			// Get the X position of where the HAS Sharer inteface should be displayed.
			const hasSharerX = ctaLeft + window.scrollX - ( hasCloneWidth + 15 );
			// Get the Y position of where the HAS Sharer inteface should be displayed.
			const hasSharerY =
				ctaTop + window.scrollY - hasCloneHeight / 2 + ctaHeight / 2;
			element.classList.add( 'has-no-margin-bottom' );
			// If clone is outside of viewport, set width.
			if ( ctaTop + window.scrollY - hasCloneHeight / 2 < 0 ) {
				element.style.display = 'grid';
				element.style.gridTemplateColumns = '1fr 1fr';

				// Get new clone width dimensions.
				const newCloneRect = element.getBoundingClientRect();

				// calculate left/top position.
				element.style.top =
					ctaTop +
					window.scrollY -
					newCloneRect.height / 2 +
					ctaHeight / 2 +
					'px';
				const leftPosition = ctaLeft + window.scrollX - newCloneRect.width - 15;
				if ( leftPosition < 0 ) {
					element.style.left = '15px';
				} else {
					element.style.left = leftPosition + 'px';
				}

				// Calculate top position.
			} else if ( ctaTop + hasCloneHeight > windowHeight ) {
				element.style.display = 'grid';
				element.style.gridTemplateColumns = '1fr 1fr';

				// Get new clone width dimensions.
				const newCloneRect = element.getBoundingClientRect();

				// calculate left/top position.
				element.style.top =
					ctaTop +
					window.scrollY -
					newCloneRect.height / 2 +
					ctaHeight / 2 +
					'px';
				const leftPosition = ctaLeft + window.scrollX - newCloneRect.width - 15;
				if ( leftPosition < 0 ) {
					element.style.left = '15px';
				} else {
					element.style.left = leftPosition + 'px';
				}
			} else {
				const newCloneRect = element.getBoundingClientRect();
				element.style.left =
					ctaLeft + window.scrollX - newCloneRect.width - 15 + 'px';
				element.style.top = hasSharerY + 'px';
				element.classList.remove( 'has-no-margin-bottom' );
			}
		} else {
			// Get the X position of where the HAS Sharer inteface should be displayed.
			const hasSharerX =
				ctaLeft + window.scrollX + ctaWidth / 2 - hasCloneWidth / 2;
			// Get the Y position of where the HAS Sharer inteface should be displayed.
			const hasSharerY = ctaTop + window.scrollY - hasCloneHeight - 15;

			// Determine if hasSharerX is outside of view.
			element.classList.add( 'has-no-margin-bottom' );
			if ( hasSharerX < 0 ) {
				// If so, set to 0.
				element.style.left = '15px';
			} else if ( hasSharerX + hasSharerWidth > windowWidth ) {
				// If so, set to windowWidth - hasSharerWidth.
				element.style.right = '15px';
			} else {
				// Otherwise, set to hasSharerX.
				element.style.left = hasSharerX + 'px';
				element.classList.remove( 'has-no-margin-bottom' );
			}

			// Set the left,top CSS in the clone.
			element.style.top = hasSharerY + 'px';
		}
	};

	/**
	 * Get the page parameters.
	 *
	 * @param {Element} newElement Element to retrieve data functions for.
	 *
	 * @return {Object} Object containing the page parameters.
	 */
	const getPageParams = ( newElement ) => {
		const href =
			null !== newElement
				? newElement.dataset.url
				: window.location.href;
		const title =
			null !== newElement ? newElement.dataset.title : document.title;
		const hashtags =
			null !== newElement ? newElement.dataset.hashtags : '';
		const params = {};

		params.href = href;
		params.title = title;
		params.hashtags = hashtags;

		return params;
	};

	// Begin setting up events.

	// Get JS Content and return if not set.
	const jsContent = HAS.content;
	if ( '' === jsContent ) {
		return;
	}

	// Get all elements matching jsContent. Set up events.
	const elements = document.querySelectorAll( jsContent );
	if ( null !== elements ) {
		/**
		 * Handle touch/click events for select (mouseup) events.
		 *
		 * @param {event}   event         The original event.
		 * @param {element} parentElement The element to retrieve data functions for.
		 */
		const hasHandleSelectEvents = ( event, parentElement ) => {
			// Remove any visible elements.
			hasRemoveVisibleElements();

			// Get selection.
			const selection = document.defaultView.getSelection();

			// Get the selected text.
			const selectedText = selection.toString().trim();

			if ( '' === selectedText ) {
				return;
			}

			const element = parentElement.querySelector( '.has-social-placeholder' );

			// Get the highlight and share params.
			const { href, title, hashtags } = getPageParams( element );

			// Display Highlight and Share.
			hasDisplay( selectedText, title, href, hashtags, 'selection' );
		};
		// Loop through elements and set up mouseup event.
		elements.forEach( ( element ) => {
			// element.addEventListener( 'touchcancel', ( event ) => {  // This partially works on Android, but only for the first word. Selections do not work. Android is currently not supported. iOS still works.
			// 	hasHandleSelectEvents( event );
			// } );

			// Check if element has class `has-content-area` and if so, it's flush with the content. Select its parent, and add the event to that.
			if ( element.classList.contains( 'has-content-area' ) && ! isLegacyContentMode ) {
				const eventTypes = [ 'selectionchange', 'mouseup', 'touchend', 'touchcancel' ];
				eventTypes.forEach( ( eventType ) => {
					element.parentElement.addEventListener( eventType, ( event ) => {
						hasHandleSelectEvents( event, element.parentElement );
					} );
				} );
				return;
			}

			// Add the rest of the elements.
			element.addEventListener( 'mouseup', ( event ) => {
				hasHandleSelectEvents( event, element );
			} );
		} );
	}

	// Get inline elements.
	const inlineElements = document.querySelectorAll( '.has-inline-text' );
	if ( null !== inlineElements ) {
		/**
		 * Handle touch/click events for inline highlighting.
		 *
		 * @param {event}   event   The original event.
		 * @param {element} element The element the event happened on.
		 */
		const hasHandleInlineEvents = ( event, element ) => {
			// Remove any visible elements.
			hasRemoveVisibleElements();

			// Exit early if the element is already visible (works like a toggle).
			if ( element === currentElement ) {
				currentElement = null;
				return;
			}
			currentElement = element;

			// Get selected text.
			const selectedText = element.innerText.trim();

			if ( '' === selectedText ) {
				return;
			}

			const elementParent = event.target.closest( '.has-social-placeholder' );
			const { href, title, hashtags } = getPageParams( elementParent );

			/**
			 * See if we can launch the web share API by default on inline highlight click.
			 */
			const webshareDefaultInlineHighlight = HAS.enable_webshare_inline_highlight;
			if ( webshareDefaultInlineHighlight ) {
				// Check if navigator.share is available.
				if ( typeof navigator.share === 'function' ) {
					navigator.share( {
						title,
						url: href,
						text: selectedText,
					} );
					return;
				}
			}

			// Display Highlight and Share.
			hasDisplay( selectedText, title, href, hashtags, 'inline', element );
		};
		inlineElements.forEach( ( element ) => {
			// Add tooltips to inline highlight as a data attribute.
			if (
				highlight_and_share.inline_highlight_tooltips_enabled &&
				'' !== highlight_and_share.inline_highlight_tooltips_text
			) {
				element.setAttribute(
					'data-tooltip',
					highlight_and_share.inline_highlight_tooltips_text
				);
			}
			// For mouse and trackpad.
			element.addEventListener( 'click', ( event ) => {
				hasHandleInlineEvents( event, element );
				const tooltip = document.querySelectorAll( '.has-inline-text-tooltip' );
				if ( null !== tooltip ) {
					tooltip.forEach( ( tooltipElement ) => {
						tooltipElement.remove();
					} );
				}
			} );

			// For hover effect on desktop devices.
			element.addEventListener( 'mouseover', ( event ) => {
				// Check if element has data-tooltip attribute.
				if ( element.hasAttribute( 'data-tooltip' ) ) {
					// Get position and dimensions of highlighted element.
					const elementRect = event.target.getBoundingClientRect();

					// Set tooltip position.
					const elementTop = elementRect.top;
					const tooltipWidth = 120; // Adjust to desired width of tooltip
					const tooltipHeight = 30; // Adjust to desired height of tooltip
					const scrollX = window.scrollX;
					const scrollY = window.scrollY;

					// Calculate tooltip position based on element position, window size, and scroll position.
					const tooltipLeft = event.clientX - tooltipWidth / 2 + scrollX;
					const tooltipTop = elementTop - tooltipHeight + scrollY - 10;

					// Create div element to hold tooltip.
					const tooltip = document.createElement( 'div' );
					tooltip.classList.add( 'has-inline-text-tooltip' );
					tooltip.style.position = 'absolute';
					tooltip.style.left = tooltipLeft + 'px';
					tooltip.style.top = tooltipTop + 'px';
					tooltip.innerText = element.getAttribute( 'data-tooltip' );

					// Add tooltip to DOM.
					document.body.appendChild( tooltip );

					// Position tooltip if off screen.
					const tooltipRect = tooltip.getBoundingClientRect();
					if ( tooltipRect.right > window.innerWidth ) {
						tooltip.style.left =
							tooltipLeft - ( tooltipRect.right - window.innerWidth ) + 'px';
					} else if ( tooltipRect.left < 0 ) {
						tooltip.style.left = tooltipLeft - tooltipRect.left + 'px';
					}
					if ( tooltipRect.bottom > window.innerHeight ) {
						tooltip.style.top =
							tooltipTop - ( tooltipRect.bottom - window.innerHeight ) + 'px';
					} else if ( tooltipRect.top < 0 ) {
						tooltip.style.top = tooltipTop - tooltipRect.top + 'px';
					}
				}
			} );
			element.addEventListener( 'mouseout', () => {
				// Hide the tooltip.
				const tooltip = document.querySelectorAll( '.has-inline-text-tooltip' );
				if ( null !== tooltip ) {
					tooltip.forEach( ( element ) => {
						element.classList.add( 'has-fade-out' );
						setTimeout( () => {
							element.remove();
						}, 900 );
					} );
				}
			} );
		} );
	}

	// Get click to share block elements.
	const ctsElements = document.querySelectorAll( '.has-click-prompt' );
	if ( null !== ctsElements ) {
		ctsElements.forEach( ( element ) => {
			element.addEventListener( 'click', ( event ) => {
				event.preventDefault();

				// Remove any visible elements.
				hasRemoveVisibleElements();

				// Exit early if the element is already visible (works like a toggle).
				if ( element === currentElement ) {
					currentElement = null;
					return;
				}
				currentElement = element;

				// Get parent element of prompt.
				const ctsTextElement = element.parentNode.querySelector(
					'.has-click-to-share-text'
				);

				// Get text.
				const selectedText = ctsTextElement.getAttribute( 'data-text-full' );

				const parentElement = element.closest( '.has-social-placeholder' );
				const { href, title, hashtags } = getPageParams( parentElement );

				/**
				 * See if we can launch the web share API by default on inline highlight click.
				 */
				const webshareDefaultClickToShare = HAS.enable_webshare_click_to_share;
				if ( webshareDefaultClickToShare ) {
					// Check if navigator.share is available.
					if ( typeof navigator.share === 'function' ) {
						navigator.share( {
							title,
							url: href,
							text: selectedText,
						} );
						return;
					}
				}

				// Display Highlight and Share.
				hasDisplay(
					selectedText,
					title,
					href,
					hashtags,
					'cta',
					element.closest( '.has-click-to-share' )
				);
			} );
		} );
	}

	// Get click to share block elements.
	const commentElements = document.querySelectorAll( '.has-comment-placeholder' );
	if ( null !== commentElements ) {
		/**
		 * Handle touch/click events for select (mouseup) events.
		 *
		 * @param {event}   event         The original event.
		 * @param {element} parentElement The element to retrieve data functions for.
		 */
		const hasHandleCommentSelectEvents = ( event, parentElement ) => {
			// Remove any visible elements.
			hasRemoveVisibleElements();

			// Get selection.
			const selection = document.defaultView.getSelection();

			// Get the selected text.
			const selectedText = selection.toString().trim();

			if ( '' === selectedText ) {
				return;
			}

			const element = parentElement.querySelector( '.has-comment-placeholder' );

			const href = element.getAttribute( 'data-comment-url' );
			const title = element.getAttribute( 'data-title' );

			// Display Highlight and Share.
			hasDisplay( selectedText, title, href, '', 'comments' );
		};
		// Loop through elements and set up mouseup event.
		commentElements.forEach( ( element ) => {
			// Check if element has class `has-content-area` and if so, it's flush with the content. Select its parent, and add the event to that.
			const eventTypes = [ 'selectionchange', 'mouseup', 'touchend', 'touchcancel' ];
			eventTypes.forEach( ( eventType ) => {
				element.parentElement.addEventListener( eventType, ( event ) => {
					hasHandleCommentSelectEvents( event, element.parentElement );
				} );
			} );
		} );
	}

	// Listen for the escape key to remove visible elements.
	document.addEventListener( 'keydown', ( event ) => {
		if ( event.key === 'Escape' ) {
			hasRemoveVisibleElements();
		}
	} );

	/**
	 * Listen for Image Sharing Events and enable webshare if available (hidden by default).
	 */
	if ( 'undefined' !== typeof navigator.share ) {
		const webshare = document.querySelectorAll( '.has-pin-svg-webshare' );
		console.log( webshare );
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
	 * Listen for Image Sharing Events and enable webshare if available.
	 */
	const imageShare = document.querySelectorAll( '.has-pin-svg-pinterest' );
	if ( null !== imageShare ) {
		imageShare.forEach( ( el ) => {
			el.addEventListener( 'click', ( event ) => {
				event.preventDefault();

				// Get the parent.
				const parent = event.target.closest( '.has-pin-image-wrapper' );
				if ( null === parent ) {
					return;
				}

				// Find the image element, grab the URL.
				const image = parent.querySelector( 'img' );
				let url = image.getAttribute( 'src' );
				const dataPinUrl = image.getAttribute( 'data-pin-url' );
				let description = image.getAttribute( 'alt' );
				const dataPinDescription = image.getAttribute( 'data-pin-description' );

				// Try to get parent anchor and determine if it's an image URL. If so, use that.
				const maybeParentAnchor = image.closest( 'a' );
				if ( null !== maybeParentAnchor ) {
					const maybeParentAnchorUrl = maybeParentAnchor.getAttribute( 'href' );
					if ( maybeParentAnchorUrl.match( /\.(jpeg|jpg|gif|png)$/i ) ) {
						url = maybeParentAnchorUrl;
						description = maybeParentAnchor.getAttribute( 'title' ) ?? description;
					}
				}

				// Set dataLayer event for GTM.
				if ( 'undefined' !== typeof dataLayer ) {
					// eslint-disable-next-line no-undef
					dataLayer.push( {
						event: 'highlight-and-share',
						hasSharePostUrl: url,
						hasSharePostTitle: description,
						hasShareType: 'image',
						hasSocialNetwork: 'pinterest',
					} );
				}

				// Open pinterest.
				window.open(
					'https://www.pinterest.com/pin/create/button/?url=' +
						encodeURIComponent( dataPinUrl ?? url ) + '&description=' + encodeURIComponent( dataPinDescription ?? description ),
					'Highlight and Share',
					'width=575,height=430,toolbar=false,menubar=false,location=false,status=false'
				);
			} );
		} );
	}

	/**
	 * Webshare Button.
	 */
	const webshareButton = document.querySelectorAll( '.has-pin-svg-webshare' );
	if ( null !== webshareButton ) {
		webshareButton.forEach( ( el ) => {
			el.addEventListener( 'click', ( event ) => {
				event.preventDefault();

				// Get the parent.
				const parent = event.target.closest( '.has-pin-image-wrapper' );
				if ( null === parent ) {
					return;
				}

				// Find the image element, grab the URL.
				const image = parent.querySelector( 'img' );
				const url = image.getAttribute( 'src' );
				const description = image.getAttribute( 'alt' );
				const dataPinDescription = image.getAttribute( 'data-pin-description' );

				// Set dataLayer event for GTM.
				if ( 'undefined' !== typeof dataLayer ) {
					// eslint-disable-next-line no-undef
					dataLayer.push( {
						event: 'highlight-and-share',
						hasSharePostUrl: url,
						hasSharePostTitle: description,
						hasShareType: 'image',
						hasSocialNetwork: 'webshare',
					} );
				}

				// Share the image.
				navigator.share( {
					title: description,
					text: dataPinDescription ?? description,
					url,
				} );
			} );
		} );
	}
}() );
