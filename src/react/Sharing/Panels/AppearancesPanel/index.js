/**
 * Display Rules Panel Component.
 *
 * Consolidates display-related settings from the Settings tab into a single collapsible panel.
 * Includes post type exclusion, content area toggles, mobile settings, and text prefix/suffix.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';
import { Suspense } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { ToggleControl, TextControl } from '@wordpress/components';
import PanelBodyWithIndicator from '../../../Components/Shared/PanelBodyWithIndicator';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Loader from '../../../Components/Loader';
import SocialIconList from '../../../Components/Shared/SocialIconList';
import ThemeCustomizer from '../../../Components/Shared/ThemeCustomizer';

/**
 * Appearances Panel Interface Component.
 *
 * @return {Element} Appearances Panel component.
 */
const Interface = () => {
	// Get form methods from FormProvider context.
	const { control } = useFormContext();

	return (
		<PanelBodyWithIndicator
			title={ __( 'Appearance', 'highlight-and-share' ) }
			initialOpen={ true } // Default expanded.
			panelId="appearance"
			control={ control }
			className="has-sharing-panel"
		>
			<h3 className="has-admin-content-subheading">
				{ __( 'Reorder Sharing Networks', 'highlight-and-share' ) }
			</h3>
			<div className="has-admin-component-row">
				<SocialIconList />
			</div>

			<ThemeCustomizer />
		</PanelBodyWithIndicator>
	);
};

/**
 * Appearances Panel Component.
 *
 * @param {Object} data Ajax Data object.
 * @return {Element} Appearances Panel with error boundary and suspense.
 */
const AppearancesPanel = ( data ) => {
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Appearances panel.', 'highlight-and-share' ) }
				</p>
			}
		>
			<Suspense fallback={ <Loader /> }>
				<Interface data={ data } />
			</Suspense>
		</ErrorBoundary>
	);
};

export default AppearancesPanel;

