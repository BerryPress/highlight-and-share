/**
 * Headline sharing: open a small panel (up to 4 networks, vertical list) when clicking a heading with data-has-headline-share.
 * Panel is positioned so it never covers the link icon (left of heading); may cover headline text.
 */
import { speak } from '@wordpress/a11y';
import { dispatchStatsEvent } from './stats-dispatcher';
import { __, sprintf } from '@wordpress/i18n';

( function() {
	'use strict';

	if (
		typeof hasHeadlineSharing === 'undefined' ||
		! Array.isArray( hasHeadlineSharing.networks ) ||
		hasHeadlineSharing.networks.length === 0
	) {
		return;
	}

	const config = hasHeadlineSharing;
	const GAP = 8;

	let activePanel = null;
	let activeHeading = null;
	let activeTrigger = null;

	/**
	 * Substitute placeholders in a share URL template for headline section.
	 *
	 * @param {string} template   Template with %url%, %title%, %text%, etc.
	 * @param {string} sectionUrl Full section URL (page + #id).
	 * @param {string} title      Heading text.
	 * @param {string} text       Same as title for headlines.
	 * @return {string} Filled URL.
	 */
	function substituteUrl( template, sectionUrl, title, text ) {
		const prefix = config.prefix || '';
		const suffix = config.suffix || '';
		const username = config.twitterUsername || '';
		const hashtags = '';
		const threadstext = prefix + text + suffix + '\n\n' + sectionUrl;
		const blueskytext = prefix + text + suffix + '\n\n' + sectionUrl;

		const url = template
			.replace( /%url%/g, encodeURIComponent( sectionUrl ) )
			.replace( /%title%/g, encodeURIComponent( title ) )
			.replace( /%text%/g, encodeURIComponent( text ) )
			.replace( /%prefix%/g, encodeURIComponent( prefix ) )
			.replace( /%suffix%/g, encodeURIComponent( suffix ) )
			.replace( /%username%/g, encodeURIComponent( username ) )
			.replace( /%hashtags%/g, encodeURIComponent( hashtags ) )
			.replace( /%threadstext%/g, encodeURIComponent( threadstext ) )
			.replace( /%blueskytext%/g, encodeURIComponent( blueskytext ) );
		return url;
	}

	function createIconEl( iconId ) {
		if ( ! iconId ) {
			return null;
		}
		const svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
		svg.setAttribute( 'class', 'has-headline-share-panel__icon' );
		svg.setAttribute( 'aria-hidden', 'true' );
		svg.setAttribute( 'width', '18' );
		svg.setAttribute( 'height', '18' );
		const useEl = document.createElementNS( 'http://www.w3.org/2000/svg', 'use' );
		useEl.setAttribute( 'href', '#' + iconId );
		useEl.setAttributeNS( 'http://www.w3.org/1999/xlink', 'href', '#' + iconId );
		svg.appendChild( useEl );
		return svg;
	}

	function appendActionContent( action, net, copiedLabelRef ) {
		const iconEl = createIconEl( net.iconId );
		if ( iconEl ) {
			action.appendChild( iconEl );
		}
		const labelSpan = document.createElement( 'span' );
		labelSpan.className = 'has-headline-share-panel__label';
		labelSpan.textContent = net.label;
		action.appendChild( labelSpan );
		if ( copiedLabelRef ) {
			copiedLabelRef.labelSpan = labelSpan;
		}
	}

	/**
	 * Build the share panel DOM (vertical list of up to 4 networks).
	 *
	 * @param {string} sectionUrl  Section URL.
	 * @param {string} headingText Heading text.
	 * @return {HTMLElement} Panel element.
	 */
	function buildPanel( sectionUrl, headingText ) {
		const panel = document.createElement( 'div' );
		panel.className = 'has-headline-share-panel';
		panel.setAttribute( 'role', 'menu' );
		panel.setAttribute( 'aria-label', 'Share this section' );

		const header = document.createElement( 'div' );
		header.className = 'has-headline-share-panel__header';
		const closeBtn = document.createElement( 'button' );
		closeBtn.type = 'button';
		closeBtn.className = 'has-headline-share-panel__close';
		closeBtn.setAttribute( 'aria-label', 'Close' );
		const closeSvg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
		closeSvg.setAttribute( 'viewBox', '0 0 16 16' );
		closeSvg.setAttribute( 'width', '14' );
		closeSvg.setAttribute( 'height', '14' );
		closeSvg.setAttribute( 'aria-hidden', 'true' );
		const closePath = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
		closePath.setAttribute( 'fill', 'none' );
		closePath.setAttribute( 'stroke', 'currentColor' );
		closePath.setAttribute( 'stroke-width', '2' );
		closePath.setAttribute( 'stroke-linecap', 'round' );
		closePath.setAttribute( 'd', 'M4 4l8 8M12 4l-8 8' );
		closeSvg.appendChild( closePath );
		closeBtn.appendChild( closeSvg );
		closeBtn.addEventListener( 'click', ( e ) => {
			e.stopPropagation();
			closePanel();
		} );
		header.appendChild( closeBtn );

		config.networks.forEach( ( net ) => {
			const row = document.createElement( 'div' );
			row.className = 'has-headline-share-panel__row';

			const statsPayload = {
				hasSharePostUrl: sectionUrl,
				hasSharePostTitle: headingText,
				hasShareText: headingText,
				hasShareType: 'headline',
				hasSocialNetwork: net.slug,
			};

			if ( net.slug === 'copy' ) {
				const copiedRef = {};
				const button = document.createElement( 'a' );
				button.href = '#';
				button.className =
					'has-headline-share-panel__action has-headline-share-panel__action--copy has_copy';
				button.setAttribute( 'role', 'menuitem' );
				appendActionContent( button, net, copiedRef );
				button.addEventListener( 'mousedown', () => {
					dispatchStatsEvent( statsPayload );
				} );
				button.addEventListener( 'click', ( e ) => {
					e.preventDefault();
					if ( navigator.clipboard && navigator.clipboard.writeText ) {
						navigator.clipboard.writeText( sectionUrl ).then( () => {
							if ( copiedRef.labelSpan ) {
								copiedRef.labelSpan.textContent = 'Copied!';
								speak( __( 'Copied!', 'highlight-and-share' ), 'polite' );
								setTimeout( () => {
									copiedRef.labelSpan.textContent = net.label;
								}, 1500 );
								setTimeout( () => {
									activeTrigger.classList.remove( 'is-pressed' );
									closePanel();
								}, 2500 );
							}
						} );
					}
				} );
				row.appendChild( button );
			} else if ( net.slug === 'webshare' ) {
				const button = document.createElement( 'a' );
				button.href = '#';
				button.className =
					'has-headline-share-panel__action has-headline-share-panel__action--webshare has_webshare';
				button.setAttribute( 'role', 'menuitem' );
				appendActionContent( button, net );
				button.addEventListener( 'mousedown', () => {
					dispatchStatsEvent( statsPayload );
				} );
				button.addEventListener( 'click', ( e ) => {
					e.preventDefault();
					if ( navigator.share ) {
						closePanel();
						navigator
							.share( {
								title: headingText,
								url: sectionUrl,
								text: headingText,
							} )
							.catch( () => {} );
					}
				} );
				row.appendChild( button );
			} else {
				const url =
					net.shareUrlTemplate && net.shareUrlTemplate !== '#'
						? substituteUrl(
							net.shareUrlTemplate,
							sectionUrl,
							headingText,
							headingText
						)
						: '#';
				const link = document.createElement( 'a' );
				link.href = url;
				link.className = `has-headline-share-panel__action has_${ net.slug }`;
				link.setAttribute( 'role', 'menuitem' );
				appendActionContent( link, net );
				link.addEventListener( 'mousedown', () => {
					dispatchStatsEvent( statsPayload );
				} );
				if ( net.requiresPopup ) {
					link.target = '_blank';
					link.rel = 'noopener noreferrer';
					link.addEventListener( 'click', ( e ) => {
						e.preventDefault();
						closePanel();
						window.open(
							url,
							'Highlight and Share',
							'width=575,height=430,toolbar=false,menubar=false,location=false,status=false'
						);
					} );
				}
				row.appendChild( link );
			}
			panel.appendChild( row );
		} );

		panel.insertBefore( header, panel.firstChild );

		return panel;
	}

	/**
	 * Position panel relative to the link icon (trigger). Keeps panel in viewport.
	 * Default: left of icon; if viewport is too small, try right, then below, above.
	 *
	 * @param {HTMLElement} panel   Panel element (already in DOM).
	 * @param {HTMLElement} trigger Link icon button (.has-headline-share-trigger).
	 */
	function positionPanel( panel, trigger ) {
		if ( ! trigger ) {
			return;
		}
		const iconRect = trigger.getBoundingClientRect();
		const panelRect = panel.getBoundingClientRect();
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const scrollX = window.scrollX;
		const scrollY = window.scrollY;
		const pw = panelRect.width;
		const ph = panelRect.height;
		const iconWidth = iconRect.width;
		const iconHeight = iconRect.height;

		panel.style.position = 'absolute';
		panel.style.left = '';
		panel.style.right = '';
		panel.style.top = '';
		panel.style.bottom = '';
		panel.style.margin = '0';

		function inViewport( l, t ) {
			return (
				l >= scrollX &&
				l + pw <= scrollX + vw &&
				t >= scrollY &&
				t + ph <= scrollY + vh
			);
		}

		// 1) Left of icon (default).
		let left = iconRect.left - GAP - ( iconWidth / 2 ) - ( pw / 2 );
		let top = iconRect.top + scrollY;
		if ( inViewport( left, top ) ) {
			panel.style.left = left + 'px';
			panel.style.top = top + 'px';
			return;
		}

		// 2) Above icon (Left aligned to icon).
		left = iconRect.left + scrollX;
		top = iconRect.top - GAP - ph + scrollY;
		if ( inViewport( left, top ) ) {
			panel.style.left = left + 'px';
			panel.style.top = top + 'px';
			return;
		}

		// 3) Beneath the icon and the headline.
		left = iconRect.left + GAP + scrollX;
		top = iconRect.bottom + GAP + scrollY;
		if ( inViewport( left, top ) ) {
			panel.style.left = left + 'px';
			panel.style.top = top + 'px';
			return;
		}

		// Fallback: left of icon clamped to viewport; if that would push panel off left edge, use right.
		left = iconRect.left - GAP - pw + scrollX;
		if ( left < scrollX ) {
			left = Math.min( iconRect.right + GAP + scrollX, scrollX + vw - pw - 15 );
		} else {
			left = Math.max( left, scrollX );
		}
		top = Math.min(
			Math.max( iconRect.top + scrollY + ( iconRect.height / 2 ) - ( ph / 2 ), scrollY ),
			scrollY + vh - ph - 15
		);
		panel.style.left = left + 'px';
		panel.style.top = top + 'px';
	}

	function closePanel() {
		if ( activeTrigger ) {
			activeTrigger.setAttribute( 'aria-expanded', 'false' );
			activeTrigger.removeAttribute( 'aria-controls' );
			activeTrigger.classList.remove( 'is-pressed' );
			activeTrigger.focus();
		}
		if ( activePanel && activePanel.parentNode ) {
			activePanel.removeEventListener( 'focusout', handlePanelFocusOut );
			activePanel.removeEventListener( 'keydown', handlePanelKeyDown );
			activePanel.parentNode.removeChild( activePanel );
		}
		activePanel = null;
		activeHeading = null;
		activeTrigger = null;
		document.removeEventListener( 'click', handleOutsideClick );
		document.removeEventListener( 'keydown', handleEscape );
	}

	function handleOutsideClick( e ) {
		if (
			activePanel &&
			! activePanel.contains( e.target ) &&
			activeHeading &&
			! activeHeading.contains( e.target )
		) {
			closePanel();
		}
	}

	function handleEscape( e ) {
		if ( e.key === 'Escape' ) {
			closePanel();
		}
	}

	function handlePanelKeyDown( e ) {
		if ( ! activePanel ) {
			return;
		}
		const focusables = activePanel.querySelectorAll(
			'[role="menuitem"], .has-headline-share-panel__close'
		);
		const current = activePanel.ownerDocument.activeElement;
		const idx = Array.prototype.indexOf.call( focusables, current );
		if ( idx === -1 ) {
			return;
		}

		if ( e.key === 'ArrowDown' || e.key === 'ArrowRight' ) {
			e.preventDefault();
			const next = ( idx + 1 ) % focusables.length;
			focusables[ next ].focus();
		} else if ( e.key === 'ArrowUp' || e.key === 'ArrowLeft' ) {
			e.preventDefault();
			const prev = idx <= 0 ? focusables.length - 1 : idx - 1;
			focusables[ prev ].focus();
		} else if ( e.key === 'Home' ) {
			e.preventDefault();
			focusables[ 0 ].focus();
		} else if ( e.key === 'End' ) {
			e.preventDefault();
			focusables[ focusables.length - 1 ].focus();
		} else if ( e.key === 'Tab' ) {
			e.preventDefault();
			let next;
			if ( e.shiftKey ) {
				next = idx <= 0 ? focusables.length - 1 : idx - 1;
			} else {
				next = ( idx + 1 ) % focusables.length;
			}
			focusables[ next ].focus();
		}
	}

	function handleTriggerKeyDown( e ) {
		if ( e.key === ' ' || e.key === 'Enter' ) {
			e.preventDefault();
			e.currentTarget.click();
		}
	}

	function handlePanelFocusOut( e ) {
		if ( ! activePanel ) {
			return;
		}
		if ( e.relatedTarget && activePanel.contains( e.relatedTarget ) ) {
			return;
		}
		// Don't close when focus moves to the trigger—click handler will close.
		if ( e.relatedTarget === activeTrigger ) {
			return;
		}
		// Safari often fires focusout with relatedTarget null when clicking inside the panel.
		// Defer and check activeElement so we don't close before the click is processed.
		if ( e.relatedTarget === null ) {
			return;
		}
		closePanel();
	}

	function openPanel( heading, trigger ) {
		closePanel();
		const id = heading.id;
		if ( ! id ) {
			return;
		}
		const sectionUrl = config.pageUrl
			? config.pageUrl.replace( /#.*$/, '' ) + '#' + id
			: window.location.href.replace( /#.*$/, '' ) + '#' + id;
		const headingText = heading.textContent.trim();

		const panel = buildPanel( sectionUrl, headingText );
		panel.id = 'has-headline-share-panel-' + id;
		panel.setAttribute( 'aria-describedby', id );
		panel.style.zIndex = '10000';
		document.body.appendChild( panel );
		positionPanel( panel, trigger );
		activePanel = panel;
		activeHeading = heading;
		activeTrigger = trigger;

		if ( trigger ) {
			trigger.setAttribute( 'aria-expanded', 'true' );
			trigger.setAttribute( 'aria-controls', panel.id );
		}

		document.addEventListener( 'click', handleOutsideClick );
		document.addEventListener( 'keydown', handleEscape );
		panel.addEventListener( 'focusout', handlePanelFocusOut );
		panel.addEventListener( 'keydown', handlePanelKeyDown );

		speak(
			/* translators: %s: heading text of the section being shared */
			sprintf( __( 'Share options for %s', 'highlight-and-share' ), headingText ),
			'polite'
		);

		const firstAction = panel.querySelector(
			'.has-headline-share-panel__action'
		);
		if ( firstAction ) {
			firstAction.focus();
		}
	}

	function onTriggerClick( e ) {
		e.preventDefault();
		e.stopPropagation();
		const trigger = e.currentTarget;

		// If the trigger is already pressed, close the panel.
		if ( trigger.classList.contains( 'is-pressed' ) ) {
			trigger.classList.remove( 'is-pressed' );
			closePanel();
			return;
		}

		// Add is-pressed class to trigger
		trigger.classList.add( 'is-pressed' );

		// Find the heading that the trigger is associated with.
		const heading = trigger.closest( '[data-has-headline-share]' );
		if ( heading ) {
			openPanel( heading, trigger );
		}
	}

	function init() {
		const triggers = document.querySelectorAll( '.has-headline-share-trigger' );
		triggers.forEach( ( el ) => {
			el.addEventListener( 'click', onTriggerClick );
			el.addEventListener( 'keydown', handleTriggerKeyDown );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
}() );
