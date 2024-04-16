const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const path = require( 'path' );
module.exports = ( env ) => {
	return [
		{
			...defaultConfig,
			module: {
				...defaultConfig.module,
				rules: [ ...defaultConfig.module.rules ],
			},
			mode: env.mode,
			devtool: 'source-map',
		},
		{
			entry: {
				'has-cts-editor': './src/blocks/editor.scss',
				'has-cts-style': './src/blocks/style.scss',
				'has-admin-style': './src/admin.scss',
				'has-admin-settings': [ './src/react/Settings/index.js' ],
				'has-admin-appearance': [ './src/react/Appearance/index.js' ],
				'has-admin-block-editor': [ './src/react/BlockEditor/index.js' ],
				'has-admin-emails': [ './src/react/Emails/index.js' ],
				'has-admin-support': [ './src/react/Support/index.js' ],
				'has-email-modal': [ './src/react/EmailModal/index.js', './src/react/EmailModal/style.scss' ],
				'has-themes': [ './src/themes.scss' ],
				'has-gfont-josefin-sans': { import: './src/scss/fonts/josefin-sans.scss' },
				'has-gfont-karla': { import: './src/scss/fonts/karla.scss' },
				'has-gfont-lato': { import: './src/scss/fonts/lato.scss' },
				'has-gfont-montserrat': { import: './src/scss/fonts/montserrat.scss' },
				'has-gfont-open-sans': { import: './src/scss/fonts/open-sans.scss' },
				'has-gfont-playfair-display': { import: './src/scss/fonts/playfair-display.scss' },
				'has-gfont-raleway': { import: './src/scss/fonts/raleway.scss' },
				'has-gfont-roboto': { import: './src/scss/fonts/roboto.scss' },
				'has-gfont-source-sans-pro': { import: './src/scss/fonts/source-sans-pro.scss' },
				'highlight-and-share': [ './src/frontendjs/highlight-and-share.js' ],

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
							'sass-loader',
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
			plugins: [ new RemoveEmptyScriptsPlugin(), new MiniCssExtractPlugin() ],
		},
	];
};

