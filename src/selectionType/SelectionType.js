import SelectionTypeView from './SelectionTypeView';
import snabbdom from 'snabbdom';
const patch = snabbdom.init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/eventlisteners')
]);

export default class {

  constructor(parent, listeners) {
    this.oNode = parent;
    this.dispatcher = this.dispatcher.bind(this);
    this.listeners = listeners;
  }

  dispatcher(model){
    this.render(model);
    // completionCallback(model);
  }

  render(model) {
    const vNode = SelectionTypeView.render(model, this.dispatcher, this.listeners );
    patch(this.oNode, vNode);
    this.oNode = vNode;
  }

  loadSelectSetup(options =[]) {
    const initModel = {text: '', selectedText: '', active: false, highlightedOptionIndex: -1, filteredOptions: options, options: options};
    this.render(initModel);
    // main(initModel, parent, SelectTypeView, listeners);
  }
}