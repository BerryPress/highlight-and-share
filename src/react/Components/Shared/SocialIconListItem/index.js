import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames';

const SocialIconListItem = ( { listItemKey, className, styles, index, icon, moveSocialNetwork } ) => {
	// useDrag - the list item is draggable
	const [ { isDragging }, dragRef ] = useDrag( {
		type: 'socialItem',
		item: { index },
		collect: ( monitor ) => ( {
			isDragging: monitor.isDragging(),
		} ),
	} );

	// useDrop - the list item is also a drop area
	const [ spec, dropRef ] = useDrop( {
		accept: 'socialItem',
		drop: ( item, monitor ) => {
			if ( ! monitor.didDrop() ) {
				if ( item.index !== index ) {
					moveSocialNetwork( item.index, index );
				}
			}
		},
		collect: ( monitor ) => ( {
			canDrop: monitor.canDrop(),
			isOver: monitor.isOver(),
		} ),
	} );
	// Join the 2 refs together into one (both draggable and can be dropped on)
	const ref = useRef( null );
	const dragDropRef = dragRef( dropRef( ref ) );
	const classes = classNames( className, {
		'is-dragging': isDragging,
		'can-drop': spec.canDrop,
		'is-over': spec.isOver,
	} );
	return (
		<li ref={ dragDropRef } key={ listItemKey } className={ classes } style={ styles }>
			{ icon }
		</li>
	);
};

export default SocialIconListItem;
