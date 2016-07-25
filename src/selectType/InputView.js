/**
 * View related to the the select dropdown index.
 *
 * TODO(Behaviour): On Scroll using keys, the dropdown entries should be displayed if they are not viewable.
 * TODO(Design): actions abd events needs to be better.
 *
 */
import h from 'snabbdom/h';
import debounce from 'lodash/debounce'
let inputNode;

const actions = {
  // Text in the input box changes
  TEXT_CHANGE: 'TEXT_CHANGE',
  // Fired when option changes to active or is blurred
  ACTIVE_CHANGE: 'ACTIVE_CHANGE',
  //
  HIGHLIGHTED_OPTION_CHANGE: 'HIGHLIGHTED_OPTION_CHANGE',
  SELECTED_VALUE: 'SELECT_VALUE'
};

function handleKeyMove(newFocusedOptionIndex, options, handler) {
  if(newFocusedOptionIndex < options.length && newFocusedOptionIndex > -2) {
    handler({type: actions.HIGHLIGHTED_OPTION_CHANGE, highlightedOptionIndex: newFocusedOptionIndex});
  }
}

function specialKeysChange(inputEvent, model, handler) {
  const keyCode = +inputEvent.keyCode;
  switch(keyCode) {
    case 40: // DownArray -- move to highlight
      handleKeyMove(model.highlightedOptionIndex + 1, model.options, handler);
      break;
    case 38: // Up Arrow - move up the highlighted option
      handleKeyMove(model.highlightedOptionIndex - 1, model.options, handler);
      break;
    case 13: // Enter key, select option
      handler({type: actions.SELECTED_VALUE, selectedOptionIndex: model.highlightedOptionIndex});
      // As postupdate does not seems to work, manually blur
      inputEvent.target.blur();
      break;
    case 27: //Escape key
      handler({type: actions.ACTIVE_CHANGE, active: false});
      // As postupdate does not seems to work, manually blur
      inputEvent.target.blur();
      break;
    default:
     //empty
  }
}

function valueChange(inputEvent, model, handler) {
  const keyCode = +inputEvent.keyCode;
  // Ignore the special keys
  if([40, 38, 13, 27].indexOf(keyCode) > -1) {
    return;
  }
  const textValue = inputEvent.target.value;
      handler({type: actions.TEXT_CHANGE, text: textValue});

}

// const valueChangeDebounced = debounce(valueChange, 200);

function view(model, handler) {
  console.log("view render");
  return h('div.input.select-type__wrapper', {}, [
    h('input.select-type__input', {
      class: {
        'select-type__input--active': model.active
      },
      attrs: {
        role: 'combobox', // https://www.w3.org/TR/wai-aria/roles#combobox
        'aria-multiselectable': false,
        'aria-autocomplete': 'both',
        'aria-owns': 'select-filter-dropdown',
        'aria-expanded': model.active,
        'aria-haspopup': model.active // while for menus, still makes sense here
      },
      props: {
        value: model.text,
        placeholder: 'Please select a technology to filter...'
      },
      on: {
        keydown: event => {
          specialKeysChange(event, model, handler);
        },
        keyup: event => {
          valueChange(event, model, handler);
        },
        blur: handler.bind(null, {type: actions.ACTIVE_CHANGE, active: false}),
        focus: handler.bind(null, {type: actions.ACTIVE_CHANGE, active: true})
      }
    }, [])
  ]);
}

function resetInput(model) {
  model.highlightedOptionIndex = -1;
  return model
}

function deActivateInput(model) {
  model.active = false;
  return resetInput(model);
}

function update(model, actionData, listeners) {
  switch (actionData.type) {
    case actions.TEXT_CHANGE:
      model.text = actionData.text;
      model = resetInput(model);
      break;
    case actions.ACTIVE_CHANGE:
      // Reset option
      model = resetInput(model);
      model.active = actionData.active;
      break;
    case actions.HIGHLIGHTED_OPTION_CHANGE:
      // Just highlight the first option when we move from text to select dropdown
      model.highlightedOptionIndex = actionData.highlightedOptionIndex;
      break;
    case actions.SELECTED_VALUE:
      model.selectedOptionIndex = actionData.selectedOptionIndex;
      model = deActivateInput(model);
      // Fire select listener on active change
      // if(listeners.onSelected) listeners.onSelected(model.text);
      break;
    default:
      //empty
  }
  return model;
}

export default {view, update, actions}
