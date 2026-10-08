import React from 'react';
import { useInstanceId } from '@wordpress/compose';

const TextAreaControl = ( props ) => {
	const { label, value, onChange, className, innerRef } = props;

	const uniqueId = useInstanceId( TextAreaControl, 'has-textarea-control' );

	const handleChange = ( event ) => {
		onChange( event.target.value );
	};

	return (
		<div className={ className }>
			<label className="components-base-control__label" htmlFor={ uniqueId }>
				{ label }
			</label>
			<textarea
				className="components-textarea-control__input"
				id={ uniqueId }
				value={ value }
				onChange={ handleChange }
				ref={ innerRef }
			/>
		</div>
	);
};

export default TextAreaControl;
