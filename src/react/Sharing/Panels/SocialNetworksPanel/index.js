/**
 * SocialNetworksPanel component.
 */

import { useState, Suspense, useMemo, useEffect } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { PanelBody, Notice } from '@wordpress/components';
import { useFormContext, useWatch } from 'react-hook-form';
import NetworkSelector from '../../../Components/Shared/NetworkSelector';
import NetworkSettingsPopover from '../../../Components/Shared/NetworkSettingsPopover';
import PanelBodyWithIndicator from '../../../Components/Shared/PanelBodyWithIndicator';
import hasNetworkErrors from '../../../Utils/hasNetworkErrors';
import ErrorBoundary from '../../../Components/ErrorBoundary';

/**
 * SocialNetworksPanel component.
 *
 * @param {Object} data Ajax Data object.
 * @return {JSX.Element} SocialNetworksPanel component.
 */
const SocialNetworksPanel = ( data ) => {
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Social Networks panel.', 'highlight-and-share' ) }
					<br />
					<a
						href="https://dlxplugins.com/support/"
						target="_blank"
						rel="noopener noreferrer"
					>
						DLX Plugins Support
					</a>
				</p>
			}
		>
			<Suspense
				fallback={
					<PanelBody
						title={ __( 'Social Networks', 'highlight-and-share' ) }
						initialOpen={ true }
						className="has-sharing-panel"
					>
						<div className="has-admin-component-row">
							<p>{ __( 'Loading…', 'highlight-and-share' ) }</p>
						</div>
					</PanelBody>
				}
			>
				<Interface data={ data } />
			</Suspense>
		</ErrorBoundary>
	);
};

/**
 * Panel interface component.
 *
 * @param {Object} props      Component props.
 * @param {Object} props.data Ajax Data object.
 * @return {JSX.Element} Panel interface.
 */
const Interface = ( { data } ) => {
	const { control, clearErrors, trigger, formState: { errors } } = useFormContext();
	// Popover state management.
	const [ popoverNetwork, setPopoverNetwork ] = useState( null );
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );

	// Watch all network label and tooltip fields to trigger recomputation when they change.
	// This ensures networkErrors useMemo recomputes when clearErrors is called.
	const watchedFields = useWatch( {
		control,
		// Watch all network label and tooltip fields.
		name: data?.socialNetworks
			? Object.keys( data.socialNetworks ).flatMap( ( slug ) => {
				const fields = [ `${ slug }Label`, `${ slug }Tooltip` ];
				// Add network-specific fields.
				if ( slug === 'twitter' ) {
					fields.push( 'twitter', 'enableHashtags' );
				} else if ( slug === 'whatsapp' ) {
					fields.push( 'whatsappApiEndpoint', 'whatsappCanShareUrl' );
				}
				return fields;
			} )
			: [],
	} );

	/**
	 * Handle settings button mouse down.
	 *
	 * @param {MouseEvent} e           Mouse down event.
	 * @param {string}     networkSlug Network slug.
	 */
	const handleSettingsMouseDown = ( e, networkSlug ) => {
		e.stopPropagation();

		// Enable popover.
		setPopoverNetwork( networkSlug );
		setPopoverAnchor( e.currentTarget );
	};

	/**
	 * Handle popover close.
	 */
	const handlePopoverClose = () => {
		setPopoverNetwork( null );
		setPopoverAnchor( null );
	};

	/**
	 * Get network data for popover.
	 *
	 * @param {string} networkSlug Network slug.
	 * @return {Object|null} Network data or null.
	 */
	const getNetworkData = ( networkSlug ) => {
		if ( ! data || ! data.socialNetworks ) {
			return null;
		}
		return data.socialNetworks[ networkSlug ] || null;
	};

	/**
	 * Compute which networks have errors.
	 *
	 * @return {Object} Object mapping network slugs to boolean error state.
	 */
	const networkErrors = useMemo( () => {
		if ( ! data?.socialNetworks || ! errors ) {
			return {};
		}

		const errorMap = {};
		Object.keys( data.socialNetworks ).forEach( ( slug ) => {
			errorMap[ slug ] = hasNetworkErrors( slug, errors );
		} );

		return errorMap;
	}, [ data?.socialNetworks, errors, watchedFields ] );

	/**
	 * Get list of networks with errors for error message.
	 *
	 * @return {Array} Array of network labels with errors.
	 */
	const networksWithErrors = useMemo( () => {
		if ( ! data?.socialNetworks ) {
			return [];
		}

		return Object.keys( networkErrors )
			.filter( ( slug ) => networkErrors[ slug ] )
			.map( ( slug ) => {
				const network = data.socialNetworks[ slug ];
				return network?.label || network?.label_text || slug;
			} );
	}, [ networkErrors, data?.socialNetworks ] );

	/**
	 * Render global error message.
	 *
	 * @return {JSX.Element|null} Error notice or null.
	 */
	const renderErrorNotice = () => {
		if ( networksWithErrors.length === 0 ) {
			return null;
		}

		const networkList = networksWithErrors.join( ', ' );
		const message = sprintf(
			/* translators: %s: Comma-separated list of network names */
			__( 'The following networks have validation errors: %s', 'highlight-and-share' ),
			networkList
		);

		return (
			<Notice status="error" isDismissible={ false }>
				{ message }
			</Notice>
		);
	};

	return (
		<>
			{ /* Global error message at top */ }
			{ renderErrorNotice() }
			<PanelBodyWithIndicator
				panelId="socialNetworks"
				control={ control }
				title={ __( 'Social Networks', 'highlight-and-share' ) }
				defaultOpen={ true }
				className="has-sharing-panel"
			>
				<div className="has-admin-component-row">
					<p className="description">
						{ __(
							'Select which social networks to enable and configure their settings.',
							'highlight-and-share'
						) }
					</p>
				</div>
				<div className="has-admin-component-row">
					<NetworkSelector
						control={ control }
						networks={ data?.socialNetworks || {} }
						networkErrors={ networkErrors }
						onSettingsMouseDown={ handleSettingsMouseDown }
					/>
				</div>

				{ /* Network Settings Popover */ }
				{ popoverNetwork && popoverAnchor && (
					<NetworkSettingsPopover
						networkSlug={ popoverNetwork }
						network={ getNetworkData( popoverNetwork ) }
						control={ control }
						clearErrors={ clearErrors }
						trigger={ trigger }
						errors={ errors }
						onClose={ handlePopoverClose }
						anchor={ popoverAnchor }
					/>
				) }
			</PanelBodyWithIndicator>
			{ /* Global error message at bottom */ }
			{ renderErrorNotice() }
		</>
	);
};

export default SocialNetworksPanel;

