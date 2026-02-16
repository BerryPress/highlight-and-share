/**
 * Headline sharing: open a small panel (up to 4 networks, vertical list) when clicking a heading with data-has-headline-share.
 * Panel is positioned so it never covers the link icon (left of heading); may cover headline text.
 */
import { dispatchStatsEvent } from './stats-dispatcher';

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
				const button = document.createElement( 'button' );
				button.type = 'button';
				button.className =
					'has-headline-share-panel__action has-headline-share-panel__action--copy';
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
								setTimeout( () => {
									copiedRef.labelSpan.textContent = net.label;
								}, 1500 );
							}
						} );
					}
				} );
				row.appendChild( button );
			} else if ( net.slug === 'webshare' ) {
				const button = document.createElement( 'button' );
				button.type = 'button';
				button.className =
					'has-headline-share-panel__action has-headline-share-panel__action--webshare';
				button.setAttribute( 'role', 'menuitem' );
				appendActionContent( button, net );
				button.addEventListener( 'mousedown', () => {
					dispatchStatsEvent( statsPayload );
				} );
				button.addEventListener( 'click', ( e ) => {
					e.preventDefault();
					if ( navigator.share ) {
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
				link.className = 'has-headline-share-panel__action';
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

		// 2) Right of icon (when viewport too small on the left).
		left = iconRect.right + GAP + scrollX;
		top = iconRect.top + scrollY + ( iconRect.height / 2 ) - ( ph / 2 );
		if ( inViewport( left, top ) ) {
			panel.style.left = left + 'px';
			panel.style.top = top + 'px';
			return;
		}

		// 3) Below icon (centered under icon).
		left = iconRect.left + scrollX + ( iconRect.width / 2 ) - ( pw / 2 );
		top = iconRect.bottom + GAP + scrollY;
		if ( inViewport( left, top ) ) {
			panel.style.left = left + 'px';
			panel.style.top = top + 'px';
			return;
		}

		// 4) Above icon (centered).
		left = iconRect.left + scrollX + ( iconRect.width / 2 ) - ( pw / 2 );
		top = iconRect.top + scrollY - GAP - ph;
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
			Math.max(
				iconRect.top + scrollY + ( iconRect.height / 2 ) - ( ph / 2 ),
				scrollY
			),
			scrollY + vh - ph - 15
		);
		panel.style.left = left + 'px';
		panel.style.top = top + 'px';
	}

	function closePanel() {
		if ( activeTrigger ) {
			activeTrigger.setAttribute( 'aria-expanded', 'false' );
			activeTrigger.removeAttribute( 'aria-controls' );
			activeTrigger.focus();
		}
		if ( activePanel && activePanel.parentNode ) {
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
		const heading = trigger.closest( '[data-has-headline-share]' );
		if ( heading ) {
			openPanel( heading, trigger );
		}
	}

	function init() {
		const triggers = document.querySelectorAll( '.has-headline-share-trigger' );
		triggers.forEach( ( el ) => {
			el.addEventListener( 'click', onTriggerClick );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
}() );
