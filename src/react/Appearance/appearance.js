import React, { lazy } from 'react';
import { __ } from '@wordpress/i18n';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SocialIconList from '../Components/Shared/SocialIconList';
import PreviewSocialIconList from '../Components/Shared/PreviewSocialIconList';
import ErrorBoundary from '../Components/ErrorBoundary';

// Lazy load theme customizer.
const ThemeCustomizer = lazy( () =>
	import( /* webpackChunkName: "ThemeCustomizer.0.0.7" */ '../Components/Shared/ThemeCustomizer' )
);

const Appearance = () => {
	const getIcons = () => {
		// Now return component with icons.
		return (
			<ErrorBoundary
				fallback={
					<p>
						{ __( 'Could not load appearance Reorder Settings.', 'quotes-dlx' ) }
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
				<SocialIconList />
			</ErrorBoundary>

		);
	};

	const getPreview = () => {
		// Now return component with icons.
		return (
			<>
				<ErrorBoundary
					fallback={
						<p>
							{ __( 'Could not load appearance Preview.', 'quotes-dlx' ) }
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
				><PreviewSocialIconList /></ErrorBoundary>

			</>
		);
	};

	return (
		<>
			<div className="has-admin-container-body__content">
				<div className="has-admin-content-wrapper">
					<div className="has-admin-content-panel">
						<div className="has-admin-content-heading">
							<h1>
								<span className="has-admin-content-heading-text">
									{ __( 'Appearance and Theme Settings', 'quotes-dlx' ) }
								</span>
							</h1>
							<p className="description">
								{ __(
									'On this screen, you can customize the look of Highlight and Share, and reorder the sharing buttons.',
									'quotes-dlx'
								) }
							</p>
						</div>
						<div className="has-admin-content-body">
							<h2 className="has-admin-content-subheading">
								{ __( 'Reorder Sharing Networks', 'highlight-and-share' ) }
							</h2>
							<p className="description">{ __( 'All available social icons are shown in the event more are enabled/disabled later.', 'highlight-and-share' ) }</p>
							<div className="has-admin-component-row">{ getIcons() }</div>
						</div>
					</div>
				</div>
			</div>
			<div className="has-admin-container-body__content">
				<div className="has-admin-content-wrapper">
					<div className="has-admin-content-panel">
						<div className="has-admin-content-body">
							<h2 className="has-admin-content-subheading">
								{ __( 'Theme Selection and Customizer', 'highlight-and-share' ) }
							</h2>
							<p className="description">{ __( 'Select a theme to use for Highlight and Share, or choose custom and manually configure a theme.', 'highlight-and-share' ) }</p>
							<ErrorBoundary
								fallback={
									<p>
										{ __( 'Could not load Theme Customizer.', 'quotes-dlx' ) }
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
							><ThemeCustomizer /></ErrorBoundary>

						</div>
					</div>
				</div>
			</div>
			<div className="has-admin-container-body__content">
				<div className="has-admin-content-wrapper">
					<div className="has-admin-content-panel">
						<div className="has-admin-content-body">
							<h2 className="has-admin-content-subheading">
								{ __( 'Theme Preview', 'highlight-and-share' ) }
							</h2>
							<p className="description">{ __( 'Please use this section to see a preview of how Highlight and Share will look on the frontend.', 'highlight-and-share' ) }</p>
							<div className="has-admin-component-row">
								{ getPreview() }
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Appearance;
