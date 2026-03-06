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
import PanelBodyWithIndicator from '../../../Components/Shared/PanelBodyWithIndicator';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Loader from '../../../Components/Loader';
import SocialIconList from '../../../Components/Shared/SocialIconList';
import ThemeCustomizer from '../../../Components/Shared/ThemeCustomizer';

/**
 * Appearances Panel Interface Component.
 *
 * @param {Object} data Ajax Data object.
 * @return {Element} Appearances Panel component.
 */
const Interface = ( data ) => {
	return (
		<PanelBodyWithIndicator
			title={ __( 'Appearance - Reordering and Styling', 'highlight-and-share' ) }
			initialOpen={ false }
			panelId="appearance"
			className="has-sharing-panel"
			watchFields={ data.watchFields }
		>
			<div className="has-admin-component-wrapper">
				<h3 className="has-admin-content-subheading">
					{ __( 'Reorder Sharing Networks', 'highlight-and-share' ) }
				</h3>
				<div className="has-admin-component-row">
					<SocialIconList />
				</div>

				<ThemeCustomizer />
			</div>
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
				<Interface { ...data } />
			</Suspense>
		</ErrorBoundary>
	);
};

export default AppearancesPanel;

