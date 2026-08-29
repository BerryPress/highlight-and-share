/**
 * Minimal, dependency-free modal used to display an iframe (email form, video)
 * or an inline template (Mastodon instance prompt) in an overlay.
 */

let activeModal = null;

/**
 * Open a modal.
 *
 * @param {Object}        options                      Modal options.
 * @param {string}        [options.type]               'iframe' or 'inline'.
 * @param {string|Element} options.src                 Iframe URL, or a selector/element for inline content.
 * @param {string}        [options.className]          Extra class name(s) added to the dialog element.
 * @param {string}        [options.title]              Accessible label for the dialog.
 * @param {boolean}       [options.closeOnOverlayClick] Whether clicking the overlay closes the modal.
 * @param {Function}      [options.onOpen]             Callback invoked with the modal instance once it is in the DOM.
 *
 * @return {{close: Function, dialog: Element, content: Element}} The modal instance.
 */
export function openModal( {
	type = 'iframe',
	src = '',
	className = '',
	title,
	closeOnOverlayClick = true,
	onOpen,
} = {} ) {
	// Only one modal should be visible at a time.
	if ( null !== activeModal ) {
		activeModal.close();
	}

	const overlay = document.createElement( 'div' );
	overlay.className = 'has-modal-overlay';

	const dialog = document.createElement( 'div' );
	dialog.className = ( 'has-modal-dialog ' + className ).trim();
	dialog.setAttribute( 'role', 'dialog' );
	dialog.setAttribute( 'aria-modal', 'true' );
	if ( '' !== title ) {
		dialog.setAttribute( 'aria-label', title );
	}

	const closeButton = document.createElement( 'button' );
	closeButton.type = 'button';
	closeButton.className = 'has-modal-close';
	closeButton.setAttribute( 'aria-label', 'Close' );
	closeButton.innerHTML = '&times;';

	const content = document.createElement( 'div' );
	content.className = 'has-modal-content';

	// Track an element moved into the modal so it can be restored on close.
	let movedElement = null;
	let movedElementParent = null;
	let movedElementNextSibling = null;

	if ( 'iframe' === type ) {
		const iframe = document.createElement( 'iframe' );
		iframe.className = 'has-modal-iframe';
		iframe.setAttribute( 'src', src );
		iframe.setAttribute( 'frameborder', '0' );
		content.appendChild( iframe );
	} else if ( 'inline' === type ) {
		const sourceEl = 'string' === typeof src ? document.querySelector( src ) : src;
		if ( null !== sourceEl ) {
			movedElement = sourceEl;
			movedElementParent = sourceEl.parentNode;
			movedElementNextSibling = sourceEl.nextSibling;

			sourceEl.removeAttribute( 'aria-hidden' );
			sourceEl.style.display = 'block';
			content.appendChild( sourceEl );
		}
	}

	dialog.appendChild( closeButton );
	dialog.appendChild( content );
	overlay.appendChild( dialog );

	const handleKeydown = ( event ) => {
		if ( 'Escape' === event.key ) {
			close();
		}
	};

	const handleOverlayClick = ( event ) => {
		if ( event.target === overlay ) {
			close();
		}
	};

	function close() {
		if ( null === overlay.parentNode ) {
			return;
		}

		document.removeEventListener( 'keydown', handleKeydown );

		// Restore any element that was moved into the modal.
		if ( null !== movedElement ) {
			movedElement.style.display = 'none';
			movedElement.setAttribute( 'aria-hidden', 'true' );
			if ( null !== movedElementNextSibling ) {
				movedElementParent.insertBefore( movedElement, movedElementNextSibling );
			} else {
				movedElementParent.appendChild( movedElement );
			}
		}

		overlay.remove();
		document.body.classList.remove( 'has-modal-open' );

		if ( activeModal === instance ) {
			activeModal = null;
		}
	}

	closeButton.addEventListener( 'click', close );
	if ( closeOnOverlayClick ) {
		overlay.addEventListener( 'click', handleOverlayClick );
	}
	document.addEventListener( 'keydown', handleKeydown );

	document.body.appendChild( overlay );
	document.body.classList.add( 'has-modal-open' );

	const instance = { close, dialog, content };
	activeModal = instance;

	if ( 'function' === typeof onOpen ) {
		onOpen( instance );
	}

	return instance;
}
