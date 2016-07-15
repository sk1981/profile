import h from 'snabbdom/h';
import debounce from 'lodash/debounce'
const actions = {
  TEXT_CHANGE: "Text_Change",
  ACTIVE_CHANGE: "Active_Change"
};

function valueChange(inputTarget, handler) {
  const value = inputTarget.value;
  handler({type: actions.TEXT_CHANGE, text: value});
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
          valueChangeDebounced(event.target, handler);
        },
        blur: handler.bind(null, {type: actions.ACTIVE_CHANGE, active: false}),
        focus: handler.bind(null, {type: actions.ACTIVE_CHANGE, active: true})
      }
    }, [])
  ])
}

function update(model, actionData) {
  if (actionData.type === actions.TEXT_CHANGE) {
    model.text = actionData.text;
  }
  if (actionData.type === actions.ACTIVE_CHANGE) {
    model.active = actionData.active;
    // Ensure that active=false text is always empty or one of the options
    if(model.active === false && model.options.indexOf(model.text) < 0) {
      model.text = '';
    }
  }
  return model;
}

export default {view, update, actions}
