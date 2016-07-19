import snabbdom from 'snabbdom';
import ProjectCreator from './ProjectCreator';
import TechnologyExperience  from './TechnologyExperience';
const projectData  = require( '../../data/projects.json');


var patch = snabbdom.init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/eventlisteners')
]);

const render = (projectCreator) => {
  const projectDataVNode = projectCreator.createProject(projectData);
  patch(document.getElementsByClassName('projects-container')[0], projectDataVNode);
};
const projectCreator = new ProjectCreator(projectData, TechnologyExperience.technologies);
render(projectCreator);
