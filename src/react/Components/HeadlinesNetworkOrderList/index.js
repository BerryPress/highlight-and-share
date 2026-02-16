/**
 * Sortable list of headline networks for reordering.
 */

import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames';
import HeadlinesNetworkIcon from '../HeadlinesNetworkIcon';
import { __ } from '@wordpress/i18n';

const ITEM_TYPE = 'headlinesNetwork';

const HeadlinesNetworkOrderItem = ( { network, index, moveNetwork } ) => {
	const ref = useRef( null );

	const [ { isDragging }, dragRef ] = useDrag( {
		type: ITEM_TYPE,
		item: { index },
		collect: ( monitor ) => ( {
			isDragging: monitor.isDragging(),
		} ),
	} );

	const [ { isOver }, dropRef ] = useDrop( {
		accept: ITEM_TYPE,
		drop: ( item ) => {
			if ( item.index !== index ) {
				moveNetwork( item.index, index );
			}
		},
		collect: ( monitor ) => ( {
			isOver: monitor.isOver(),
		} ),
	} );

	const dragDropRef = ( node ) => {
		dragRef( dropRef( node ) );
	};

	const classes = classNames( 'has-headlines-order-item', {
		'is-dragging': isDragging,
		'is-over': isOver,
	} );

	return (
		<li ref={ dragDropRef } className={ classes }>
			<span className="has-headlines-order-handle" aria-hidden="true" />
			<span className="has-headlines-order-icon">
				<HeadlinesNetworkIcon slug={ network.slug } />
			</span>
			<span className="has-headlines-order-label">{ network.label || network.slug }</span>
		</li>
	);
};

const HeadlinesNetworkOrderList = ( { networks, moveNetwork } ) => {
	if ( ! networks || networks.length === 0 ) {
		return (
			<p className="description">
				{ __( 'Enable at least one network in the Social Networks panel to reorder.', 'highlight-and-share' ) }
			</p>
		);
	}

	return (
		<ul className="has-headlines-order-list">
			{ networks.map( ( network, index ) => (
				<HeadlinesNetworkOrderItem
					key={ network.slug }
					network={ network }
					index={ index }
					moveNetwork={ moveNetwork }
				/>
			) ) }
		</ul>
	);
};

export default HeadlinesNetworkOrderList;
