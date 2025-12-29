# Web Share API Improvements

**Priority:** 3  
**Status:** Not Started  
**Related Section:** Plan Section 1.2

## Overview

Enhance Web Share API detection, promotion, and integration with the network registry.

## Goals

- Improve Web Share detection (capability-based, no UA sniffing)
- Visually promote Web Share in the UI when supported
- Allow Web Share to be prioritized in network list
- Gracefully handle unsupported environments
- Better integration with network registry

## Implementation Tasks

### Detection & Capabilities

- [ ] Review current Web Share detection implementation
- [ ] Ensure capability-based detection (`navigator.share`)
- [ ] Remove any UA sniffing if present
- [ ] Add Web Share capability flag to network registry
- [ ] Test detection across different browsers/devices

### UI Enhancements

- [ ] Enhance visual presentation of Web Share option
- [ ] Add ability to prioritize Web Share in network list
- [ ] Implement graceful hiding/demotion when unsupported
- [ ] Ensure layout doesn't break when Web Share is hidden
- [ ] Update styling to make Web Share more prominent

### Network Registry Integration

- [ ] Ensure Web Share is properly defined in network registry
- [ ] Add `supportsWebShare` capability flag
- [ ] Update network order/display logic
- [ ] Test Web Share appears correctly in all contexts

### Testing

- [ ] Test on devices with Web Share support
- [ ] Test on devices without Web Share support
- [ ] Verify graceful degradation
- [ ] Test prioritization feature
- [ ] Check all sharing contexts (block, selection, inline, etc.)

## Files to Modify

- `src/frontendjs/highlight-and-share.js` - Detection and display logic
- `php/Options.php` - Network registry definitions
- `src/react/Components/SocialIcons/index.js` - Icon display
- CSS files for styling

## Notes

- Must not break existing functionality
- Should work seamlessly with network registry refactor
- No forced replacement of existing networks

