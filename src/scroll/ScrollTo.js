import EasingFunctions from '../animation/EasingFunctions'
import DateUtils from '../uitls/DateUtils';

const PIXELS_PER_MSEC = 10; // We plan to move 10 pixels per milliseconds

const PIXELS_PER_MSEC_SMALL = 4; // We plan to move 4 pixels per milliseconds smaller distances

// Small distance which has been chosen so that we can reach around top of project for smaller distances
const SMALL_DISTANCE = 2500;

/**
 * This number has been chosen so that scrolling to the bottom does not takes too much time.
 *
 * We will be using a lesser number for shorter distances to make animation smoother
 *
 * @type {number}
 */
function getTotalTime(totalHeight) {
  const pixelsPerSeconds = ~~(totalHeight > SMALL_DISTANCE? PIXELS_PER_MSEC: PIXELS_PER_MSEC_SMALL);
  console.log(pixelsPerSeconds);
  return totalHeight/pixelsPerSeconds;
}

/**
 * Gets the current scroll position of the browser
 *
 * @returns {Number|number}
 */
export function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

/**
 * get the top position of the element where we want to navigate to
 * wrt to the viewport.
 *
 * As we want to move to case where element top = 0, this amount is the
 * total distance we need to scroll to
 *
 * @param elementInstance element for which top needs to be found
 * @returns {Number} total scroll position
 */
export function getElementTop(elementInstance) {
  const elementRect = elementInstance.getBoundingClientRect();
  return elementRect.top;
}

/**
 *
 * Animates scroll to the element.
 *
 * @param elementInstance instance of the element to which to scroll to.
 */
export function animate(elementInstance) {
  const scrollTop = getScrollTop();
  const elementTop = getElementTop(elementInstance);
  const totalTime = getTotalTime(elementTop);
  const startTime = DateUtils.getCurrentTime();
  let animationFinished = false;
  function animateTween() {
    let timeDelta = Math.floor(DateUtils.getCurrentTime() - startTime);
    // if time-delta becomes greater than total time, make them equal.
    if(timeDelta > totalTime) {
      timeDelta = totalTime;
    }
    // elementTop ==> amount we need to move
    let newScrollTop = EasingFunctions.easeOutQuad(timeDelta, scrollTop, elementTop, totalTime);

    if (timeDelta <= totalTime && !animationFinished) {
      // If both values are equal mark animation as finished
      // It can never be greater as we make them equal
      if(timeDelta === totalTime) {
        animationFinished = true;
      }
      document.documentElement.scrollTop = document.body.scrollTop = ~~newScrollTop;
      // window.setTimeout(animateTween, 17);
      requestAnimationFrame(animateTween)
    }
  }
  animateTween();
}