var h = require('snabbdom/h');

import ProjectDataGenerator from './ProjectDataGenerator';
import ProjectDataManager from './ProjectDataManager';
import SelectionType from '../selectionType/SelectionType'

export default class ProjectCreator {

  constructor(projectData, technologies) {
    this.setupSelector = this.setupSelector.bind(this);
    this.filterElements = this.filterElements.bind(this);
    this.filterValue = '';
    this.projectData = projectData;
    this.technologies = technologies;
  }

  setupSelector() {
    const tags = ProjectDataManager.getTagList(this.technologies);
    const selectionType = new SelectionType(document.getElementsByClassName('filter-project_wrapper')[0], {
      onSelected: this.filterElements
    });
    selectionType.loadSelectSetup(tags);
  }

  filterElements(filterValue) {
    if(filterValue !== this.filterValue) {
      this.filterValue = filterValue;
      ProjectDataGenerator.render(ProjectDataManager.filterData(this.filterValue, this.projectData), this.technologies, this.filterValue);
    }
  }

  createProject() {
    return h('div.projects', {}, [
      h('h2.project-header.section--header', {},  'Projects'),
      h('label.filter-project', {}, [
        h('h3.filter-project__text', {}, 'Filter By Technology:'),
        h('div.filter-project_wrapper', {hook: { insert: this.setupSelector}})
      ]),
      ProjectDataGenerator.generateAllProjectData(ProjectDataManager.filterData(this.filterValue, this.projectData), this.technologies, this.filterValue)
    ]);
  }
}
