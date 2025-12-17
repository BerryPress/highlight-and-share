import React from 'react';

const TextInsertIcon = ( { width = 16, height = 16, fill = '#333333', ...props } ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			style={ {
				enableBackground: 'new 0 0 512 512',
			} }
			xmlSpace="preserve"
			width={ width }
			height={ height }
			{ ...props }
		>
			<path
				fill={ fill }
				d="M0 0v173.419h49.548V49.548h123.871V0zM338.581 0v49.548h123.871v123.871H512V0zM462.452 338.581v123.871H338.581V512H512V338.581zM49.548 462.452V338.581H0V512h173.419v-49.548zM280.774 231.226v-90.839h-49.548v90.839h-90.839v49.548h90.839v90.839h49.548v-90.839h90.839v-49.548z"
			/>
		</svg>
	);
};

export default TextInsertIcon;
