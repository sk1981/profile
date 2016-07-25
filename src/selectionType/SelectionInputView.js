import h from 'snabbdom/h';
import KeyUtils from './dom/KeyUtils';

const SPECIAL_KEYS = [KeyUtils.keys.DOWN_ARROW_KEY,
  KeyUtils.keys.UP_ARROW_KEY,
  KeyUtils.keys.ENTER_KEY,
  KeyUtils.keys.ESCAPE_KEY];


export default {

  handleKeyMove(newHighlightedOptionIndex, filteredOptions, handler) {
    if(newHighlightedOptionIndex < filteredOptions.length && newHighlightedOptionIndex > -2) {
      // handler({type: actions.HIGHLIGHTED_OPTION_CHANGE, highlightedOptionIndex: newHighlightedOptionIndex});
      handler.highlightOption(newHighlightedOptionIndex);
    }
  },

  specialKeysChange(inputEvent, model, handler) {
    const keyCode = +inputEvent.keyCode;
    switch(keyCode) {
      case KeyUtils.keys.DOWN_ARROW_KEY: // move to next option as highlight
        this.handleKeyMove(model.highlightedOptionIndex + 1, model.filteredOptions, handler);
        break;
      case KeyUtils.keys.UP_ARROW_KEY: // Up Arrow - move up the highlighted option
        this.handleKeyMove(model.highlightedOptionIndex - 1, model.filteredOptions, handler);
        break;
      case KeyUtils.keys.ENTER_KEY:
        // Only accept input events if filtered options has length greater than
        if(model.filteredOptions.length > 0) {
          // Select option index if option index is highlighted else select text
          if(model.highlightedOptionIndex > -1) {
            handler.optionIndexSelected(model.highlightedOptionIndex);
          } else {
            handler.textSelected(model.text);
          }
          // As postupdate does not seems to work, manually blur
          inputEvent.target.blur();
        }
        break;
      case KeyUtils.keys.ESCAPE_KEY: //close the option
        handler.cancelled();
        // As postupdate does not seems to work, manually blur
        inputEvent.target.blur();
        break;
      default:
      //empty
    }
  },

  valueChange(inputEvent, handler) {
    const keyCode = +inputEvent.keyCode;
    // Ignore the special keys
    if(!SPECIAL_KEYS.indexOf(keyCode) > -1) {
      const textValue = inputEvent.target.value;
      handler.textChange(textValue);
      // handler({type: actions.TEXT_CHANGE, text: textValue});
    }
  },
  
  render(model, handler) {
    return h('div.input.select-type__wrapper', {}, [
      h('input.select-type__input', {
        class: {
          'select-type__input--selected': !model.active && !!model.selectedText
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
          value: model.active ? model.text : model.selectedText,
          placeholder: 'Please select a technology to filter...'
        },
        on: {
          keydown: event => {
            this.specialKeysChange(event, model, handler);
          },
          keyup: event => {
            this.valueChange(event, handler);
          },
          blur: handler.isActive.bind(null, false),
          focus: handler.isActive.bind(null, true)
        }
      }, [])
    ]);
  }
}