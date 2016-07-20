import EasingFunctions from '../animation/EasingFunctions'
import DateUtils from '../uitls/DateUtils';

const PIXELS_PER_MSEC = 5; // We plan to move 10 pixels per milliseconds


export function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export function getElementTop(elementInstance) {
  const elementRect = elementInstance.getBoundingClientRect();
  return elementRect.top;
}

export function animate(elementInstance) {
  const scrollTop = getScrollTop();
  const elementTop = getElementTop(elementInstance);

  const totalTime = elementTop/ PIXELS_PER_MSEC;
  const startTime = DateUtils.getCurrentTime();
  function animateTween() {
    const timeDelta = DateUtils.getCurrentTime() - startTime;
    if (timeDelta <= totalTime) {
      //elementTop ==> amount we need to move
      const newScrollTop = EasingFunctions.linear(timeDelta, scrollTop, elementTop, totalTime);
      document.documentElement.scrollTop = document.body.scrollTop = newScrollTop;
      window.requestAnimationFrame(animateTween);
    }
  }
  animateTween();
}