/**
 * Renders an icon for a Headlines network slug.
 * Used in the Headlines Social Networks panel (no Sharing store dependency).
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy as CopyIcon } from '@fortawesome/free-solid-svg-icons/faCopy';
import { faAt as EmailIcon } from '@fortawesome/free-solid-svg-icons/faAt';
import { faShare as ShareIcon } from '@fortawesome/free-solid-svg-icons/faShare';
import { faWhatsapp as WhatsappIcon } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faTelegram as TelegramIcon } from '@fortawesome/free-brands-svg-icons/faTelegram';
import { faTumblr as TumblrIcon } from '@fortawesome/free-brands-svg-icons/faTumblr';
import { faMastodon as MastodonIcon } from '@fortawesome/free-brands-svg-icons/faMastodon';
import { faThreads as ThreadsIcon } from '@fortawesome/free-brands-svg-icons/faThreads';
import { faBluesky as BlueskyIcon } from '@fortawesome/free-brands-svg-icons/faBluesky';
import Twitter from '../Icons/twitter';

const ICON_MAP = {
	twitter: () => <Twitter fill="#000000" />,
	whatsapp: () => <FontAwesomeIcon icon={ WhatsappIcon } style={ { color: '#25d366' } } />,
	telegram: () => <FontAwesomeIcon icon={ TelegramIcon } style={ { color: '#0088cc' } } />,
	tumblr: () => <FontAwesomeIcon icon={ TumblrIcon } style={ { color: '#000000' } } />,
	mastodon: () => <FontAwesomeIcon icon={ MastodonIcon } style={ { color: '#615EF8' } } />,
	copy: () => <FontAwesomeIcon icon={ CopyIcon } style={ { color: '#000000' } } />,
	email: () => <FontAwesomeIcon icon={ EmailIcon } style={ { color: '#000000' } } />,
	webshare: () => <FontAwesomeIcon icon={ ShareIcon } style={ { color: '#e17713' } } />,
	threads: () => <FontAwesomeIcon icon={ ThreadsIcon } style={ { color: '#000000' } } />,
	bluesky: () => <FontAwesomeIcon icon={ BlueskyIcon } style={ { color: '#1285FE' } } />,
};

const HeadlinesNetworkIcon = ( { slug } ) => {
	const render = ICON_MAP[ slug ];
	return render ? render() : <span className="has-headlines-network-icon-placeholder" />;
};

export default HeadlinesNetworkIcon;
