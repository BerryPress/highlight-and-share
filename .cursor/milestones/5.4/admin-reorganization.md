# Admin Interface Reorganization

**Priority:** 2  
**Status:** Not Started  
**Related Section:** Plan Section 2.11

## Overview

Reorganize the admin interface to reduce duplication, improve discoverability, and prepare for the new Headlines tab.

## Goals

- Consolidate duplicated functionality across tabs
- Create shared React components
- Improve UX and discoverability
- Prepare structure for Headlines tab

## Implementation Tasks

### Audit Phase

- [ ] Review all admin tabs for duplicated functionality
- [ ] Identify common UI patterns:
  - Icon selection
  - Network selection
  - Color pickers
  - Post type selectors
- [ ] Document current tab structure and dependencies
- [ ] List all duplicated code patterns

### Shared Components

- [ ] Create `src/react/Components/Shared/` directory
- [ ] Build `IconSelector` component
- [ ] Build `NetworkSelector` component
- [ ] Build `ColorPicker` component
- [ ] Build `PostTypeSelector` component
- [ ] Create shared utilities/hooks if needed

### Refactoring

- [ ] Refactor Appearance tab to use shared components
- [ ] Refactor Block Editor tab to use shared components
- [ ] Refactor Settings tab if applicable
- [ ] Update all tabs to use consistent UI patterns
- [ ] Test all tabs still function correctly

### Documentation

- [ ] Update component documentation
- [ ] Document shared component usage
- [ ] Update admin interface documentation

## Files to Create

- `src/react/Components/Shared/IconSelector/index.js`
- `src/react/Components/Shared/NetworkSelector/index.js`
- `src/react/Components/Shared/ColorPicker/index.js`
- `src/react/Components/Shared/PostTypeSelector/index.js`

## Files to Modify

- `src/react/Appearance/appearance.js`
- `src/react/BlockEditor/block-editor.js`
- `src/react/Settings/settings.js`
- Any other admin React components

## Notes

- Must maintain backward compatibility
- Shared components should be flexible and reusable
- This prepares the foundation for Headlines tab

