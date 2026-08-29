/**
 * Shared "native" email validation.
 *
 * This is the same "valid e-mail address" pattern browsers use to decide
 * whether an <input type="email"> passes constraint validation (see the
 * HTML spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address).
 *
 * We run it ourselves (as a react-hook-form `pattern` rule) instead of relying
 * on the browser's own native validation flow, because the native flow also
 * pops up the browser's default validation bubble UI, which we don't want —
 * fields still keep type="email" for its input semantics, but error display
 * is fully handled by our own UI.
 */
export const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Test a value against the native email pattern.
 *
 * @param {string} value Value to test.
 * @return {boolean} Whether the value looks like a valid email address.
 */
export const isValidEmail = ( value ) => EMAIL_PATTERN.test( value );
