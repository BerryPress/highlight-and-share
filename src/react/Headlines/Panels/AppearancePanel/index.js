/**
 * Appearance panel for Headlines: reorder headline networks.
 */

import { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useFormContext, useWatch } from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PanelBodyWithIndicator from '../../../Components/Shared/PanelBodyWithIndicator';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import HeadlinesNetworkOrderList from '../../../Components/HeadlinesNetworkOrderList';

const AppearancePanel = () => {
	const { control, getValues, setValue } = useFormContext();
	const socialDefaults = useWatch( { control, name: 'socialDefaults', defaultValue: {} } );
	const networkOrder = useWatch( { control, name: 'networkOrder', defaultValue: [] } );

	const networksInOrder = useMemo( () => {
		const defaults = socialDefaults || {};
		const order = Array.isArray( networkOrder ) ? networkOrder : Object.values( networkOrder || {} );
		const slugs = order.length > 0
			? order.filter( ( s ) => s && defaults[ s ] )
			: Object.keys( defaults );
		return slugs
			.map( ( slug ) => ( { slug, ...defaults[ slug ] } ) )
			.filter( ( n ) => n.slug && n.enabled );
	}, [ socialDefaults, networkOrder ] );

	const moveNetwork = useCallback( ( dragIndex, hoverIndex ) => {
		const order = getValues( 'networkOrder' );
		const fullOrder = Array.isArray( order ) ? [ ...order ] : [ ...Object.values( order || {} ) ];
		const enabledSlugs = [ ...networksInOrder.map( ( n ) => n.slug ) ];
		const disabledSlugs = fullOrder.filter( ( s ) => ! enabledSlugs.includes( s ) );
		const [ removed ] = enabledSlugs.splice( dragIndex, 1 );
		enabledSlugs.splice( hoverIndex, 0, removed );
		const newOrder = [ ...enabledSlugs, ...disabledSlugs ];
		setValue( 'networkOrder', newOrder, { shouldDirty: true } );
	}, [ getValues, setValue, networksInOrder ] );

	return (
		<ErrorBoundary
			fallback={
				<p>{ __( 'Could not load Appearance panel.', 'highlight-and-share' ) }</p>
			}
		>
			<PanelBodyWithIndicator
				panelId="headlinesAppearance"
				title={ __( 'Appearance', 'highlight-and-share' ) }
				defaultOpen={ false }
				className="has-headlines-panel"
				watchFields={ [ 'networkOrder', 'socialDefaults' ] }
			>
				<div className="has-admin-component-wrapper">
					<h3 className="has-admin-content-subheading">
						{ __( 'Reorder Headline Networks', 'highlight-and-share' ) }
					</h3>
					<div className="has-admin-component-row">
						<p className="description">
							{ __(
								'Drag to reorder the networks shown in the headline share menu.',
								'highlight-and-share'
							) }
						</p>
					</div>
					<DndProvider backend={ HTML5Backend }>
						<HeadlinesNetworkOrderList
							networks={ networksInOrder }
							moveNetwork={ moveNetwork }
						/>
					</DndProvider>
				</div>
			</PanelBodyWithIndicator>
		</ErrorBoundary>
	);
};

export default AppearancePanel;
