/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames';
import { escapeAttribute, escapeEditableHTML } from '@wordpress/escape-html';
import { useSelect } from '@wordpress/data';
import store from '../../../Sharing/Store';
import { useFormContext } from 'react-hook-form';

const PreviewSocialIconListItem = ( { listItemKey, className, icon, label } ) => {
	const { watch } = useFormContext();
	const formValues = watch();

	const classes = classNames( className, `has_${ listItemKey }`, { 'has-tooltip': formValues.showTooltips } );

	let iconStyles = '';
	if ( ! formValues.groupIcons && 'custom' === formValues.theme ) {
		const iconColor = formValues.iconColors[ listItemKey ].iconColor;
		const iconColorHover = formValues.iconColors[ listItemKey ].iconColorHover;
		const backgroundColor = formValues.iconColors[ listItemKey ].background;
		const backgroundColorHover = formValues.iconColors[ listItemKey ].backgroundHover;

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
	 * Get label field name for network.
	 *
	 * @param {string} networkSlug Network slug.
	 * @return {string} Field name.
	 */
	const getLabelFieldName = ( networkSlug) => {
		// Special cases.
		if ( networkSlug === 'twitter' ) {
			return 'twitterLabel';
		}
		if ( networkSlug === 'mastodon' ) {
			return 'mastodonLabel';
		}
		// Default pattern.
		return `${ networkSlug }Label`;
	};

	/**
	 * Get tooltip field name for network.
	 *
	 * @param {string} networkSlug Network slug.
	 * @return {string} Field name.
	 */
	const getTooltipFieldName = ( networkSlug ) => {
		// Special cases.
		if ( networkSlug === 'twitter' ) {
			return 'twitterTooltip';
		}
		if ( networkSlug === 'mastodon' ) {
			return 'mastodonTooltip';
		}
		// Default pattern.
		return `${ networkSlug }Tooltip`;
	};

	/**
	 * Get a translated label for the social network.
	 *
	 * @return {string} The social network label.
	 */
	const getLabel = () => {
		const maybeLabel = formValues[ getLabelFieldName( listItemKey ) ] ?? '';
		if ( '' === maybeLabel ) {
			return label;
		}
		return maybeLabel;
	};

	/**
	 * Get a tooltip for the social network.
	 *
	 * @return {string} The social network tooltip.
	 */
	const getTooltip = () => {
		const maybeTooltip = formValues[ getTooltipFieldName( listItemKey ) ] ?? '';
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
					{ ( 'default' === formValues.theme || ( 'custom' === formValues.theme && ! formValues.iconsOnly ) ) && (
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
