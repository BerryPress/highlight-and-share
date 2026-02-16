/**
 * Social Networks panel for Headlines.
 * Text-sharing networks only; Copy and Webshare locked; max 4 total.
 */

import { useMemo } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { ToggleControl, TextControl } from '@wordpress/components';
import PanelBodyWithIndicator from '../../../Components/Shared/PanelBodyWithIndicator';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import HeadlinesNetworkIcon from '../../../Components/HeadlinesNetworkIcon';

const MAX_NETWORKS = 4;
const LOCKED_SLUGS = [ 'copy', 'webshare' ];

const SocialNetworksPanel = () => {
	const { control } = useFormContext();
	const socialDefaults = useWatch( { control, name: 'socialDefaults', defaultValue: {} } );

	const networks = useMemo( () => {
		const defaults = socialDefaults || {};
		return Object.keys( defaults )
			.map( ( slug ) => ( { slug, ...defaults[ slug ] } ) )
			.filter( ( n ) => n.slug );
	}, [ socialDefaults ] );

	const enabledCount = useMemo( () => {
		return networks.filter( ( n ) => n.enabled ).length;
	}, [ networks ] );

	const canEnableMore = enabledCount < MAX_NETWORKS;

	const networksRemaining = MAX_NETWORKS - enabledCount;

	const handleToggleChange = ( slug, locked, value, formOnChange, newChecked ) => {
		if ( locked ) {
			return;
		}
		if ( newChecked && ! canEnableMore ) {
			return;
		}
		formOnChange( { ...value, enabled: newChecked } );
	};

	return (
		<ErrorBoundary
			fallback={
				<p>{ __( 'Could not load Social Networks panel.', 'highlight-and-share' ) }</p>
			}
		>
			<PanelBodyWithIndicator
				panelId="headlinesSocialNetworks"
				title={ __( 'Social Networks - Enable Networks for Headlines (up to 4)', 'highlight-and-share' ) }
				defaultOpen={ true }
				scrollAfterOpen={ false }
				className="has-headlines-panel"
				watchFields={ [ 'socialDefaults' ] }
			>
				<div className="has-admin-component-wrapper">
					<div className="has-admin-component-row">
						<p className="description">
							{ networksRemaining > 0 ? (
								sprintf(
									/* translators: %d: Number of networks remaining */
									__( 'Add %d more text-sharing networks. Copy and Web Share are always enabled.', 'highlight-and-share' ),
									networksRemaining
								)
							) : (
								/* translators: %d: Maximum number of networks (4) */
								sprintf( __( 'All %d text-sharing networks are enabled. Copy and Web Share are always enabled.', 'highlight-and-share' ), MAX_NETWORKS )
							) }
						</p>
					</div>
					<div className="has-headlines-network-list">
						{ networks.map( ( network ) => {
							const isLocked = LOCKED_SLUGS.includes( network.slug );
							return (
								<Controller
									key={ network.slug }
									name={ `socialDefaults.${ network.slug }` }
									control={ control }
									render={ ( { field: { value, onChange } } ) => {
										const enabled = value?.enabled ?? network.enabled ?? false;
										const label = value?.label ?? network.label ?? network.slug;
										const isDisabledByMax = ! canEnableMore && ! enabled && ! isLocked;
										const isToggleDisabled = isLocked || isDisabledByMax;
										return (
											<div
												className={ `has-headlines-network-item${ isDisabledByMax ? ' has-headlines-network-item--disabled' : '' }` }
												key={ network.slug }
											>
												<div className="has-headlines-network-icon">
													<HeadlinesNetworkIcon slug={ network.slug } />
												</div>
												<div className="has-headlines-network-controls">
													<ToggleControl
														label={ label }
														checked={ !! enabled }
														disabled={ isToggleDisabled }
														onChange={ ( newChecked ) => {
															handleToggleChange( network.slug, isLocked, value, onChange, newChecked );
														} }
														__nextHasNoMarginBottom
													/>
													<TextControl
														label={ __( 'Label', 'highlight-and-share' ) }
														value={ label }
														onChange={ ( v ) => onChange( { ...value, label: v } ) }
														className="has-headlines-network-label"
														disabled={ isDisabledByMax }
													/>
												</div>
											</div>
										);
									} }
								/>
							);
						} ) }
					</div>
				</div>
			</PanelBodyWithIndicator>
		</ErrorBoundary>
	);
};

export default SocialNetworksPanel;
