/**
 * Preview Panel Component.
 *
 * Displays the preview of the social networks with the current theme and appearance settings.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';
import { Suspense } from 'react';
import PanelBodyWithIndicator from '../../../Components/Shared/PanelBodyWithIndicator';
import ErrorBoundary from '../../../Components/ErrorBoundary';
import Loader from '../../../Components/Loader';
import PreviewSocialIconList from '../../../Components/Shared/PreviewSocialIconList';
import PreviewIcon from '../../../Components/Icons/Preview';

const Interface = () => {
	return (
		<PanelBodyWithIndicator
			title={ __( 'Preview', 'highlight-and-share' ) }
			initialOpen={ true } // Default expanded.
			panelId="preview"
			className="has-sharing-panel"
			icon={ <PreviewIcon /> }
		>
			<div className="has-admin-component-wrapper">
				<PreviewSocialIconList />
			</div>
		</PanelBodyWithIndicator>
	);
};

/**
 * Display Rules Panel Component.
 *
 * @param {Object} data Ajax Data object.
 * @return {Element} Display Rules Panel with error boundary and suspense.
 */
const PreviewPanel = ( data ) => {
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Preview panel.', 'highlight-and-share' ) }
				</p>
			}
		>
			<Suspense fallback={ <Loader /> }>
				<Interface data={ data } />
			</Suspense>
		</ErrorBoundary>
	);
};

export default PreviewPanel;

