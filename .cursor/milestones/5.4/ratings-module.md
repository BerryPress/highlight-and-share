# One-Time Ratings Module

**Priority:** Low (Can be done in parallel)  
**Status:** Not Started  
**Related Section:** Plan Section 2.12

## Overview

Add a user-friendly, one-time ratings prompt that appears after 90 days in the admin options page.

## Goals

- Show ratings prompt after 90 days
- Display only in admin options page
- Dismissible per user
- Never show again once dismissed

## Implementation Tasks

### Backend (PHP)

#### Activation Tracking

- [ ] Add activation date tracking on plugin activation
- [ ] Store in `highlight-and-share-activation-date` option
- [ ] Handle upgrade scenarios (migrate if needed)
- [ ] Test activation date is saved correctly

#### Dismissal Tracking

- [ ] Create user meta key: `_has_ratings_dismissed`
- [ ] Implement AJAX handler for dismissal
- [ ] Verify nonce and permissions
- [ ] Save dismissal to user meta
- [ ] Test dismissal is saved per user

#### Display Logic

- [ ] Check if 90+ days since activation
- [ ] Check if user has dismissed
- [ ] Only show on Highlight and Share options page
- [ ] Pass display state to frontend

### Frontend (React)

#### Component

- [ ] Create `src/react/Components/RatingsPrompt/index.js`
- [ ] Design non-intrusive notice/banner
- [ ] Add friendly message
- [ ] Add link to WordPress.org review page
- [ ] Add dismiss button
- [ ] Implement dismissal handler
- [ ] Style to match admin interface

#### Integration

- [ ] Add component to admin options page
- [ ] Conditionally render based on backend state
- [ ] Handle dismissal via AJAX
- [ ] Update UI after dismissal

### Testing

- [ ] Test activation date tracking
- [ ] Test 90-day calculation
- [ ] Test dismissal per user
- [ ] Test dismissal persists
- [ ] Test component doesn't show after dismissal
- [ ] Test only shows on options page
- [ ] Test upgrade scenarios

## Files to Create

- `src/react/Components/RatingsPrompt/index.js`
- AJAX handler in `php/Admin.php`

## Files to Modify

- `highlight-and-share.php` - Activation hook
- `php/Admin.php` - Display logic and AJAX
- `src/react/Settings/settings.js` - Component integration
- Or create separate admin wrapper component

## Notes

- Should be non-intrusive
- Respects user choice (no re-showing)
- Only appears in options page
- Can be implemented in parallel with other features

