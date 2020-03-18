import { h } from "snabbdom";
import ProjectDataGenerator from "./ProjectDataGenerator";
import ProjectDataManager from "./ProjectDataManager";
import SelectionType from "../selectionType/SelectionType";

export default class ProjectCreator {
  private filterValue: string;
  private readonly projectData: any;
  private readonly technologies: any;

  constructor(projectData: any, technologies: any) {
    this.setupSelector = this.setupSelector.bind(this);
    this.filterElements = this.filterElements.bind(this);
    this.filterValue = "";
    this.projectData = projectData;
    this.technologies = technologies;
  }

  setupSelector() {
    const tags = ProjectDataManager.getTagList(this.technologies);
    const selectionType = new SelectionType(
      document.getElementsByClassName("filter-project_wrapper")[0],
      {
        onSelected: this.filterElements
      }
    );
    // @ts-ignore
    selectionType.loadSelectSetup(tags);
  }

  filterElements(filterValue: string) {
    if (filterValue !== this.filterValue) {
      this.filterValue = filterValue;
      ProjectDataGenerator.render(
        ProjectDataManager.filterData(this.filterValue, this.projectData),
        this.technologies,
        this.filterValue
      );
    }
  }

  createProject() {
    return h("div.projects", {}, [
      h("h2.project-header.section--header", {}, "Projects"),
      h("label.filter-project", {}, [
        h("h3.filter-project__text", {}, "Filter By Technology:"),
        h("div.filter-project_wrapper", {
          hook: { insert: this.setupSelector }
        })
      ]),
      ProjectDataGenerator.generateAllProjectData(
        ProjectDataManager.filterData(this.filterValue, this.projectData),
        this.technologies,
        this.filterValue
      )
    ]);
  }
}
