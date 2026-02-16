/**
 * Headline sharing: open a small panel (up to 4 networks, vertical list) when clicking a heading with data-has-headline-share.
 * Panel is positioned so it never covers the link icon (left of heading); may cover headline text.
 */
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
	/** Approximate width of link icon + padding (::after left -20px, 24px wide). Do not overlap this. */
	const ICON_ZONE_LEFT_OFFSET = 20;
	const ICON_ZONE_WIDTH = 24;

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

			if ( net.slug === 'copy' ) {
				const button = document.createElement( 'button' );
				button.type = 'button';
				button.className =
					'has-headline-share-panel__action has-headline-share-panel__action--copy';
				button.setAttribute( 'role', 'menuitem' );
				button.textContent = net.label;
				button.addEventListener( 'click', ( e ) => {
					e.preventDefault();
					if ( navigator.clipboard && navigator.clipboard.writeText ) {
						navigator.clipboard.writeText( sectionUrl ).then( () => {
							button.textContent = 'Copied!';
							setTimeout( () => {
								button.textContent = net.label;
							}, 1500 );
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
				button.textContent = net.label;
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
				link.textContent = net.label;
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
	 * Position panel so it stays in view and never overlaps the link icon (left of heading).
	 * Tries: right of heading, below, above, left of icon.
	 *
	 * @param {HTMLElement} panel   Panel element (already in DOM).
	 * @param {HTMLElement} heading Heading element.
	 */
	function positionPanel( panel, heading ) {
		const headingRect = heading.getBoundingClientRect();
		const panelRect = panel.getBoundingClientRect();
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const scrollX = window.scrollX;
		const scrollY = window.scrollY;
		const pw = panelRect.width;
		const ph = panelRect.height;
		// Link icon is to the left of the heading (::after left -20px, 24px wide). Do not overlap.
		const iconLeft = headingRect.left - ICON_ZONE_LEFT_OFFSET;
		const iconRight = iconLeft + ICON_ZONE_WIDTH;

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
		function notOverIcon( l ) {
			const panelRight = l + pw;
			return panelRight <= iconLeft - GAP || l >= iconRight + GAP;
		}

		// 1) Right of heading: panel left = heading right + gap.
		let left = headingRect.right + GAP + scrollX;
		let top = headingRect.top + scrollY + headingRect.height / 2 - ph / 2;
		if ( notOverIcon( left ) && inViewport( left, top ) ) {
			panel.style.left = left + 'px';
			panel.style.top = top + 'px';
			return;
		}

		// 2) Below heading.
		left = headingRect.left + scrollX + headingRect.width / 2 - pw / 2;
		top = headingRect.bottom + GAP + scrollY;
		if ( inViewport( left, top ) ) {
			panel.style.left = left + 'px';
			panel.style.top = top + 'px';
			return;
		}

		// 3) Above heading.
		left = headingRect.left + scrollX + headingRect.width / 2 - pw / 2;
		top = headingRect.top + scrollY - GAP - ph;
		if ( inViewport( left, top ) ) {
			panel.style.left = left + 'px';
			panel.style.top = top + 'px';
			return;
		}

		// 4) Left of icon: panel right = icon left - gap.
		left = iconLeft - GAP - pw + scrollX;
		top = headingRect.top + scrollY + headingRect.height / 2 - ph / 2;
		if ( inViewport( left, top ) ) {
			panel.style.left = left + 'px';
			panel.style.top = top + 'px';
			return;
		}

		// Fallback: prefer right of heading, clamp to viewport, ensure not over icon.
		left = Math.min(
			Math.max( headingRect.right + GAP + scrollX, scrollX ),
			scrollX + vw - pw - 15
		);
		if ( ! notOverIcon( left ) ) {
			left = iconLeft - GAP - pw + scrollX;
			left = Math.max( left, scrollX );
		}
		top = Math.min(
			Math.max(
				headingRect.top + scrollY - ph / 2 + headingRect.height / 2,
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
		positionPanel( panel, heading );
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
