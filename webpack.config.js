const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const { BannerPlugin, Compilation } = require( 'webpack' );
const path = require( 'path' );
const sass = require( 'sass' );

/**
 * Prepend a short license banner to every emitted .js/.css file.
 *
 * Runs at the very last processAssets stage so it lands after TerserPlugin's
 * minification/comment-extraction step, keeping the extracted *.LICENSE.txt
 * files and their "see .LICENSE.txt" pointer comments intact as a backup.
 *
 * @return {BannerPlugin} Configured plugin instance.
 */
const createLicenseBannerPlugin = () => new BannerPlugin( {
	banner: '/*! Highlight and Share - see ../license.txt for license and copyright information */',
	raw: true,
	entryOnly: false,
	test: /\.(js|css)$/,
	stage: Compilation.PROCESS_ASSETS_STAGE_REPORT,
} );

module.exports = ( env ) => {
	return [
		{
			...defaultConfig,
			module: {
				...defaultConfig.module,
				rules: [ ...defaultConfig.module.rules ],
			},
			mode: env.mode,
			devtool: 'production' === env.mode ? false : 'source-map',
			entry: {
				'has-inline-highlighting': './src/inline-highlighting.js',
				'has-click-to-share': './src/blocks/click-to-share/block.js',
				'has-post-sidebar': [ './src/post-sidebar/index.js', './src/post-sidebar/style.scss' ],
			},
			plugins: [ ...defaultConfig.plugins, createLicenseBannerPlugin() ],
		},
		{
			entry: {
				'has-cts-editor': './src/blocks/editor.scss',
				'has-cts-style': './src/blocks/style.scss',
				'has-admin-style': './src/admin.scss',
				'has-admin-sharing': [ './src/react/Sharing/index.js' ],
				'has-admin-headlines': [ './src/react/Headlines/index.js' ],
				'has-admin-images': [ './src/react/Images/index.js' ],
				'has-admin-emails': [ './src/react/Emails/index.js' ],
				'has-admin-support': [ './src/react/Support/index.js' ],
				'has-email-modal': [ './src/react/EmailModal/index.js', './src/react/EmailModal/style.scss' ],
				'has-themes': [ './src/themes.scss' ],
				'has-shortcode-themes': { import: './src/shortcode-themes.scss' },
				'highlight-and-share': [ './src/frontendjs/highlight-and-share.js' ],
				'has-image-sharing': [ './src/frontendjs/has-image-sharing.js' ],
				'has-cf-turnstile': [ './src/frontendjs/turnstile.js' ],
				'has-headlines': [ './src/headlines.scss' ],
				'has-headline-sharing': [ './src/frontendjs/headline-sharing.js' ],

			},
			mode: env.mode,
			devtool: 'production' === env.mode ? false : 'source-map',
			output: {
				filename: '[name].js',
				sourceMapFilename: '[file].map[query]',
				assetModuleFilename: 'fonts/[name][ext]',
				clean: true,
			},
			resolve: {
				alias: {
					react: path.resolve( 'node_modules/react' ),
					React: path.resolve( 'node_modules/react' ),
					'react-dom': path.resolve( 'node_modules/react-dom' ),
					lodash: path.resolve( 'node_modules/lodash' ),
					'@wordpress/i18n': path.resolve( 'node_modules/@wordpress/i18n' ),
					'@wordpress/element': path.resolve( 'node_modules/@wordpress/element' ),
					'@wordpress/components': path.resolve( 'node_modules/@wordpress/components' ),
					'@wordpress/block-editor': path.resolve( 'node_modules/@wordpress/block-editor' ),
					'@wordpress/hooks': path.resolve( 'node_modules/@wordpress/hooks' ),

				},
			},
			module: {
				rules: [
					{
						test: /\.(js|jsx)$/,
						exclude: /(node_modules|bower_components)/,
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-env', '@babel/preset-react' ],
							plugins: [
								'@babel/plugin-proposal-class-properties',
								'@babel/plugin-transform-arrow-functions',
								'lodash',
							],
						},
					},
					{
						test: /\.scss$/,
						exclude: /(node_modules|bower_components)/,
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
								},
							},
							{
								loader: 'resolve-url-loader',
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true,
									implementation: sass,
								},
							},
						],
					},
					{
						test: /\.css$/,
						include: [
							path.resolve(
								__dirname,
								'node_modules/@wordpress/components/build-style/style.css'
							),
						],
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
								},
							},
							{
								loader: 'sass-loader',
								options: {
									implementation: sass,
								},
							},
						],
					},
					{
						test: /\.(woff2?|ttf|otf|eot|svg)$/,
						include: [ path.resolve( __dirname, 'fonts' ) ],
						exclude: /(node_modules|bower_components)/,
						type: 'asset/resource',
					},
				],
			},
			plugins: [ new RemoveEmptyScriptsPlugin(), new MiniCssExtractPlugin(), new DependencyExtractionWebpackPlugin(), createLicenseBannerPlugin() ],
		},
	];
};

