var h = require('snabbdom/h');

import debounce from 'lodash/debounce';
import ProjectDataGenerator from './ProjectDataGenerator';
import ProjectDataManager from './ProjectDataManager';

export default class ProjectCreator {

  constructor(projectData) {
    this.debouncedFilterElements = debounce(this.filterElements.bind(this), 250);
    this.filterValue = '-';
    this.projectData = projectData;
  }

  filterElements(event) {
    const newValue = this.filterInput.value;
    if(newValue !== this.value) {
      this.filterValue = newValue;
      ProjectDataGenerator.render(ProjectDataManager.filterData(this.filterValue, this.projectData), this.filterValue);
    }
  }

  createProject(projectData) {
    return h('div.projects', {}, [
      h('div.project-header.section--header', {},  'Major Projects'),
      h('label.filter-project', {}, [
        h('span', {}, 'Filter By Technology'),
        h('input.filter-project__input', {
          type:"text",
          on: {keydown: this.debouncedFilterElements},
          hook: {
            insert: (vnode) => { this.filterInput =  vnode.elm}
          }
        }, [])
      ]),
      ProjectDataGenerator.generateAllProjectData(ProjectDataManager.filterData(this.filterValue, this.projectData), this.filterValue)
    ]);
  }
}
