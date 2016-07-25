var h = require('snabbdom/h');
import InputView from './InputView';
import SelectDropdownView from './SelectDropdownView';
import ActionUtils from './action/ActionUtils';

function view(data, handler) {

  return h('div.select-type', {
    class: {
      "select-type--active": data.active
    }
  }, [
    InputView.view(data, handler),
    SelectDropdownView.view(data, handler)
  ]);
}

function update(model, action, listeners) {
  console.log("update due to action ----" , action);
  if (ActionUtils.isActionInGivenObject(InputView.actions, action.type)) {
    model = InputView.update(model, action, listeners);
    // subsequent actions
    // if(InputView.actions.OPTION_SELECTED === action.type) {
    //   model = SelectDropdownView.update(model, {type: SelectDropdownView.actions.SELECTED_OPTION_INDEX});
    // }
  } else {
    model = SelectDropdownView.update(model, action);
  }
  return model;
}

export default {view, update}
