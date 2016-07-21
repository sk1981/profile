/**
 * A common class to listen to all resize events
 * and notify and objects interested in window size
 */
import addEvent from './addEvent';
import debounce from 'lodash/debounce';

/**
 * Stores list of all the listeners
 * @type {Array}
 */
const listenerList = [];

/**
 * Main function which fires resize events
 * @param event
 */
const resizeFunction = function (event) {
  const {height, width} = getSize();
  console.log("resized", height, width);
  listenerList.forEach(function (listener) {
    listener.call(this, width, height);
  });
};

const debouncedResizeFunction = debounce(resizeFunction, 250);
addEvent(window, 'resize', debouncedResizeFunction);

/**
 * Adds listener
 * @param listener
 */
export function addResizeListener(listener) {
  if (listener !== undefined && typeof listener === "function") {
    listenerList.push(listener);
  }
}
/**
 * Removes listener
 *
 * @param listener
 */
export function removeResizeListener(listener) {
  var listenerIndex = listenerList.indexOf(listener);
  //TODO : Older IE ?  Does not matter much as for our simple app not many listeners
  if (index > -1) {
    listenerIndex.splice(index, 1);
  }
}

export function getSize() {
  return {
    height: window.innerHeight,
    width: window.innerWidth
  }
}
