/**
 * Shared stats dispatch helper for Highlight and Share.
 *
 * Dispatches share events to dataLayer (GTM), gtag (GA4), and synthetic CustomEvents
 * so that GTM, GA4, and third-party listeners can track sharing.
 *
 * @package
 */

/**
 * Default event name for Highlight and Share tracking.
 *
 * @type {string}
 */
const EVENT_NAME = 'highlight-and-share';

/**
 * GA4 event name (underscores for consistency with GA4 conventions).
 *
 * @type {string}
 */
const GA4_EVENT_NAME = 'highlight_and_share';

/**
 * Dispatches a stats event to all enabled channels: dataLayer, gtag (when available), and synthetic CustomEvent.
 *
 * @param {Object} payload Event payload. Expected keys: event (optional, defaults to EVENT_NAME),
 *                         hasShareText (optional), hasSharePostUrl, hasSharePostTitle, hasShareType, hasSocialNetwork.
 * @param {Object} options Options. dispatchSynthetic: whether to dispatch a CustomEvent (default true).
 */
export function dispatchStatsEvent( payload, options = {} ) {
	const fullPayload = {
		event: payload.event || EVENT_NAME,
		hasShareText: payload.hasShareText ?? '',
		hasSharePostUrl: payload.hasSharePostUrl ?? '',
		hasSharePostTitle: payload.hasSharePostTitle ?? '',
		hasShareType: payload.hasShareType ?? '',
		hasSocialNetwork: payload.hasSocialNetwork ?? '',
	};

	const dispatchSynthetic = options.dispatchSynthetic !== false;

	console.log( 'fullPayload', fullPayload );

	// dataLayer (GTM): push when present.
	if ( 'undefined' !== typeof window.dataLayer ) {
		window.dataLayer.push( { ...fullPayload } );
	}

	// gtag (GA4): call only when gtag is available (auto-detect).
	if ( 'function' === typeof window.gtag ) {
		window.gtag( 'event', GA4_EVENT_NAME, {
			has_share_text: fullPayload.hasShareText,
			has_share_post_url: fullPayload.hasSharePostUrl,
			has_share_post_title: fullPayload.hasSharePostTitle,
			has_share_type: fullPayload.hasShareType,
			has_social_network: fullPayload.hasSocialNetwork,
		} );
	}

	// Synthetic CustomEvent for third-party listeners (opt-in by adding listeners).
	if ( dispatchSynthetic ) {
		window.dispatchEvent(
			new CustomEvent( fullPayload.event, {
				detail: fullPayload,
				bubbles: true,
				cancelable: false,
			} )
		);
	}
}
