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
- [ ] Add new top-level **Stats** (or **Analytics**) admin tab (fifth tab; nav item, container, React app under `src/react/Stats/`, enqueue when `tab=stats`); tab contains master toggle, per-method toggles, and documentation links
- [ ] Add documentation links to admin interface

### Shared stats dispatch helper

- [ ] Create shared helper module (e.g. `src/frontendjs/stats-dispatcher.js`) that dispatches to all channels: dataLayer (when present), gtag (when `typeof window.gtag === 'function'`), and synthetic CustomEvent (when config allows)
- [ ] Helper exports a single function (e.g. `dispatchStatsEvent( payload, options )`) accepting standardized payload and options (e.g. `dispatchSynthetic` from localized config)
- [ ] Refactor `src/frontendjs/highlight-and-share.js` to import and use the helper instead of inline dataLayer logic
- [ ] Refactor `src/frontendjs/has-image-sharing.js` to import and use the helper instead of inline dataLayer logic
- [ ] Use the same helper for future consumers (e.g. headlines); no duplicate dispatch logic in new scripts

### GA4 Implementation

- **Detection:** Use `typeof window.gtag === 'function'` before calling gtag; only call `window.gtag(...)` when the option `enable_ga4` is true and that check passes (avoids errors when GA4/gtag is not present).
- [ ] Detect `gtag` availability (per above)
- [ ] Implement GA4 event dispatching
- [ ] Map existing event data to GA4 format
- [ ] Test GA4 event tracking
- [ ] Handle cases where GA4 not available

### Synthetic Events

- **Default behavior:** Dispatch synthetic events (CustomEvent) by default; no admin toggle.
- **Filter to disable:** Provide a WordPress filter (e.g. `has_dispatch_synthetic_events`) so themes/plugins can disable dispatching (default `true`); pass the filtered value to the frontend via localized config so the script only dispatches when enabled.
- [ ] Implement custom DOM event dispatching
- [ ] Use `window.dispatchEvent(new CustomEvent(...))`
- [ ] Include event detail data
- [ ] Apply filter in PHP (e.g. `apply_filters( 'has_dispatch_synthetic_events', true )`) and expose to frontend
- [ ] Test event listeners can receive events
- [ ] Document event structure and filter name for third-party platforms

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

- `src/frontendjs/highlight-and-share.js` - Event dispatching logic (and any other frontend script that dispatches GA4)
- `php/Options.php` - Options structure
- `php/Frontend.php` - Options localization
- `php/Admin.php` - New Stats tab (nav item, container div, enqueue Stats script when `tab=stats`)
- Documentation files

## Files to Create

- `src/frontendjs/stats-dispatcher.js` - Shared helper for dataLayer, gtag, and synthetic event dispatch (imported by highlight-and-share.js, has-image-sharing.js, and future headlines)
- `src/react/Stats/` - New React app for Stats tab (e.g. `stats.js`, `index.js`), build entry e.g. `has-admin-stats.js`
- Documentation for GA4 integration
- Documentation for GTM integration
- Documentation for synthetic events
- Third-party platform guides

## Notes

- Stats dispatching disabled by default for privacy (where options exist); synthetic events are dispatched by default but can be disabled via `has_dispatch_synthetic_events` filter.
- Must respect user privacy and GDPR
- Events should be filterable via WordPress filters

