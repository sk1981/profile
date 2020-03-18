import h from 'snabbdom/h';
import SelectionInputView from './SelectionInputView';
import SelectionDropdownView from './SelectionDropdownView';
import CancelIconView from './CancelIconView';

import ModelManager from './ModelManager';

export default {

  handlerCreator(model: any, dispatcher: any, listeners: any) {
    return {
      highlightOption: function(newHighlightedOptionIndex: any) {
        model.highlightedOptionIndex = newHighlightedOptionIndex;
        dispatcher(model);
      },
      optionIndexSelected: function(selectedHighlightOption: any) {
        model.selectedText = model.filteredOptions[selectedHighlightOption];
        model = ModelManager.reset(model);
        model.text = model.selectedText;
        listeners.onSelected(model.selectedText);
        dispatcher(model);
      },
      textChange: function(newText: string) {
        model = ModelManager.filterOptions(model, newText);
        dispatcher(model);
      },
      textSelected: function(text: string) {
        const filteredOptions = model.filteredOptions;
        model.selectedText = filteredOptions.indexOf(text) > -1 ? text: filteredOptions[0];
        model = ModelManager.reset(model);
        model.text = model.selectedText;
        listeners.onSelected(model.selectedText);
        dispatcher(model);
      },
      cancelled: function() {
        model = ModelManager.reset(model);
        dispatcher(model);
      },
      isActive: function(isActive: boolean) {
        if(!isActive) {
          model = ModelManager.reset(model);
        } else {
          model.active = isActive;
        }
        dispatcher(model);
      },
      fullReset: function() {
        model = ModelManager.reset(model);
        model.selectedText = '';
        listeners.onSelected(model.selectedText);
        dispatcher(model);
      }
    }
  },

  render(model: any, dispatcher: any, listeners: any) {

    const handler = this.handlerCreator(model, dispatcher, listeners);

    return h('div.select-type',
      {
        class: {
          "select-type--active": model.active
        }
      },
      [
        SelectionInputView.render(model, handler),
        CancelIconView.render(model, handler),
        SelectionDropdownView.render(model, handler)
      ]
    );
  }
}
