# Highlight and Share

![dlxplugins-1673217257478-1x](https://user-images.githubusercontent.com/636521/211222507-1b95d00e-e7bb-489c-9684-2ee01e61094f.jpeg)

> Highlight and Share is a free WordPress plugin that displays social networks when a user selects text, clicks on inline highlighted text, or uses the robust Click to Share block.

<img src="https://img.shields.io/badge/node-18.12.1-green" /> <img src="https://img.shields.io/badge/NPM-8.19.2-blue" /> <img src="https://img.shields.io/badge/Webpack-5.74.0-orange" /> <img src="https://img.shields.io/badge/webpack--cli-4.10.0-orange" /> <img src="https://img.shields.io/badge/%40wordpress%2Fscripts-%5E23.3.0-green" />

## Quick Links

For an in-depth overview of Highlight and Share, <a href="https://berrypress.com/docs/highlight-and-share/">please check out the documentation</a>.

* <a href="https://wordpress.org/support/plugin/highlight-and-share/">Get Support or Request a Feature</a>.
* <a href="https://wordpress.org/plugins/highlight-and-share/">Visit the Plugin on WordPress.org</a>.
* <a href="https://berrypress.com/docs/highlight-and-share/">Visit the Plugin Documentation</a>.

## Authorship

Highlight and Share was created by Ronald Huereca and published by DLX Plugins. In July 2026, the plugin was taken over by [BerryPress](https://berrypress.com/), which now maintains and develops it. 

## Developers

1. Clone the `development` branch locally.
2. Run `npm install --legacy-peer-deps` to install the development scripts (the flag is required because of a peer dependency conflict between React and `@wordpress/components`). A `package-lock.json` is included so builds use the same dependency versions as documented in `license.txt`.
3. Run `npm run start` to start the build scripts.
4. Run `npm run build` to do a production build.
5. Run `grunt` to create a plugin ZIP file.

Perform a Pull Request against the `development` branch.

### Location of Block Scripts

The location of the Click to Share block is: `src/blocks/click-to-share/`

```
click-to-share  
├─ block.js     
├─ block.json   
└─ edit.js      
```

For the PHP initialization, see `php/Blocks.php`.

### Location of Admin Scripts

Most of the admin script location is in `src/react`.

Each admin tab is separated in separate scripts.

1. Settings tab: `src/react/Settings`
2. Appearance tab: `src/react/Appearance`
3. Block Editor tab: `src/react/BlockEditor`
4. Emails tab: `src/react/Emails`

Webpack: 

```js
entry: {
	'has-cts-editor': './src/blocks/editor.scss',
	'has-cts-style': './src/blocks/style.scss',
	'has-admin-style': './src/admin.scss',
	'has-admin': [ './src/admin.js' ],
	'has-admin-settings': [ './src/react/Settings/index.js' ],
	'has-admin-appearance': [ './src/react/Appearance/index.js' ],
	'has-admin-block-editor': [ './src/react/BlockEditor/index.js' ],
	'has-admin-emails': [ './src/react/Emails/index.js' ],
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
```

The admin appearance tab uses context, which is in `src/react/Appearance/index.js`

The main components are in: `src/react/Components`:

```
Components                    
├─ BackgroundSelector         
│  └─ index.js                
├─ ColorPicker                
│  └─ index.js                
├─ Dimensions                 
│  ├─ editor.scss             
│  └─ index.js                
├─ DimensionsBlock            
│  ├─ editor.scss             
│  └─ index.js                
├─ ErrorBoundary              
│  └─ index.js                
├─ GradientGenerator          
│  └─ index.js                
├─ GradientPicker             
│  └─ index.js                
├─ GradientSync               
│  └─ index.js                
├─ Icons                      
│  ├─ AtIcon.js               
│  ├─ Circle.js               
│  ├─ CircularExplanation.js  
│  ├─ CircularInfo.js         
│  ├─ CircularQuestion.js     
│  ├─ CodeBranchIcon.js       
│  ├─ ColorPalette.js         
│  ├─ CopyIcon.js             
│  ├─ Ellipsis.js             
│  ├─ FacebookIcon.js         
│  ├─ FlaskIcon.js            
│  ├─ Gear.js                 
│  ├─ Home.js                 
│  ├─ KeyIcon.js              
│  ├─ LinkIcon.js             
│  ├─ MenuIcon.js             
│  ├─ NewWindow.js            
│  ├─ Preview.js              
│  ├─ QuoteIcon.js            
│  ├─ QuotesIcon.js           
│  ├─ Spinner.js              
│  ├─ VialIcon.js             
│  ├─ edit.js                 
│  ├─ paintbrush.js           
│  ├─ settings.js             
│  └─ twitter.js              
├─ Loader                     
│  └─ index.js                
├─ Notice                     
│  └─ index.js                
├─ PreviewSocialIconList      
│  └─ index.js                
├─ PreviewSocialIconListItem  
│  └─ index.js                
├─ SocialIconList             
│  └─ index.js                
├─ SocialIconListItem         
│  └─ index.js                
├─ SocialIcons                
│  └─ index.js                
├─ SocialNetworkColorsTabs    
│  └─ index.js                
├─ TabColorPickers            
│  └─ index.js                
├─ ThemeCustomizer            
│  └─ index.js                
├─ Typography                 
└─ unit-picker                

```

### Location of CSS

Admin CSS is at: `src/admin.scss`

Frontend CSS is at: `src/themes.scss`

Font CSS is at: `src/scss/fonts`

### Frontend JS

The frontend JS can be found at: `src/frontendjs/highlight-and-share.js`

### Build Directories

The block JS and CSS can be found in the `build` folder.

The admin JS and CSS can be found in the `dist` folder.
