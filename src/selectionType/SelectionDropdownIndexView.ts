import {h} from 'snabbdom';
import DOMUtils from './DOMUtils';

export default {
  render(model: any, handler: any) {
    let highlightedOption;
    if(model.highlight) {
      highlightedOption = DOMUtils.highlightCharacters(model.option, model.highlight)
    } else {
      highlightedOption = model.option;
    }
    return h('li.select-type__index', {
      isFocused: model.isFocused,
      hook: {
        // TODO : Scroll into view element if it's hidden
        // postpatch:  (oldVnode, vnode) => {
        //   if(model.isFocused) {
        //     vnode.elm.scrollIntoView();
        //   }
        // }
      },
      attrs: {
        role:"option"
      },
      class: {
        "select-type__index--focused": model.isFocused
      },
      on: {
        mousedown: () => {
          handler.textSelected(model.option);
        }
      }
    }, highlightedOption)
  }
}
