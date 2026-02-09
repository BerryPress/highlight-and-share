import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { useSelect } from '@wordpress/data';
import store from '../../../Sharing/Panels/SocialNetworksPanel/Store';
import { useFormContext } from 'react-hook-form';
import PreviewSocialIconListItem from '../PreviewSocialIconListItem';
// Import all the social media icons.
import SocialIcons from '../../SocialIcons';

const PreviewSocialIconList = () => {
	const { watch, getValues } = useFormContext();
	const formValues = watch();

	const { getSocialIcons } = SocialIcons();

	const networks = useMemo( () => {
		return getSocialIcons();
	}, [ formValues ] );

	const networksToShow = useMemo( () => {
		const networkOrder = getValues( 'networkOrder' );
		return Object.values( networkOrder ).map( ( networkSlug ) => networks.find( ( network ) => {
			return network.key === networkSlug;
		} ) );
	}, [ networks, formValues ] );

	if ( ! formValues ) {
		return null;
	}
	// Make sure appearance theme data is present.
	let appearanceEmpty = true;
	if ( Object.keys( formValues ).length > 0 ) {
		appearanceEmpty = false;
	}

	let themeStyles = ''; // placeholder for custom styles.
	// If appearance theme data is present, and the theme is custom, then add custom styles.
	if ( 'custom' === formValues.theme && ! appearanceEmpty ) {
		if ( formValues.groupIcons ) {
			themeStyles += `
				.has-admin-theme-preview-list.highlight-and-share-wrapper {
					background-color: ${ formValues.backgroundColor } !important;
				}
				.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
					color: ${ formValues.iconColorsGroup } !important;
					background-color: ${ formValues.backgroundColor } !important;
				}
				.has-admin-theme-preview-list.highlight-and-share-wrapper div a:hover {
					color: ${ formValues.iconColorsGroupHover } !important;
					background-color: ${ formValues.backgroundColorHover } !important;
				}
				.has-admin-theme-preview-list.highlight-and-share-wrapper div:first-child a {
					border-top-left-radius: ${ formValues.borderRadiusGroup.attrTop + formValues.borderRadiusGroup.attrUnit } !important;
					border-bottom-left-radius: ${ formValues.borderRadiusGroup.attrTop + formValues.borderRadiusGroup.attrUnit } !important;
				}
				.has-admin-theme-preview-list.highlight-and-share-wrapper div:last-child a {
					border-bottom-right-radius: ${ formValues.borderRadiusGroup.attrTop + formValues.borderRadiusGroup.attrUnit } !important;
					border-top-right-radius: ${ formValues.borderRadiusGroup.attrTop + formValues.borderRadiusGroup.attrUnit } !important;
				}
			`;
			// Get border radius values.
			if ( formValues.borderRadiusGroup.attrSyncUnits ) {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper,
					.has-admin-theme-preview-list.highlight-and-share-wrapper:not(.icons-grouped) a {
						border-radius: ${ formValues.borderRadiusGroup.attrTop }${ formValues.borderRadiusGroup.attrUnit } !important;
					}
				`;
			} else {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper,
					.has-admin-theme-preview-list.highlight-and-share-wrapper a {
						border-top-left-radius: ${ formValues.borderRadiusGroup.attrTop }${ formValues.borderRadiusGroup.attrUnit } !important;
						border-top-right-radius: ${ formValues.borderRadiusGroup.attrRight }${ formValues.borderRadiusGroup.attrUnit } !important;
						border-bottom-right-radius: ${ formValues.borderRadiusGroup.attrBottom }${ formValues.borderRadiusGroup.attrUnit } !important;
						border-bottom-left-radius: ${ formValues.borderRadiusGroup.attrLeft }${ formValues.borderRadiusGroup.attrUnit } !important;
					}
				`;
			}
		}
		if ( ! formValues.groupIcons ) {
			if ( formValues.iconBorderRadius.attrSyncUnits ) {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
						border-radius: ${ formValues.iconBorderRadius.attrTop }${ formValues.iconBorderRadius.attrUnit } !important;
					}
				`;
			} else {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
						border-top-left-radius: ${ formValues.iconBorderRadius.attrTop }${ formValues.iconBorderRadius.attrUnit } !important;
						border-top-right-radius: ${ formValues.iconBorderRadius.attrRight }${ formValues.iconBorderRadius.attrUnit } !important;
						border-bottom-right-radius: ${ formValues.iconBorderRadius.attrBottom }${ formValues.iconBorderRadius.attrUnit } !important;
						border-bottom-left-radius: ${ formValues.iconBorderRadius.attrLeft }${ formValues.iconBorderRadius.attrUnit } !important;
					}
				`;
			}
		}
	}
	// Set padding.
	if ( ! appearanceEmpty && 'custom' === formValues.theme ) {
		// Get padding values.
		if ( formValues.iconPadding.attrSyncUnits ) {
			themeStyles += `
				.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
					padding: ${ formValues.iconPadding.attrTop }${ formValues.iconPadding.attrUnit } !important;
				}
			`;
		} else {
			themeStyles += `
				.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
					padding-top: ${ formValues.iconPadding.attrTop }${ formValues.iconPadding.attrUnit } !important;
					padding-right: ${ formValues.iconPadding.attrRight }${ formValues.iconPadding.attrUnit } !important;
					padding-bottom: ${ formValues.iconPadding.attrBottom }${ formValues.iconPadding.attrUnit } !important;
					padding-left: ${ formValues.iconPadding.attrLeft }${ formValues.iconPadding.attrUnit } !important;
				}
			`;
		}
	}

	// Set icon size.
	if ( ! appearanceEmpty && 'custom' === formValues.theme ) {
		themeStyles += `
			.has-admin-theme-preview-list.highlight-and-share-wrapper div a .has-icon {
				width: ${ formValues.iconSize }px !important;
				height: ${ formValues.iconSize }px !important;
			}
		`;
	}

	// Set font size.
	if ( ! appearanceEmpty && 'custom' === formValues.theme ) {
		themeStyles += `
			.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
				font-size: ${ formValues.fontSize }px !important;
			}
		`;
	}

	// Set the icon gap.
	if ( ! appearanceEmpty ) {
		if ( ! formValues.groupIcons ) {
			if ( formValues.orientation === 'horizontal' && 'custom' === formValues.theme ) {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper div {
						margin-right: ${ formValues.iconGap }px !important;
					}
					.has-admin-theme-preview-list.highlight-and-share-wrapper div:last-child {
						margin-right: 0 !important;
					}
				`;
			} else if ( formValues.orientation === 'vertical' && 'custom' === formValues.theme ) {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper div {
						margin-bottom: ${ formValues.iconGap }px !important;
					}
					.has-admin-theme-preview-list.highlight-and-share-wrapper div:last-child {
						margin-bottom: 0 !important;
					}
				`;
			}
		}
	}

	// Set the tooltip background and color.
	themeStyles += `
		.has-admin-theme-preview-list.highlight-and-share-wrapper > div.has-tooltip:hover:after {
			background-color: ${ formValues.tooltipsBackgroundColor } !important;
			color: ${ formValues.tooltipsTextColor } !important;
		}
	`;

	return (
		<>
			<style>
				{ themeStyles }
			</style>
			<div
				className={ classNames(
					'has-admin-theme-preview-list highlight-and-share-wrapper',
					`theme-${ formValues.theme }`,
					{ 'icons-grouped': formValues.groupIcons },
					{ 'icons-ungrouped': ! formValues.groupIcons },
					{ 'orientation-horizontal': formValues.orientation === 'horizontal' },
					{ 'orientation-vertical': formValues.orientation === 'vertical' },
					{ 'has-label': ! formValues.iconsOnly },
				) }
			>
				{ networksToShow.map( ( network, index ) => {
					if ( network.enabled ) {
						return (
							<PreviewSocialIconListItem
								key={ `${ network.key }-item` }
								listItemKey={ network.key }
								className={ network.className }
								icon={ network.icon }
								index={ index }
								label={ network.label }
							/>
						);
					}
					return null;
				} ) }
			</div>
		</>
	);
};

export default PreviewSocialIconList;
