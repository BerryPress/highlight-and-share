import { useState } from 'react';
import classNames from 'classnames';
import {
	TabPanel,
} from '@wordpress/components';
import TabColorPickers from '../TabColorPickers';
import { useSelect, useDispatch } from '@wordpress/data';
import store from '../../../Sharing/Panels/SocialNetworksPanel/Store';
import { __ } from '@wordpress/i18n';
import { useFormContext } from 'react-hook-form';

const SocialNetworkColorsTabs = () => {
	const { setValue } = useFormContext();
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
				backgroundHover: network.backgroundHover,
				iconColor: network.iconColor,
				iconColorHover: network.iconColorHover,
			} );
		} );
		return tabs;
	};

	const onValueChange = ( formValues ) => {
		const newSocialNetworkColors = { ...socialNetworkColors };
		newSocialNetworkColors[ selectedTab ] = {
			...newSocialNetworkColors[ selectedTab ],
			background: formValues.backgroundColor,
			backgroundHover: formValues.backgroundColorHover,
			iconColor: formValues.iconColor,
			iconColorHover: formValues.iconColorHover,
		};
		setSocialNetworkColors( newSocialNetworkColors );
		setValue( 'iconColors', newSocialNetworkColors, { shouldDirty: true } );
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
								backgroundColorHover={ tab.backgroundHover }
								iconColor={ tab.iconColor }
								iconColorHover={ tab.iconColorHover }
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
