/**
 * Cross browser event listener
 *
 * First checks that the standard addEventListener is present or not .
 *   If present, use that
 *   If not, use the attachEvent object (IE8 and below)
 * If attachEvent is also not present use inline events
 * @param object
 * @param type
 * @param callback
 */
const addEvent = function(object: any, type: string, callback: Function) {
  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent("on" + type, callback);
  } else {
    object["on" + type] = callback;
  }
};

export default addEvent;
