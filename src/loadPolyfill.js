/**
 * Class which loads the request polyfills if they are missing
 *
 * Here we try to load the polyfills only if the features are not present.
 */


const needsAnimationFramePolyfill = !window.requestAnimationFrame;
const needsClassListPolyfill = !(document.documentElement && document.documentElement.classList) || !(document.body.classList);

export default {
  /**
   * Ensures that if a polyfill is needed the given function waits till the
   * polyfills have been loaded and then runs the function.
   *
   * Any case where polyfill is not required, runs immediately.
   *
   * While we can have separate methods for different kinds of polyfill, we are
   * just loading all the polyfills at once as they are lightweight and target
   * similar kinds of browser (IE)
   *
   * @param functionToRun
   */
  waitTillPolyFillsLoaded(functionToRun) {
    if(needsAnimationFramePolyfill || needsClassListPolyfill) {
      require.ensure(['classlist.js', 'raf'], () => {
        require('classlist.js');
        const raf = require('raf');
        raf.polyfill();
        functionToRun();
      });
    } else {
      functionToRun();
    }
  }
}