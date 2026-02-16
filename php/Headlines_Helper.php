<?php
/**
 * Headlines feature: helper for ID generation and content processing.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Class Headlines_Helper
 */
class Headlines_Helper {

	/**
	 * Wrapper ID used to wrap content for DOM parsing.
	 *
	 * @var string
	 */
	const WRAPPER_ID = 'has-headlines-root';

	/**
	 * Class name that excludes a heading (or its ancestor) from headlines processing.
	 *
	 * @var string
	 */
	const EXCLUDE_CLASS = 'has-headline-exclude';

	/**
	 * ID tracker: slug => count (ensures unique IDs across all processed content in the request).
	 *
	 * @var array<string, int>
	 */
	public static $headlines = array();

	/**
	 * Add IDs to headings that lack them. Respects enabled levels, exclusions, and slug uniqueness.
	 *
	 * @param string $content Post content HTML.
	 * @param array  $options Headlines options (enabled_heading_levels, exclusion_selectors).
	 * @return string Modified content.
	 */
	public static function add_ids_to_headings( $content, $options ) {
		if ( ! is_string( $content ) || '' === trim( $content ) ) {
			return $content;
		}

		$dom = self::create_dom_from_content( $content );
		if ( ! $dom ) {
			return $content;
		}

		$xpath   = new \DOMXPath( $dom );
		$wrapper = $xpath->query( '//*[@id="' . self::WRAPPER_ID . '"]' )->item( 0 );
		if ( ! $wrapper instanceof \DOMElement ) {
			return $content;
		}

		$levels              = self::get_enabled_levels( $options );
		$exclusion_selectors = self::parse_exclusion_selectors( $options['exclusion_selectors'] ?? '' );
		$query               = self::build_headings_xpath( $levels );
		$headings            = $xpath->query( $query, $wrapper );

		foreach ( $headings as $heading ) {
			if ( ! $heading instanceof \DOMElement ) {
				continue;
			}
			if ( self::is_heading_excluded( $heading, $exclusion_selectors ) ) {
				continue;
			}
			$id = $heading->getAttribute( 'id' );
			if ( '' !== $id && preg_match( '/^[a-zA-Z][\w\-:.]*$/', $id ) ) {
				self::add_headline( $id );
				continue;
			}
			$text = self::get_heading_text( $heading );
			$slug = self::get_headline_anchor( $text, true );
			$heading->setAttribute( 'id', $slug );
		}

		return self::get_wrapper_inner_html( $dom, $wrapper );
	}

	/**
	 * Add data-has-headline-share to eligible headings (for link icon / share).
	 *
	 * @param string $content          Post content HTML.
	 * @param array  $options          Headlines options.
	 * @param bool   $only_with_id     If true, only add attribute to headings that already have an id.
	 * @return string Modified content.
	 */
	public static function add_data_attributes( $content, $options, $only_with_id = false ) {
		if ( ! is_string( $content ) || '' === trim( $content ) ) {
			return $content;
		}

		$dom = self::create_dom_from_content( $content );
		if ( ! $dom ) {
			return $content;
		}

		$xpath   = new \DOMXPath( $dom );
		$wrapper = $xpath->query( '//*[@id="' . self::WRAPPER_ID . '"]' )->item( 0 );
		if ( ! $wrapper instanceof \DOMElement ) {
			return $content;
		}

		$levels              = self::get_enabled_levels( $options );
		$exclusion_selectors = self::parse_exclusion_selectors( $options['exclusion_selectors'] ?? '' );
		$query               = self::build_headings_xpath( $levels );
		$headings            = $xpath->query( $query, $wrapper );

		foreach ( $headings as $heading ) {
			if ( ! $heading instanceof \DOMElement ) {
				continue;
			}
			if ( self::is_heading_excluded( $heading, $exclusion_selectors ) ) {
				continue;
			}
			if ( $only_with_id ) {
				$id = $heading->getAttribute( 'id' );
				if ( '' === $id || ! preg_match( '/^[a-zA-Z][\w\-:.]*$/', $id ) ) {
					continue;
				}
			}
			$heading->setAttribute( 'data-has-headline-share', '1' );
		}

		return self::get_wrapper_inner_html( $dom, $wrapper );
	}

	/**
	 * Build a DOMDocument from content wrapped in a single root for safe parsing.
	 *
	 * @param string $content HTML fragment.
	 * @return \DOMDocument|null DOM or null on failure.
	 */
	private static function create_dom_from_content( $content ) {
		$wrap = '<div id="' . self::WRAPPER_ID . '">' . $content . '</div>';
		$dom  = new \DOMDocument();
		$prev = libxml_use_internal_errors( true );
		$dom->loadHTML(
			'<?xml encoding="UTF-8">' . $wrap,
			LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
		);
		libxml_use_internal_errors( $prev );
		return $dom;
	}

	/**
	 * Get inner HTML of the wrapper element (original content structure).
	 *
	 * @param \DOMDocument $doc     Document.
	 * @param \DOMElement  $wrapper Wrapper element.
	 * @return string Inner HTML.
	 */
	private static function get_wrapper_inner_html( $doc, $wrapper ) {
		$output = '';
		foreach ( $wrapper->childNodes as $child ) {
			$output .= $doc->saveHTML( $child );
		}
		return $output;
	}

	/**
	 * Get enabled heading levels from options (e.g. ['h2','h3','h4']).
	 *
	 * @param array $options Headlines options.
	 * @return array List of tag names.
	 */
	private static function get_enabled_levels( $options ) {
		$levels = isset( $options['enabled_heading_levels'] ) && is_array( $options['enabled_heading_levels'] )
			? $options['enabled_heading_levels']
			: array( 'h2', 'h3', 'h4' );
		return array_values( array_filter( $levels, 'is_string' ) );
	}

	/**
	 * Build XPath expression for heading tags (e.g. .//h2 | .//h3 | .//h4).
	 *
	 * @param array $levels Tag names.
	 * @return string XPath expression.
	 */
	private static function build_headings_xpath( $levels ) {
		if ( empty( $levels ) ) {
			return './/*[false()]';
		}
		$parts = array();
		foreach ( $levels as $tag ) {
			$tag = preg_replace( '/[^a-z0-9]/i', '', $tag );
			if ( '' !== $tag ) {
				$parts[] = './/' . strtolower( $tag );
			}
		}
		return empty( $parts ) ? './/*[false()]' : implode( ' | ', $parts );
	}

	/**
	 * Parse exclusion_selectors string into list of simple selectors (class or id).
	 *
	 * @param string $exclusion_selectors Comma-separated selectors (e.g. ".wp-block-query, #sidebar").
	 * @return array List of ['type' => 'class'|'id', 'value' => string].
	 */
	private static function parse_exclusion_selectors( $exclusion_selectors ) {
		$selectors = array();
		if ( ! is_string( $exclusion_selectors ) ) {
			return $selectors;
		}
		$parts = array_map( 'trim', explode( ',', $exclusion_selectors ) );
		foreach ( $parts as $part ) {
			$part = trim( $part );
			if ( '' === $part ) {
				continue;
			}
			if ( strpos( $part, '.' ) === 0 && strlen( $part ) > 1 ) {
				$selectors[] = array(
					'type'  => 'class',
					'value' => substr( $part, 1 ),
				);
			} elseif ( strpos( $part, '#' ) === 0 && strlen( $part ) > 1 ) {
				$selectors[] = array(
					'type'  => 'id',
					'value' => substr( $part, 1 ),
				);
			}
		}
		return $selectors;
	}

	/**
	 * Whether the heading (or any ancestor) is excluded by class or exclusion selectors.
	 *
	 * @param \DOMElement $heading              Heading element.
	 * @param array       $exclusion_selectors Parsed exclusion selectors.
	 * @return bool True if excluded.
	 */
	private static function is_heading_excluded( \DOMElement $heading, $exclusion_selectors ) {
		$node = $heading;
		while ( $node instanceof \DOMElement ) {
			if ( self::element_has_exclude_class( $node ) ) {
				return true;
			}
			if ( self::element_matches_exclusion_selectors( $node, $exclusion_selectors ) ) {
				return true;
			}
			$parent = $node->parentNode;
			if ( ! $parent instanceof \DOMElement ) {
				break;
			}
			$node = $parent;
		}
		return false;
	}

	/**
	 * Check if element has the has-headline-exclude class (whole word).
	 *
	 * @param \DOMElement $element Element.
	 * @return bool
	 */
	private static function element_has_exclude_class( \DOMElement $element ) {
		$class = $element->getAttribute( 'class' );
		if ( '' === $class ) {
			return false;
		}
		$classes = preg_split( '/\s+/', $class, -1, PREG_SPLIT_NO_EMPTY );
		return in_array( self::EXCLUDE_CLASS, $classes, true );
	}

	/**
	 * Check if element matches any of the parsed exclusion selectors (class or id).
	 *
	 * @param \DOMElement $element              Element.
	 * @param array       $exclusion_selectors Parsed selectors.
	 * @return bool
	 */
	private static function element_matches_exclusion_selectors( \DOMElement $element, $exclusion_selectors ) {
		foreach ( $exclusion_selectors as $sel ) {
			if ( 'class' === $sel['type'] ) {
				$class = $element->getAttribute( 'class' );
				if ( '' !== $class ) {
					$classes = preg_split( '/\s+/', $class, -1, PREG_SPLIT_NO_EMPTY );
					if ( in_array( $sel['value'], $classes, true ) ) {
						return true;
					}
				}
			} elseif ( 'id' === $sel['type'] && $sel['value'] === $element->getAttribute( 'id' ) ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Get plain text from heading (for slug generation).
	 *
	 * @param \DOMElement $heading Heading element.
	 * @return string
	 */
	private static function get_heading_text( \DOMElement $heading ) {
		$text = '';
		foreach ( $heading->childNodes as $child ) {
			if ( XML_TEXT_NODE === $child->nodeType ) {
				$text .= $child->textContent;
			} elseif ( $child instanceof \DOMElement ) {
				$text .= $child->textContent;
			}
		}
		return trim( $text );
	}

	/**
	 * Add a headline slug to the ID tracker and return the unique slug to use.
	 *
	 * Mirrors SimpleTOC_Headline_Ids::add_headline() so IDs stay unique across all processed content.
	 *
	 * @param string $headline_slug The slug of the headline.
	 * @return string The slug to use (possibly with -2, -3, etc. appended).
	 */
	protected static function add_headline( $headline_slug ) {
		if ( '' === $headline_slug ) {
			return '';
		}

		if ( ! isset( self::$headlines[ $headline_slug ] ) ) {
			self::$headlines[ $headline_slug ] = 1;
		} else {
			self::$headlines[ $headline_slug ] = self::get_headline_count( $headline_slug ) + 1;
		}
		if ( self::$headlines[ $headline_slug ] > 1 ) {
			$new_headline_slug = $headline_slug . '-' . self::$headlines[ $headline_slug ];
			if ( isset( self::$headlines[ $new_headline_slug ] ) ) {
				$new_headline_slug = self::add_headline( $new_headline_slug );
			}
			$new_headline_count = self::get_headline_count( $new_headline_slug );
			if ( 0 === $new_headline_count ) {
				$new_headline_count = 1;
			}
			self::$headlines[ $new_headline_slug ] = $new_headline_count;
			$headline_slug                         = $new_headline_slug;
		}
		return $headline_slug;
	}

	/**
	 * Get the anchor (slug) for a headline. Optionally register it in the ID tracker.
	 *
	 * @param string $headline_text Raw heading text.
	 * @param bool   $add_headline  Whether to add the headline to the tracker (use true when assigning an id).
	 * @return string The anchor slug for the headline.
	 */
	public static function get_headline_anchor( $headline_text, $add_headline = false ) {
		if ( '' === $headline_text ) {
			return '';
		}

		$headline_slug = sanitize_title_with_dashes( $headline_text );
		if ( '' === $headline_slug ) {
			$headline_slug = 'heading';
		}

		if ( $add_headline ) {
			$headline_slug = self::add_headline( $headline_slug );
		}
		return $headline_slug;
	}

	/**
	 * Get the count of a headline slug in the tracker.
	 *
	 * @param string $headline_slug The slug of the headline.
	 * @return int The count for that slug.
	 */
	private static function get_headline_count( $headline_slug = '' ) {
		return self::$headlines[ $headline_slug ] ?? 0;
	}
}
