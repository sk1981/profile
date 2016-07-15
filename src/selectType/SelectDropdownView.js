import h from 'snabbdom/h';
import SelectDropDownIndexView from './SelectDropDownIndexView';

function getListIndexView(options = [], text = '', handler) {
  const filterOptions = options.filter(option => option.indexOf(text) > -1)
                               .map(option => SelectDropDownIndexView.view({option: option, highlight: text}, handler));
  return filterOptions.length === 0 ?
    [h('li.select-type__index.select-type__index--none', {}, 'No Results Founds')] : filterOptions;
}

function view(data, handler) {
  return h(`div.select-type__dropdown`, {}, [
    h('ul.select-type__list', {}, getListIndexView(data.options, data.text, handler))
  ])
}

function update(model, actionData) {
  let newModel;
  if (actionData.type === SelectDropDownIndexView.actions.OPTION_SELECTED) {
    newModel = SelectDropDownIndexView.update(model, actionData);
  }
  return newModel;
}

export default {view, update}
