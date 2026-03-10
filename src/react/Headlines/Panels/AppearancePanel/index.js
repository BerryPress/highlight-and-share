/**
 * Appearance panel for Headlines: reorder headline networks.
 */

import { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { SelectControl } from '@wordpress/components';
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
				defaultOpen={ true }
				scrollAfterOpen={ false }
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
				<div className="has-admin-component-wrapper">
					<h3 className="has-admin-content-subheading">
						{ __( 'Headlines Appearance', 'highlight-and-share' ) }
					</h3>
					<div className="has-admin-component-row">
						<p className="description">
							{ __(
								'Configure the appearance of the headline feature.',
								'highlight-and-share'
							) }
						</p>
					</div>
					<div className="has-admin-component-row">
						<Controller
							name="headlinePlacement"
							control={ control }
							render={ ( { field } ) => (
								<SelectControl
									label={ __( 'Headline Placement', 'highlight-and-share' ) }
									value={ field.value }
									onChange={ field.onChange }
									options={ [
										{ value: 'before', label: __( 'Before', 'highlight-and-share' ) },
										{ value: 'after', label: __( 'After', 'highlight-and-share' ) },
									] }
								/>
							) }
						/>
					</div>
					{
						'after' === getValues( 'headlinePlacement' ) && (
							<div className="has-admin-component-row">
								<Controller
									name="headlinePosition"
									control={ control }
									render={ ( { field } ) => (
										<SelectControl
											label={ __( 'Headline Position', 'highlight-and-share' ) }
											value={ field.value }
											onChange={ field.onChange }
											options={ [
												{ value: 'absolute', label: __( 'Absolute', 'highlight-and-share' ) },
												{ value: 'inline', label: __( 'Inline', 'highlight-and-share' ) },
											] }
											help={ __(
												'Placing the share icon after the headline will either show the icon inline, next to last word of the headline, or absolute, far right of the headline.',
												'highlight-and-share'
											) }
										/>
									) }
								/>
							</div>
						)
					}
				</div>
			</PanelBodyWithIndicator>
		</ErrorBoundary>
	);
};

export default AppearancePanel;
