import {h} from 'snabbdom';
import {VNode} from "snabbdom/vnode";

/**
 * To be moved to another repo
 */
export default {
  highlightCharacters(text ='', highlight: string) {
    // brackets to ensure positive look ahead
    const textSearchRegex = new RegExp(`(${highlight})`, "ig");
    const highlightTextLower = highlight.toLowerCase();
    const textArray = text.split(textSearchRegex);
    return textArray.reduce( (previous: VNode[], current) => {
      // If part of split string is same as te highlight wrap it in emphasis tag
      const tagType = highlightTextLower === current.toLowerCase() ? 'em' : 'span';
      previous.push(h(tagType, {}, current));
      return previous;
    }, [])
  }
}
