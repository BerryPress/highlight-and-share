# Phase 5: Display Rules Panel - Implementation Plan

## Overview

Phase 5 implements the Display Rules Panel, which consolidates display-related settings from the Settings tab into a single collapsible panel. This includes content area toggles, mobile settings, text prefix/suffix, and introduces a new **Post Type Selector** feature.

## Options Audit

### ✅ Already in Defaults (from `php/Options.php`)

These options are already part of the main plugin options and will be included in the form defaults:

1. **Content Area Toggles:**
   - `enableContent` (default: `true`) - Enable on Post Content
   - `enableExcerpt` (default: `true`) - Enable on Post Excerpt
   - `enableComments` (default: `false`) - Enable for Comments Section

2. **Mobile Toggle:**
   - `enableMobile` (default: `true`) - Enable on Mobile Devices

3. **Text Settings:**
   - `sharingPrefix` (default: `''`) - Sharing Text Before
   - `sharingSuffix` (default: `''`) - Sharing Text After

### 🆕 New Feature: Post Type Exclusion

**Status:** This is a **NEW feature** - post types are NOT currently stored as options for the main sharing feature.

**Current State:**
- Post types are only used in the Images tab (`hasImagesAdmin.postTypes`)
- Main sharing feature currently works on ALL post types by default
- No post type restriction exists in the current implementation

**Proposed Implementation:**
- Add `excludedPostTypes` option to store excluded post types
- **Exclusion Model:** All post types enabled by default, user can exclude specific ones
- Default: Empty array `[]` (no exclusions = all enabled, backward compatible)
- Store as object: `{ 'attachment': true, 'revision': true, ... }` (only excluded ones)
- More intuitive UX: don't need to select all post types, just exclude what you don't want

## Implementation Plan

### 1. Update PHP Defaults

**File:** `php/Options.php`

Add to `get_defaults()`:
```php
'excluded_post_types' => array(
    // Empty by default - all post types enabled
    // User can exclude specific post types they don't want
),
```

**Considerations:**
- Default to empty array (no exclusions = all enabled)
- Backward compatible: existing sites work on all post types
- Only store post types that are explicitly excluded
- Frontend logic: if post type is in `excludedPostTypes`, don't enable sharing

### 2. Update PHP Admin Handler

**File:** `php/Admin.php`

**In `ajax_retrieve_settings_tab()`:**
- Add `postTypes` to the return array (similar to Images tab)
- Format: `array( 'label' => 'Post', 'value' => 'post' )`

**In `ajax_save_settings_tab()`:**
- Handle `excludedPostTypes` in the save handler
- Sanitize as array of post type slugs
- Store as object with boolean values (only excluded post types)
- If empty, store as empty array (not all post types)

**In `enqueue_admin_scripts()`:**
- Add `postTypes` to `hasSharingAdmin` localization (when enqueueing Sharing tab)
- Use same logic as Images tab to get public post types

### 3. Update Form Defaults

**File:** `src/react/Sharing/sharing.js`

Add to `getDefaultValues()`:
```javascript
// Display Rules options
enableMobile: values.enableMobile ?? true,
enableContent: values.enableContent ?? true,
enableExcerpt: values.enableExcerpt ?? true,
enableComments: values.enableComments ?? false,
sharingPrefix: escapeEditableHTML( values.sharingPrefix || '' ),
sharingSuffix: escapeEditableHTML( values.sharingSuffix || '' ),

// Post Types Exclusion (new feature)
excludedPostTypes: values.excludedPostTypes || {}, // Object: { 'attachment': true, ... } - only excluded ones
```

### 4. Create PostTypeSelector Component

**File:** `src/react/Components/Shared/PostTypeSelector/index.js`

**Design:**
- Similar pattern to `NetworkSelector` but simpler (no gear icons)
- Checkbox list layout (not grid)
- Uses `CheckboxControl` from `@wordpress/components`
- Integrates with React Hook Form via `Controller`
- **Exclusion Model:** Checkbox checked = post type is EXCLUDED

**Props:**
- `control` - React Hook Form control
- `postTypes` - Array of `{ label: string, value: string }`
- `excludedPostTypes` - Object mapping excluded post type slugs to boolean (from form state)

**Implementation Pattern:**
```javascript
<BaseControl 
  label={__('Excluded Post Types', 'highlight-and-share')} 
  help={__('Select post types where sharing should be disabled. All post types are enabled by default.', 'highlight-and-share')}
>
  {postTypes.map((postType) => (
    <Controller
      key={postType.value}
      name={`excludedPostTypes[${postType.value}]`}
      control={control}
      render={({ field: { onChange, value } }) => (
        <CheckboxControl
          label={postType.label}
          checked={value || false} // Checked = excluded
          onChange={(isExcluded) => {
            onChange(isExcluded);
          }}
        />
      )}
    />
  ))}
</BaseControl>
```

**Label/Help Text:**
- Label: "Excluded Post Types"
- Help: "Select post types where sharing should be disabled. All post types are enabled by default."

**Considerations:**
- Should we show a "Select All" / "Deselect All" button?
- Should we group by common post types (post, page) vs custom post types?
- Should we show count of selected post types?

### 5. Create DisplayRulesPanel Component

**File:** `src/react/Sharing/Panels/DisplayRulesPanel/index.js`

**Structure:**
1. **Post Type Exclusion** (NEW)
   - `PostTypeSelector` component
   - Help text: "All post types are enabled by default. Select post types to exclude from sharing."

2. **Content Areas Section**
   - `enableContent` - ToggleControl
   - `enableExcerpt` - ToggleControl
   - `enableComments` - ToggleControl

3. **Mobile Settings Section**
   - `enableMobile` - ToggleControl

4. **Text Settings Section**
   - `sharingPrefix` - TextControl
   - `sharingSuffix` - TextControl

**Features:**
- Uses `PanelBodyWithIndicator` for panel wrapper
- Uses `useFormContext()` to access global form
- Default collapsed (per milestone requirements)
- Integrates with validation pattern from Phase 4

### 6. Add Panel to Sharing Tab

**File:** `src/react/Sharing/sharing.js`

- Import `DisplayRulesPanel`
- Add to `FormProvider` children
- Position after `SocialNetworksPanel`

## PostTypeSelector Component - Design Considerations

### Option 1: Simple Checkbox List (Recommended)
- Vertical list of checkboxes
- Similar to Images tab implementation
- Simple, familiar pattern
- Easy to scan and select
- **Checkbox checked = post type is EXCLUDED**

### Option 2: Grouped Layout
- Group common post types (post, page) separately
- Group custom post types together
- More organized for sites with many post types
- Slightly more complex

### Option 3: Grid Layout
- Two-column grid (like NetworkSelector)
- More compact
- Less suitable for long post type names
- Not recommended

### Recommendation: **Option 1 - Simple Checkbox List**

**Rationale:**
- Matches existing Images tab pattern (familiar to users)
- Works well with any number of post types
- Easy to implement and maintain
- Clear and scannable
- Exclusion model is intuitive: check to exclude

**Enhancements to Consider:**
- Add "Exclude All" / "Clear All Exclusions" buttons (optional, nice-to-have)
- Show count: "X post types excluded" (optional, nice-to-have)
- Search/filter for sites with many post types (future enhancement)

## Validation Requirements

Since this is a new panel, we should apply the same validation pattern from Phase 4:

1. **Required Fields:**
   - `sharingPrefix` - Optional (no validation needed)
   - `sharingSuffix` - Optional (no validation needed)
   - `excludedPostTypes` - Optional (no validation needed - can exclude all or none)

2. **Error Indicators:**
   - Panel-level: Red dot on `PanelBodyWithIndicator` when errors exist
   - Field-level: Inline error messages for invalid fields
   - Global error message at top/bottom of panel (if needed)

3. **Reusable Pattern:**
   - Use same error detection utilities as Social Networks Panel
   - Create panel-specific error detection if needed
   - Follow same visual indicator pattern

## Backward Compatibility

**Critical:** Post Type Exclusion is a NEW feature. We must ensure:

1. **Default Behavior:**
   - If `excludedPostTypes` doesn't exist in options, default to empty array `[]`
   - Empty array = no exclusions = all post types enabled (backward compatible)
   - This ensures existing sites continue working without changes

2. **Migration:**
   - No migration needed - defaults handle it
   - First save will populate `excludedPostTypes` as empty array (if user hasn't excluded any)

3. **Frontend:**
   - Update frontend code to check `excludedPostTypes` option
   - If option doesn't exist or is empty array, enable for all post types (backward compatible)
   - If post type slug exists in `excludedPostTypes` object, disable sharing for that post type

## Files to Create/Modify

### New Files:
1. `src/react/Components/Shared/PostTypeSelector/index.js` - Post type exclusion selector component
2. `src/react/Sharing/Panels/DisplayRulesPanel/index.js` - Display Rules panel

### Files to Modify:
1. `php/Options.php` - Add `excluded_post_types` to defaults (empty array)
2. `php/Admin.php` - Add post types to AJAX response and localization
3. `src/react/Sharing/sharing.js` - Add Display Rules options to defaults, add panel to render
4. `php/Frontend.php` (future) - Check `excludedPostTypes` when initializing sharing (if post type in array, disable)

## Testing Checklist

- [ ] Post types load correctly from PHP
- [ ] All post types unchecked by default (none excluded = all enabled, backward compatible)
- [ ] Can check/uncheck individual post types to exclude them
- [ ] Form state updates correctly (checked = excluded)
- [ ] Save/load works correctly
- [ ] Empty excludedPostTypes array saves correctly
- [ ] Backward compatibility: sites without option still work (all post types enabled)
- [ ] Content area toggles work
- [ ] Mobile toggle works
- [ ] Text prefix/suffix work
- [ ] Panel collapses/expands correctly
- [ ] Panel state persists (user meta)
- [ ] Error indicators work (if validation added)

## Questions for Discussion

1. **Post Type Validation:**
   - ✅ **RESOLVED:** No validation needed - exclusion model allows all to be excluded (disables feature entirely)
   - This is acceptable behavior - user can disable sharing completely if desired

2. **Post Type Defaults:**
   - ✅ **RESOLVED:** Default to empty array (no exclusions = all enabled)
   - Backward compatible and intuitive

3. **UI Enhancements:**
   - Add "Exclude All" / "Clear All Exclusions" buttons? (optional)
   - Show count: "X post types excluded" (optional)
   - Group common vs custom post types? (optional)

4. **Frontend Integration:**
   - When should frontend code be updated to respect post type exclusion?
   - Should this be part of Phase 5 or a separate phase?
   - **Recommendation:** Separate phase - Phase 5 focuses on admin UI, frontend integration can be Phase 5.5 or Phase 6

