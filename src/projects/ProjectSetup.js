/**
 * Sets ups the whole project related details
 */

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

/**
 * Renders the project data
 * @param projectCreator
 */
const render = (projectCreator) => {
  const projectDataVNode = projectCreator.createProject(projectData);
  patch(document.getElementsByClassName('projects-container')[0], projectDataVNode);
};
const projectCreator = new ProjectCreator(projectData, TechnologyExperience.technologies);

export function renderProject() {
  /**
   * Function to call to render the data
   */
  render(projectCreator);
}
