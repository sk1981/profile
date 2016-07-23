import SelectTypeView from './SelectTypeView';
var snabbdom = require('snabbdom');
var patch = snabbdom.init([ 
  require('snabbdom/modules/class'), 
  require('snabbdom/modules/props'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/style'), 
  require('snabbdom/modules/eventlisteners') 
]);


function main(initState, element, {view, update}, listeners) {
  const newVnode = view(initState, event => {
    const newState = update(initState, event, listeners);
    main(newState, newVnode, {view, update}, listeners);
  }, listeners);
  patch(element, newVnode);
}


export default {
  loadSelectSetup(parent, options =[], listeners ={}) {
    const initModel = {active: false, focusedOptionIndex: -1, options: options};
    main(initModel, parent, SelectTypeView, listeners);
  }
}