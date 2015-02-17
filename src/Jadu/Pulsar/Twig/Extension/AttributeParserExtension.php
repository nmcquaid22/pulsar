<?php

namespace Jadu\Pulsar\Twig\Extension;

/**
 * Attribute parser
 *
 * Takes an array of attributes to be converted into HTML formatted attributes
 * ready for use in an HTML element.
 *
 * Unit tests: tests/unit/AttribuetParserExtensionTest.php
 */
class AttributeParserExtension extends \Twig_Extension
{
	/**
	 * Get the name of this extension
	 *
	 * @return string The name of the extension
	 */
	public function getName()
	{
		return 'attribute_parser_extension';
	}

	/**
	 * Returns a list of filters.
	 *
	 * @return array
	 */
	public function getFilters()
	{
		$filters = array(
			new \Twig_SimpleFilter(
				'defaults',
				array($this, 'defaultAttributes'),
				array('is_safe' => array('html'))
			)
		);
		return $filters;
	}

	/**
	 * Register the `attributes()` function with Twig.
	 *
	 * @return array The Twig function
	 */
	public function getFunctions()
	{
		return array(
			new \Twig_SimpleFunction(
				'attributes',
				array($this, 'parseAttributes'),
				array('is_safe' => array('html'))
			)
		);
	}

	public function defaultAttributes(array $attributes, array $default)
	{
		$out = $attributes;

		foreach ($default as $key => $value) {
			if (array_key_exists($key, $attributes)) {
				$out[$key] = $value . ' ' . $attributes[$key];
				continue;
			}

			$out[$key] = $value;
		}

		return $out;
	}

	/**
	 * Convert an array of attributes into a HTML friendly string.
	 *
	 * @param  array  $attributes An array of attributes to parse
	 * @param  array  $args       Arguments to affect the output:
	 *                [exclude] A list of keys to remove. This takes precedence
	 *                over other options
	 *                [include] A list of keys to be output, all others will be
	 *                ignored
	 *                [default] Additional attributes to be included, if the
	 *                attribute exists in both $attributes and $args, the values
	 *                will be merged
	 * @return string             A space separated string of key="value"
	 * attributes ready for including in an HTML element
	 */
	public function parseAttributes($attributes, array $args = array())
	{
		if (empty($attributes)) {
			return '';
		}

		$html = array();

		// // Handle default attributes
		// if (array_key_exists('default', $args)) {
		// 	foreach ($args['default'] as $key => $value) {

		// 		// If attribute exists, merge it
		// 		if (array_key_exists($key, $attributes)) {
		// 			$attributes[$key] = $attributes[$key] . ' ' . $args['default'][$key];
		// 			continue;
		// 		}

		// 		// Otherwise, just add a new attribute
		// 		$html[] = htmlspecialchars($key) . '="' . htmlspecialchars($value) . '"';
		// 	}
		// }

		// Parse the attributes
		foreach ($attributes as $key => $value) {
			$html[] = htmlspecialchars($key) . '="' . htmlspecialchars($value) . '"';
		}

		return implode(' ', $html);
	}

}
