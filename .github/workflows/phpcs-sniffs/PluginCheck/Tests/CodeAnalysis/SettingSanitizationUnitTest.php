<?php
/**
 * Unit tests for SettingSanitizationSniff.
 *
 * @package PluginCheck
 */

namespace PluginCheck\Tests\CodeAnalysis;

use PluginCheck\Sniffs\CodeAnalysis\SettingSanitizationSniff;
use PluginCheck\Tests\AbstractSniffUnitTest;
use PHP_CodeSniffer\Sniffs\Sniff;

/**
 * Unit tests for SettingSanitizationSniff.
 */
final class SettingSanitizationUnitTest extends AbstractSniffUnitTest {

	/**
	 * Returns the lines where errors should occur.
	 *
	 * @return array <int line number> => <int number of errors>
	 */
	public function getErrorList() {
		return array(
			2 => 1,
			3 => 1,
			4 => 1,
		);
	}

	/**
	 * Returns the lines where warnings should occur.
	 *
	 * @return array <int line number> => <int number of warnings>
	 */
	public function getWarningList() {
		return array(
			7  => 1,
			9  => 1,
			19 => 1,
			21 => 1,
		);
	}

	/**
	 * Returns the fully qualified class name (FQCN) of the sniff.
	 *
	 * @return string The fully qualified class name of the sniff.
	 */
	protected function get_sniff_fqcn() {
		return SettingSanitizationSniff::class;
	}

	/**
	 * Sets the parameters for the sniff.
	 *
	 * @throws \RuntimeException If unable to set the ruleset parameters required for the test.
	 *
	 * @param Sniff $sniff The sniff being tested.
	 */
	public function set_sniff_parameters( Sniff $sniff ) {
	}
}
