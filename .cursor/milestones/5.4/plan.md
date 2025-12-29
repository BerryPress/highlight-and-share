# Highlight and Share — Plan for 5.4

## Overview

Version 5.4 focuses on polish, visibility, and extensibility rather than expansion into analytics or tracking. The goal is to make sharing more contextual and modern while keeping Highlight and Share lightweight, predictable, and privacy-friendly.

This release improves the existing block experience, elevates Web Share where supported, introduces optional headline sharing, refactors internal network handling to reduce maintenance overhead, and improves stats dispatching for better third-party platform integration.

---

## Goals

- Improve clarity and UX of the existing block
- Improve block usability with default presets, visible preset panel, and option synchronization
- Promote Web Share API as a first-class sharing option
- Introduce **Headline Sharing** as an opt-in, frontend-only enhancement
- Reorganize admin interface to reduce duplication and improve discoverability
- Simplify internal social network registration and maintenance
- Improve stats dispatching with support for GA4, synthetic events, and third-party platforms
- Add one-time ratings module for user feedback after 90 days
- Maintain backward compatibility and avoid scope creep

---

## Non-Goals

This release intentionally does **not** include:

- Share counts or analytics dashboards
- Server-side storage or logging
- Network-specific optimizations or presets
- Editor-side headline controls or previews
- Per-heading customization

---

## Priorities

Development priorities for version 5.4, in order of implementation:

1. **Simplify Internal Social Network Logic**
   - Refactor network registry pattern
   - Centralize network definitions
   - Reduce maintenance overhead
   - Foundation for other features

2. **Reorganize Admin Interface**
   - Consolidate duplicated functionality
   - Create shared React components
   - Improve discoverability and UX
   - Prepare for Headlines tab addition

3. **Promote Web Share API**
   - Enhance Web Share detection and promotion
   - Improve visual presentation
   - Better integration with network registry

4. **Block Improvements**
   - Default preset functionality
   - Preset panel visibility
   - Option synchronization
   - Block style management

5. **Stats Dispatching**
   - GA4 auto-dispatch
   - Synthetic events
   - Third-party platform support
   - Options and documentation

6. **Headlines Feature**
   - Headline sharing functionality
   - H1/post title support
   - Admin interface (Headlines tab)
   - Frontend implementation

---

## 1. Block Polish & Web Share Improvements

### 1.1 Block Usability Enhancements

Improve the Click to Share block's usability by making presets more discoverable and functional:

#### Default Preset

- Create a **default preset** that serves as the starting point for new blocks
- Default preset should represent a common, well-designed configuration
- New blocks automatically use the default preset's settings
- Default preset can be changed by site administrators (stored in block editor options)

#### Preset Panel Visibility

- Make the Presets panel **visible by default** (`initialOpen={ true }`)
- Users can still collapse/expand the panel as needed
- Improves discoverability of preset options
- Reduces friction for users who want to quickly apply a preset

#### Option Synchronization

- When a preset is selected, **all block options/attributes automatically update** to reflect the preset
- Options panel should show the current preset's values after selection
- Visual feedback indicates which preset is currently active
- Users can still manually override any preset value after selection
- Preset selection should be clearly indicated in the UI (e.g., "Using: Purple Theme")

#### Implementation Details

- Default preset stored in `highlight-and-share-block-editor-options` as `default_preset`
- Preset selection updates all relevant block attributes via `setAttributes()`
- Preset state tracked to show current selection in the UI
- Backward compatible: existing blocks without presets continue to work
- Block styles can be cleared or copied.

### 1.2 Web Share API

- Detect support via `navigator.share` (capability-based)
- When supported:
  - Visually promote Web Share in the UI
  - Allow it to be prioritized in the network list
- When unsupported:
  - Gracefully hide or demote without breaking layout
- No UA sniffing
- No forced replacement of existing networks

---

## 2. Headline Sharing (Opt-In)

### 2.1 Feature Summary

Headline Sharing adds a lightweight share affordance to headings (`h2–h4`) on the frontend, allowing users to share individual sections of a page rather than only the page itself.

This feature is:
- Disabled by default
- Frontend-only
- Designed to mimic GitHub’s anchor-link UX

---

### 2.2 Default Behavior

- Enabled heading levels: `h2–h4` (H1/post title is optional, see 2.2.2)
- Scope: headings within rendered post content
- **DOM Scanning Strategy:**
  - Only headings with existing `id` attributes are scanned
  - A data attribute (e.g., `data-has-headline-share`) is added to eligible headings
  - Event listeners (hover/click) are then attached to headings with this data attribute
- Hovering a heading reveals a link icon to the left
- Clicking the icon opens sharing options (not navigation)
- Clicking the heading text continues to behave normally
- Existing heading `id` attributes are always respected

### 2.2.2 H1/Post Title Sharing (Optional)

- **Off by default** — must be explicitly enabled via option `enable_h1_sharing`
- H1/post title is typically outside `the_content`, requiring a different approach
- **Most Performant Implementation:**
  1. **Server-side processing:** Use `the_title` filter with late priority (e.g., `999`) to add data attribute to post titles
     - Only applies on single post/page views (not archives, search, etc.)
     - Checks if title is wrapped in H1 or if H1 is expected
     - Adds `data-has-headline-share` attribute when H1 is detected
  2. **JavaScript fallback:** If server-side attribute not found, use targeted selectors
     - Scans common theme selectors: `.entry-title h1`, `.post-title h1`, `h1.entry-title`, `article h1:first-of-type`
     - Only queries specific selectors, not all H1 elements
     - Adds data attribute to matching H1 elements that have IDs
  3. **Performance optimization:**
     - Single targeted query using `querySelector()` (not `querySelectorAll()` unless multiple matches)
     - Only processes H1 if option is enabled
     - Reuses same event binding pattern as H2–H4
- **Why this approach:**
  - Server-side processing is faster than client-side DOM scanning
  - Targeted selectors avoid scanning entire DOM
  - Falls back gracefully if theme structure differs
  - Maintains consistency with H2–H4 implementation pattern

### 2.2.1 Auto-ID Generation (Optional)

- **Off by default** — must be explicitly enabled in settings
- When enabled, headings without `id` attributes will have IDs auto-generated
- ID generation uses a slugified version of the heading text
- Generated IDs follow WordPress slug conventions (lowercase, hyphens, alphanumeric)
- Auto-generated IDs are added to the DOM before scanning occurs
- This feature allows headline sharing to work on headings that don't already have anchor IDs
- **Implementation:** Hooks into `the_content` filter with a late priority (e.g., `99` or `999`) to ensure other plugins have already processed the content and initialized their own modifications

---

### 2.3 Interaction Model

When the headline icon is clicked, present three actions:

1. **Copy**  
   Copies the deep link (page URL + heading anchor)

2. **Web Share**  
   Uses the Web Share API when supported

3. **Share**  
   Opens a compact drawer showing approved social networks

The drawer uses the same internal network registry as the block but defaults to a smaller, opinionated set. Icons can be selected in the Headlines tab in the admin options.

---

### 2.4 Selector Strategy

Headline Sharing supports **either inclusion or exclusion selectors**, never both.

#### Modes

- **Inclusion mode**  
  Apply headline sharing only within matching selectors

- **Exclusion mode**  
  Apply headline sharing everywhere *except* matching selectors

Only one mode may be active at a time.

---

### 2.5 Container Exclusions (Recommended Defaults)

To avoid headings embedded in layout components (cards, grids, loops), headline sharing supports container-based exclusion.

Default excluded containers include:

- `.wp-block-group`
- `.wp-block-query`

Additional selectors may be added by the user.

Rules:
- Container exclusion always wins
- Implemented via `closest()` checks
- Depth is not calculated or inferred

---

### 2.6 Post Type Support

Headline Sharing can be enabled for one or more post types.

- Global option to select supported post types (stored in WordPress options)
- Feature applies only to selected post types
- Independent of the main block
- Options stored in `highlight-and-share-headline-options` (following existing pattern)

---

### 2.7 Per-Post Control

- Headline Sharing can be disabled on a per-post basis
- Implemented via post meta (e.g., `_has_disable_headline_sharing`)
- Applies to all headings within the post
- No per-heading overrides in this release
- Meta value checked before initializing headline sharing on the frontend

---

### 2.8 Options Structure

Headline Sharing options follow the existing plugin pattern (similar to `get_image_defaults()`, `get_block_editor_defaults()`):

Stored in `highlight-and-share-headline-options` option:
- `enable_headline_sharing` — master toggle (default: `false`)
- `enable_h1_sharing` — enable H1/post title sharing (default: `false`)
- `auto_generate_ids` — auto-generate IDs for headings without them (default: `false`)
- `enabled_heading_levels` — array of heading levels to enable (default: `['h2', 'h3', 'h4']`)
- `supported_post_types` — array of post type slugs (default: `['post']`)
- `selector_mode` — 'inclusion' or 'exclusion' (default: `'exclusion'`)
- `inclusion_selectors` — CSS selectors for inclusion mode (default: `''`)
- `exclusion_selectors` — CSS selectors for exclusion mode (default: `.wp-block-group, .wp-block-query`)
- `default_networks` — array of network slugs to show in headline drawer (default: smaller set than full block)

Options retrieved via `Options::get_headline_options()` following the same pattern as other option getters.

### 2.9 Accessibility & Safety

- Icons must be keyboard focusable
- Screen reader labels (e.g. "Share this section")
- Feature fails silently if markup or theme structure is incompatible
- Optional admin notice advising users to verify theme compatibility

### 2.10 Admin Interface Implementation

#### Backend Tasks

**New Headlines Admin Tab:**
- Create new "Headlines" tab in admin settings (following existing tab pattern)
- Add tab navigation in `Admin::options_page()`
- Register AJAX handlers for loading/saving/resetting headline options
- Create `Options::get_headline_options()` and `Options::get_headline_defaults()` methods
- Add post meta box for per-post headline sharing control (optional, can be in Block Editor tab)

**React Interface Components:**
- Create new React app entry point: `src/react/Headlines/headlines.js`
- Build headline settings interface with sections:
  - **Feature Toggle:** Master enable/disable switch
  - **Heading Levels:** Checkboxes for H1, H2, H3, H4 selection
  - **Post Types:** Multi-select for supported post types
  - **Icon Selection:** Reusable icon picker component (share with Block Editor/Appearance tabs)
  - **Appearance Settings:** Icon size, position, hover effects, colors
  - **Selector Configuration:** Inclusion/exclusion mode and selector inputs
  - **Container Exclusions:** Default exclusions with ability to add custom selectors
  - **Network Selection:** Choose which networks appear in headline drawer
  - **Auto-ID Generation:** Toggle for auto-generating heading IDs

**Icon Selection Interface:**
- Reuse/refactor existing icon selection components from Appearance tab
- Create shared `IconSelector` component to avoid duplication
- Support selecting icons for headline sharing (different from block icons)
- Store icon preferences in headline options

**Appearance Controls:**
- Icon size slider/input
- Icon position (left/right of heading)
- Hover effect options
- Color pickers for icon and hover states
- Preview area showing headline with share icon

#### Frontend Tasks

**JavaScript Implementation:**
- Create new frontend JS file: `src/frontendjs/headline-sharing.js`
- Implement DOM scanning for headings with IDs
- Add data attributes via `the_content` filter (PHP) and JavaScript fallback
- Implement hover/click event handlers
- Create headline share drawer/modal component
- Integrate with existing network registry for sharing functionality

**H1/Post Title Handling:**
- Implement `the_title` filter hook for server-side attribute injection
- Create JavaScript fallback with targeted selectors
- Ensure H1 sharing works across common theme structures

### 2.11 Admin Reorganization

To avoid duplication and improve discoverability, reorganize existing admin tabs:

**Current Tab Structure:**
- Settings
- Appearance
- Images
- Block Editor
- Emails
- Support

**Reorganization Goals:**
- Consolidate related settings to reduce tab sprawl
- Move headline-specific icon selection to Headlines tab (not Appearance)
- Consider merging Block Editor and Headlines into a single "Content Sharing" tab, or keep separate but share components
- Review Settings tab for options that could move to more specific tabs
- Ensure consistent UI patterns across all tabs

**Shared Components:**
- Create shared React components for common UI patterns:
  - `IconSelector` — reusable icon picker
  - `NetworkSelector` — network selection interface
  - `ColorPicker` — consistent color picker component
  - `PostTypeSelector` — post type multi-select
- Refactor existing tabs to use shared components where applicable
- Reduce code duplication between Appearance, Block Editor, and Headlines tabs

**Implementation Approach:**
- Audit existing admin tabs for duplicated functionality
- Create shared component library in `src/react/Components/Shared/`
- Refactor one tab at a time to use shared components
- Ensure backward compatibility with existing saved settings
- Update documentation to reflect new tab organization

### 2.12 One-Time Ratings Module

Add a user-friendly ratings prompt to encourage plugin reviews after users have had time to experience the plugin.

#### Behavior

- **Timing:** Module appears after 90 days of plugin activation
- **Location:** Displayed in admin panel options page only (not on every admin page)
- **Dismissibility:** Fully dismissible per user
- **Persistence:** Once dismissed by a user, never shown again to that user
- **One-time:** Each user sees it once (if they don't dismiss, it remains until dismissed)

#### Implementation Details

**Backend:**
- Track plugin activation date (stored in options: `highlight-and-share-activation-date`)
- Calculate days since activation on admin page load
- Check user meta for dismissal status: `_has_ratings_dismissed` (per user)
- Only show if:
  - 90+ days since activation
  - Current user hasn't dismissed it
  - User is on the Highlight and Share options page

**Frontend:**
- Create React component: `src/react/Components/RatingsPrompt/index.js`
- Display as a dismissible notice/banner in the admin options page
- Include:
  - Friendly message thanking user for using the plugin
  - Link to WordPress.org plugin review page
  - "Dismiss" button (X or "Maybe Later")
- AJAX handler to save dismissal to user meta
- Once dismissed, component doesn't render for that user

**User Experience:**
- Non-intrusive design (notice/banner style, not modal)
- Easy to dismiss
- Clear call-to-action for leaving a review
- Respects user choice (no re-showing after dismissal)

**Storage:**
- Activation date: `get_option('highlight-and-share-activation-date')` (set on first activation)
- Dismissal status: `get_user_meta($user_id, '_has_ratings_dismissed', true)` (boolean)

---

## 3. Social Network Architecture Refactor

### 3.1 Problem

Adding or modifying social networks currently requires touching multiple files and tightly coupled UI/logic.

---

### 3.2 Network Registry Pattern

Refactor to use the existing centralized network registry structure from `Options::get_social_network_defaults()`:

Each network defines (matching current PHP structure):
- `slug` — unique identifier (e.g., 'twitter', 'facebook', 'webshare')
- `label` — display name (e.g., 'Twitter', 'Facebook', 'Share')
- `color` — icon/text color (hex value)
- `background` — background color (hex value)
- `order` — display order (integer)
- `custom` — whether network is user-created (boolean)
- `enabled` — whether network is active (boolean, derived from main options)

Additional properties for functionality:
- Share URL template or handler function
- CSS class selector (e.g., `.has_twitter`, `.has_facebook`)
- Capability flags (derived from network type):
  - `supportsWebShare` — can use Web Share API (webshare only)
  - `supportsCopy` — can copy to clipboard (copy only)
  - `requiresPopup` — opens in popup window (most social networks)

UI and behavior resolve from this registry.

Benefits:
- Adding a network becomes a single, predictable change in `get_social_network_defaults()`
- Headline Sharing and the block share the same definitions
- Web Share becomes a capability, not a special case
- Consistent with existing WordPress options structure and localization pattern

---

## 4. Stats Dispatching Improvements

### 4.1 Current State

Currently, Highlight and Share dispatches events to `dataLayer` (Google Tag Manager), which works well for GTM-based setups but doesn't directly support other analytics platforms like Google Analytics 4 (GA4) or custom event tracking systems.

### 4.2 Enhanced Stats Dispatching

Improve stats dispatching to support multiple analytics platforms simultaneously:

- **dataLayer (GTM)** — Maintain existing `dataLayer.push()` functionality for backward compatibility
- **GA4 Events** — Auto-dispatch events directly to `gtag()` when GA4 is detected
- **Synthetic Events** — Dispatch custom events that can be listened to by any third-party platform
- **Extensible Architecture** — Allow plugins/themes to hook into stats dispatching for custom integrations

### 4.3 Implementation Details

#### Event Structure

All sharing events include consistent data:
- `event` — Event name (e.g., 'highlight-and-share')
- `hasShareText` — Text being shared
- `hasSharePostUrl` — URL of the post/page
- `hasSharePostTitle` — Title of the post/page
- `hasShareType` — Type of share trigger ('selection', 'cta', 'inline', 'headline')
- `hasSocialNetwork` — Network used ('twitter', 'facebook', 'copy', 'webshare', etc.)

#### Dispatching Methods

1. **dataLayer (GTM)** — Existing method, maintained for compatibility
   ```javascript
   dataLayer.push({ event: 'highlight-and-share', ... });
   ```

2. **GA4 (gtag)** — Auto-dispatch when `gtag` is available
   ```javascript
   gtag('event', 'has_share', { ... });
   ```

3. **Synthetic Events** — Custom DOM events for third-party listeners
   ```javascript
   window.dispatchEvent(new CustomEvent('has:share', { detail: { ... } }));
   ```

### 4.4 Options & Control

- **Master Toggle:** New option `enable_stats_dispatching` (default: `false` — disabled by default)
- **Per-Method Control:** Individual toggles for each dispatching method:
  - `enable_datalayer` — Enable dataLayer dispatching (default: `true` when stats enabled)
  - `enable_ga4` — Enable GA4 dispatching (default: `true` when stats enabled)
  - `enable_synthetic_events` — Enable synthetic event dispatching (default: `true` when stats enabled)
- **Options Location:** Stored in main plugin options (`highlight-and-share`)
- **Documentation Links:** Admin interface includes links to documentation explaining:
  - How to track HAS stats in Google Analytics 4
  - How to track HAS stats in Google Tag Manager
  - How to track HAS stats in other third-party platforms (using synthetic events)
  - Privacy considerations and GDPR compliance

### 4.5 Third-Party Platform Integration Guide

Documentation will provide guidance for tracking Highlight and Share events in:

- **Google Analytics 4** — Using gtag events
- **Google Tag Manager** — Using dataLayer events
- **Adobe Analytics** — Using synthetic events
- **Mixpanel** — Using synthetic events
- **Custom Analytics** — Using synthetic events with event listeners

### 4.6 Privacy & Compliance

- Stats dispatching is **disabled by default** to respect user privacy
- No personally identifiable information (PII) is included in events
- Admins must explicitly enable stats dispatching
- Documentation includes GDPR compliance guidance
- Events can be filtered or modified via WordPress filters before dispatching

---

## 5. Versioning Rationale

This release is versioned as **5.4**.

Reasons:
- All new functionality is opt-in
- No breaking changes or migrations
- Existing usage and mental models remain intact
- This is a feature expansion and refinement, not a reset

Version 6.0 is reserved for:
- Breaking architectural changes
- Editor-side headline controls
- Preset systems or share templates
- Fundamental shifts in plugin behavior

---

## 6. Risks & Mitigations

### Theme Conflicts
- Mitigated via container exclusions and opt-in defaults

### UI Noise
- Mitigated via hover-only affordances and subtle styling

### Performance
- **Targeted event binding:** Only headings with the `data-has-headline-share` attribute receive event listeners (hover/click)
- **ID-based filtering:** The `the_content` filter only adds the data attribute to headings that have explicit `id` attributes (existing IDs, not auto-generated ones)
- **Scoped DOM queries:** Initial scan only targets headings with IDs, then data attributes mark eligible headings
- No global mutation observers
- Auto-ID generation (if enabled) runs once during `the_content` processing, not on every interaction

---

## Summary

Highlight and Share 5.4 focuses on making sharing more intentional, contextual, and modern without sacrificing performance or trust. Headline Sharing introduces a new interaction pattern that complements existing sharing tools while keeping the plugin lightweight and composable.

