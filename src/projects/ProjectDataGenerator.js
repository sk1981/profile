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

  renderTechnologyInfo(technologies, filterValue) {
    const technology = technologies.filter(technology => technology.name === filterValue);
    if (technology.length === 0) {
      return h('div', {}, '');
    } else {
      const {name, description} = technology[0];
      return h('div.technology', {}, [
        h('h2.technology__name', {}, name),
        h('div.technology__description', {}, description),
        h('div.technology__filter-purpose', {}, `Some of the project(s) where I have used ${name} extensively are listed below`)
      ]);
    }
  },

  generateAllProjectData(allProjectData, technologies, filteredValue) {
    return h('div.project-list', {}, [
      this.renderTechnologyInfo(technologies, filteredValue),
      ...allProjectData.map(projectData => this.generateProjectData(projectData))
    ]);
  },

  generateProjectData(projectData) {
    return h('div.project-data.site-section__info', {}, [
      h('div.project-data__overview', [
        h('h2.project-data__title', {}, projectData.title),
        h('div.project-data__timeline', {}, projectData.time)
      ]),
      h('div.project-data__description', {}, projectData.description),
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

  render(projectData, technologies, filter) {
    const vNode = this.generateAllProjectData(projectData, technologies, filter);
    patch(document.getElementsByClassName('project-list')[0], vNode);
  }
}
