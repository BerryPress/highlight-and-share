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
 * No-ops when stats are disabled via hasStatsConfig.stats_enabled (PHP constant HAS_STATS_ENABLED or filter has_stats_enabled).
 *
 * @param {Object} payload Event payload. Expected keys: event (optional, defaults to EVENT_NAME),
 *                         hasShareText (optional), hasSharePostUrl, hasSharePostTitle, hasShareType, hasSocialNetwork.
 */
export function dispatchStatsEvent( payload ) {
	// Treat any falsy value as disabled (WP localize can output false as '').
	if (
		typeof hasStatsConfig !== 'undefined' &&
		! hasStatsConfig.stats_enabled
	) {
		return;
	}

	const fullPayload = {
		event: payload.event || EVENT_NAME,
		hasShareText: payload.hasShareText ?? '',
		hasSharePostUrl: payload.hasSharePostUrl ?? '',
		hasSharePostTitle: payload.hasSharePostTitle ?? '',
		hasShareType: payload.hasShareType ?? '',
		hasSocialNetwork: payload.hasSocialNetwork ?? '',
	};

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
	window.dispatchEvent(
		new CustomEvent( fullPayload.event, {
			detail: fullPayload,
			bubbles: true,
			cancelable: false,
		} )
	);
}
