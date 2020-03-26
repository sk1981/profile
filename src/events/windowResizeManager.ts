/**
 * A common class to listen to all resize events
 * and notify and objects interested in window size
 */
import addEvent from "./addEvent";
import debounce from "lodash.debounce";

type ListenerFunction = (windowWidth: number, windowHeight: number) => void;

/**
 * Stores list of all the listeners
 * @type {Array}
 */
const listenerList: ListenerFunction[] = [];

/**
 * Main function which fires resize events
 */
const fireResizeListeners = function() {
  const { windowHeight, windowWidth } = getWindowSize();
  listenerList.forEach(function(listener) {
    listener(windowWidth, windowHeight);
  });
};

const debouncedFireResizeListeners = debounce(fireResizeListeners, 250);
addEvent(window, "resize", debouncedFireResizeListeners);

/**
 * Adds listener
 *
 * Clients can subscribe to this method to get callback whenever window is resized.
 * @param listener
 */
export function addResizeListener(listener: ListenerFunction) {
  if (listener !== undefined && typeof listener === "function") {
    listenerList.push(listener);
  }
}
/**
 * Removes listener
 *
 * @param listener
 */
export function removeResizeListener(listener: ListenerFunction) {
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
export function getWindowSize() {
  return {
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  };
}
