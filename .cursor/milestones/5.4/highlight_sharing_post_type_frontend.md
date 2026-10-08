# Highlight Sharing: Post-Type Frontend Behavior

**Related:** Post-Type Sidebar (per-post meta), Plan 2.7 Per-Post Control  
**Status:** Not Started  
**Depends on:** Post meta `_has_post_settings['highlight_sharing']` and filter `has_highlight_sharing_enabled_for_post` (implemented in PostSettings)

---

## Overview

On the **frontend**, we must disable or enable **highlight sharing** (social sharing via text selection) based on **post meta** when set, while still respecting **global options** such as `enable_content` and `enable_excerpt`. The existing filter `has_highlight_sharing_enabled_for_post( $enabled, $post_id )` already encapsulates the logic (disabled / default / enabled); the frontend must call it wherever it decides to output or attach highlight sharing for a given post.

---

## Goals

- **Respect post meta:** If a post has `highlight_sharing` = `disabled`, do not enable highlight sharing for that post’s content/excerpt, regardless of global settings. If `enabled`, enable for that post even when global is off. If `default`, use the global setting.
- **Respect existing options:** Use `enable_content` and `enable_excerpt` as the **global** “enabled” state passed into the filter. **Respect the Highlight and Share `excluded_post_types` option:** if the current post’s type is in the excluded list, do not enable highlight sharing for that post (no wrapper). Do not change how other options (e.g. networks, mobile, shortcodes) work.
- **Single source of truth:** All per-post decisions go through `has_highlight_sharing_enabled_for_post`. No duplicate logic in the frontend.
- **No breaking changes:** Behavior for posts with no meta (or `default`) stays the same as today.

---

## Current Behavior (Reference)

- **wp_loaded:** If `apply_filters( 'has_enable_content', $settings['enable_content'] )` is true, `the_content` gets `content_area()`. If `has_enable_excerpt` is true, `the_excerpt` gets `excerpt_area()`.
- **content_area( $content ):**
  - Runs in loop context; uses `global $post` and `$post->ID`.
  - Always wraps content in a div with class `has-content-area` (and related data attributes).
  - Does **not** currently check post meta.
- **excerpt_area( $content ):**
  - Same idea for excerpts; adds `has-excerpt-area` wrapper.
  - Does **not** currently check post meta.
- **add_scripts():**
  - Builds JS selectors from options: e.g. adds `.has-content-area` when `enable_content` is true, `.has-excerpt-area` when `enable_excerpt` is true.
  - Script is enqueued globally when any sharing is on; selectors are one shared list. No per-post selector list.

---

## Intended Behavior

### Content (main post body)

- **Global gate:** Continue to add the `the_content` filter only when `apply_filters( 'has_enable_content', $settings['enable_content'] )` is true.
- **Excluded post types gate:** Inside `content_area( $content )`, after resolving `$post_id`, get the post type. If the current post’s type is in the `excluded_post_types` option (see **Options** below for format), return `$content` unchanged (no wrapper).
- **Per-post gate:** Before adding the wrapper:
  - Get global state: `$global_enabled = (bool) apply_filters( 'has_enable_content', (bool) $settings['enable_content'] );`
  - Get effective state for this post: `$enabled = apply_filters( 'has_highlight_sharing_enabled_for_post', $global_enabled, $post_id );`
  - If `! $enabled`, return `$content` **unchanged** (no wrapper, no `has-content-area`).
- **Result:** Excluded post types and disabled posts never get the wrapper. No change to selector building in `add_scripts()`.

### Excerpts

- **Global gate:** Continue to add the `the_excerpt` filter only when `apply_filters( 'has_enable_excerpt', $settings['enable_excerpt'] )` is true.
- **Excluded post types gate:** Inside `excerpt_area( $content )`, after resolving `$post_id`, if the current post’s type is in `excluded_post_types`, return `$content` unchanged.
- **Per-post gate:** Before adding the wrapper:
  - `$global_enabled = (bool) apply_filters( 'has_enable_excerpt', (bool) $settings['enable_excerpt'] );`
  - `$enabled = apply_filters( 'has_highlight_sharing_enabled_for_post', $global_enabled, $post_id );`
  - If `! $enabled`, return `$content` unchanged (no `has-excerpt-area` wrapper).
- **Result:** Same pattern as content; excluded post types and post meta govern both content and excerpt.

### Scripts and selectors

- **No change to selector building.** We still add `.has-content-area` when `enable_content` is true and `.has-excerpt-area` when `enable_excerpt` is true. Disabled posts simply do not get those elements in the DOM, so the existing script behavior remains correct on archives and single views.

### Other contexts (out of scope for this plan)

- **Shortcode** (`has_click_to_share`), **comments**, **image sharing**, **blocks**: Not changed by this plan. They can later be gated by their own post meta (e.g. `image_sharing`) using the same pattern if desired.

---

## Implementation Tasks

### Frontend.php: content_area()

- [ ] After existing checks (`in_the_loop`, `$post` object, `is_admin`), resolve `$post_id`.
- [ ] Get options once (e.g. `Options::get_plugin_options()`).
- [ ] **Excluded post types:** Get `$post_type = get_post_type( $post_id );` and normalized excluded list from `$settings['excluded_post_types']` (array of slugs or object of slug => true; normalize to list of excluded slugs). If `$post_type` is in that list, `return $content;` (no wrapper).
- [ ] Compute `$global_enabled` for content: `apply_filters( 'has_enable_content', (bool) $settings['enable_content'] )`.
- [ ] Call `$enabled = apply_filters( 'has_highlight_sharing_enabled_for_post', $global_enabled, $post_id );`
- [ ] If `! $enabled`, `return $content;` (no wrapper).
- [ ] Otherwise keep existing wrapper logic unchanged.

### Frontend.php: excerpt_area()

- [ ] After existing checks, resolve `$post_id`.
- [ ] Get options and check **excluded post types** the same way as in `content_area()`; if current post type is excluded, `return $content;`.
- [ ] Compute `$global_enabled` for excerpt: `apply_filters( 'has_enable_excerpt', (bool) $settings['enable_excerpt'] )`.
- [ ] Call `$enabled = apply_filters( 'has_highlight_sharing_enabled_for_post', $global_enabled, $post_id );`
- [ ] If `! $enabled`, `return $content;` (no wrapper).
- [ ] Otherwise keep existing wrapper logic unchanged.

### PostSettings (already implemented)

- [ ] Confirm `filter_highlight_sharing_for_post( $enabled, $post_id )` is registered and returns:
  - `false` when meta is `disabled`;
  - `true` when meta is `enabled`;
  - `(bool) $enabled` when meta is `default` or missing.
- [ ] No change required if behavior above is already correct.

### Tests and edge cases

- [ ] Single post: meta `disabled` → no content/excerpt wrapper; meta `enabled` → wrapper even if global off; meta `default` → follows global.
- [ ] **Excluded post types:** Post type in `excluded_post_types` → no wrapper for content/excerpt, regardless of meta or global content/excerpt settings.
- [ ] Archive: multiple posts; each post’s content/excerpt uses its own post type and meta (wrapper only when not excluded and filter returns true).
- [ ] No meta saved (legacy posts): treated as `default`; behavior matches current (global only), still subject to excluded_post_types.
- [ ] Ensure `enable_content` / `enable_excerpt` still control whether the filters are added at all; excluded_post_types and post meta only apply when we’re in content_area/excerpt_area for a specific post.

---

## Files to Modify

- `php/Frontend.php` — add per-post check in `content_area()` and `excerpt_area()` using `has_highlight_sharing_enabled_for_post`.

---

## Options Respected (summary)

| Option / filter              | Role |
|-----------------------------|------|
| `enable_content`            | Global toggle for adding `the_content` filter and for “default” per-post behavior. |
| `enable_excerpt`            | Global toggle for adding `the_excerpt` filter and for “default” per-post behavior. |
| `excluded_post_types`       | List of post type slugs where highlight sharing is disabled. If the current post’s type is in this list, do not add content/excerpt wrapper (checked in `content_area()` and `excerpt_area()`). Stored as array or object (slug => true); normalize to array of slugs when checking. |
| `has_enable_content`        | Filter around global content setting; already used when adding the filter. |
| `has_enable_excerpt`        | Filter around global excerpt setting; already used when adding the filter. |
| Post meta `highlight_sharing` | Per-post override (disabled / default / enabled) via `has_highlight_sharing_enabled_for_post`. |

Other options (networks, mobile, shortcodes, etc.) are unchanged and continue to work as they do today.

---

## Notes

- Post meta is set in the Block Editor sidebar or Classic Editor meta box (see post-type-sidebar.md). This plan only covers **frontend** behavior when rendering content/excerpt.
- The same `highlight_sharing` meta is used for both content and excerpt (one toggle per post for “social sharing via highlight”).
- **Order of checks:** (1) Excluded post type → no wrapper. (2) Global enable_content/enable_excerpt + `has_highlight_sharing_enabled_for_post` → if false, no wrapper. (3) Otherwise add wrapper.
- Future per-post toggles (e.g. image_sharing) can follow the same pattern: a filter per feature and early return in the corresponding frontend method when disabled for that post.
