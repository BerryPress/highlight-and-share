# Headlines Feature

**Priority:** 6  
**Status:** Not Started  
**Related Section:** Plan Section 2

## Overview

Implement headline sharing functionality, including H1/post title support, admin interface, and frontend implementation.

## Goals

- Implement headline sharing for H2–H4 (and optional H1)
- Create Headlines admin tab
- Build React interface for configuration
- Implement frontend JavaScript functionality
- Support auto-ID generation (optional)

## Implementation Tasks

### Backend (PHP)

#### Options & Defaults

- [x] Create `Options::get_headline_defaults()` method
- [ ] Create `Options::get_headline_options()` method
- [ ] Add all headline options to defaults:
  - `enable_headline_sharing`
  - `enable_h1_sharing`
  - `auto_generate_ids`
  - `enabled_heading_levels`
  - `supported_post_types`
  - `selector_mode`
  - `inclusion_selectors`
  - `exclusion_selectors`
  - `default_networks`
- [ ] Store in `highlight-and-share-headline-options`

#### Content Processing

- [ ] Implement `the_content` filter hook (late priority: 100)
- [ ] Scan headings (H2–H4) with IDs
- [ ] Add `data-has-headline-share` attribute
- [ ] Implement auto-ID generation (if enabled)
- [ ] Implement `the_title` filter for H1 support
- [ ] Add container exclusion checks

#### Admin Tab

- [ ] Add "Headlines" tab to admin navigation
- [ ] Register AJAX handlers:
  - `has_load_headlines_tab`
  - `has_save_headlines_tab`
  - `has_reset_headlines_tab`
- [ ] Add tab content area in `Admin::options_page()`

#### Post Meta

- [ ] Add post meta for per-post control
- [ ] Create meta box (or add to existing)
- [ ] Implement save/retrieve logic

### Frontend (React)

#### Headlines Tab Interface

- [ ] Create `src/react/Headlines/headlines.js`
- [ ] Build settings sections:
  - Feature toggle
  - Heading levels selection
  - Post types selector
  - Icon selection (use shared component)
  - Appearance settings
  - Selector configuration
  - Container exclusions
  - Network selection
  - Auto-ID generation toggle
- [ ] Add preview area
- [ ] Implement save/reset functionality

#### Shared Components

- [ ] Use shared `IconSelector` component
- [ ] Use shared `NetworkSelector` component
- [ ] Use shared `PostTypeSelector` component
- [ ] Create headline-specific components if needed

### Frontend (JavaScript)

#### Core Functionality

- [ ] Create `src/frontendjs/headline-sharing.js`
- [ ] Implement DOM scanning for headings with data attribute
- [ ] Add hover/click event handlers
- [ ] Create headline share drawer/modal
- [ ] Integrate with network registry
- [ ] Implement copy link functionality
- [ ] Implement Web Share functionality
- [ ] Implement social network sharing

#### H1/Post Title Support

- [ ] Implement JavaScript fallback for H1
- [ ] Use targeted selectors for common themes
- [ ] Add data attribute to matching H1 elements
- [ ] Test across different theme structures

### Testing

- [ ] Test headline sharing on H2–H4
- [ ] Test H1 sharing (if enabled)
- [ ] Test auto-ID generation
- [ ] Test container exclusions
- [ ] Test inclusion/exclusion selectors
- [ ] Test per-post control
- [ ] Test post type filtering
- [ ] Test all sharing methods work
- [ ] Test accessibility (keyboard, screen readers)
- [ ] Test theme compatibility

## Files to Create

- `src/react/Headlines/headlines.js`
- `src/frontendjs/headline-sharing.js`
- Headlines-specific React components

## Files to Modify

- `php/Options.php` - Headline options
- `php/Admin.php` - Headlines tab
- `php/Frontend.php` - Content processing hooks
- `webpack.config.js` - New entry points
- Build configuration

## Notes

- Feature is opt-in (disabled by default)
- Must fail gracefully if theme incompatible
- Should use shared components from admin reorganization
- H1 support requires both PHP and JavaScript implementation

