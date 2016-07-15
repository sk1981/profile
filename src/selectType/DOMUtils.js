import h from 'snabbdom/h';

/**
 * To be moved to another repo
 */
export default {
  highlightCharacters(text ='', highlight) {
    const textArray = text.split(highlight);
    return textArray.reduce( (previous, current) => {
      if(previous.length > 0) previous.push(h('em', {}, highlight));
      previous.push(h('span', {}, current));
      return previous;
    }, [])
  }
}
