import styled from 'styled-components';

const IconCircle = ( { stroke = '#000', width = 16, height = 16, gradient = '', className = '', ...props } ) => {
	const Circle = styled.div`
		width: ${ width }px;
		height: ${ height }px;
		background-image: ${ gradient.replace( ';', '' ) };
		border-radius: 50%;
		margin-right: 6px;
	`;
	return (
		<Circle className={ `quotes dlx quotes-dlx-icon-circle ${ className }` } { ...props } />
	);
};

export default IconCircle;
