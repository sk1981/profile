var h = require('snabbdom/h');

import ProjectDataGenerator from './ProjectDataGenerator';
import ProjectDataManager from './ProjectDataManager';
import SelectTypeSetup from '../selectType/SelectTypeSetup'

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
    SelectTypeSetup.loadSelectSetup(document.getElementsByClassName('filter-project_wrapper')[0], tags, {
      onSelected: this.filterElements
    });
  }

  filterElements(filterValue) {
    if(filterValue !== this.filterValue) {
      this.filterValue = filterValue;
      ProjectDataGenerator.render(ProjectDataManager.filterData(this.filterValue, this.projectData), this.technologies, this.filterValue);
    }
  }

  createProject() {
    return h('div.projects', {}, [
      h('div.project-header.section--header', {},  'Major Projects'),
      h('label.filter-project', {}, [
        h('span.filter-project__text', {}, 'Filter By Technology:'),
        h('input.filter-project_wrapper', {hook: { insert: this.setupSelector}}, [])
      ]),
      ProjectDataGenerator.generateAllProjectData(ProjectDataManager.filterData(this.filterValue, this.projectData), this.technologies, this.filterValue)
    ]);
  }
}
