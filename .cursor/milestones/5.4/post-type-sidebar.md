# Post-Type Sidebar — Per-Post Control for Highlight and Share

**Related:** Plan 2.7 Per-Post Control, 2.10 Admin Interface (Headlines), Plan 2.11 Admin Reorganization  
**Status:** Implemented

---

## Overview

The **Sidebar** is a single, extensible UI that houses per-post (and per-page) controls for Highlight and Share. It appears in both the **Block Editor** (document sidebar panel) and the **Classic Editor** (meta box), so authors can control behavior per post regardless of editor.

**Control pattern:** Each feature (Headlines, Images, etc.) uses a **ToggleGroupControl** with three options:

- **Disabled** — Turn off for this post (ignore global setting).
- **Default** — Follow global/site settings (no override).
- **Enabled** — Turn on for this post (override global if it’s off).

**Initial scope (this release):**

- **Per-post control for Headline Sharing** — ToggleGroupControl: Disabled | Default | Enabled (stored in post meta, e.g. `_has_post_settings['headline_sharing']` = `'disabled'` | `'default'` | `'enabled'`).

**Extended later (same sidebar, new sections):**

- **Image options** — Same ToggleGroupControl pattern for image sharing (Disabled | Default | Enabled).
- **Headlines** — No per-heading overrides in this design; the single ToggleGroupControl applies to all headline sharing on the post.

The sidebar is the **single place** for all “per-post Highlight and Share” settings so we avoid multiple meta boxes or scattered panels.

---

## Goals

- One consistent UI for per-post HAS controls in Block Editor and Classic Editor.
- Extensible structure so new sections (e.g. Images, future features) can be added without duplicating the sidebar.
- Use WordPress APIs correctly: Document Settings panel in Block Editor, meta box in Classic Editor.
- Store one coherent set of post meta keys, with shared PHP registration and sanitization.

---

## Non-Goals

- Per-block or per-element controls (e.g. per-heading) — not in this design.
- Replacing global HAS options — sidebar only overrides or toggles at the post level where applicable.

---

## Post Meta Design

### Option A: Single serialized meta key (recommended)

- **Key:** `_has_post_settings` (or `_has_sidebar_settings`).
- **Value:** One array; each feature stores a three-state value:
  - `headline_sharing` => `'disabled'` | `'default'` | `'enabled'`
  - `image_sharing` => `'disabled'` | `'default'` | `'enabled'` (Images phase)
  - Future keys use the same pattern.
- **Pros:** One `register_meta`, one panel/meta box, consistent ToggleGroupControl pattern; easy to add new features.
- **Cons:** Must define allowed keys and allowed values in PHP (sanitize to `disabled` | `default` | `enabled`).

### Option B: Multiple meta keys

- Separate keys per feature and possibly per state; more wiring in both editors.
- **Recommendation:** Option A with a single `_has_post_settings` array. Helper e.g. `HAS_Post_Settings::get( $post_id, 'headline_sharing', 'default' )` returns the effective state; frontend interprets `default` as “use global,” `disabled` as off, `enabled` as on for this post.

---

## Block Editor Implementation

### Document Settings panel

- Use **PluginDocumentSettingPanel** from `@wordpress/editor` (or `@wordpress/edit-post`) to add a panel in the Document sidebar (e.g. under “Post” or “Page”).
- **Panel title:** “Highlight and Share”.
- **Content:** **ToggleGroupControl** (from `@wordpress/components`) for each feature: options **Disabled | Default | Enabled**, bound to post meta (read via `useEntityProp`, write via core store).
- **Script:** Enqueue only in block editor (e.g. `enqueue_block_editor_assets`), same build or a dedicated `has-post-sidebar.js` that registers the panel and renders the form.
- **Post meta:** Register with `register_meta()` for the relevant post types (see **Decisions: Post types**) with `show_in_rest => true` and `single => true` so the block editor can read/write it.

### Data flow

- On load: panel reads current meta (e.g. `_has_post_settings`) and shows toggles/defaults.
- On change: update meta via core store; no custom REST needed if `register_meta` is used with `show_in_rest`.
- Keep a single source of truth for “default” values (e.g. in PHP) so both Block and Classic editors use the same defaults.

---

## Classic Editor Implementation

### Meta box

- **Hook:** `add_meta_box` on the same post types that get the Block Editor panel (see **Decisions: Post types**). Shown only when the post uses the Classic Editor (see **Decisions: Classic vs Block**).
- **Title:** “Highlight and Share” (same as Block Editor panel).
- **Callback:** Output controls that mirror the Block Editor: for each feature, a **three-option control** (e.g. radio group or select) labeled **Disabled | Default | Enabled**. Same meta keys and values as Block Editor; nonce; on `save_post`, read POST, sanitize (allow only `disabled` | `default` | `enabled`), and update post meta.
- **Placement:** Normal side or advanced; recommend “side” so it appears in the sidebar and mirrors Block Editor placement.

### Data flow

- On load: `get_post_meta( $post_id, '_has_post_settings', true )` (or the chosen key); merge with defaults; render checkboxes/controls.
- On save: `update_post_meta( $post_id, '_has_post_settings', $sanitized_array )`.
- Use the same defaults and key structure as Block Editor so behavior is identical.

---

## Implementation Details: Per-Post Control (Headline Sharing)

- **Meta:** `_has_post_settings['headline_sharing']` = `'disabled'` | `'default'` | `'enabled'` (default: `'default'`).
- **Block Editor:** One **ToggleGroupControl** in the HAS Document panel: label e.g. “Headline sharing” with options **Disabled | Default | Enabled**. Stored value is the selected option.
- **Classic Editor:** Same three options (radio group or select) in the HAS meta box: Disabled | Default | Enabled.
- **Frontend logic:** When initializing headline sharing for a post, call `HAS_Post_Settings::get( $post_id, 'headline_sharing', 'default' )`. If `'disabled'`, do not enqueue or initialize headline sharing. If `'default'`, use global headline option (e.g. from Headlines tab). If `'enabled'`, enable headline sharing for this post even if global is off.

---

## Implementation Details: Image Options in the Sidebar (Later)

When adding image options to the sidebar:

- **Placement:** New row/section within the same “Highlight and Share” panel (Block Editor) and same meta box (Classic Editor):
  - **Headline sharing:** ToggleGroupControl — Disabled | Default | Enabled.
  - **Image sharing:** ToggleGroupControl — Disabled | Default | Enabled.
- **Meta:** Extend `_has_post_settings` with `image_sharing` => `'disabled'` | `'default'` | `'enabled'` (default `'default'`). Optional later: additional keys for image overrides (networks, style) if needed.
- **UI:** Same **ToggleGroupControl** pattern as Headlines in both editors; same allowed values and sanitization in PHP.
- **Frontend:** When applying image sharing, read `HAS_Post_Settings::get( $post_id, 'image_sharing', 'default' )`. If `'disabled'`, skip image sharing for this post. If `'default'`, use global image settings. If `'enabled'`, enable for this post (override global if off).

No separate “Image sidebar” — one sidebar, multiple ToggleGroupControl rows (Headlines, Images, future).

---

## Shared PHP Layer

- **Post meta registration:** `register_meta( 'post', '_has_post_settings', array( 'show_in_rest' => true, 'single' => true, 'type' => 'object', 'default' => array(), 'auth_callback' => ... ) )` (and for `page` if supported). Sanitize callback: only allow known keys (e.g. `headline_sharing`, `image_sharing`) and for each key only allow values `'disabled'`, `'default'`, `'enabled'`.
- **Helper class or functions:** e.g. `HAS_Post_Settings::get( $post_id, $key, $default )` and `HAS_Post_Settings::get_all( $post_id )` so frontend and both editors use the same API.
- **Defaults:** One place (e.g. `HAS_Post_Settings::get_defaults()`) so Block and Classic and frontend all agree.

---

## File / Code Structure (Suggested)

- **PHP**
  - `php/PostSettings.php` (or similar): register meta, meta box (Classic), defaults, sanitization, and `get` / `get_all` helpers.
  - Use `use_block_editor_for_post` to decide which UI to show: when true, only the Block Editor panel is used; when false, register and show the Classic meta box (see **Decisions: Classic vs Block**).
- **Block Editor**
  - New script (e.g. `has-post-sidebar.js` or under `blocks/`) that registers `PluginDocumentSettingPanel` and renders the HAS controls using core data (entity + meta).
  - Enqueued only on `enqueue_block_editor_assets` for post/page screen.
- **Classic Editor**
  - Meta box markup and `save_post` handling live in the same `PostSettings` (or Admin) class that registers the meta box.

---

## Implementation Summary

- **PHP:** `php/PostSettings.php` — register_meta for `_has_post_settings`, Classic meta box (when `use_block_editor_for_post` is false), `PostSettings::get()` / `get_all()` / `get_defaults()`, sanitization, and filter `has_headline_sharing_enabled_for_post` for frontend.
- **Block Editor:** `src/post-sidebar/index.js` — PluginDocumentSettingPanel “Highlight and Share” with ToggleGroupControl (Headline sharing: Disabled | Default | Enabled); built as `has-post-sidebar.js`, enqueued in `Blocks::enqueue_post_sidebar_script()` for supported post types.
- **Bootstrap:** `PostSettings::run()` called from `highlight-and-share.php`. Sidebar is shown for all public post types (no filter; logic kept simple).
- **Frontend:** When headline sharing is implemented, use `apply_filters( 'has_headline_sharing_enabled_for_post', $global_enabled, $post_id )`; PostSettings resolves disabled/default/enabled.

---

## Decisions

- **Post types:** Sidebar is visible for **all public post types** (post, page, and any public CPTs). Logic is simple: no per–post-type opt-in or filter.
2. **Naming:** Prefer “Highlight and Share” or “Sharing (this post)” (or “HAS – This post”) for the panel/meta box title?
**Answer** Highlight and Share
- **Meta schema:** **Option A** — single `_has_post_settings` array with helper functions (e.g. `Post_Settings::get( $post_id, 'headline_sharing', 'default' )`).
4. **Classic Editor detection:** Should we show the meta box only when the post is edited with Classic Editor (e.g. “Classic Editor” plugin or no blocks), or always for post/page so block users who switch to classic still see it? Recommendation: show for both; if the editor is Block, they use the Document panel; if Classic, they use the meta box.
**Answer** We can hook into https://developer.wordpress.org/reference/hooks/use_block_editor_for_post/ for block editor sidebar, and if disabled, can use the classic approach.
- **Image options scope:** ToggleGroupControl (Disabled | Default | Enabled) is sufficient for the first iteration. No additional image settings planned; schema can be extended later (e.g. extra keys or nested `image_settings`) if needed.

---

## Summary

| Aspect | Block Editor | Classic Editor |
|--------|--------------|----------------|
| UI | PluginDocumentSettingPanel in Document sidebar | add_meta_box (side) |
| Control | **ToggleGroupControl**: Disabled / Default / Enabled per feature | Same three options (radio group or select) |
| Data | `_has_post_settings[feature]` = `'disabled'` / `'default'` / `'enabled'` | Same post meta, same values |
| First use | Headline sharing: one ToggleGroupControl | Same for Headline sharing |
| Later | Image sharing: second ToggleGroupControl in same panel | Same row in same meta box |

One sidebar concept, two editor implementations, one set of post meta. **Default** = follow global; **Disabled** = off for this post; **Enabled** = on for this post (override global).
