# Stats Dispatching Improvements

**Priority:** 5  
**Status:** Not Started  
**Related Section:** Plan Section 4

## Overview

Improve stats dispatching to support GA4, synthetic events, and third-party platforms with proper options and documentation.

## Goals

- Add GA4 auto-dispatch support
- Implement synthetic event dispatching
- Add master toggle (disabled by default)
- Create per-method controls
- Provide documentation links

## Implementation Tasks

### Options & Settings

- [ ] Add `enable_stats_dispatching` option (default: `false`)
- [ ] Add `enable_datalayer` option
- [ ] Add `enable_ga4` option
- [ ] Add `enable_synthetic_events` option
- [ ] Add options to main plugin options structure
- [ ] Create admin UI for stats settings
- [ ] Add documentation links to admin interface

### GA4 Implementation

- [ ] Detect `gtag` availability
- [ ] Implement GA4 event dispatching
- [ ] Map existing event data to GA4 format
- [ ] Test GA4 event tracking
- [ ] Handle cases where GA4 not available

### Synthetic Events

- [ ] Implement custom DOM event dispatching
- [ ] Use `window.dispatchEvent(new CustomEvent(...))`
- [ ] Include event detail data
- [ ] Test event listeners can receive events
- [ ] Document event structure for third-party platforms

### DataLayer (GTM)

- [ ] Maintain existing `dataLayer.push()` functionality
- [ ] Ensure backward compatibility
- [ ] Test GTM integration still works

### Event Structure

- [ ] Standardize event data structure across all methods
- [ ] Include all required fields:
  - `event` / event name
  - `hasShareText`
  - `hasSharePostUrl`
  - `hasSharePostTitle`
  - `hasShareType`
  - `hasSocialNetwork`
- [ ] Test event data consistency

### Documentation

- [ ] Create documentation for GA4 tracking
- [ ] Create documentation for GTM tracking
- [ ] Create documentation for synthetic events
- [ ] Add third-party platform integration guides:
  - Adobe Analytics
  - Mixpanel
  - Custom analytics
- [ ] Add privacy/GDPR compliance guidance
- [ ] Link documentation in admin interface

### Testing

- [ ] Test all dispatching methods work independently
- [ ] Test multiple methods can be enabled simultaneously
- [ ] Test master toggle disables all methods
- [ ] Test per-method toggles work correctly
- [ ] Verify no events sent when disabled
- [ ] Test with actual GA4, GTM setups

## Files to Modify

- `src/frontendjs/highlight-and-share.js` - Event dispatching logic
- `php/Options.php` - Options structure
- `php/Frontend.php` - Options localization
- `src/react/Settings/settings.js` - Admin UI
- Documentation files

## Files to Create

- Documentation for GA4 integration
- Documentation for GTM integration
- Documentation for synthetic events
- Third-party platform guides

## Notes

- Stats dispatching disabled by default for privacy
- Must respect user privacy and GDPR
- Events should be filterable via WordPress filters

