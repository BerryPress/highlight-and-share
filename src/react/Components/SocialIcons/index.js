import React, { useContext } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Return fontawesome icons for the social networks.
import { faTwitter as TwitterIcon } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faFacebook as FacebookIcon } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faWhatsapp as WhatsappIcon } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faLinkedinIn as LinkedinIcon } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faReddit as RedditIcon } from '@fortawesome/free-brands-svg-icons/faReddit';
import { faXing as XingIcon } from '@fortawesome/free-brands-svg-icons/faXing';
import { faCopy as CopyIcon } from '@fortawesome/free-solid-svg-icons/faCopy';
import { faAt as EmailIcon } from '@fortawesome/free-solid-svg-icons/faAt';
import { faTelegram as TelegramIcon } from '@fortawesome/free-brands-svg-icons/faTelegram';
import { faTumblr as TumblrIcon } from '@fortawesome/free-brands-svg-icons/faTumblr';
import { faShare as ShareIcon } from '@fortawesome/free-solid-svg-icons/faShare';
import { faMastodon as MastodonIcon } from '@fortawesome/free-brands-svg-icons/faMastodon';
import { faThreads as ThreadsIcon } from '@fortawesome/free-brands-svg-icons/faThreads';

import SocialNetworksContext from '../../Contexts/SocialNetworksContext';
import Twitter from '../Icons/twitter';
const SocialIcons = ( socialNetworksData = {} ) => {
	let socialNetworks = {};
	const socialNetworksContext = useContext( SocialNetworksContext );
	if ( undefined !== socialNetworksContext ) {
		socialNetworks = socialNetworksContext.socialNetworks;
	} else {
		socialNetworks = socialNetworksData;
	}
	const getSocialIcon = ( socialNetwork ) => {
		switch ( socialNetwork ) {
			case 'twitter':
				return (
					<>
						<Twitter fill="#000000" />
					</>
				);
			case 'facebook':
				return (
					<>
						<FontAwesomeIcon icon={ FacebookIcon } style={ { color: '#3b5998' } } />
					</>
				);
			case 'whatsapp':
				return (
					<>
						<FontAwesomeIcon icon={ WhatsappIcon } style={ { color: '#25d366' } } />
					</>
				);
			case 'linkedin':
				return (
					<>
						<FontAwesomeIcon icon={ LinkedinIcon } style={ { color: '#0077b5' } } />
					</>
				);
			case 'reddit':
				return (
					<>
						<FontAwesomeIcon icon={ RedditIcon } style={ { color: '#ff4500' } } />
					</>
				);
			case 'xing':
				return (
					<>
						<FontAwesomeIcon icon={ XingIcon } style={ { color: '#1a7576' } } />
					</>
				);
			case 'copy':
				return (
					<>
						<FontAwesomeIcon icon={ CopyIcon } style={ { color: '#000000' } } />
					</>
				);
			case 'email':
				return (
					<>
						<FontAwesomeIcon icon={ EmailIcon } style={ { color: '#000000' } } />
					</>
				);
			case 'telegram':
				return (
					<>
						<FontAwesomeIcon icon={ TelegramIcon } style={ { color: '#0088cc' } } />
					</>
				);
			case 'tumblr':
				return (
					<>
						<FontAwesomeIcon icon={ TumblrIcon } style={ { color: '#000000' } } />
					</>
				);
			case 'webshare':
				return (
					<>
						<FontAwesomeIcon icon={ ShareIcon } style={ { color: '#e17713' } } />
					</>
				);
			case 'mastodon':
				return (
					<>
						<FontAwesomeIcon icon={ MastodonIcon } style={ { color: '#615EF8' } } />
					</>
				);
			case 'threads':
				return (
					<>
						<FontAwesomeIcon icon={ ThreadsIcon } style={ { color: '#000000' } } />
					</>
				);
			default:
				return ( <></> );
		}
	};
	const getSocialIcons = () => {
		const socialIcons = [];
		let socialIconCount = 0;
		for ( const [ key, value ] of Object.entries( socialNetworks ) ) {
			const classes = classNames( ( value.slug ?? value.key ), {
				'is-disabled': ! value.enabled,
				'is-custom': value.custom,
			} );

			// Set styles for the icon.
			let styles = {};
			if ( ! value.custom ) {
				if ( value.styles ) {
					styles = value.styles;
				} else {
					styles = {
						color: value.color,
						background: value.background,
					};
				}
			}
			let icon = null;
			let fontAwesomeIcon = null;
			const keyValue = value.slug ?? value.key;
			switch ( keyValue ) {
				case 'twitter':
					icon = null;
					break;
				case 'facebook':
					icon = FacebookIcon;
					break;
				case 'whatsapp':
					icon = WhatsappIcon;
					break;
				case 'reddit':
					icon = RedditIcon;
					break;
				case 'telegram':
					icon = TelegramIcon;
					break;
				case 'linkedin':
					icon = LinkedinIcon;
					break;
				case 'xing':
					icon = XingIcon;
					break;
				case 'copy':
					icon = CopyIcon;
					break;
				case 'tumblr':
					icon = TumblrIcon;
					break;
				case 'email':
					icon = EmailIcon;
					break;
				case 'webshare':
					icon = ShareIcon;
					break;
				case 'mastodon':
					icon = MastodonIcon;
					break;
				case 'threads':
					icon = ThreadsIcon;
					break;
				default:
					icon = <></>;
			}
			if ( null !== icon ) {
				fontAwesomeIcon = <FontAwesomeIcon size={ '1x' } icon={ icon } className={ `has-icon` } />;
			}
			if ( 'twitter' === keyValue ) {
				fontAwesomeIcon = <Twitter fill="#000000" />;
			}
			socialIcons.push( {
				key: ( value.slug ?? value.key ),
				listItemKey: ( value.slug ?? value.key ),
				className: classes,
				styles,
				icon: fontAwesomeIcon,
				index: socialIconCount,
				label: value.label,
				enabled: value.enabled,
				custom: value.custom,
			} );
			socialIconCount++;
		}
		return socialIcons;
	};
	return { getSocialIcons, getSocialIcon };
};

export default SocialIcons;
