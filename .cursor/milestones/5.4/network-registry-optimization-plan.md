# Network Registry PHP Optimization Plan

**Priority:** 1  
**Status:** Planning  
**Related:** Network Registry Refactor, Admin Reorganization

## Overview

This plan outlines the optimization strategy for centralizing and enhancing the PHP registration of social networks. The goal is to create a single source of truth for network definitions that reduces duplication, improves maintainability, and prepares the foundation for Headline Sharing and other features.

---

## Current State Analysis

### Issues Identified

1. **Network Definitions Scattered Across Multiple Locations:**
   - `Options::get_social_network_defaults()` - Basic network info (label, slug, color, background, order, custom)
   - `Options::get_theme_defaults()['icon_colors']` - Icon color definitions (duplicated network list)
   - `Options::get_defaults()` - Labels and tooltips (individual properties per network)
   - `Options::get_plugin_options_social_networks()` - Manual enabled state mapping (14+ individual lines)
   - `Frontend.php` - Large switch statement (200+ lines) for rendering HTML
   - JavaScript - Hardcoded class selector string

2. **Missing Properties in Registry:**
   - Behavior property (`requires_popup` - describes how network shares)
   - CSS class selector (e.g., `.has_twitter`)
   - Share URL template or handler function
   - Icon identifier/SVG reference
   - Label and tooltip text

3. **Manual Enabled State Mapping:**
   - Each network's enabled state is manually mapped from main options
   - Inconsistent property names (`show_twitter` vs `enable_emails`)
   - No automatic derivation from registry

4. **Inconsistent Property Names:**
   - `show_twitter` vs `show_whatsapp` vs `enable_emails`
   - No standardized naming convention

5. **Hardcoded Rendering Logic:**
   - Large switch statement in `Frontend.php` (lines 1257-1398)
   - Each network requires individual case handling
   - Difficult to add new networks

---

## Optimization Goals

1. **Single Source of Truth:** All network properties defined in one place
2. **Automatic Derivation:** Enabled state, class selectors, and capabilities derived from registry
3. **Reduced Duplication:** Eliminate repeated network definitions across files
4. **Extensibility:** Easy to add new networks with minimal code changes
5. **Backward Compatibility:** Maintain existing option structure and filters
6. **Foundation for Features:** Prepare registry for Headline Sharing and block improvements

---

## Implementation Strategy

### Phase 1: Enhance Network Registry Structure

#### 1.1 Expand `get_social_network_defaults()` Structure

**Location:** `php/Options.php::get_social_network_defaults()`

**New Structure:**
```php
array(
    'twitter' => array(
        // Existing properties
        'slug'       => 'twitter',
        'label'      => __( 'Twitter', 'highlight-and-share' ),
        'color'      => '#000000',
        'background' => '#fff',
        'order'      => 0,
        'custom'     => false,
        
        // New properties
        'css_class'           => 'has_twitter',
        'icon_id'             => 'has-twitter-icon',
        'label_text'           => _x( 'Share This', 'X social network formerly Twitter', 'highlight-and-share' ),
        'tooltip_text'         => _x( 'Share on X', 'X social network formerly Twitter', 'highlight-and-share' ),
        'enabled_option_key'   => 'show_twitter', // Maps to main options
        'share_url_template'   => 'https://x.com/intent/tweet?via=%username%&url=%url%&text=%prefix%%text%%suffix%&hashtags=%hashtags%',
        'requires_popup'       => true,
        'icon_colors'          => array(
            'background'       => '#FEFEFE',
            'background_hover' => '#FFFFFF',
            'icon_color'       => '#000000',
            'icon_color_hover' => '#000000',
        ),
    ),
    // ... other networks
)
```

**Key Properties:**
- `css_class` - CSS class selector (e.g., `has_twitter`)
- `icon_id` - SVG icon identifier (e.g., `has-twitter-icon`)
- `label_text` - Display label for the network
- `tooltip_text` - Tooltip text
- `enabled_option_key` - Key in main options that controls enabled state
- `share_url_template` - URL template with placeholders
- `requires_popup` - Whether network opens in popup window (false for copy, webshare, email)
- `icon_colors` - Theme icon color definitions (moved from `get_theme_defaults()`)

#### 1.2 Special Network Handling

**Important Note:** Web Share is a network (slug: `webshare`), not a capability that other networks can have. It's treated the same as Twitter, Facebook, etc., but uses the Web Share API instead of opening a popup.

**Web Share Network:**
- Web Share is a network like any other (slug: `webshare`)
- `requires_popup` = `false` (uses Web Share API, not popup)
- `share_url_template` = `null` or `#` (handled by JavaScript via Web Share API)
- `enabled_option_key` = `show_webshare`

**Copy Network:**
- Copy is a network like any other (slug: `copy`)
- `requires_popup` = `false` (uses clipboard API, not popup)
- `share_url_template` = `null` or `#` (handled by JavaScript)
- `enabled_option_key` = `show_copy`

**Email Network:**
- Email is a network like any other (slug: `email`)
- `enabled_option_key` = `enable_emails` (not `show_email`)
- `share_url_template` = Dynamic (mailto vs form, handled separately)
- `requires_popup` = `false` (uses mailto link or modal, not popup)

---

### Phase 2: Refactor Enabled State Mapping

#### 2.1 Create Helper Method for Enabled State

**Location:** `php/Options.php`

**New Method:**
```php
/**
 * Get enabled state for a network from main options.
 *
 * @param string $network_slug Network slug.
 * @param array  $network_def  Network definition from registry.
 * @return bool Whether network is enabled.
 */
private static function get_network_enabled_state( $network_slug, $network_def ) {
    $plugin_options = self::get_plugin_options();
    $option_key     = $network_def['enabled_option_key'] ?? "show_{$network_slug}";
    
    // Handle special cases.
    if ( 'email' === $network_slug ) {
        $option_key = 'enable_emails';
    }
    
    $enabled = $plugin_options[ $option_key ] ?? false;
    
    // Apply filter.
    $filter_name = 'has_show_' . $network_slug;
    return (bool) apply_filters( $filter_name, $enabled );
}
```

#### 2.2 Refactor `get_plugin_options_social_networks()`

**Current:** 14+ individual lines mapping enabled state  
**New:** Loop through registry and derive enabled state automatically

```php
// Loop through networks and set enabled state.
foreach ( $settings as $network_slug => &$network_def ) {
    $network_def['enabled'] = self::get_network_enabled_state( $network_slug, $network_def );
}
```

**Benefits:**
- Reduces code from 14+ lines to ~3 lines
- Automatically handles new networks
- Consistent enabled state derivation

---

### Phase 3: Consolidate Theme Icon Colors

#### 3.1 Move Icon Colors to Registry

**Current:** Icon colors defined in `get_theme_defaults()['icon_colors']`  
**New:** Icon colors included in each network definition in registry

**Refactor `get_theme_defaults()`:**
```php
// Derive icon_colors from network registry.
$social_networks = self::get_social_network_defaults();
$icon_colors = array();
foreach ( $social_networks as $slug => $network ) {
    $icon_colors[ $slug ] = $network['icon_colors'] ?? array();
}
$defaults['icon_colors'] = $icon_colors;
```

**Benefits:**
- Single source of truth for icon colors
- Eliminates duplication
- Easier to maintain

---

### Phase 4: Refactor Frontend Rendering

#### 4.1 Create Network Rendering Helper

**Location:** `php/Frontend.php`

**New Method:**
```php
/**
 * Render HTML for a single social network.
 *
 * @param array  $network_def   Network definition from registry.
 * @param array  $theme_options Theme options.
 * @param array  $settings      Main plugin settings.
 * @param array  $email_options Email options (if email network).
 * @return string HTML for network.
 */
private function render_network_html( $network_def, $theme_options, $settings, $email_options = array() ) {
    $slug        = $network_def['slug'];
    $css_class   = $network_def['css_class'];
    $icon_id     = $network_def['icon_id'];
    $label       = apply_filters( "has_{$slug}_text", $network_def['label_text'] );
    $tooltip     = apply_filters( "has_{$slug}_tooltip", $network_def['tooltip_text'] );
    $tooltip_attr = $theme_options['show_tooltips'] ? 'has-tooltip' : '';
    
    // Build URL template.
    $url_template = $this->get_network_url_template( $network_def, $settings, $email_options );
    
    // Build HTML.
    $html = sprintf(
        '<div class="%s %s" style="display: none;" data-type="%s" data-tooltip="%s">',
        esc_attr( $css_class ),
        esc_attr( $tooltip_attr ),
        esc_attr( $slug ),
        esc_attr( $tooltip )
    );
    
    $html .= sprintf(
        '<a href="%s" %s><svg class="has-icon"><use xlink:href="#%s"></use></svg><span class="has-text">&nbsp;%s</span></a>',
        esc_url( $url_template ),
        $network_def['requires_popup'] ? 'target="_blank" rel="nofollow"' : 'rel="nofollow"',
        esc_attr( $icon_id ),
        esc_html( $label )
    );
    
    $html .= '</div>';
    
    return $html;
}
```

#### 4.2 Create URL Template Builder

**Location:** `php/Frontend.php`

**New Method:**
```php
/**
 * Get URL template for a network.
 *
 * @param array $network_def   Network definition.
 * @param array $settings      Main plugin settings.
 * @param array $email_options Email options (if email network).
 * @return string URL template.
 */
private function get_network_url_template( $network_def, $settings, $email_options = array() ) {
    $slug = $network_def['slug'];
    
    // Handle special networks.
    if ( 'copy' === $slug || 'webshare' === $slug ) {
        return '#';
    }
    
    if ( 'email' === $slug ) {
        return $this->get_email_url_template( $email_options );
    }
    
    if ( 'whatsapp' === $slug ) {
        return $this->get_whatsapp_url_template( $network_def, $settings );
    }
    
    // Use template from registry.
    return $network_def['share_url_template'] ?? '#';
}
```

#### 4.3 Refactor Switch Statement

**Current:** 200+ line switch statement  
**New:** Loop through enabled networks and call rendering helper

```php
// Loop through ordered networks and output HTML.
foreach ( $social_networks_ordered as $social_network ) {
    if ( ! $social_network['enabled'] ) {
        continue;
    }
    
    // Handle special cases that need additional logic.
    if ( 'email' === $social_network['slug'] ) {
        $html .= $this->render_email_network( $social_network, $theme_options, $settings, $email_options );
    } elseif ( 'whatsapp' === $social_network['slug'] ) {
        $html .= $this->render_whatsapp_network( $social_network, $theme_options, $settings );
    } elseif ( 'mastodon' === $social_network['slug'] ) {
        $html .= $this->render_network_html( $social_network, $theme_options, $settings );
        $this->maybe_enqueue_fancybox();
    } else {
        $html .= $this->render_network_html( $social_network, $theme_options, $settings );
    }
}
```

**Benefits:**
- Reduces switch statement from 200+ lines to ~20 lines
- Easier to add new networks
- Consistent rendering logic

---

### Phase 5: Update JavaScript Class Selectors

#### 5.1 Generate Class Selectors from Registry

**Location:** `php/Frontend.php` (in `localize_script()` or similar)

**New Approach:**
```php
// Generate class selector string from network registry.
$social_networks = Options::get_plugin_options_social_networks();
$class_selectors = array();
foreach ( $social_networks as $network ) {
    if ( $network['enabled'] ) {
        $class_selectors[] = '.' . $network['css_class'];
    }
}
// Add email variants.
if ( isset( $social_networks['email'] ) && $social_networks['email']['enabled'] ) {
    $class_selectors[] = '.has_email_mailto';
    $class_selectors[] = '.has_email_form';
}
$json_arr['social_network_classes'] = implode( ', ', $class_selectors );
```

**Update JavaScript:**
```javascript
const socialNetworks = HAS.social_network_classes || 
    '.has_whatsapp, .has_facebook, .has_twitter, ...'; // Fallback
```

**Benefits:**
- Dynamic class selector generation
- No hardcoded network list in JavaScript
- Automatically includes new networks

---

### Phase 6: Consolidate Labels and Tooltips

#### 6.1 Remove Duplicate Label/Tooltip Definitions

**Location:** `php/Options.php::get_defaults()`

**Current:** Individual properties for each network:
- `twitter_label`, `twitter_tooltip`
- `facebook_label`, `facebook_tooltip`
- etc.

**New:** Derive from registry or remove entirely (if not used elsewhere)

**Action:**
- Check if these properties are used in other parts of codebase
- If used, create helper method to get label/tooltip from registry
- If not used, remove from defaults

---

## Implementation Checklist

### Backend (PHP)

- [ ] **Phase 1: Enhance Registry Structure**
  - [ ] Add `css_class` property to all networks
  - [ ] Add `icon_id` property to all networks
  - [ ] Add `label_text` property to all networks
  - [ ] Add `tooltip_text` property to all networks
  - [ ] Add `enabled_option_key` property to all networks
  - [ ] Add `share_url_template` property to all networks
  - [ ] Add `requires_popup` property to all networks
  - [ ] Add `icon_colors` property to all networks
  - [ ] Test registry structure with existing code

- [ ] **Phase 2: Refactor Enabled State**
  - [ ] Create `get_network_enabled_state()` helper method
  - [ ] Refactor `get_plugin_options_social_networks()` to use helper
  - [ ] Test enabled state derivation
  - [ ] Verify backward compatibility with existing options

- [ ] **Phase 3: Consolidate Icon Colors**
  - [ ] Move icon colors from `get_theme_defaults()` to registry
  - [ ] Update `get_theme_defaults()` to derive from registry
  - [ ] Test theme options loading
  - [ ] Verify backward compatibility

- [ ] **Phase 4: Refactor Frontend Rendering**
  - [ ] Create `render_network_html()` helper method
  - [ ] Create `get_network_url_template()` helper method
  - [ ] Create special handlers for email, whatsapp, mastodon
  - [ ] Refactor switch statement to use helpers
  - [ ] Test all networks render correctly
  - [ ] Test special cases (email mailto vs form, whatsapp endpoints)

- [ ] **Phase 5: Update JavaScript Integration**
  - [ ] Generate class selector string from registry
  - [ ] Add to localized script data
  - [ ] Update JavaScript to use dynamic selectors
  - [ ] Test all network interactions work

- [ ] **Phase 6: Clean Up Duplicates**
  - [ ] Audit usage of label/tooltip properties in `get_defaults()`
  - [ ] Create helper methods if needed
  - [ ] Remove unused properties
  - [ ] Update any code that references old properties

### Testing

- [ ] Test all existing networks still work
- [ ] Verify network order and display
- [ ] Test custom networks (if applicable)
- [ ] Check backward compatibility with saved options
- [ ] Test all sharing methods (popup, copy, webshare, email)
- [ ] Verify filters still work correctly
- [ ] Test theme icon colors display correctly
- [ ] Test JavaScript class selectors work

### Documentation

- [ ] Document new registry structure
- [ ] Document how to add new networks
- [ ] Update inline code comments
- [ ] Document network behavior properties (`requires_popup`)

---

## Migration Strategy

### Backward Compatibility

1. **Maintain Existing Option Keys:**
   - Keep `show_twitter`, `show_facebook`, etc. in main options
   - Map to registry via `enabled_option_key`

2. **Preserve Filters:**
   - All existing filters continue to work
   - `has_show_twitter`, `has_twitter_text`, `has_twitter_tooltip`, etc.

3. **Gradual Migration:**
   - Phase 1-3: Enhance registry without breaking changes
   - Phase 4-5: Refactor rendering while maintaining output
   - Phase 6: Clean up after verification

### Testing Approach

1. **Unit Tests:**
   - Test registry structure
   - Test enabled state derivation
   - Test URL template generation

2. **Integration Tests:**
   - Test network rendering
   - Test JavaScript class selectors
   - Test all sharing methods

3. **Regression Tests:**
   - Verify existing functionality unchanged
   - Test with existing saved options
   - Test with custom networks

---

## Benefits Summary

1. **Reduced Code Duplication:**
   - Network definitions: 3 locations → 1 location
   - Enabled state mapping: 14+ lines → 3 lines
   - Frontend rendering: 200+ lines → ~20 lines

2. **Improved Maintainability:**
   - Single source of truth for network properties
   - Easy to add new networks (add to registry)
   - Consistent property structure

3. **Enhanced Extensibility:**
   - Behavior properties enable proper handling (popup vs API-based sharing)
   - Foundation for Headline Sharing
   - Foundation for block improvements

4. **Better Developer Experience:**
   - Predictable network structure
   - Clear documentation
   - Easier debugging

---

## Risks & Mitigations

### Risk: Breaking Existing Functionality
**Mitigation:** 
- Maintain backward compatibility
- Gradual migration approach
- Comprehensive testing

### Risk: Performance Impact
**Mitigation:**
- Registry cached in static property
- Minimal overhead from loops
- Test performance with large number of networks

### Risk: Complex Special Cases
**Mitigation:**
- Keep special handlers for email, whatsapp, mastodon
- Document special case requirements
- Test thoroughly

---

## Next Steps

1. Review and approve this plan
2. Begin Phase 1 implementation
3. Test incrementally after each phase
4. Document as we go
5. Prepare for admin component consolidation (separate task)

---

## Related Tasks

- Admin Reorganization (consolidate React components)
- Headline Sharing (use network registry)
- Block Improvements (use network registry)
- Web Share API Promotion (webshare is a network, not a capability)

