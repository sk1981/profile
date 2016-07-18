/**
 * View related to the the select dropdown index.
 *
 * TODO(Design): no final selection event, we select based on active change. make this better ?
 * TODO(Behaviour): On Scroll using keys, the dropdown entries should be displayed if they are not viewable.
 * TODO(Design): actions abd events needs to be better.
 *
 */
import h from 'snabbdom/h';
import debounce from 'lodash/debounce'
const actions = {
  TEXT_CHANGE: "Text_Change",
  ACTIVE_CHANGE: "Active_Change",
  FOCUS_CHANGE: "Focus_Change"
};

function valueChange(inputEvent, model, handler) {
  const value = inputEvent.target.value;
  if(inputEvent.keyCode === 40) { // Key Down - move to highlight
    const newFocusedOptionIndex = model.focusedOptionIndex + 1;
    if(newFocusedOptionIndex < model.options.length) {
      handler({type: actions.FOCUS_CHANGE, focusedOptionIndex: newFocusedOptionIndex});
    }
  } else if(inputEvent.keyCode === 38) { // Key up - move to highlight
    const newFocusedOptionIndex = model.focusedOptionIndex - 1;
    if(newFocusedOptionIndex > -2) { // -1 is valid as it indicates no option
      handler({type: actions.FOCUS_CHANGE, focusedOptionIndex: newFocusedOptionIndex});
    }
  } else if(inputEvent.keyCode === 13) { // Key up - move to highlight
    const selectedText = model.options[model.focusedOptionIndex];
    // handler({type: actions.TEXT_CHANGE, text: selectedText});
    handler({type: actions.ACTIVE_CHANGE, active: false});
  } else if(inputEvent.keyCode === 27) { // Escape Event - close
    inputEvent.target.blur();
    handler({type: actions.ACTIVE_CHANGE, active: false});
  } else {
    handler({type: actions.TEXT_CHANGE, text: value});
  }
}

const valueChangeDebounced = debounce(valueChange, 200);

function view(model, handler) {
  return h('div.input.select-type__wrapper', {}, [
    h('input.select-type__input', {
      props: {
        value: model.text,
        autocomplete: false,
        "aria-autocomplete": "list",
        placeholder: 'Please select a technology to filter...'
      },
      on: {
        keydown: event => {
          valueChangeDebounced(event, model, handler);
        },
        blur: handler.bind(null, {type: actions.ACTIVE_CHANGE, active: false}),
        focus: handler.bind(null, {type: actions.ACTIVE_CHANGE, active: true})
      }
    }, [])
  ]);
}

function update(model, actionData, listeners) {
  if (actionData.type === actions.TEXT_CHANGE) {
    model.text = actionData.text;
    // Reset option
    model.focusedOptionIndex = -1;
  }
  if (actionData.type === actions.ACTIVE_CHANGE) {
    // Reset option
    model.focusedOptionIndex = -1;
    model.active = actionData.active;
    // Ensure that active=false text is always empty or one of the options
    if(model.active === false && model.options.indexOf(model.text) < 0) {
      model.text = '';
    }
    // Fire select listener on active change
    if(listeners.onSelected) listeners.onSelected(model.text)
  }
  if (actionData.type === actions.FOCUS_CHANGE) {
    // Just highlight the first option when we move from text to select dropdown
    model.focusedOptionIndex = actionData.focusedOptionIndex;
  }
  return model;
}

export default {view, update, actions}
