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
	const networkOrder = useWatch( { control, name: 'networkOrder', defaultValue: [] } );

	console.log( socialDefaults );
	const networks = useMemo( () => {
		const defaults = socialDefaults || {};
		const order = Array.isArray( networkOrder ) ? networkOrder : Object.values( networkOrder || {} );
		const slugs = order.length > 0
			? order.filter( ( s ) => s && defaults[ s ] )
			: Object.keys( defaults );
		return slugs.map( ( slug ) => ( {
			slug,
			...defaults[ slug ],
		} ) ).filter( ( n ) => n.slug );
	}, [ socialDefaults, networkOrder ] );

	const enabledCount = useMemo( () => {
		return networks.filter( ( n ) => n.enabled ).length;
	}, [ networks ] );

	const canEnableMore = enabledCount < MAX_NETWORKS;

	const handleToggleChange = ( slug, locked, value, formOnChange, newChecked ) => {
		if ( locked ) {
			return;
		}
		if ( newChecked && ! canEnableMore ) {
			return;
		}
		formOnChange( { ...value, enabled: newChecked } );
	};

	console.log( networks );
	return (
		<ErrorBoundary
			fallback={
				<p>{ __( 'Could not load Social Networks panel.', 'highlight-and-share' ) }</p>
			}
		>
			<PanelBodyWithIndicator
				panelId="headlinesSocialNetworks"
				title={ __( 'Social Networks', 'highlight-and-share' ) }
				defaultOpen={ true }
				className="has-headlines-panel"
				watchFields={ [ 'socialDefaults', 'networkOrder' ] }
			>
				<div className="has-admin-component-wrapper">
					<div className="has-admin-component-row">
						<p className="description">
							{ sprintf(
								/* translators: %d: Maximum number of networks (4) */
								__( 'Select up to %d text-sharing networks. Copy and Web Share are always enabled.', 'highlight-and-share' ),
								MAX_NETWORKS
							) }
						</p>
					</div>
					{ ! canEnableMore && (
						<div className="has-admin-component-row">
							<p className="description has-text-warning">
								{ sprintf(
									/* translators: %d: Maximum number of networks (4) */
									__( 'Maximum of %d networks reached. Disable one to add another.', 'highlight-and-share' ),
									MAX_NETWORKS
								) }
							</p>
						</div>
					) }
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
										return (
											<div
												className="has-headlines-network-item"
												key={ network.slug }
											>
												<div className="has-headlines-network-icon">
													<HeadlinesNetworkIcon slug={ network.slug } />
												</div>
												<div className="has-headlines-network-controls">
													<ToggleControl
														label={ label }
														checked={ !! enabled }
														disabled={ isLocked }
														onChange={ ( newChecked ) => {
															handleToggleChange( network.slug, isLocked, value, onChange, newChecked );
														} }
														__nextHasNoMarginBottom
													/>
													{ ( isLocked || enabled ) && (
														<TextControl
															label={ __( 'Label', 'highlight-and-share' ) }
															value={ label }
															onChange={ ( v ) => onChange( { ...value, label: v } ) }
															className="has-headlines-network-label"
														/>
													) }
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
