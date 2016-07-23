import h from 'snabbdom/h';
import DOMUtils from './DOMUtils';
const actions = {
  OPTION_SELECTED: 'option_selected'
};

function view(data, handler) {
  let highlightedOption;
  if(data.highlight) {
    highlightedOption = DOMUtils.highlightCharacters(data.option, data.highlight)
  } else {
    highlightedOption = data.option;
  }
  return h('li.select-type__index', {
    attrs: {
      role:"option"
    },
    class: {
      "select-type__index--focused": data.isFocused
    },
    on: {
      mousedown: event => {
        handler({type: actions.OPTION_SELECTED, option: data.option})
      }
    }
  }, highlightedOption)
}

function update(model, actionData) {
  if (actionData.type === actions.OPTION_SELECTED) {
    model.text = actionData.option;
  }
  return model;
}

export default {view, update, actions}