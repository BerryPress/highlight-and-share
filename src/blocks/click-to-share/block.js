import metadata from './block.json';
const { registerBlockType, createBlock, rawHandler } = wp.blocks;
const { InnerBlocks, RichText } = wp.blockEditor;
const { create, toHTMLString } = wp.richText;
import { __ } from '@wordpress/i18n';
import './block-filters';

// Import JS
import edit from './edit';
const hasIcon = (
	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share-alt" className="svg-inline--fa fa-share-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#F68105" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path></svg>
);

const variations = [
	{
		name: 'dark',
		title: __( 'Click to Share (Dark)', 'highlight-and-share' ),
		attributes: { theme: 'dark' },
	},
	{
		name: 'bold',
		title: __( 'Click to Share (Bold)', 'highlight-and-share' ),
		attributes: { theme: 'bold' },
	},
	{
		name: 'royal',
		title: __( 'Click to Share (Royal)', 'highlight-and-share' ),
		attributes: { theme: 'royal' },
	},
];

export const name = 'has/click-to-share';
registerBlockType( metadata, {
	icon: hasIcon,
	edit,
	variations,

	// Render via PHP
	save() {
		return <InnerBlocks.Content />;
	},
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'bctt/clicktotweet' ],
				transform: ( { tweet, prompt } ) => {
					// Map QuotesDLX attributes to Better Click to Tweet attributes.
					const bcttAttributes = {
						clickText: prompt,
					};
					// Convert tweet string to inner blocks.
					const shareTextInnerBlocks = rawHandler( { HTML: tweet } );

					return createBlock( 'has/click-to-share', bcttAttributes, shareTextInnerBlocks );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/pullquote' ],
				transform: ( { value } ) => {
					return createBlock( 'has/click-to-share', {
						customShareText: value,
					}, [ createBlock( 'core/paragraph', { content: value } ) ] );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				isMultiBlock: true,
				// eslint-disable-next-line no-unused-vars
				transform: ( paragraphs ) => {
					const paragraphContent = [];
					const content = paragraphs
						.map( ( attributes ) => {
							paragraphContent.push( createBlock( 'core/paragraph', { content: attributes.content } ) );
							return attributes.content;
							// eslint-disable-next-line quotes
						} )
						.join( '\r\n\r\n' );
					// Trim spacing at end.
					content.replace( '/s+$/', '' );
					return createBlock( 'has/click-to-share', {
						customShareText: content,
					}, paragraphContent );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/quote' ],
				transform: ( { value, align }, innerBlocks ) => {
					return createBlock( 'has/click-to-share', {
						customShareText: value,
						align,
					}, innerBlocks );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/verse' ],
				transform: ( { content } ) => {
					return createBlock( 'has/click-to-share', {
						customShareText: content,
					}, [ createBlock( 'core/paragraph', { content } ) ] );
				},
			},
			{
				type: 'block',
				blocks: [ 'coblocks/click-to-tweet' ],
				transform: ( { buttonText, content } ) => {
					return createBlock( 'mediaron/quotes-dlx', {
						customShareText: content,
						clickText: buttonText,
					}, [ createBlock( 'core/paragraph', { content } ) ] );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/pullquote' ],
				isMatch: ( {}, block ) => {
					return block.innerBlocks.every(
						( { name } ) => name === 'core/paragraph'
					);
				},
				transform: (
					{},
					innerBlocks
				) => {
					const value = innerBlocks
						.map( ( { attributes } ) => `${ attributes.content }` )
						.join( '<br>' );
					return createBlock( 'core/pullquote', {
						value,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/quote' ],
				isMatch: ( {}, block ) => {
					return block.innerBlocks.every(
						( { name } ) => name === 'core/paragraph'
					);
				},
				transform: (
					{},
					innerBlocks
				) => {
					return createBlock( 'core/quote', {
					}, innerBlocks );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: (
					{},
					innerBlocks
				) => {
					const content = [];
					innerBlocks.forEach( ( { attributes } ) => {
						content.push( createBlock( 'core/paragraph', { content: attributes.content } ) );
					} );
					return content;
				},
			},
		],
	},
} );
