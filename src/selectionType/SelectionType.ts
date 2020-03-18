import SelectionTypeView from './SelectionTypeView';
import {init} from 'snabbdom';
const patch = init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/eventlisteners')
]);

export default class {

  oNode: any;
  listeners: any;

  constructor(parent: any, listeners: any) {
    this.oNode = parent;
    this.dispatcher = this.dispatcher.bind(this);
    this.listeners = listeners;
  }

  dispatcher(model: any){
    this.render(model);
    // completionCallback(model);
  }

  render(model: any) {
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