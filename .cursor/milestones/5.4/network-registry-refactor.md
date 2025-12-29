# Network Registry Refactor

**Priority:** 1  
**Status:** Not Started  
**Related Section:** Plan Section 3

## Overview

Refactor the social network registration system to use a centralized registry pattern, reducing maintenance overhead and providing a foundation for other features.

## Goals

- Centralize network definitions in `Options::get_social_network_defaults()`
- Reduce code duplication across multiple files
- Make adding/modifying networks a single, predictable change
- Prepare network registry for Headline Sharing and other features

## Implementation Tasks

### Backend (PHP)

- [ ] Review current network definitions across codebase
- [ ] Refactor `Options::get_social_network_defaults()` to include all network properties
- [ ] Add capability flags to network definitions:
  - `supportsWebShare`
  - `supportsCopy`
  - `requiresPopup`
- [ ] Update network structure to match plan specifications
- [ ] Ensure backward compatibility with existing options
- [ ] Test network loading and option merging

### Frontend (JavaScript)

- [ ] Update JavaScript to use centralized network definitions
- [ ] Refactor network class selectors to derive from registry
- [ ] Update event handlers to use registry capabilities
- [ ] Test all sharing methods work correctly

### Testing

- [ ] Test all existing networks still work
- [ ] Verify network order and display
- [ ] Test custom networks (if applicable)
- [ ] Check backward compatibility with saved options

## Files to Modify

- `php/Options.php` - Network registry definitions
- `src/frontendjs/highlight-and-share.js` - Network usage
- `src/react/Components/SocialIcons/index.js` - Icon mapping
- Any other files that reference network definitions

## Notes

- This is the foundation for other features
- Must maintain backward compatibility
- Network registry will be shared by block and headline sharing

