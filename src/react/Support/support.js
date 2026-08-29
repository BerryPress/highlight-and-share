import React, { useState, Suspense, useRef, useEffect } from 'react';
import { __, _x } from '@wordpress/i18n';
import { escapeAttribute } from '@wordpress/escape-html';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import {
	TextControl,
	Button,
	RangeControl,
	ToggleControl,
	RadioControl,
} from '@wordpress/components';
import { Youtube, Bookmark, Users2, Mail, PlugZap, GraduationCap } from 'lucide-react';
import ErrorBoundary from '../Components/ErrorBoundary';
import Notice from '../Components/Notice';
import CircularExclamationIcon from '../Components/Icons/CircularExplanation';
import Spinner from '../Components/Icons/Spinner';
import sendCommand from '../Utils/SendCommand';
import Loader from '../Components/Loader';
import { openModal } from '../../utils/modal';

const Support = ( props ) => {
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Support Tab.', 'highlight-and-share' ) }
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
					<div className="has-admin-container-body__content">
						<Loader
							title={ __( 'Support', 'highlight-and-share' ) }
							label={ __( 'Loading…', 'highlight-and-share' ) }
							color="var(--wp-admin-theme-color)"
						/>
					</div>
				}
			>
				<Interface { ...props } />
			</Suspense>
		</ErrorBoundary>
	);
};

const Interface = ( props ) => {
	useEffect( () => {
		const handleVideoLinkClick = ( event ) => {
			const trigger = event.target.closest( '[data-video-modal]' );
			if ( null === trigger ) {
				return;
			}
			event.preventDefault();
			openModal( {
				type: 'iframe',
				src: trigger.getAttribute( 'href' ),
				title: __('Help and Support', 'highlight-and-share' ),
				className: 'has-modal-video',
			} );
		};
		document.addEventListener( 'click', handleVideoLinkClick );
		return () => {
			document.removeEventListener( 'click', handleVideoLinkClick );
		};
	}, [] );
	return (
		<>
			<div className="has-admin-container-body__content">
				<div className="has-admin-content-wrapper">
					<div className="has-admin-content-panel">
						<div className="has-admin-content-heading">
							<h1>
								<span className="has-admin-content-heading-text">
									{ __( 'Help and Support', 'highlight-and-share' ) }
								</span>
							</h1>
							<p className="description">
								{ __(
									'Get help and support for Highlight and Share. If you like the plugin, please consider leaving a review. Each review helps out a lot!',
									'highlight-and-share'
								) }
							</p>
						</div>
						<div className="has-admin-content-body">
							<h2 className="has-admin-content-subheading">
								{ __( 'Video Overview and Tutorials', 'highlight-and-share' ) }
							</h2>
							<p className="description">
								{ __(
									'Please visit the playlist below to view a video overview of Highlight and Share.',
									'highlight-and-share'
								) }
							</p>
							<div className="has-admin-component-row">
								<a
									data-video-modal
									href="https://www.youtube.com/embed/videoseries?list=PLw2fSxxzure64RVDMsBd1DzU87YY0pRTb"
								>
									<img
										src={ `${ hasSupportAdmin.videoPlayImg }` }
										width={ hasSupportAdmin.videoPlayImgWidth }
										height={ hasSupportAdmin.videoPlayImgHeight }
										alt={ __(
											'Video Overview and Tutorials',
											'highlight-and-share'
										) }
										style={ { border: '2px solid #DDD' } }
									/>
								</a>
							</div>
							<div className="has-admin-component-row has-admin-component-row-button">
								<Button
									className="has-button has-button-edit"
									href="https://www.youtube.com/playlist?list=PLw2fSxxzure64RVDMsBd1DzU87YY0pRTb"
									target="_blank"
									rel="noopener noreferrer"
									icon={ <Youtube /> }
								>
									{ __( 'View the YouTube Playlist', 'highlight-and-share' ) }
								</Button>
							</div>
						</div>
						<div className="has-admin-content-body">
							<h2 className="has-admin-content-subheading">
								{ __( 'Documentation and Overviews', 'highlight-and-share' ) }
							</h2>
							<p className="description">
								{ __(
									'The documentation for Highlight and Share is designed to get you up and running fast.',
									'highlight-and-share'
								) }
							</p>
							<div className="has-admin-component-row has-admin-component-row-button">
								<Button
									className="has-button has-button-edit"
									href="https://docs.dlxplugins.com/v/highlight-and-share/"
									target="_blank"
									rel="noopener noreferrer"
									icon={ <Bookmark /> }
								>
									{ __( 'Visit the Documentation', 'highlight-and-share' ) }
								</Button>
							</div>
						</div>
						<div className="has-admin-content-body">
							<h2 className="has-admin-content-subheading">
								{ __( 'Support and Help', 'highlight-and-share' ) }
							</h2>
							<p className="description">
								{ __(
									'Support for Highlight and Share is provided through developer volunteers. Please visit the support forums to get help.',
									'highlight-and-share'
								) }
							</p>
							<div className="has-admin-component-row has-admin-component-row-button">
								<Button
									className="has-button has-button-edit"
									href="https://wordpress.org/support/plugin/highlight-and-share/"
									target="_blank"
									rel="noopener noreferrer"
									icon={ <Users2 /> }
								>
									{ __( 'Visit the Support Forums', 'highlight-and-share' ) }
								</Button>
								<Button
									className="has-button has-button-edit"
									href="https://dlxplugins.com/support/"
									target="_blank"
									rel="noopener noreferrer"
									icon={ <Mail /> }
								>
									{ __( 'Use the Support Form', 'highlight-and-share' ) }
								</Button>
							</div>
						</div>
						<div className="has-admin-content-body">
							<h2 className="has-admin-content-subheading">
								{ __( 'More from DLX Plugins', 'highlight-and-share' ) }
							</h2>
							<p className="description">
								{ __(
									'Check out more plugins and and plugin tutorials from DLX Plugins.',
									'highlight-and-share'
								) }
							</p>
							<div className="has-admin-component-row has-admin-component-row-button">
								<Button
									className="has-button has-button-edit"
									href="https://dlxplugins.com/plugins/"
									target="_blank"
									rel="noopener noreferrer"
									icon={ <PlugZap /> }
								>
									{ __( 'View More Plugins', 'highlight-and-share' ) }
								</Button>
								<Button
									className="has-button has-button-edit"
									href="https://dlxplugins.com/tutorials/"
									target="_blank"
									rel="noopener noreferrer"
									icon={ <GraduationCap style={ { color: '#000', stroke: '#000' } } /> }
								>
									{ __( 'View Plugin Tutorials', 'highlight-and-share' ) }
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Support;
