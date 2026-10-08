/**
 * Block Editor Panel Component.
 *
 * Consolidates block editor settings from the Block Editor tab into a single collapsible panel.
 * Includes block settings and Adobe Fonts configuration.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';
import { Suspense, useState } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { ToggleControl, TextControl, Button } from '@wordpress/components';
import classNames from 'classnames';
import PanelBodyWithIndicator from '../../../Components/Shared/PanelBodyWithIndicator';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Loader from '../../../Components/Loader';
import Notice from '../../../Components/Notice';
import CircularExclamationIcon from '../../../Components/Icons/CircularExplanation';
import Spinner from '../../../Components/Icons/Spinner';
import sendCommand from '../../../Utils/SendCommand';

/**
 * Block Editor Panel Interface Component.
 *
 * @param {Object} props             Component props.
 * @param {Array}  props.watchFields Fields to watch.
 * @return {Element} Block Editor Panel component.
 */
const Interface = ( { watchFields } ) => {
	// Get form methods from FormProvider context.
	const { control, clearErrors, trigger, setValue, setError, getValues, formState: { errors } } = useFormContext();

	return (
		<PanelBodyWithIndicator
			title={ __( 'Block Editor - Click to Share Block Settings', 'highlight-and-share' ) }
			initialOpen={ false }
			panelId="blockEditor"
			control={ control }
			className="has-sharing-panel"
			watchFields={ watchFields }
		>
			<div className="has-admin-component-wrapper">
				<h3 className="has-admin-content-subheading">
					{ __( 'Block Settings', 'highlight-and-share' ) }
				</h3>
				<p className="description">
					{ __( 'Set block editor options.', 'highlight-and-share' ) }
				</p>

				<div className="has-admin-component-row">
					<Controller
						name="enableBlocks"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Blocks', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value ?? false }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'If you are not using the Click to Share blocks, you can disable this option.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>
			</div>
		</PanelBodyWithIndicator>
	);
};

/**
 * Block Editor Panel Component.
 *
 * @param {Object} props             Component props.
 * @param {Array}  props.watchFields Fields to watch.
 * @return {Element} Block Editor Panel with error boundary and suspense.
 */
const BlockEditorPanel = ( { watchFields } ) => {
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Block Editor panel.', 'highlight-and-share' ) }
				</p>
			}
		>
			<Suspense fallback={ <Loader /> }>
				<Interface watchFields={ watchFields } />
			</Suspense>
		</ErrorBoundary>
	);
};

export default BlockEditorPanel;

