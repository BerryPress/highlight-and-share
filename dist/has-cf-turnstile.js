/******/ (() => { // webpackBootstrap
/*!*************************************!*\
  !*** ./src/frontendjs/turnstile.js ***!
  \*************************************/
/* eslint-disable padded-blocks */
/**
 * Turnstile JS functionality.
 */

/**
 * This is the main callback for Cloudflare.
 */
var turnstileHasBeenCalled = false;
window.hasInitTurnstile = function () {
  turnstileHasBeenCalled = true;

  // Get submit button.
  var submitButton = document.querySelector('#has-recaptcha-submit');
  if (null === submitButton) {
    return;
  }

  // Check that turnstile is present.
  if (typeof turnstile === 'undefined') {
    return;
  }

  /**
   * This is the callback for when the user has filled out the textarea.
   * We wait until the textarea is filled out to load turnstile to avoid the 300 second timeout of the token.
   */
  var turnstileBeginRender = function turnstileBeginRender() {
    // Now init turnstile.
    var widgetId = turnstile.render('#has-turnstile', {
      sitekey: hasCfTurnstileLocal.sitekey,
      callback: function callback(token) {
        setTimeout(function () {
          // Reset the widget.
          turnstile.reset(widgetId);
        }, 300000); // 300 seconds (5 mins).
      },
      size: hasCfTurnstileLocal.size,
      theme: hasCfTurnstileLocal.theme,
      language: hasCfTurnstileLocal.language
    });
  };
  turnstileBeginRender();
};
document.addEventListener('DOMContentLoaded', function () {
  if (!turnstileHasBeenCalled) {
    window.hasInitTurnstile();
  }
});
/******/ })()
;
//# sourceMappingURL=has-cf-turnstile.js.map