# Image Sharing in Post-Type Sidebar — Per-Post Control for Image Sharing

**Related:** [post-type-sidebar.md](./post-type-sidebar.md), Image Sharing (Images tab, Frontend image filters)  
**Status:** Implemented

---

## Overview

Add **Image sharing** as a second per-post control in the existing **Highlight and Share** sidebar (Block Editor panel and Classic Editor meta box). Same pattern as **Social Sharing via Highlight**: one **ToggleGroupControl** with **Disabled | Default | Enabled** so authors can override global image sharing settings per post or page.

**Scope:**

- Expose `image_sharing` in the existing sidebar UI (Block + Classic).
- Store and read `_has_post_settings['image_sharing']` (already in schema and allowed keys).
- Frontend: respect per-post setting when applying image sharing (content, excerpts, featured image) and when enqueuing the image sharing script.

**Out of scope for this milestone:**

- Additional per-post image options (e.g. networks, style) — same sidebar, single ToggleGroupControl only.
- Changing global Image Sharing options (Images tab) — sidebar only overrides at the post level.

---

## Goals

- One consistent per-post control for image sharing in both Block and Classic editors, alongside the existing highlight-sharing control.
- Reuse existing `_has_post_settings` meta and PostSettings helpers; no new meta keys.
- Frontend uses a single filter (e.g. `has_image_sharing_enabled_for_post`) to decide effective image-sharing state per post, mirroring `has_highlight_sharing_enabled_for_post`.

---

## Non-Goals

- Per-image or per-block image sharing overrides.
- New sidebar or new meta box — image sharing is a second row in the existing HAS panel/meta box.

---

## Current State (Reference)

- **Post meta:** `PostSettings::META_KEY` = `_has_post_settings`. Keys include `highlight_sharing`, `image_sharing`, `headline_sharing`. Values: `'disabled' | 'default' | 'enabled'`. REST schema and `sanitize_post_settings` already allow `image_sharing`.
- **Block Editor:** `src/post-sidebar/index.js` — one panel “Highlight and Share” with a single ToggleGroupControl bound to `highlight_sharing` (labeled “Social Sharing via Highlight”). Uses `useEntityProp` for meta read/write.
- **Classic Editor:** `PostSettings::render_classic_meta_box()` — one fieldset “Social Sharing via Highlight” with radio options; `save_classic_meta_box()` saves full `has_post_settings` array (sanitized). No image_sharing row yet.
- **Frontend:** Image sharing is gated by global options (`enable_image_sharing`, post type support, context). No per-post check yet; no filter `has_image_sharing_enabled_for_post` or PostSettings callback for it.

---

## Implementation Plan

### 1. Post meta and PHP (already in place)

- **Meta key:** `_has_post_settings['image_sharing']` = `'disabled' | 'default' | 'enabled'` (default `'default'`).
- **PostSettings:** `ALLOWED_KEYS` and REST schema already include `image_sharing`. No PHP schema changes required.
- **New:** Add `PostSettings::filter_image_sharing_for_post( $enabled, $post_id )` and register it on `has_image_sharing_enabled_for_post`, mirroring `filter_highlight_sharing_for_post`: if `'disabled'` return false; if `'enabled'` return true; otherwise return (bool) `$enabled` (global).

### 2. Block Editor — Document panel

- **File:** `src/post-sidebar/index.js`.
- **Change:** Add a second ToggleGroupControl in the same `PluginDocumentSettingPanel`:
  - Label: e.g. “Image sharing” (or “Pinterest & Web Share on images”).
  - Value from `settings?.image_sharing ?? 'default'`.
  - Update handler: merge into `meta[META_KEY]` with `image_sharing: newVal`, preserving existing keys (e.g. `highlight_sharing`).
- **Result:** Panel shows two rows: Social Sharing via Highlight (existing), Image sharing (new). Same three options each.

### 3. Classic Editor — Meta box

- **File:** `php/PostSettings.php` — `render_classic_meta_box()`.
- **Change:** Add a second fieldset (or labeled row) for “Image sharing” with the same three radio options (`disabled` / `default` / `enabled`), name `has_post_settings[image_sharing]`, current value from `$settings['image_sharing']`.
- **Save:** No change — `save_classic_meta_box()` already sanitizes and saves the full `$_POST['has_post_settings']` array; the new field will be included once the HTML name is `has_post_settings[image_sharing]`.

### 4. Frontend — When to apply image sharing per post

Image sharing is applied in several places; each must consider the current post and call the new filter.

- **Global gate (script/style enqueue):** `Frontend::should_load_image_sharing_script()` currently checks context (singular/archive), global `enable_image_sharing`, and supported post type. On **singular** we have a single post ID (`get_queried_object_id()` or similar). If per-post is `'disabled'`, we should not enqueue the image sharing script for that post. On **archives**, the script is loaded if any post type in the loop could use it; per-post is then evaluated per post in the loop for actual HTML (see below). Decision: either (a) on singular only, also check `apply_filters( 'has_image_sharing_enabled_for_post', $global, $post_id )` and skip enqueue if false, or (b) always enqueue when global + context allow, and rely on not outputting wrapper when per-post is disabled. Option (b) is simpler and avoids conditional script loading per post; the wrapper simply isn’t added when the filter returns false.
- **Content (the_content):** Runs in loop or singular. When we have a post ID (e.g. from `get_the_ID()` in the loop or singular), before adding image sharing markup call `$enabled = apply_filters( 'has_image_sharing_enabled_for_post', (bool) $options['enable_image_sharing'], $post_id );` and skip wrapping if ! $enabled.
- **Excerpt (the_excerpt):** Same as content: get post ID from context, apply filter, skip if disabled for that post.
- **Featured image (post_thumbnail_html):** Filter receives `$post_id`. Before wrapping, call the same filter with that `$post_id` and skip if disabled.

**Filter signature:** `has_image_sharing_enabled_for_post( bool $enabled, int $post_id )`. First argument is the “global” enabled state (e.g. from `enable_image_sharing` and post type support); second is the post ID. PostSettings’ callback resolves disabled/default/enabled and returns the effective boolean.

### 5. Order of checks (frontend)

For each of the_content, the_excerpt, post_thumbnail_html:

1. Existing checks (admin, feed, empty content, post type support, etc.).
2. Global image sharing option (e.g. `enable_image_sharing`) and any context rules (excerpts, featured).
3. **New:** `$enabled = apply_filters( 'has_image_sharing_enabled_for_post', $global_enabled, $post_id );` — if false, do not add image sharing for this post.

Where `$global_enabled` is already derived from options (e.g. true when global image sharing is on and post type is supported). The filter then applies the per-post override (disabled / default / enabled).

---

## File / Code Summary

| Area | File | Change |
|------|------|--------|
| PHP | `php/PostSettings.php` | Add `filter_image_sharing_for_post()`; register on `has_image_sharing_enabled_for_post`. Add image_sharing row in `render_classic_meta_box()`. |
| Block Editor | `src/post-sidebar/index.js` | Add second ToggleGroupControl for “Image sharing”, bound to `settings.image_sharing`, update meta preserving other keys. |
| Frontend | `php/Frontend.php` | In `add_image_sharing_html()` (and any helper used for content/excerpt), get post ID and call `apply_filters( 'has_image_sharing_enabled_for_post', $global, $post_id )`; skip if false. In `add_featured_image_sharing_html()` use `$post_id` and the same filter. Optionally in `should_load_image_sharing_script()` for singular: skip enqueue if filter returns false for queried post (optional). |

---

## Testing Checklist

- [ ] Block Editor: Panel shows “Image sharing” with Disabled / Default / Enabled; value persists and reads back.
- [ ] Classic Editor: Meta box shows “Image sharing” row; value saves and reads back.
- [ ] Singular post with Image sharing = Disabled: no image sharing wrapper in content, excerpt, or featured image (and optionally no script when only that post is viewed).
- [ ] Singular post with Image sharing = Default: behavior matches global Image Sharing setting.
- [ ] Singular post with Image sharing = Enabled: image sharing appears even if global is off (for that post type).
- [ ] Archive: each post in the loop respects its own meta (Disabled / Default / Enabled) for content and excerpt and featured image where applicable.

---

## Questions

1. **Label in UI:** Prefer “Image sharing”, “Pinterest & Web Share on images”, or “Image sharing (Pinterest & Web Share)” for the sidebar/meta box row? **Answer** Image sharing.
2. **Script enqueue on singular:** When the only visible content is one post and that post has Image sharing = Disabled, should we skip enqueuing the image sharing script and CSS for that request to save a bit of payload, or always enqueue when global + context allow and rely only on not rendering the wrapper? (Current recommendation: don’t conditionally skip enqueue; keep logic simple and only gate output.) **Answer** If image sharing is disabled for the post, then the script should not load for that post. We can move the enqueue logic to its own function, so we can call the enqueuing conditionally, and just have it load in the footer.
3. **Archives / loop:** Confirm that on archive pages we have a reliable post ID (e.g. `get_the_ID()`) when the_content and the_excerpt run in the loop, so the filter can be called with the correct post ID for each post. (Assumption: yes; standard loop provides it.) **Answer** Yes, on archive pages, that is a valid assumption, although checks should be placed on the ID to make sure it's a post object.
4. **Default value for existing posts:** Posts with no `image_sharing` meta should behave as “default” (follow global). PostSettings::get( $post_id, 'image_sharing', 'default' ) already returns `'default'` when unset; filter will then return global state. No migration needed. **Answer** Correct.

---

## Summary

| Aspect | Block Editor | Classic Editor | Frontend |
|--------|--------------|----------------|----------|
| UI | Second ToggleGroupControl: “Image sharing” (Disabled / Default / Enabled) | Second fieldset: same three options | — |
| Meta | `_has_post_settings['image_sharing']` (already in schema) | Same, saved with existing save handler | — |
| Logic | — | — | `has_image_sharing_enabled_for_post( $enabled, $post_id )`; used in content, excerpt, featured image (and optionally script load). |

One sidebar, two controls (highlight sharing + image sharing). Same pattern, same meta shape, one new filter for frontend.
