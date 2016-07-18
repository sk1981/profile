var snabbdom = require('snabbdom');
var h = require('snabbdom/h');

import InputView from './InputView';
import SelectDropdownView from './SelectDropdownView';

//TODO : Esnure keys work - enter selects first option, esc escapes , arrow navigates
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
  //TODO : Simplify this
  if (action.type === InputView.actions.ACTIVE_CHANGE || action.type === InputView.actions.TEXT_CHANGE || action.type === InputView.actions.FOCUS_CHANGE) {
    model = InputView.update(model, action, listeners);
  } else {
    model = SelectDropdownView.update(model, action);
  }
  return model;
}

export default {view, update}
