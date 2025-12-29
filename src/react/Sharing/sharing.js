/**
 * Sharing tab component.
 */

import { __ } from '@wordpress/i18n';

/**
 * Sharing tab interface component.
 *
 * @return {JSX.Element} Sharing tab component.
 */
const Sharing = () => {
	return (
		<div className="has-admin-content-wrapper">
			<div className="has-admin-content-panel">
				<div className="has-admin-content-heading">
					<h1>
						<span className="has-admin-content-heading-text">
							{ __( 'Sharing', 'highlight-and-share' ) }
						</span>
					</h1>
					<p className="description">
						{ __(
							'Configure how and where content can be shared across your site.',
							'highlight-and-share'
						) }
					</p>
				</div>
				<div className="has-admin-content-body">
					<p>Hello World</p>
				</div>
			</div>
		</div>
	);
};

export default Sharing;

