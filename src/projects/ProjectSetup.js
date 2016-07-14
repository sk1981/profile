import ProjectCreator from './ProjectCreator';
const projectData = require("../../data/projects.json");
var snabbdom = require('snabbdom');

var patch = snabbdom.init([ // Init patch function with choosen modules
  require('snabbdom/modules/class'), // makes it easy to toggle classes
  require('snabbdom/modules/props'), // for setting properties on DOM elements
  require('snabbdom/modules/style'), // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners') // attaches event listeners
]);

const render = (projectCreator) => {
  const projectDataVNode = projectCreator.createProject(projectData);
  patch(document.getElementsByClassName('projects')[0], projectDataVNode);
};
const projectCreator = new ProjectCreator(projectData);

render(projectCreator);