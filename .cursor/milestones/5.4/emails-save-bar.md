# Emails SaveBar — Per-Tab Save/Discard/Reset Footer

**Related:** [post-type-sidebar.md](./post-type-sidebar.md), Sharing tab, Images tab  
**Status:** Implemented

---

## Overview

Add the **SaveBar** component (and **Snackbar**) to the Emails tab so it matches the Sharing and Images screens: a sticky footer with **Save Settings**, **Discard Changes**, and **Reset to Defaults**, with modals for discard/reset confirmation and Snackbar toasts on success.

---

## Goal

- One consistent save/discard/reset UX for the Emails tab: SaveBar in the shared footer slot, same as Images.
- Checkpoint data so Discard reverts the form to the last saved (or initial) state.
- Success feedback via Snackbar instead of inline notices.

---

## Implementation (reference)

- **Emails/index.js:** Uses `SlotFillProvider`, `createPortal( <Emails />, container )`, and `createPortal( <Slot name="hasEmailsFooter" />, slotContainer )` so the footer appears in `has-admin-container-slot`. Same pattern as Images index.
- **Emails/emails.js:** Checkpoint via `getCheckpointData` / `setCheckpointData` (module-level); `useFormState` for `isDirty` and `errors`; `<Fill name="hasEmailsFooter">` containing Snackbar and SaveBar. Save/Discard/Reset wired to existing save/reset API; checkpoint updated on load and after save/reset success.

---

## Out of scope

- Changing the save/reset API or validation rules.
- PHP changes; the existing slot container is already present on the settings page.
