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

/*!
 * "Valid e-mail address" regex, copied from the WHATWG HTML Living Standard.
 * Copyright (c) WHATWG (Apple, Google, Mozilla, Microsoft).
 * Per https://github.com/whatwg/html/blob/main/LICENSE, portions of the spec
 * incorporated into source code (such as this regex) are licensed under the
 * BSD 3-Clause License:
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
export const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Test a value against the native email pattern.
 *
 * @param {string} value Value to test.
 * @return {boolean} Whether the value looks like a valid email address.
 */
export const isValidEmail = ( value ) => EMAIL_PATTERN.test( value );
