/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames';
import { escapeAttribute, escapeEditableHTML } from '@wordpress/escape-html';
import { useSelect } from '@wordpress/data';
import store from '../../../Sharing/Store';

const PreviewSocialIconListItem = ( { listItemKey, className, icon, label, theme } ) => {
	const appearanceThemeData = useSelect( ( select ) => select( store ).getThemeData() );
	const socialNetworkColors = useSelect( ( select ) => select( store ).getSocialNetworkColors() );
	const mainSettings = useSelect( ( select ) => select( store ).getSettings() );
	const classes = classNames( className, `has_${ listItemKey }`, { 'has-tooltip': appearanceThemeData.showTooltips } );

	console.log( appearanceThemeData );

	let iconStyles = '';
	if ( ! appearanceThemeData.groupIcons && 'custom' === theme ) {
		const iconColor = socialNetworkColors[ listItemKey ].iconColor;
		const iconColorHover = socialNetworkColors[ listItemKey ].iconColorHover;
		const backgroundColor = socialNetworkColors[ listItemKey ].backgroundColor;
		const backgroundColorHover = socialNetworkColors[ listItemKey ].backgroundColorHover;

		iconStyles = `
			.has_${ listItemKey } a {
				color: ${ iconColor } !important;
				background: ${ backgroundColor } !important;
			}
			.has_${ listItemKey } a:hover {
				color: ${ iconColorHover } !important;
				background: ${ backgroundColorHover } !important;
			}
		`;
	}

	/**
	 * Get a translated label for the social network.
	 *
	 * @return {string} The social network label.
	 */
	const getLabel = () => {
		const maybeLabel = mainSettings[ `${ listItemKey }_label` ] ?? '';
		if ( '' === maybeLabel ) {
			return label;
		}
		return maybeLabel;
	};

	/**
	 * Get a tooltip for the social network.
	 *
	 * @return {string} The social network label.
	 */
	const getTooltip = () => {
		const maybeTooltip = mainSettings[ `${ listItemKey }_tooltip` ] ?? '';
		return maybeTooltip;
	};

	return (
		<div key={ listItemKey } className={ classes } data-tooltip={ escapeAttribute( getTooltip() ) }>
			<>
				{ iconStyles && <style>{ iconStyles }</style> }
				<a
					href="#"
					onClick={ ( e ) => {
						e.preventDefault();
					} }
				>
					{ icon }
					{ ( 'default' === appearanceThemeData.theme || ( 'custom' === appearanceThemeData.theme && ! appearanceThemeData.iconsOnly ) ) && (
						<>
							<span className="has-icon-label">{ `${ escapeEditableHTML( getLabel() ) }` }</span>
						</>
					) }
				</a>
			</>
		</div>
	);
};

export default PreviewSocialIconListItem;
