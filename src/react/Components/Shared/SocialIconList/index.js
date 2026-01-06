import { useCallback, useMemo } from 'react';
import { dispatch, useSelect } from '@wordpress/data';
import SocialIconListItem from '../SocialIconListItem';
import SocialIcons from '../../SocialIcons';
import store from '../../../Sharing/Store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useFormContext } from 'react-hook-form';

const SocialIconList = () => {
	// Subscribe to store changes to trigger re-renders when networks update.
	const storeNetworks = useSelect( ( select ) => select( store ).getNetworks(), [] );

	const { setValue } = useFormContext();

	// Get social icons function - this will re-run when storeNetworks changes.
	const { getSocialIcons } = SocialIcons();

	// Memoize networks array to prevent unnecessary recalculations.
	// Recompute when storeNetworks changes (which happens when store is updated).
	const networks = useMemo( () => {
		return getSocialIcons();
	}, [ storeNetworks ] );

	const moveSocialNetwork = useCallback(
		( dragIndex, hoverIndex ) => {
			const dragItem = networks[ dragIndex ];
			const hoverItem = networks[ hoverIndex ];
			// Swap places of dragItem and hoverItem in the networks array.
			const newNetworksArray = [];
			Object.values( storeNetworks ).forEach( ( network, index ) => {
				if ( index !== dragIndex && index !== hoverIndex ) {
					newNetworksArray.push( network );
				} else {
					if ( index === hoverIndex && dragIndex < hoverIndex ) {
						newNetworksArray.push( hoverItem );
						newNetworksArray.push( dragItem );
					}
					if ( index === hoverIndex && dragIndex > hoverIndex ) {
						newNetworksArray.push( dragItem );
						newNetworksArray.push( hoverItem );
					}
				}
			} );
			// Convert array to object (key => value) while preserving order.
			const newNetworks = {};
			newNetworksArray.forEach( ( network ) => {
				newNetworks[ network.slug ?? network.key ] = network;
			} );
			setValue( 'networkOrder', newNetworksArray.map( ( network ) => network.slug ), { shouldDirty: true } );
			dispatch( store ).setNetworks( newNetworks );
		},
		[ networks, storeNetworks ],
	);

	/**
	 * Save the social networks and their orders.
	 */
	// const saveSocialNetworksOrder = () => {
	// 	setSaving( true );

	// 	// Get social networks pruned for Ajax.
	// 	const socialNetworksForAjax = [];
	// 	let order = 0;
	// 	networks.forEach( ( network ) => {
	// 		socialNetworksForAjax.push( {
	// 			slug: network.key ?? network.slug,
	// 			order,
	// 		} );
	// 		order++;
	// 	} );
	// 	sendCommand( 'has_save_social_icon_order', {
	// 		nonce: hasAppearanceAdmin.saveNonce,
	// 		socialNetworks: socialNetworksForAjax,
	// 	} )
	// 		.then( ( response ) => {
	// 			const { data, success } = response.data;
	// 			setSocialNetworks( data );
	// 			if ( success ) {
	// 				setIsSaved( true );
	// 				setTimeout( () => {
	// 					setIsSaved( false );
	// 				}, 3000 );
	// 			}
	// 		} )
	// 		.catch( ( error ) => {
	// 		} ).then( ( ) => {
	// 			setSaving( false );
	// 		} );
	// };

	return (
		<>
			<DndProvider backend={ HTML5Backend }>
				<ul className="has-admin-theme-reorder-list">{ networks.map( ( network ) => {
					if ( ! network.enabled ) {
						return null;
					}
					return (
						<SocialIconListItem
							key={ `${ network.key ?? network.slug }-item` }
							listItemKey={ network.key ?? network.slug }
							className={ network.className }
							styles={ network.styles }
							icon={ network.icon }
							index={ network.index }
							moveSocialNetwork={ moveSocialNetwork }
						/>
					);
				} ) }
				</ul>
			</DndProvider>
		</>
	);
};

export default SocialIconList;
