import snabbdom from 'snabbdom';
import SkillsView from './SkillsView';

const skillsData = require('../../data/skills.json');


var patch = snabbdom.init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/eventlisteners') 
]);

/**
 * Sets up and creates the skills related data
 */
export function renderSkills() {
  const skillsVNode = SkillsView.renderSkills(skillsData);
  patch(document.getElementsByClassName('skills-info')[0], skillsVNode);
}
