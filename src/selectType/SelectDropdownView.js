import h from 'snabbdom/h';
import SelectDropDownIndexView from './SelectDropDownIndexView';

const actions = {
  SELECTED_OPTION_INDEX: 'SELECTED_OPTION_INDEX'
};

function getListIndexView(options = [], text = '', focusedOptionIndex, handler) {
  const lowerCaseText = text.toLowerCase();
  const filterOptions = options.filter(option => option.toLowerCase().indexOf(lowerCaseText) > -1)
                               .map((option, index) => {
                                 const isFocused = index === highlightedOptionIndex;
                                 return SelectDropDownIndexView.view({option: option, highlight: text, isFocused}, handler)
                               });
  return filterOptions.length === 0 ?
    [h('li.select-type__index.select-type__index--none', {}, 'No Results Founds')] : filterOptions;
}

function view(data, handler) {
  return h(`div.select-type__dropdown`, {}, [
    h('ul.select-type__list', {
      key: 1,
      attrs:{
        role: 'listbox',
        id: 'select-filter-dropdown',
        'aria-hidden': !data.active
      }
    },
      getListIndexView(data.options, data.text, data.highlightedOptionIndex, handler))
  ])
}

function update(model, actionData) {
  let newModel = SelectDropDownIndexView.update(model, actionData);
  // if (actionData.type === SelectDropDownIndexView.actions.OPTION_SELECTED) {
  //   newModel = SelectDropDownIndexView.update(model, actionData);
  // }
  return newModel;
}

export default {view, update, actions}
