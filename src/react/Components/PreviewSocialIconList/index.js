import React, { useContext } from 'react';
import classNames from 'classnames';
import { useSelect } from '@wordpress/data';
import store from '../../Sharing/Store';
import PreviewSocialIconListItem from '../PreviewSocialIconListItem';
// Import all the social media icons.
import SocialIcons from '../SocialIcons';

const PreviewSocialIconList = () => {
	const appearanceThemeData = useSelect( ( select ) => select( store ).getThemeData() );

	const { getSocialIcons } = SocialIcons();
	const networks = getSocialIcons();

	if ( ! appearanceThemeData ) {
		return null;
	}
	// Make sure appearance theme data is present.
	let appearanceEmpty = true;
	if ( Object.keys( appearanceThemeData ).length > 0 ) {
		appearanceEmpty = false;
	}

	let themeStyles = ''; // placeholder for custom styles.
	// If appearance theme data is present, and the theme is custom, then add custom styles.
	if ( 'custom' === appearanceThemeData.theme && ! appearanceEmpty ) {
		if ( appearanceThemeData.groupIcons ) {
			themeStyles += `
				.has-admin-theme-preview-list.highlight-and-share-wrapper {
					background-color: ${ appearanceThemeData.backgroundColor } !important;
				}
				.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
					color: ${ appearanceThemeData.iconColorsGroup } !important;
					background-color: ${ appearanceThemeData.backgroundColor } !important;
				}
				.has-admin-theme-preview-list.highlight-and-share-wrapper div a:hover {
					color: ${ appearanceThemeData.iconColorsGroupHover } !important;
					background-color: ${ appearanceThemeData.backgroundColorHover } !important;
				}
				.has-admin-theme-preview-list.highlight-and-share-wrapper div:first-child a {
					border-top-left-radius: ${ appearanceThemeData.borderRadiusGroup.attrTop + appearanceThemeData.borderRadiusGroup.attrUnit } !important;
					border-bottom-left-radius: ${ appearanceThemeData.borderRadiusGroup.attrTop + appearanceThemeData.borderRadiusGroup.attrUnit } !important;
				}
				.has-admin-theme-preview-list.highlight-and-share-wrapper div:last-child a {
					border-bottom-right-radius: ${ appearanceThemeData.borderRadiusGroup.attrTop + appearanceThemeData.borderRadiusGroup.attrBottom } !important;
					border-top-right-radius: ${ appearanceThemeData.borderRadiusGroup.attrTop + appearanceThemeData.borderRadiusGroup.attrRight } !important;
				}
			`;
			// Get border radius values.
			if ( appearanceThemeData.borderRadiusGroup.attrSyncUnits ) {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper,
					.has-admin-theme-preview-list.highlight-and-share-wrapper:not(.icons-grouped) a {
						border-radius: ${ appearanceThemeData.borderRadiusGroup.attrTop }${ appearanceThemeData.borderRadiusGroup.attrUnit } !important;
					}
				`;
			} else {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper,
					.has-admin-theme-preview-list.highlight-and-share-wrapper a {
						border-top-left-radius: ${ appearanceThemeData.borderRadiusGroup.attrTop }${ appearanceThemeData.borderRadiusGroup.attrUnit } !important;
						border-top-right-radius: ${ appearanceThemeData.borderRadiusGroup.attrRight }${ appearanceThemeData.borderRadiusGroup.attrUnit } !important;
						border-bottom-right-radius: ${ appearanceThemeData.borderRadiusGroup.attrBottom }${ appearanceThemeData.borderRadiusGroup.attrUnit } !important;
						border-bottom-left-radius: ${ appearanceThemeData.borderRadiusGroup.attrLeft }${ appearanceThemeData.borderRadiusGroup.attrUnit } !important;
					}
				`;
			}
		}
		if ( ! appearanceThemeData.groupIcons ) {
			if ( appearanceThemeData.iconBorderRadius.attrSyncUnits ) {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
						border-radius: ${ appearanceThemeData.iconBorderRadius.attrTop }${ appearanceThemeData.iconBorderRadius.attrUnit } !important;
					}
				`;
			} else {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
						border-top-left-radius: ${ appearanceThemeData.iconBorderRadius.attrTop }${ appearanceThemeData.iconBorderRadius.attrUnit } !important;
						border-top-right-radius: ${ appearanceThemeData.iconBorderRadius.attrRight }${ appearanceThemeData.iconBorderRadius.attrUnit } !important;
						border-bottom-right-radius: ${ appearanceThemeData.iconBorderRadius.attrBottom }${ appearanceThemeData.iconBorderRadius.attrUnit } !important;
						border-bottom-left-radius: ${ appearanceThemeData.iconBorderRadius.attrLeft }${ appearanceThemeData.iconBorderRadius.attrUnit } !important;
					}
				`;
			}
		}
	}
	// Set padding.
	if ( ! appearanceEmpty && 'custom' === appearanceThemeData.theme ) {
		// Get padding values.
		if ( appearanceThemeData.iconPadding.attrSyncUnits ) {
			themeStyles += `
				.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
					padding: ${ appearanceThemeData.iconPadding.attrTop }${ appearanceThemeData.iconPadding.attrUnit } !important;
				}
			`;
		} else {
			themeStyles += `
				.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
					padding-top: ${ appearanceThemeData.iconPadding.attrTop }${ appearanceThemeData.iconPadding.attrUnit } !important;
					padding-right: ${ appearanceThemeData.iconPadding.attrRight }${ appearanceThemeData.iconPadding.attrUnit } !important;
					padding-bottom: ${ appearanceThemeData.icon_padding.attrBottom }${ appearanceThemeData.icon_padding.attrUnit } !important;
					padding-left: ${ appearanceThemeData.iconPadding.attrLeft }${ appearanceThemeData.iconPadding.attrUnit } !important;
				}
			`;
		}
	}

	// Set icon size.
	if ( ! appearanceEmpty ) {
		themeStyles += `
			.has-admin-theme-preview-list.highlight-and-share-wrapper div a .has-icon {
				width: ${ appearanceThemeData.iconSize }px !important;
				height: ${ appearanceThemeData.iconSize }px !important;
			}
		`;
	}

	// Set font size.
	if ( ! appearanceEmpty ) {
		themeStyles += `
			.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
				font-size: ${ appearanceThemeData.fontSize }px !important;
			}
		`;
	}

	// Set the icon gap.
	if ( ! appearanceEmpty ) {
		if ( ! appearanceThemeData.groupIcons ) {
			if ( appearanceThemeData.orientation === 'horizontal' && 'custom' === appearanceThemeData.theme ) {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper div {
						margin-right: ${ appearanceThemeData.iconGap }px !important;
					}
					.has-admin-theme-preview-list.highlight-and-share-wrapper div:last-child {
						margin-right: 0 !important;
					}
				`;
			} else if ( appearanceThemeData.orientation === 'vertical' && 'custom' === appearanceThemeData.theme ) {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper div {
						margin-bottom: ${ appearanceThemeData.iconGap }px !important;
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
			background-color: ${ appearanceThemeData.tooltipsBackgroundColor } !important;
			color: ${ appearanceThemeData.tooltipsTextColor } !important;
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
					`theme-${ appearanceThemeData.theme }`,
					{ 'icons-grouped': appearanceThemeData.groupIcons },
					{ 'icons-ungrouped': ! appearanceThemeData.groupIcons },
					{ 'orientation-horizontal': appearanceThemeData.orientation === 'horizontal' },
					{ 'orientation-vertical': appearanceThemeData.orientation === 'vertical' },
					{ 'has-label': ! appearanceThemeData.iconsOnly },
				) }
			>
				{ networks.map( ( network, index ) => {
					if ( network.enabled ) {
						return (
							<PreviewSocialIconListItem
								key={ network.key }
								listItemKey={ network.key }
								className={ network.className }
								icon={ network.icon }
								index={ index }
								label={ network.label }
								theme={ `theme-${ appearanceThemeData.theme }` }
								appearanceThemeData={ appearanceThemeData }
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
