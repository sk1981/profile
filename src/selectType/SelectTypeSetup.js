import SelectTypeView from './SelectTypeView';
var snabbdom = require('snabbdom');
var patch = snabbdom.init([ // Init patch function with choosen modules
  require('snabbdom/modules/class'), // makes it easy to toggle classes
  require('snabbdom/modules/props'), // for setting properties on DOM elements
  require('snabbdom/modules/style'), // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners') // attaches event listeners
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
    const initModel = {active: false, options: options};
    // main({active: false, options: ["ReactJS", "AngularJS", "NGINX"]}, document.getElementsByClassName('select-type-wrapper')[0], SelectTypeView);
    main(initModel, parent, SelectTypeView, listeners);
  }
}