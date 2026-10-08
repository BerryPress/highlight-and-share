import React from 'react';
import { BlockPreview as WPPreview } from '@wordpress/block-editor';

const BlockPreview = ( {
	blocks,
	viewportWidth = 1200,
	minHeight,
	additionalStyles = [],
} ) => {
	return (
		<WPPreview
			blocks={ blocks }
			viewportWidth={ viewportWidth }
			minHeight={ minHeight }
			additionalStyles={ additionalStyles }
		/>
	);
}
export default BlockPreview;