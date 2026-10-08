# Admin Interface Reorganization

**Priority:** 2  
**Status:** In progress (Phase 10 Documentation remaining)  
**Related Section:** Plan Section 2.11

## Overview

Reorganize the admin interface to consolidate three admin panel screens (Settings, Appearance, Block Editor) into a single "Sharing" tab using collapsible panels. This reduces duplication, improves discoverability, and prepares for the new Headlines tab.

## Goals

- Consolidate Settings, Appearance, and Block Editor tabs into single "Sharing" tab
- Create shared React components for common UI patterns
- Improve UX with collapsible panels and real-time preview
- Prepare structure for Headlines tab
- Maintain backward compatibility

## New Tab Structure

### Sharing Tab (Consolidated)

The new "Sharing" tab will contain the following collapsible panels:

#### 1. Social Networks Panel (Default: Expanded)
- **Content:** Network selection with checkboxes and gear icons
- **Features:**
  - Two-column grid layout (responsive: folds to one column)
  - Checkbox to enable/disable each network
  - Gear icon opens popover for network-specific settings
  - Visual indicator for enabled networks (dark gray background)
  - Clicking on box will check or uncheck the entire network
- **Source:** Settings tab → Social Networks section
- **Popover (TODO):**
  - Contains labels and tooltips for each network
  - Network-specific settings (e.g., Twitter username, WhatsApp endpoint)
  - Color customizations moved to Appearance panel

#### 2. Display Rules Panel (Default: Collapsed)
- **Content:**
  - Enabled post types selection
  - Content areas using ToggleControl switches (is single, is excerpt)
- **Source:** Settings tab → Display Rules section

#### 3. Appearance Panel (Default: Collapsed)
- **Content:** Everything from `src/react/Appearance/index.js`
  - Theme selection and customizer
  - Icon colors customization
  - Theme options (orientation, tooltips, etc.)
  - Network reordering
- **Source:** Appearance tab (entire tab)

#### 4. Preview Panel (Default: Expanded)
- **Content:** Real-time preview of enabled networks
- **Features:**
  - Updates in real-time as settings change
  - Shows currently enabled networks
  - Visual representation of how sharing will appear

#### 5. Block Editor Panel (Default: Collapsed)
- **Content:** Block Editor settings
- **Source:** Block Editor tab (split from full tab)

#### 6. Inline Highlighting Panel (Default: Collapsed)
- **Content:** Inline highlighting settings
- **Source:** Block Editor tab (split from full tab)

#### 7. Advanced Panel (Default: Collapsed)
- **Content:**
  - Selectors (JS classes, IDs, elements)
  - Advanced configuration options
- **Source:** Settings tab → Advanced section

## State Management

### Overall State Management
- **Custom Store:** Use `@wordpress/data` to create a custom store specifically for Sharing tab state
- **Store Name:** `has/sharing` (or similar specific naming to avoid conflicts with future features like Headlines)
- **Purpose:** Manage Sharing tab state like panel visibility, network data, preview state, etc.
- **Benefits:** Centralized state management, easy to access from any component, follows WordPress patterns, isolated from other features

### Form State Management
- **React Hook Form:** Use `react-hook-form` for all form state management
- **Why React Hook Form:**
  - Excellent handling of dirty/non-dirty state (perfect for unsaved changes indicator)
  - Easy to configure error messages and validation
  - Already used extensively in existing codebase
  - Performance optimized with minimal re-renders
- **Integration:** Each panel can use its own form instance, or share a single form instance across the Sharing tab

### Panel Expand/Collapse State
- **Storage:** Use WordPress Core method (user meta)
- **Default Expanded:** Social Networks and Preview panels
- **Default Collapsed:** All other panels
- **Persistence:** Remember user's last state per panel
- **Implementation:** Store in `@wordpress/data` store, sync with user meta on toggle

### Unsaved Changes Indicator
- **Green Dot:** Shown when there are unsaved changes (from React Hook Form `isDirty` state)
- **Red Dot:** Shown when there are form validation errors (from React Hook Form `errors` state)
- **Location:** Next to panel title (as shown in wireframe)
- **Behavior:** Red dot persists until error is resolved and user drills down to it
- **Implementation:** Use React Hook Form's `useFormState` hook to track `isDirty` and `errors`

## Responsive Design

- **Desktop:** Two-column grid layout for Social Networks
- **Mobile/Tablet:** Folds to one-column grid
- **Panels:** Stack vertically on smaller screens

## Options Audit

### Current Options Structure

#### Settings Tab Options

**Display Section:**
- `enableMobile` - Enable on Mobile Devices
- `enableContent` - Enable on Post Content
- `enableExcerpt` - Enable on Post Excerpt
- `enableComments` - Enable for Comments Section

**Text Settings Section:**
- `sharingPrefix` - Sharing Text Before
- `sharingSuffix` - Sharing Text After

**Social Networks Section:**
- Network toggles: `showTwitter`, `showFacebook`, `showWhatsApp`, `showReddit`, `showTelegram`, `showLinkedin`, `showXing`, `showCopy`, `showMastodon`, `showTumblr`, `showWebshare`, `showThreads`, `showBluesky`, `enableEmails`
- Network-specific settings (per network when enabled):
  - `{network}Label` - Label text
  - `{network}Tooltip` - Tooltip text
  - `twitter` - Twitter username
  - `enableHashtags` - Enable Twitter hashtags
  - `whatsappApiEndpoint` - WhatsApp endpoint (app/web)
  - `whatsappCanShareUrl` - WhatsApp can share URL
  - `mastodonLabel` / `mastodonTooltip` - Mastodon specific

**Advanced Section:**
- `jsContent` - CSS Class Selectors
- `elementContent` - HTML Element Selectors
- `idContent` - CSS ID Selectors
- `wrapperClasses` - Wrapper CSS Classes
- `shortlinks` - Enable Shortlinks

#### Appearance Tab Options

**Reorder Sharing Networks:**
- Network order (drag and drop)
- All networks shown (enabled/disabled)

**Theme Selection and Customizer:**
- Theme selection (default, custom, etc.)
- Theme options (orientation, tooltips, colors, etc.)
- Icon colors per network

#### Block Editor Tab Options

**Block Settings:**
- `enableBlocks` - Enable Blocks

**Adobe Font Settings:**
- `enableAdobeFonts` - Enable Adobe Fonts
- `adobeProjectId` - Adobe Fonts Project ID
- `adobeFonts` - Selected Adobe Fonts

**Inline Highlighting:**
- `enableInlineHighlighting` - Enable Inline Highlighting
- `inlineHighlightBackgroundColor` - Background Color
- `inlineHighlightBackgroundColorHover` - Background Color Hover
- `inlineHighlightTextColor` - Text Color
- `inlineHighlightTextColorHover` - Text Color Hover
- `inlineHighlightTooltipsText` - Tooltip Text
- `inlineHighlightShowTooltips` - Show Tooltips
- `inlineHighlightTooltipsBackgroundColor` - Tooltip Background Color
- `inlineHighlightTooltipsTextColor` - Tooltip Text Color

### Consolidation Analysis

#### ✅ Can Be Consolidated

1. **Network Labels/Tooltips** → **Social Networks Panel Popover**
   - All `{network}Label` and `{network}Tooltip` options
   - Currently: Scattered across Settings tab (one section per network)
   - New: Consolidated in network settings popover
   - **Benefit:** Single location for all network text customization

2. **Display Rules** → **Display Rules Panel**
   - `enableContent`, `enableExcerpt`, `enableComments`
   - Currently: Settings → Display section
   - New: Display Rules Panel
   - **Benefit:** Clearer organization, matches wireframe

3. **Text Settings** → **Display Rules Panel or Separate Panel**
   - `sharingPrefix`, `sharingSuffix`
   - Currently: Settings → Text Settings section
   - New: Could go in Display Rules or separate "Sharing Text" panel
   - **Recommendation:** Keep in Display Rules Panel (related to how content is shared)

4. **Advanced Selectors** → **Advanced Panel**
   - `jsContent`, `elementContent`, `idContent`, `wrapperClasses`
   - Currently: Settings → Advanced section
   - New: Advanced Panel
   - **Benefit:** Already well-organized, just move to panel

#### ⚠️ Should Remain Separate (Different Concerns)

1. **Network Toggles** → **Social Networks Panel**
   - All `show{Network}` options
   - **Reason:** Core functionality, belongs with network selection UI

2. **Network-Specific Settings** → **Social Networks Panel Popover**
   - `twitter` (username), `enableHashtags`, `whatsappApiEndpoint`, `whatsappCanShareUrl`
   - **Reason:** Network-specific, belongs in popover

3. **Theme/Appearance Options** → **Appearance Panel**
   - All theme customization options
   - **Reason:** Visual customization, separate concern from functionality

4. **Block Editor Settings** → **Block Editor Panel**
   - `enableBlocks`, Adobe Fonts settings
   - **Reason:** Block editor specific, separate concern

5. **Inline Highlighting** → **Inline Highlighting Panel**
   - All inline highlighting options
   - **Reason:** Distinct feature, separate from general sharing

6. **Shortlinks** → **Advanced Panel or Display Rules Panel**
   - `shortlinks`
   - **Recommendation:** Advanced Panel (technical setting)

7. **Mobile Toggle** → **Display Rules Panel**
   - `enableMobile`
   - **Reason:** Display rule, belongs with other display toggles

### Consolidation Opportunities

#### High Priority Consolidations

1. **Network Labels/Tooltips** - Move from individual sections to popover
   - **Impact:** Reduces Settings tab from 14+ network sections to 1 section with popovers
   - **Complexity:** Medium (need to build popover component)

2. **Display Rules Grouping** - Combine Display + Text Settings
   - **Impact:** Better organization, fewer sections
   - **Complexity:** Low (just reorganize)

#### Medium Priority Consolidations

3. **Text Settings Location** - Decide if prefix/suffix belongs in Display Rules or separate
   - **Recommendation:** Display Rules Panel (they affect how text is shared)
   - **Complexity:** Low

#### Low Priority / Keep Separate

4. **Network Toggles** - Keep as-is (core functionality)
5. **Theme Options** - Keep separate (different concern)
6. **Block Editor** - Keep separate (different feature)
7. **Inline Highlighting** - Keep separate (different feature)

### Options Mapping to New Panels

| Current Option | Current Location | New Panel | Notes |
|----------------|------------------|-----------|-------|
| `show{Network}` | Settings → Social Networks | Social Networks Panel | Network toggle checkboxes |
| `{network}Label` | Settings → Social Networks | Social Networks Panel → Popover | Move to popover |
| `{network}Tooltip` | Settings → Social Networks | Social Networks Panel → Popover | Move to popover |
| `twitter` | Settings → Social Networks | Social Networks Panel → Popover | Twitter username |
| `enableHashtags` | Settings → Social Networks | Social Networks Panel → Popover | Twitter-specific |
| `whatsappApiEndpoint` | Settings → Social Networks | Social Networks Panel → Popover | WhatsApp-specific |
| `whatsappCanShareUrl` | Settings → Social Networks | Social Networks Panel → Popover | WhatsApp-specific |
| `enableContent` | Settings → Display | Display Rules Panel | Content area toggle |
| `enableExcerpt` | Settings → Display | Display Rules Panel | Content area toggle |
| `enableComments` | Settings → Display | Display Rules Panel | Content area toggle |
| `enableMobile` | Settings → Display | Display Rules Panel | Mobile toggle |
| `sharingPrefix` | Settings → Text Settings | Display Rules Panel | Text prefix |
| `sharingSuffix` | Settings → Text Settings | Display Rules Panel | Text suffix |
| `jsContent` | Settings → Advanced | Advanced Panel | CSS class selectors |
| `elementContent` | Settings → Advanced | Advanced Panel | HTML element selectors |
| `idContent` | Settings → Advanced | Advanced Panel | CSS ID selectors |
| `wrapperClasses` | Settings → Advanced | Advanced Panel | Wrapper classes |
| `shortlinks` | Settings → Advanced | Advanced Panel | Shortlinks toggle |
| Theme options | Appearance tab | Appearance Panel | All theme settings |
| Network reordering | Appearance tab | Appearance Panel | Drag and drop |
| `enableBlocks` | Block Editor tab | Block Editor Panel | Block enable toggle |
| Adobe Fonts | Block Editor tab | Block Editor Panel | Adobe Font settings |
| Inline Highlighting | Block Editor tab | Inline Highlighting Panel | All inline highlighting options |

## Tab Mapping

| Current Tab | New Location |
|------------|--------------|
| Settings → Social Networks | Sharing → Social Networks Panel |
| Settings → Display | Sharing → Display Rules Panel |
| Settings → Text Settings | Sharing → Display Rules Panel |
| Settings → Advanced | Sharing → Advanced Panel |
| Appearance (entire tab) | Sharing → Appearance Panel |
| Block Editor → Block Settings | Sharing → Block Editor Panel |
| Block Editor → Adobe Fonts | Sharing → Block Editor Panel |
| Block Editor → Inline Highlighting | Sharing → Inline Highlighting Panel |

## Implementation Tasks

### Phase 1: Audit & Planning

- [x] Review wireframe and gather requirements
- [x] Audit existing options and identify consolidation opportunities (see Options Audit section below)
- [x] Review all admin tabs for duplicated functionality
- [x] Identify common UI patterns:
  - Icon selection
  - Network selection
  - Color pickers
  - Post type selectors
- [x] Document current tab structure and dependencies
- [x] List all duplicated code patterns
- [x] Map all settings from current tabs to new panels

#### Phase 1 Findings

**Duplicated Functionality Across Tabs:**

1. **Form Save/Reset Pattern** (duplicated in 5+ tabs):
   - Settings, Block Editor, Emails, Images, Appearance (ThemeCustomizer) all use identical patterns:
     - `useForm` hook with `handleSubmit`, `reset`, `getValues`
     - `onSubmit` handler that calls `sendCommand` with tab-specific action
     - `handleReset` handler that calls `sendCommand` with tab-specific reset action
     - `hasErrors()` helper function
     - Success/error notices with 3-second timeout
     - Saving/resetting state management
   - **Consolidation Opportunity:** Create shared `useFormSave` and `useFormReset` hooks

2. **Error Boundary Pattern** (duplicated in Appearance tab):
   - Multiple `ErrorBoundary` components with identical fallback UI
   - **Consolidation Opportunity:** Standardize error boundary fallback component

3. **Content Area Structure** (duplicated across all tabs):
   - All tabs use identical structure: `has-admin-container-body__content` → `has-admin-content-wrapper` → `has-admin-content-panel`
   - Heading structure: `has-admin-content-heading` → `h1` → `description` paragraph
   - Body structure: `has-admin-content-body` → `has-admin-content-subheading` → `description` → component rows
   - **Consolidation Opportunity:** Create shared layout components

4. **Save/Reset Button Pattern** (duplicated in 5+ tabs):
   - Identical button structure with loading states, icons, disabled states
   - Same class names and styling patterns
   - **Consolidation Opportunity:** Create shared `FormActions` component

**Common UI Patterns Identified:**

1. **Icon Selection:**
   - Used in: Appearance tab (SocialIconList), Settings tab (network toggles)
   - Pattern: FontAwesome icon mapping via `SocialIcons` component
   - Location: `src/react/Components/SocialIcons/index.js`

2. **Network Selection:**
   - Used in: Settings tab (14+ network toggles)
   - Pattern: Individual `ToggleControl` components for each network
   - Consolidation: Will be replaced with `NetworkSelector` component (checkbox grid)

3. **Color Pickers:**
   - Used in: Appearance tab (ThemeCustomizer), Settings tab (TabColorPickers)
   - Pattern: Custom `ColorPicker` component with WordPress color picker integration
   - Location: `src/react/Components/ColorPicker/index.js`, `src/react/Components/TabColorPickers/index.js`

4. **Post Type Selectors:**
   - Used in: Settings tab (Display Rules section)
   - Pattern: Checkbox list of post types
   - Consolidation: Will be replaced with `PostTypeSelector` component

5. **Typography Controls:**
   - Used in: Appearance tab (ThemeCustomizer)
   - Pattern: Complex typography component with font family, size, weight, line height, letter spacing
   - Location: `src/react/Components/Typography/index.js`

6. **Dimensions Controls:**
   - Used in: Appearance tab (ThemeCustomizer)
   - Pattern: Padding/margin controls with responsive breakpoints
   - Location: `src/react/Components/Dimensions/index.js`, `src/react/Components/DimensionsBlock/index.js`

7. **Background Selector:**
   - Used in: Appearance tab (ThemeCustomizer)
   - Pattern: Image upload, background color, size, position, repeat, opacity controls
   - Location: `src/react/Components/BackgroundSelector/index.js`

**Current Tab Structure and Dependencies:**

1. **Settings Tab** (`src/react/Settings/settings.js`):
   - Dependencies: React Hook Form, WordPress components (ToggleControl, TextControl, SelectControl)
   - Structure: Multiple sections (Social Networks, Display Rules, Text Settings, Advanced)
   - Save action: `has_save_settings_tab`
   - Reset action: `has_reset_settings_tab`
   - Nonce: `hasSettingsAdmin.saveNonce`, `hasSettingsAdmin.resetNonce`

2. **Appearance Tab** (`src/react/Appearance/appearance.js`):
   - Dependencies: react-dnd (drag and drop), lazy-loaded ThemeCustomizer
   - Structure: Three sections (Reorder Networks, Theme Customizer, Preview)
   - Components: `SocialIconList`, `ThemeCustomizer`, `PreviewSocialIconList`
   - Save action: `has_save_appearance_settings` (in ThemeCustomizer)
   - Reset action: `has_reset_appearance_settings` (in ThemeCustomizer)
   - Network reorder action: `has_save_social_icon_order` (in SocialIconList)

3. **Block Editor Tab** (`src/react/BlockEditor/block-editor.js`):
   - Dependencies: React Hook Form, WordPress components, use-async-resource
   - Structure: Three sections (Block Settings, Adobe Fonts, Inline Highlighting)
   - Save action: `has_save_block_editor_options`
   - Reset action: `has_reset_block_editor_options`
   - Nonce: `hasBlockEditorAdmin.saveNonce`, `hasBlockEditorAdmin.resetNonce`

**Duplicated Code Patterns:**

1. **Form Initialization Pattern** (5+ instances):
```javascript
const { control, handleSubmit, getValues, reset } = useForm( {
  defaultValues: getDefaultValues(),
} );
const formValues = useWatch( { control } );
const { errors } = useFormState( { control } );
```

2. **Save Handler Pattern** (5+ instances):
```javascript
const onSubmit = ( formData ) => {
  setSaving( true );
  sendCommand( 'has_save_{tab}_tab', {
    nonce: {tab}Admin.saveNonce,
    form_data: formData,
  } )
    .then( ( ajaxResponse ) => {
      const ajaxData = ajaxResponse.data.data;
      const ajaxSuccess = ajaxResponse.data.success;
      if ( ajaxSuccess ) {
        reset( ajaxData );
        setIsSaved( true );
        setTimeout( () => setIsSaved( false ), 3000 );
      }
    } )
    .finally( () => setSaving( false ) );
};
```

3. **Reset Handler Pattern** (5+ instances):
```javascript
const handleReset = ( e ) => {
  setResetting( true );
  sendCommand( 'has_reset_{tab}_tab', {
    nonce: {tab}Admin.resetNonce,
  } )
    .then( ( ajaxResponse ) => {
      const ajaxData = ajaxResponse.data.data;
      const ajaxSuccess = ajaxResponse.data.success;
      if ( ajaxSuccess ) {
        reset( ajaxData );
        setIsReset( true );
        setTimeout( () => setIsReset( false ), 3000 );
      }
    } )
    .finally( () => setResetting( false ) );
};
```

4. **Error Check Pattern** (5+ instances):
```javascript
const hasErrors = () => {
  return Object.keys( errors ).length > 0;
};
```

5. **Save/Reset Button JSX Pattern** (5+ instances):
```javascript
<Button
  className={ classNames( 'has__btn has__btn-primary', { 'has-error': hasErrors() }, { 'is-saving': saving } ) }
  type="submit"
  text={ saving ? __( 'Saving…' ) : __( 'Save Settings' ) }
  icon={ saving ? Spinner : false }
  disabled={ saving || resetting }
/>
```

**Network Settings Popover Content:**

The popover will contain the following for each social network:
- **Label Text** (`{network}Label` option) - TextControl input
- **Tooltip Text** (`{network}Tooltip` option) - TextControl input
- **Network-Specific Settings** (when applicable):
  - Twitter: `twitter` (username), `enableHashtags` (toggle)
  - WhatsApp: `whatsappApiEndpoint` (select), `whatsappCanShareUrl` (toggle)
  - Mastodon: `mastodonLabel`, `mastodonTooltip` (already covered above)
  - Email: All email-specific settings (handled separately in Emails tab)

Each field will be mapped to its corresponding option key in the form state. Color customizations are **not** included in the popover (moved to Appearance panel).

### Phase 2: State Management Setup

- [x] Create custom `@wordpress/data` store for Sharing tab state (e.g., `has/sharing`)
- [x] Set up store structure:
  - Panel visibility state
  - Network data
  - Preview state
  - Sharing-specific settings
- [x] Create selectors and actions for store
- [x] Integrate store with user meta for persistence
- [x] Set up React Hook Form instance(s) for form state (hooks created, ready for use)
- [x] Create shared utilities/hooks for:
  - Panel state management (user meta) - integrate with PanelBody and store (`usePanelState`)
  - Unsaved changes tracking (using React Hook Form's `isDirty`) (`useUnsavedChanges`)
  - Form validation state (using React Hook Form's `errors`) (`useUnsavedChanges`)
- [x] **Note:** Store naming should be specific to avoid conflicts with future features (e.g., Headlines will need its own store)
- [x] Add Hello World to admin panel, create Sharing as its own tab, and set it to be default.

#### Phase 2 Completed Items

**Store Created:**
- `src/react/Sharing/Store/index.js` - WordPress data store (`has/sharing`)
- `src/react/Sharing/Store/reducer.js` - Reducer with initial state
- `src/react/Sharing/Store/selectors.js` - Selectors for accessing store state
- `src/react/Sharing/Store/actions.js` - Actions for updating store state

**Hooks Created:**
- `src/react/Hooks/usePanelState.js` - Manages panel expand/collapse state with user meta persistence
- `src/react/Hooks/useUnsavedChanges.js` - Tracks form dirty state and validation errors

**Admin Integration:**
- Sharing tab added to `php/Admin.php` as default tab
- AJAX handlers created: `ajax_get_admin_user_meta` and `ajax_set_admin_user_meta`
- User meta structure: `has_admin_user_meta` with `first_installed` date and `panel_states`
- Script enqueue and localization added
- Webpack entry point added: `has-admin-sharing`

**Sharing Tab Component:**
- `src/react/Sharing/sharing.js` - Basic component with "Hello World" placeholder
- `src/react/Sharing/index.js` - Entry point that registers store

**Security:**
- AJAX handlers heavily sanitize data (whitelisted panel IDs, type validation)
- Capability checks and nonce verification
- Options-like structure with defaults and merging

### Phase 3: Social Networks Panel Components

- [x] Create `src/react/Components/Shared/` directory
- [x] Build `NetworkSelector` component (checkbox grid with gear icons)
  - Two-column responsive grid layout
  - Checkbox to enable/disable each network
  - Visual indicator for enabled networks (dark gray background)
  - Clicking on box checks/unchecks the network
- [x] Build `NetworkSettingsPopover` component (labels, tooltips, network-specific settings)
  - Uses `Popover` from `@wordpress/components`
  - Contains label and tooltip fields for each network
  - Network-specific settings (Twitter username, WhatsApp endpoint, etc.)
  - All form inputs use React Hook Form's `Controller` component
- [x] **Note:** Use WordPress `PanelBody` component from `@wordpress/components` for all collapsible panels
- [x] **Note:** All form inputs use React Hook Form's `Controller` component

#### Phase 3 Completed Items

**Components Created:**
- `src/react/Components/Shared/NetworkSelector/index.js` - Checkbox grid component for network selection
  - Responsive two-column grid layout
  - Visual enabled/disabled states
  - Clickable network items
  - Gear icon button for settings
  - Integrates with React Hook Form via `Controller`
- `src/react/Components/Shared/NetworkSettingsPopover/index.js` - Popover component for network settings
  - Label and tooltip fields for all networks
  - Twitter-specific: username (with validation), enableHashtags toggle
  - WhatsApp-specific: endpoint selector (app/web), canShareUrl toggle
  - All fields use React Hook Form's `Controller` component
  - Error handling with validation messages

### Phase 4: Social Networks Panel Implementation ✅ COMPLETED

- [x] Create `src/react/Sharing/Panels/SocialNetworksPanel/index.js`
- [x] Implement panel using `PanelBody` component
- [x] Integrate `NetworkSelector` component
- [x] Integrate `NetworkSettingsPopover` component with gear icons
- [x] Connect to React Hook Form for form state management
- [x] Connect to `@wordpress/data` store for network data (ready for future integration)
- [x] Implement panel state persistence using `usePanelState` hook
- [x] Test network enable/disable functionality
- [x] Test popover opening/closing
- [x] Test form state management
- [x] Implement comprehensive form validation:
  - [x] **Design validation pattern to be reusable across all panels** (not just Social Networks Panel)
  - [x] Configure React Hook Form validation mode:
    - [x] Set `mode: 'onBlur'` for text inputs in popovers (validate on blur)
    - [x] Set `reValidateMode: 'onChange'` to clear validation errors on any changes
  - [x] Implement error propagation:
    - [x] Network card visual indicators:
      - [x] Red border around network card when popover has validation errors
      - [x] Red asterisk (*) next to label (after network name) when popover has errors
    - [x] Panel-level error indicator:
      - [x] Global error message displayed outside panel when any network has errors
      - [x] Message indicates which network(s) have errors (e.g., "The following networks have validation errors: Bluesky, Twitter")
      - [x] **Note:** Message only indicates which networks, not which specific fields (field-level detail would be nice but is not necessary)
  - [x] Error state management:
    - [x] Track which networks have errors in form state using `hasNetworkErrors` utility
    - [x] Pass error state from form to `NetworkSelector` via `networkErrors` prop
    - [x] Update `NetworkSelector` to show visual indicators based on error state
    - [x] Update `SocialNetworksPanel` to show global error message when errors exist
  - [x] Test validation behavior:
    - [x] Validation triggers on blur for text inputs
    - [x] Validation clears on input change (using `clearErrors` with `useWatch` workaround)
    - [x] Error indicators appear/disappear correctly
    - [x] Global error message updates dynamically

#### Phase 4 Completed Items

**Panel Created:**
- `src/react/Sharing/Panels/SocialNetworksPanel/index.js` - Complete panel implementation
  - Uses `PanelBody` from `@wordpress/components`
  - Integrates `usePanelState` hook for expand/collapse state (defaults to open)
  - Integrates `useUnsavedChanges` hook for dirty state and error tracking
  - Shows green dot indicator when form is dirty
  - Shows red dot indicator when form has validation errors

**Form State Management:**
- React Hook Form setup with all network toggles and settings
- Default values loaded from PHP via `has_retrieve_settings_tab` endpoint
- All network labels, tooltips, and network-specific settings included
- Form validation configured (required fields, Twitter username validation)
- **Validation Configuration (COMPLETED):**
  - ✅ Configured `mode: 'onBlur'` for popover text inputs
  - ✅ Configured `reValidateMode: 'onChange'` to clear errors on input changes
  - ✅ Implemented error propagation from popover → network card → panel
  - ✅ Added visual error indicators (red border, red asterisk, global error message)
  - ✅ Global form instance using `FormProvider` for sharing across all panels
  - ✅ Error clearing on change using `clearErrors` with `useWatch` workaround

**Component Integration:**
- `NetworkSelector` fully integrated with form control
- `NetworkSettingsPopover` integrated with state management
- Popover opens/closes based on gear icon clicks
- Popover opens for all networks (enabled or disabled) - allows editing disabled networks
- Anchor element passed from settings button for proper positioning
- Error indicators: red border on network cards, red asterisk after network label
- Global error messages displayed at top and bottom of panel

**Data Retrieval:**
- Uses existing `has_retrieve_settings_tab` AJAX endpoint
- Retrieves social networks data and current option values
- Handles async loading with Suspense and ErrorBoundary
- Added `retrieveNonce` to `hasSharingAdmin` localization

**Panel Integration:**
- Panel integrated into Sharing tab component
- Replaces "Hello World" placeholder
- Global React Hook Form instance created in `Sharing` component using `FormProvider`
- Panel uses `useFormContext()` to access global form state
- Form defaults reset when async data loads

**Validation Implementation:**
- `hasNetworkErrors` utility function created for reusable error detection
- `useWatch` used to trigger recomputation when fields change (workaround for `clearErrors` reactivity)
- `clearErrors` called in `onChange` handlers to clear errors immediately
- Error state computed using `useMemo` with dependencies on `errors` and `watchedFields`
- Network cards show red border and red asterisk when errors exist
- Panel shows global error message listing networks with errors
- `PanelBodyWithIndicator` shows red dot when panel has errors

#### Phase 4 Validation Requirements (COMPLETED)

**General Requirement:**
- This validation pattern (error propagation, visual indicators, global error messages) should be designed to work across **all panels**, not just the Social Networks Panel
- When other panels are wired up (Display Rules, Appearance, Block Editor, Inline Highlighting, Advanced), they should use the same validation pattern
- Consider creating shared utilities/components for error state management that can be reused across panels

**Validation Configuration:**
- ✅ React Hook Form configured with:
  - ✅ `mode: 'onBlur'` - Validates text inputs when they lose focus (better UX for popovers)
  - ✅ `reValidateMode: 'onChange'` - Re-validates fields on change after initial validation
  - ✅ `clearErrors` called in `onChange` handlers to immediately clear errors when user types
  - ✅ `useWatch` used to trigger recomputation when field values change (ensures `useMemo` updates)
- ✅ **Single Form Instance:** One React Hook Form instance in `Sharing` component using `FormProvider` (all panels share the same form)

**Error Propagation Chain:**
1. **Popover Level** (`NetworkSettingsPopover`):
   - Individual field errors tracked by React Hook Form
   - Errors displayed inline with each field
   
2. **Network Card Level** (`NetworkSelector`):
   - ✅ Detects if network's popover has any errors (real-time, updates on blur before popover closes)
   - ✅ Visual indicators implemented:
     - ✅ Red border around entire network card (using `.has-error-indicator` class for reuse)
     - ✅ Red text asterisk (*) after network label with `aria-label="Validation error"` (using `.has-error-indicator` class)
     - ✅ Error indicators update in real-time as user fixes errors
     - ✅ If popover closes, error is visible via asterisk indicator after network label
   - ✅ Error state passed from form to component via `networkErrors` prop

3. **Panel Level** (`SocialNetworksPanel`):
   - ✅ Aggregates all network errors using `hasNetworkErrors` utility
   - ✅ Displays global error message in two locations:
     - ✅ At the top of the panel (before panel content)
     - ✅ At the very bottom of the panel (after panel content)
   - ✅ Message format: "The following networks have validation errors: [Network1], [Network2]"
   - ✅ **Note:** Global message only indicates which networks have errors, not which specific fields
   - ✅ Uses WordPress `Notice` component with `status="error"`
   - ✅ **Panel Indicator:** Red dot on `PanelBodyWithIndicator` appears when there are validation errors within that panel

**Implementation Details:**
- ✅ Uses React Hook Form's `formState: { errors }` from `useFormContext()` to access `errors` object
- ✅ Checks for errors specific to each network's field namespace (e.g., `errors.twitterLabel`, `errors.blueskyLabel`)
- ✅ Helper function created: `hasNetworkErrors(networkSlug, errors)` in `src/react/Utils/hasNetworkErrors.js`
- ✅ `NetworkSelector` accepts `networkErrors` prop (object mapping network slugs to boolean)
- ✅ `SocialNetworksPanel` computes error state using `useMemo` and passes to `NetworkSelector`
- ✅ CSS classes for error states added in `admin.scss` (`.has-error-indicator`)
- ✅ **Reusability:** Error state utilities and components are panel-agnostic and can be reused for other panels (Display Rules, Appearance, Block Editor, etc.)
- ✅ `useWatch` used to watch all network fields and trigger recomputation when values change
- ✅ `clearErrors` called in `onChange` handlers to immediately clear errors when user types

**Error State CSS Classes:**
- ✅ `.has-error-indicator` - Reusable class for error indicators (red border, red asterisk, etc.)
  - ✅ Applied to network cards with errors (red border)
  - ✅ Applied to network label container (asterisk displayed after label text)
  - ✅ Can be reused across all panels for consistent error styling
- ✅ Asterisk displayed as inline span element after label (no pseudo-element needed)

### Phase 5: Display Rules Panel Components

- [x] Build `PostTypeSelector` component
  - Checkbox list of post types
  - Uses React Hook Form's `Controller` component
  - All post types enabled by default; checking excludes them
  - Stored as `excludedPostTypes` object in form state
- [x] Build `DisplayRulesPanel` component
  - Uses `PanelBodyWithIndicator` wrapper
  - Defaults to collapsed (`initialOpen={ false }`)
  - Includes `PostTypeSelector` for post type exclusion
  - Uses `ToggleControl` for content areas (`enableContent`, `enableExcerpt`, `enableComments`)
  - Uses `ToggleControl` for mobile settings (`enableMobile`)
  - Uses `TextControl` for text prefix/suffix (`sharingPrefix`, `sharingSuffix`)
  - Integrated with global React Hook Form instance via `FormProvider`
  - All fields properly initialized with default values from PHP

**Implementation Details:**
- ✅ `PostTypeSelector` component created in `src/react/Components/Shared/PostTypeSelector/index.js`
- ✅ `DisplayRulesPanel` component created in `src/react/Sharing/Panels/DisplayRulesPanel/index.js`
- ✅ Post type exclusion feature implemented (empty array by default = all enabled)
- ✅ PHP backend updated to handle `excluded_post_types` in `Admin.php` and `Options.php`
- ✅ Post types localized via `hasSharingAdmin.postTypes` in `Admin.php`
- ✅ All Display Rules fields added to `getDefaultValues()` in `sharing.js`
- ✅ Form reset logic ensures proper initialization of all fields

### Phase 6: Appearance Menu Items (Reorder, Theme Customizer, Preview) ✅ COMPLETED

- [x] Create `ReorderNetworksPanel` component
  - Migrate `SocialIconList` component functionality
  - Uses drag-and-drop for reordering (react-dnd)
  - Uses `PanelBodyWithIndicator` wrapper
  - Default state: collapsed or expanded (TBD)
  - Integrates with `SocialNetworksContext` for state management
- [x] Create `ThemeCustomizerPanel` component
  - Migrate `ThemeCustomizer` component functionality
  - Uses `PanelBodyWithIndicator` wrapper
  - Default state: collapsed or expanded (TBD)
  - Lazy loaded component (already lazy in Appearance tab)
  - Integrates with `SocialNetworksContext` for theme state
- [x] Create `PreviewPanel` component
  - Migrate `PreviewSocialIconList` component functionality
  - Uses `PanelBodyWithIndicator` wrapper
  - Default state: expanded (`initialOpen={ true }`)
  - Real-time updates via `SocialNetworksContext`
  - Shows enabled networks with current theme/appearance settings
- [x] Integrate all three panels into Sharing tab
  - Add panels to `FormProvider` in `sharing.js`
  - Ensure `SocialNetworksContext` is available (may need to wrap or refactor)
  - Maintain existing Appearance tab functionality during migration

**Implementation Notes:**
- All three components currently exist in `src/react/Appearance/appearance.js`
- `SocialIconList` component: `src/react/Components/SocialIconList/index.js`
- `ThemeCustomizer` component: `src/react/Components/ThemeCustomizer/index.js` (lazy loaded)
- `PreviewSocialIconList` component: `src/react/Components/PreviewSocialIconList/index.js`
- `SocialNetworksContext` provides state for all three components
- May need to refactor context usage if moving to Sharing tab with React Hook Form

### Phase 7: New Sharing Tab Structure (Remaining Panels)

**Follow Existing Panel Structure:**
- Use the same patterns established in `SocialNetworksPanel` and `DisplayRulesPanel` as reference
- All panels should:
  - Use `PanelBodyWithIndicator` wrapper component (from previous phases)
  - Integrate with global React Hook Form instance via `FormProvider`/`useFormContext()`
  - Use `usePanelState` hook for expand/collapse state persistence
  - Use `useUnsavedChanges` hook for dirty state and error tracking
  - Follow the same validation pattern (error propagation, visual indicators, global error messages)
  - Initialize with default values from PHP backend
  - Use React Hook Form's `Controller` component for all form inputs

- [x] Implement `BlockEditorPanel` component using `PanelBody` (split from Block Editor tab)
  - Follow structure from `DisplayRulesPanel` as reference
  - Migrate block settings (`enableBlocks`) and Adobe Fonts settings
  - Use `ToggleControl` for toggles, appropriate controls for other settings
  - Default state: collapsed (`initialOpen={ false }`)
- [x] Implement `InlineHighlightingPanel` component using `PanelBody` (split from Block Editor tab)
  - Follow structure from `DisplayRulesPanel` as reference
  - Migrate all inline highlighting options (background colors, text colors, tooltips, etc.)
  - Use appropriate form controls for each setting type
  - Default state: collapsed (`initialOpen={ false }`)
- [x] Implement `AdvancedPanel` component using `PanelBody`
  - Follow structure from `DisplayRulesPanel` as reference
  - Migrate advanced settings (`jsContent`, `elementContent`, `idContent`, `wrapperClasses`, `shortlinks`)
  - Use `TextControl` for text inputs, `ToggleControl` for toggles
  - Default state: collapsed (`initialOpen={ false }`)
- [x] **User meta panel states:** Integrate panel state persistence with `PanelBody`'s `initialOpen`/`opened` using store + user meta
  - Use existing `usePanelState` hook; panel IDs aligned to camelCase in React, snake_case in PHP via `Functions::panel_states_to_snake` / `panel_states_to_camel`
  - Single load: panel states passed on initial page load via `hasSharingAdmin.panelStates`; store reducer reads from `window` so panels render correctly on first paint
  - See [Completed: User Meta Panel States](#completed-user-meta-panel-states) below for implementation summary.


**Implementation Details:**
- Create `FloatingSaveBar` component in `src/react/Components/Shared/FloatingSaveBar/index.js`
- Use React Hook Form's `useFormState` or `useFormContext` to access `isDirty`, `errors`, and `formState`
- CSS: Fixed positioning with `position: fixed; bottom: 0; left: 0; right: 0;`
- Add z-index to ensure it appears above other content
- Include shadow/elevation for visual separation
- Responsive: Full width on mobile, centered container on desktop
- Animation: Use CSS transitions for slide-up/slide-down effect
- Accessibility: Proper ARIA labels and keyboard navigation
- **Reference existing panels:** Use `SocialNetworksPanel` and `DisplayRulesPanel` as templates for structure, form integration, and state management

---

### Completed: User Meta Panel States

Panel expand/collapse state is persisted to user meta and restored on load.

**Implementation summary:**

- **Panel IDs:** React panels use camelCase (`displayRules`, `blockEditor`, `inlineHighlighting`). PHP stores snake_case; `Functions::panel_states_to_snake()` and `panel_states_to_camel()` convert on set/get.
- **Single load / first paint:** `get_initial_panel_states_for_js()` in Admin; `hasSharingAdmin.panelStates` localized; store reducer `getInitialPanelsState()` reads `window.hasSharingAdmin.panelStates` so panels render correctly on first paint.
- **PHP:** `ajax_get_admin_user_meta` / `ajax_set_admin_user_meta`; `normalize_stored_panel_states()` for old duplicate keys; `filter_var(…, FILTER_VALIDATE_BOOLEAN)` for form booleans; defaults/sanitize use snake_case.
- **Controlled panels:** `PanelBodyWithIndicator` uses `opened={ isOpen }` and `initialOpen={ defaultOpen }`; toggles persist via `usePanelState` → `has_set_admin_user_meta`.

---

### Phase 7: Migration & Refactoring ✅ COMPLETED

- [x] Migrate Settings tab → Social Networks section to new panel
- [x] Migrate Settings tab → Display Rules to new panel
- [x] Migrate Settings tab → Advanced to new panel
- [x] Migrate Appearance tab → Reorder Networks to `ReorderNetworksPanel`
- [x] Migrate Appearance tab → Theme Customizer to `ThemeCustomizerPanel`
- [x] Migrate Appearance tab → Preview to `PreviewPanel`
- [x] Split Block Editor tab into Block Editor and Inline Highlighting panels
- [x] Update all tabs to use shared components
- [x] Ensure backward compatibility with existing options

### Phase 8: Responsive & Polish ✅ COMPLETED

- [x] Implement responsive grid (two-column → one-column)
- [x] Test panel behavior on mobile/tablet
- [x] Polish panel animations and transitions
- [x] Test unsaved changes indicator behavior
- [x] Test form validation error indicators

### Phase 9: Testing ✅ COMPLETED

- [x] Test all panels expand/collapse correctly
- [x] Test state persistence (user meta)
- [x] Test real-time preview updates
- [x] Test unsaved changes indicator
- [x] Test form validation error indicators
- [x] Test responsive behavior
- [x] Test all settings save correctly
- [x] Test backward compatibility

### Phase 10: Documentation

- [ ] Update component documentation
- [ ] Document shared component usage
- [ ] Document panel structure and organization
- [ ] Update admin interface documentation
- [ ] Document migration path from old tabs

## Files to Create

- `src/react/Sharing/index.js` - Main Sharing tab component
- `src/react/Sharing/sharing.js` - Sharing tab interface
- `src/react/Sharing/Panels/SocialNetworksPanel/index.js` - Uses `PanelBody`
- `src/react/Sharing/Panels/DisplayRulesPanel/index.js` - Uses `PanelBody` with `ToggleControl`
- `src/react/Sharing/Panels/ReorderNetworksPanel/index.js` - Uses `PanelBody` (Phase 6)
- `src/react/Sharing/Panels/ThemeCustomizerPanel/index.js` - Uses `PanelBody` (Phase 6)
- `src/react/Sharing/Panels/PreviewPanel/index.js` - Uses `PanelBody` (Phase 6)
- `src/react/Components/Shared/FloatingSaveBar/index.js` - Floating save bar component (Phase 7)
- `src/react/Sharing/Panels/BlockEditorPanel/index.js` - Uses `PanelBody`
- `src/react/Sharing/Panels/InlineHighlightingPanel/index.js` - Uses `PanelBody`
- `src/react/Sharing/Panels/PreviewPanel/index.js` - Uses `PanelBody`
- `src/react/Sharing/Panels/AdvancedPanel/index.js` - Uses `PanelBody`
- `src/react/Components/Shared/NetworkSelector/index.js`
- `src/react/Components/Shared/NetworkSettingsPopover/index.js` - Uses `Popover` from `@wordpress/components`
- `src/react/Components/Shared/PostTypeSelector/index.js` - (Phase 5)
- `src/react/Sharing/Store/index.js` - Custom `@wordpress/data` store for Sharing tab state
- `src/react/Sharing/Store/selectors.js` - Store selectors
- `src/react/Sharing/Store/actions.js` - Store actions
- **Note:** Store is namespaced under Sharing to allow future features (like Headlines) to have their own stores
- `src/react/Hooks/usePanelState.js` - Panel state management hook (integrates with PanelBody and store)
- `src/react/Hooks/useUnsavedChanges.js` - Unsaved changes tracking hook (uses React Hook Form)

## WordPress Components to Use

- `PanelBody` from `@wordpress/components` - For all collapsible panels
- `ToggleControl` from `@wordpress/components` - For content area toggles (is single, is excerpt)
- `Popover` from `@wordpress/components` - For network settings popover
- `Button` from `@wordpress/components` - For gear icons and actions
- `TextControl` from `@wordpress/components` - For label/tooltip inputs
- Other existing WordPress components as needed

## Files to Modify

- `src/react/Appearance/appearance.js` - Migrate to AppearancePanel
- `src/react/BlockEditor/block-editor.js` - Split into two panels
- `src/react/Settings/settings.js` - Migrate sections to new panels
- Main admin router/tab navigation component
- Any other admin React components

## Notes

- Must maintain backward compatibility with existing options
- **Use WordPress components wherever possible** - Leverage `PanelBody`, `ToggleControl`, `Popover`, etc. from `@wordpress/components`
- **State Management:**
  - Use custom `@wordpress/data` store specifically for Sharing tab state (e.g., `has/sharing` store)
  - Store is namespaced under Sharing to allow future features (like Headlines) to have their own isolated stores
  - Use React Hook Form for all form state management
  - React Hook Form provides excellent dirty/non-dirty state tracking (perfect for unsaved changes indicator)
  - React Hook Form makes error message configuration easy and consistent
  - React Hook Form is already used extensively in the codebase, maintaining consistency
- **Form Handling:**
  - All form inputs use React Hook Form's `Controller` component
  - Use `useFormState` hook to track `isDirty` and `errors` for indicators
  - Use `useWatch` for real-time preview updates
- Shared components should be flexible and reusable
- This prepares the foundation for Headlines tab
- Panel state uses WordPress Core method (user meta) for consistency, synced with `@wordpress/data` store (`has/sharing`)
- `PanelBody` supports `initialOpen` prop and `onToggle` callback - integrate with store and user meta for state persistence
- Real-time preview uses React Hook Form's `useWatch` to watch form state changes
- Network settings popover is marked as TODO - implement after core structure is in place
- Content areas (is single, is excerpt) use `ToggleControl` switches instead of custom selector component

