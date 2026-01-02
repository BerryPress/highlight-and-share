import { useState } from 'react';
import classNames from 'classnames';
import {
	TabPanel,
} from '@wordpress/components';
import TabColorPickers from '../TabColorPickers';
import { useSelect, useDispatch } from '@wordpress/data';
import store from '../../Sharing/Store';
import { __ } from '@wordpress/i18n';

const SocialNetworkColorsTabs = () => {
	const { socialNetworkColors } = useSelect( ( select ) => {
		return {
			socialNetworkColors: select( store ).getSocialNetworkColors(),
		};
	}, [] );
	const { setSocialNetworkColors } = useDispatch( store );
	const [ selectedTab, setSelectedTab ] = useState( 'twitter' );

	const getTabs = () => {
		const tabs = [];
		Object.values( socialNetworkColors ).forEach( ( network ) => {
			tabs.push( {
				key: network.slug,
				name: network.slug,
				title: network.label,
				className: `social-network-colors-tab-${ network.slug }`,
				background: network.background,
				background_hover: network.background_hover,
				icon_color: network.icon_color,
				icon_color_hover: network.icon_color_hover,
			} );
		} );
		return tabs;
	};

	const onValueChange = ( formValues ) => {
		const newSocialNetworkColors = { ...socialNetworkColors };
		newSocialNetworkColors[ selectedTab ] = {
			...newSocialNetworkColors[ selectedTab ],
			background: formValues.backgroundColor,
			background_hover: formValues.backgroundColorHover,
			icon_color: formValues.iconColor,
			icon_color_hover: formValues.iconColorHover,
		};
		setSocialNetworkColors( newSocialNetworkColors );
	};

	return (
		<>
			<div
				className={ classNames(
					'has-admin-colors-tabs',
				) }
			>
				<h3>{ __( 'Set the Icon Colors', 'highlight-and-share' ) }</h3>
				<TabPanel
					className="has-admin-colors-tabs-panel"
					activeClass="active-tab"
					onSelect={ ( tabName ) => {
						setSelectedTab( tabName );
					} }
					orientation="horizontal"
					tabs={ getTabs() }
					initialTabName={ selectedTab }
				>
					{ ( tab ) => {
						return (
							<TabColorPickers
								key={ tab.key }
								backgroundColor={ tab.background }
								backgroundColorHover={ tab.background_hover }
								iconColor={ tab.icon_color }
								iconColorHover={ tab.icon_color_hover }
								onValueChange={ onValueChange }
							/>
						);
					} }
				</TabPanel>
			</div>
		</>
	);
};

export default SocialNetworkColorsTabs;
