import { useCallback, useMemo } from 'react';
import { dispatch, useSelect } from '@wordpress/data';
import SocialIconListItem from '../SocialIconListItem';
import SocialIcons from '../../SocialIcons';
import store from '../../../Sharing/Panels/SocialNetworksPanel/Store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useFormContext } from 'react-hook-form';

const SocialIconList = () => {
	// Subscribe to store changes to trigger re-renders when networks update.
	const storeNetworks = useSelect( ( select ) => select( store ).getNetworks(), [] );

	const { setValue, getValues } = useFormContext();

	const networkOrderFormValue = getValues( 'networkOrder' );

	// Get social icons function - this will re-run when storeNetworks changes.
	const { getSocialIcons } = SocialIcons();

	// Memoize networks array to prevent unnecessary recalculations.
	// Recompute when storeNetworks changes (which happens when store is updated).
	const networks = useMemo( () => {
		return getSocialIcons();
	}, [ storeNetworks ] );

	const networksToShow = useMemo( () => {
		const networkOrder = getValues( 'networkOrder' );
		return Object.values( networkOrder ).map( ( networkSlug ) => networks.find( ( network ) => {
			return network.key === networkSlug;
		} ) );
	}, [ networks, networkOrderFormValue ] );

	const moveSocialNetwork = useCallback(
		( dragIndex, hoverIndex ) => {
			const networkOrder = getValues( 'networkOrder' );
			const order = Array.isArray( networkOrder )
				? [ ...networkOrder ]
				: [ ...Object.values( networkOrder ) ];
			const [ removed ] = order.splice( dragIndex, 1 );
			order.splice( hoverIndex, 0, removed );
			setValue( 'networkOrder', order, { shouldDirty: true } );
			// Sync store with same order.
			const newNetworks = {};
			order.forEach( ( slug ) => {
				const network = storeNetworks[ slug ];
				if ( network ) {
					newNetworks[ network.key ?? network.slug ] = network;
				}
			} );
			dispatch( store ).setNetworks( newNetworks );
		},
		[ getValues, setValue, storeNetworks ],
	);

	return (
		<>
			<DndProvider backend={ HTML5Backend }>
				<ul className="has-admin-theme-reorder-list">{ networksToShow.map( ( network, listIndex ) => {
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
							index={ listIndex }
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
