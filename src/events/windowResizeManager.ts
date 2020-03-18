/**
 * A common class to listen to all resize events
 * and notify and objects interested in window size
 */
import addEvent from './addEvent';
// @ts-ignore
import debounce from 'lodash/debounce';

/**
 * Stores list of all the listeners
 * @type {Array}
 */
const listenerList: any[] = [];

/**
 * Main function which fires resize events
 * @param event
 */
const resizeFunction = function () {
  const {height, width} = getSize();
  listenerList.forEach(function (listener) {
    // @ts-ignore
    listener.call(this, width, height);
  });
};

const debouncedResizeFunction = debounce(resizeFunction, 250);
addEvent(window, 'resize', debouncedResizeFunction);

/**
 * Adds listener
 * 
 * Clients can subscribe to this method to get callback whenever window is resized.
 * @param listener
 */
export function addResizeListener(listener: Function) {
  if (listener !== undefined && typeof listener === "function") {
    listenerList.push(listener);
  }
}
/**
 * Removes listener
 *
 * @param listener
 */
export function removeResizeListener(listener: Function) {
  var listenerIndex = listenerList.indexOf(listener);
  //TODO : Older IE ?  Does not matter much as for our simple app not many listeners
  if (listenerIndex > -1) {
    listenerList.splice(listenerIndex, 1);
  }
}

/**
 * function which returns the window size on demand
 * @returns {{height: Number, width: Number}}
 */
export function getSize() {
  return {
    height: window.innerHeight,
    width: window.innerWidth
  }
}
