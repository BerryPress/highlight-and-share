# Admin Interface Reorganization

**Priority:** 2  
**Status:** Planning  
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
- [ ] Review all admin tabs for duplicated functionality
- [ ] Identify common UI patterns:
  - Icon selection
  - Network selection
  - Color pickers
  - Post type selectors
- [ ] Document current tab structure and dependencies
- [ ] List all duplicated code patterns
- [ ] Map all settings from current tabs to new panels

### Phase 2: State Management Setup

- [ ] Create custom `@wordpress/data` store for Sharing tab state (e.g., `has/sharing`)
- [ ] Set up store structure:
  - Panel visibility state
  - Network data
  - Preview state
  - Sharing-specific settings
- [ ] Create selectors and actions for store
- [ ] Integrate store with user meta for persistence
- [ ] Set up React Hook Form instance(s) for form state
- [ ] Create shared utilities/hooks for:
  - Panel state management (user meta) - integrate with PanelBody and store
  - Unsaved changes tracking (using React Hook Form's `isDirty`)
  - Form validation state (using React Hook Form's `errors`)
- [ ] **Note:** Store naming should be specific to avoid conflicts with future features (e.g., Headlines will need its own store)

### Phase 3: Shared Components

- [ ] Create `src/react/Components/Shared/` directory
- [ ] Build `NetworkSelector` component (checkbox grid with gear icons)
- [ ] Build `NetworkSettingsPopover` component (labels, tooltips, network-specific settings)
- [ ] Build `PostTypeSelector` component
- [ ] **Note:** Use WordPress `PanelBody` component from `@wordpress/components` for all collapsible panels
- [ ] **Note:** Use `ToggleControl` from `@wordpress/components` for content areas (is single, is excerpt)
- [ ] **Note:** All form inputs use React Hook Form's `Controller` component

### Phase 4: New Sharing Tab Structure

- [ ] Create new `src/react/Sharing/` directory structure
- [ ] Build main `Sharing` tab component with React Hook Form setup
- [ ] Connect Sharing tab to `@wordpress/data` store
- [ ] Implement `SocialNetworksPanel` component using `PanelBody` and React Hook Form
- [ ] Implement `DisplayRulesPanel` component using `PanelBody` with `ToggleControl` for content areas
- [ ] Implement `AppearancePanel` component using `PanelBody` (migrate from Appearance tab)
- [ ] Implement `BlockEditorPanel` component using `PanelBody` (split from Block Editor tab)
- [ ] Implement `InlineHighlightingPanel` component using `PanelBody` (split from Block Editor tab)
- [ ] Implement `PreviewPanel` component using `PanelBody` with real-time updates (watch form state)
- [ ] Implement `AdvancedPanel` component using `PanelBody`
- [ ] Integrate panel state persistence with `PanelBody`'s `initialOpen` prop using store + user meta
- [ ] Implement unsaved changes indicator (green/red dots) - use React Hook Form's `isDirty` and `errors` state

### Phase 5: Network Settings Popover

- [ ] Design and implement popover component
- [ ] Add label/tooltip fields for each network
- [ ] Add network-specific settings (Twitter username, WhatsApp endpoint, etc.)
- [ ] Remove color customization from popover (moved to Appearance panel)
- [ ] Test popover positioning and accessibility

### Phase 6: Migration & Refactoring

- [ ] Migrate Settings tab → Social Networks section to new panel
- [ ] Migrate Settings tab → Display Rules to new panel
- [ ] Migrate Settings tab → Advanced to new panel
- [ ] Migrate entire Appearance tab to Appearance panel
- [ ] Split Block Editor tab into Block Editor and Inline Highlighting panels
- [ ] Update all tabs to use shared components
- [ ] Ensure backward compatibility with existing options

### Phase 7: Responsive & Polish

- [ ] Implement responsive grid (two-column → one-column)
- [ ] Test panel behavior on mobile/tablet
- [ ] Polish panel animations and transitions
- [ ] Test unsaved changes indicator behavior
- [ ] Test form validation error indicators

### Phase 8: Testing

- [ ] Test all panels expand/collapse correctly
- [ ] Test state persistence (user meta)
- [ ] Test real-time preview updates
- [ ] Test unsaved changes indicator
- [ ] Test form validation error indicators
- [ ] Test responsive behavior
- [ ] Test all settings save correctly
- [ ] Test backward compatibility

### Phase 9: Documentation

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
- `src/react/Sharing/Panels/AppearancePanel/index.js` - Uses `PanelBody`
- `src/react/Sharing/Panels/BlockEditorPanel/index.js` - Uses `PanelBody`
- `src/react/Sharing/Panels/InlineHighlightingPanel/index.js` - Uses `PanelBody`
- `src/react/Sharing/Panels/PreviewPanel/index.js` - Uses `PanelBody`
- `src/react/Sharing/Panels/AdvancedPanel/index.js` - Uses `PanelBody`
- `src/react/Components/Shared/NetworkSelector/index.js`
- `src/react/Components/Shared/NetworkSettingsPopover/index.js` - Uses `Popover` from `@wordpress/components`
- `src/react/Components/Shared/PostTypeSelector/index.js`
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

