var snabbdom = require('snabbdom');
var h = require('snabbdom/h');
var patch = snabbdom.init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/eventlisteners')
]);

/**
 * Functions to generate the DOM for list of projects based on the provided project data
 */
export default {
  generateAllProjectData(allProjectData, filteredValue) {
    return h('div.project-list', {} , [
      // h('div', {}, filteredValue),
      ...allProjectData.map(projectData => this.generateProjectData(projectData))
    ]);
  },

  generateProjectData(projectData) {
    return h('div.project-data', {}, [
      h('h2.project-info__title', {}, projectData.title),
      h('div.project-info__title', {}, projectData.description),
      h('div', {}, [
        h('h3', {}, 'Responsibilities'),
        this.getResponsibilityList(projectData.responsibilities)
      ]),
      h('div', {}, [
        h('h3', {}, 'Technology'),
        this.getResponsibilityList(projectData.technologies)
      ])
    ]);
  },

  getResponsibilityList(responsibilities) {
    return h('ul', {}, responsibilities.map(responsibility => h('li', {}, responsibility)))
  },

  getTechnologyList(technologies) {
    return h('ul', {}, technologies.map(technology => h('li', {}, technology)))
  },

  render(projectData, filter) {
    const vNode = this.generateAllProjectData(projectData, filter);
    patch(document.getElementsByClassName('project-list')[0], vNode);
  }
}
