# Image Sharing on Excerpts

**Related:** `add_image_sharing_html` (Frontend.php), highlight sharing excerpt (`excerpt_area`), image sharing on archives  
**Status:** Implemented  
**Depends on:** Existing image sharing (Pinterest/Web Share) on `the_content` and optional archive support.

---

## Overview

Enable **image sharing** (Pinterest and Web Share buttons on images) on **excerpt** output (`the_excerpt`), using the same wrapper and options as full content, with one behavioral difference: **do not exclude the leading image** when processing excerpts. A “leading image” is a full-post concept; in excerpt context it does not apply, so the first image in the excerpt should not get sharing buttons (or we treat it as “leading” and skip it).

---

## Goals

- **Enable image sharing on excerpts:** When image sharing is enabled, the new option is enabled, and the excerpt contains images, wrap those images with the same `has-pin-image-wrapper` UI (Pinterest/Web Share) as on `the_content`.
- **Admin option (default false):** Add an option (e.g. `enable_image_sharing_on_excerpts`) in the image-sharing settings, default `false`. Only hook `the_excerpt` and run image sharing on excerpts when this option is true (and image sharing is enabled).
- **Don't Exclude leading image on excerpts:** When processing `the_excerpt`, don't skip the first image (no option) regardless of settings.
- **Reuse existing logic:** Same eligibility (supported post types, not admin/feed, context), same DOM handling, same safeguards (already-processed check, copy images to array, re-entry prevention). No duplicate DOM code.
- **Optional control:** Document a filter (e.g. `has_pin_show_on_excerpts`) so themes/plugins can disable image sharing on excerpts without disabling it on full content. **Note** Please implement.

---

## Current Behavior (Reference)

- **Hooks:** `add_image_sharing_html` is hooked only to `the_content` (priority 15) and `et_pb_post_content_shortcode_output` (priority 11). It is **not** hooked to `the_excerpt`.
- **Excerpts:** `excerpt_area()` adds the `has-excerpt-area` wrapper for **highlight** (text) sharing when `has_enable_excerpt` is true. Image sharing is not applied to excerpt HTML.
- **Leading image:** Option `exclude_leading_image` controls whether the **first** image in the content is skipped. When true, the first image in the loop is not wrapped. This is a content-level concept.
- **Re-entry:** The method removes the `the_content` filter before DOM work and re-adds it at the end (and in the catch block) to avoid re-processing when something inside the filter triggers `the_content` again.

---

## Intended Behavior

### When image sharing runs on excerpts

- Run when:
  - Image sharing is enabled (`enable_image_sharing`).
  - **Image sharing on excerpts is enabled** (`enable_image_sharing_on_excerpts` option, default `false`).
  - Current context is allowed (same as content: not admin, not feed; singular or post type archive when `has_pin_show_on_archives` allows).
  - Current post type is in supported post types.
  - Optional: filter `has_pin_show_on_excerpts` (default `true`) allows; if false, skip image sharing for this excerpt.
- **Excerpt-specific:** When the filter running is `the_excerpt`, **always** treat “exclude leading image” as true (skip the first image). Do not use the `exclude_leading_image` option for excerpts.

### When it does not run

- Same early exits as content: admin, feed, unsupported context, image sharing disabled, unsupported post type, content already contains `has-pin-image-wrapper`.
- If **`enable_image_sharing_on_excerpts` is false**, do not add image sharing to excerpts (option is off).
- If `has_pin_show_on_excerpts` is filtered to false, do not add image sharing to excerpts (content unchanged).

---

## Implementation Steps

### 1. Add admin option (default false)

- **Options.php:** Add `enable_image_sharing_on_excerpts` to image options (e.g. in `get_image_options()` default array), value `false`.
- **Admin UI:** Add a checkbox (or toggle) in the image-sharing settings section: “Enable image sharing on excerpts” (or similar). Save/load via existing image options. Place it near the main “Enable image sharing” control so the relationship is clear (excerpts only apply when both are on).

### 2. Register `the_excerpt` filter conditionally (Frontend.php)

- Only when `enable_image_sharing_on_excerpts` is true (and respecting any filter overrides for that option if added), add: `add_filter( 'the_excerpt', array( $this, 'add_image_sharing_html' ), 15 );`. So the `the_excerpt` filter is registered in the same place as `the_content` for image sharing, but gated by the new option (e.g. after loading image options, if `enable_image_sharing` and `enable_image_sharing_on_excerpts` are both true, register both filters; if only `enable_image_sharing` is true, register only `the_content`).
- Use the same callback so context can be detected via `current_filter()`; no second callback required.

### 3. Detect context inside `add_image_sharing_html`

- At the start of the method (after early bail for admin/feed/context), set:
  - `$is_excerpt = ( current_filter() === 'the_excerpt' );`
- Use `$is_excerpt` for excerpt-only behavior (process all images / exclusions, and filter below).

### 4. Option and filter check for excerpts

- After supported-post-type check, when `$is_excerpt` is true:
  - If `enable_image_sharing_on_excerpts` option is false, return `$content` unchanged.
  - If `! apply_filters( 'has_pin_show_on_excerpts', true )`, return `$content` unchanged.
- Document the filter in a docblock (e.g. “Allow image sharing on excerpt output. Default true.”).

### 5. Process all excerpt images; respect exclusions (was: Force “don't exclude leading image” 
- When `$is_excerpt` is true, force `$exclude_leading_image = false` so the first image in the excerpt is not skipped (process all images).
- Respect existing exclusion classes (e.g. `has-no-pin`) and `has_pin_core_exclusions` in the same way as content. If an excerpt-specific exclusions filter is desired (e.g. `has_pin_excerpt_exclusions`), see Questions below.

### 6. Remove/re-add the correct filter (re-entry guard)

- Replace hardcoded `the_content` in remove/add with the actual filter name so that when we’re in `the_excerpt`, we remove and re-add `the_excerpt` instead of `the_content`.
- Example:
  - `$filter_name = current_filter();` (will be `'the_content'` or `'the_excerpt'`).
  - `remove_filter( $filter_name, array( $this, 'add_image_sharing_html' ), 15 );`
  - In the `catch` block: `add_filter( $filter_name, array( $this, 'add_image_sharing_html' ), 15 );`
  - At the end before return: `add_filter( $filter_name, array( $this, 'add_image_sharing_html' ), 15 );`
- Ensure `$filter_name` is in scope in the catch and at the end (it’s set before the try).

### 7. Divi / shortcode

- Do **not** hook `add_image_sharing_html` to `the_excerpt` in a way that affects `et_pb_post_content_shortcode_output`; that remains content-only. No change needed for Divi shortcode.

---

## Edge Cases

- **Excerpt has no images:** Same as content; no wrappers added, content returned unchanged.
- **Excerpt has one image:** That image is “leading” and gets the wrapper (we do not exclude leading image on excerpts).
- **Excerpt already has wrapper:** Existing check for `has-pin-image-wrapper` prevents re-processing; same for excerpts.
- **Page builders / multiple excerpt calls:** Removing the filter for the current hook (the_excerpt) before DOM work and re-adding after prevents re-entry; copy-images-to-array safeguard still applies.
- **Manual excerpt with blocks/HTML:** If the theme or source provides HTML (e.g. with `<img>`) to `the_excerpt`, DOM logic works the same. If excerpt is plain text, no images, no change.

---

## Options (summary)

| Option                             | Purpose                                           | Default |
|------------------------------------|---------------------------------------------------|---------|
| `enable_image_sharing_on_excerpts` | Enable image sharing (Pinterest/Web Share) on excerpt output. Only has effect when `enable_image_sharing` is also true. | `false` |

Lives in image options (same group as `enable_image_sharing`, `exclude_leading_image`, etc.). Admin UI: checkbox/toggle in the image-sharing settings section.

---

## Filters (summary)

| Filter                     | Purpose                                      | Default |
|----------------------------|----------------------------------------------|---------|
| `has_pin_show_on_excerpts` | Allow image sharing on excerpt output.       | `true`  |

Existing filters (`has_pin_show_on_archives`, `has_pin_supported_post_types`, `has_pin_core_exclusions`, etc.) continue to apply to both content and excerpt when the method runs.

---

## Questions before implementation

1. **Excerpt exclusions filter:** Should we add an excerpt-specific filter (e.g. `has_pin_excerpt_exclusions`) that receives the same arguments as `has_pin_core_exclusions` but only runs when `$is_excerpt` is true, so callers can add or modify exclusions for excerpt images without affecting content? Or is it enough to rely on `has_pin_core_exclusions` (and exclusion classes like `has-no-pin`) for both content and excerpt? **Answer** Let's use both please.
2. **Gate by `enable_excerpt`:** Should image sharing on excerpts run only when highlight-sharing-on-excerpt is also enabled (i.e. when `has_enable_excerpt` is true), so we don’t add image sharing to excerpt output if the site has excerpt highlight sharing turned off? Or should it be independent (image sharing on excerpts whenever image sharing is on, regardless of `enable_excerpt`)? **Answer** No, this is separate from highlighting and sharing.

---

## Testing

- **Option off (default):** With `enable_image_sharing_on_excerpts` false, excerpts get no image sharing even when image sharing is on; content is unchanged.
- **Option on:** Enable image sharing and `enable_image_sharing_on_excerpts` in options; use a post type that supports both.
- On an archive (or any template that uses `the_excerpt`): with option on, confirm excerpt HTML that contains images gets wrappers on all images (including the first); images with exclusion classes (e.g. `has-no-pin`) still have no wrapper.
- On a single post: confirm full content still uses the “exclude leading image” **option** as before; excerpt behavior is unchanged if the theme doesn’t output excerpt on single.
- Confirm disabling image sharing disables it for both content and excerpt.
- If implemented: filter `has_pin_show_on_excerpts` to false and confirm excerpts no longer get image sharing while content still does.
