import { h, init } from "snabbdom";
var patch = init([
  require("snabbdom/modules/class"),
  require("snabbdom/modules/props"),
  require("snabbdom/modules/style"),
  require("snabbdom/modules/eventlisteners")
]);

/**
 * Functions to generate the DOM for list of projects based on the provided project data
 */
export default {
  renderTechnologyInfo(technologies: any, filterValue: string) {
    const technology = technologies.filter(
      (technology: any) => technology.name === filterValue
    );
    if (technology.length === 0) {
      return h("div", {}, "");
    } else {
      const { name, description } = technology[0];
      return h("div.technology", {}, [
        h("h2.technology__name", {}, name),
        h("div.technology__description", {}, description),
        h(
          "div.technology__filter-purpose",
          {},
          `Some of the project(s) where I have used ${name} extensively are listed below`
        )
      ]);
    }
  },

  generateAllProjectData(
    allProjectData: any,
    technologies: any,
    filteredValue: any
  ) {
    return h("div.project-list", {}, [
      this.renderTechnologyInfo(technologies, filteredValue),
      ...allProjectData.map((projectData: any) =>
        this.generateProjectData(projectData)
      )
    ]);
  },

  generateProjectData(projectData: any) {
    return h("div.project-data.site-section__info", {}, [
      h("div.project-data__overview", [
        h("h2.project-data__title", {}, projectData.title),
        h("div.project-data__timeline.timeline-data", {}, projectData.time)
      ]),
      h("div.project-data__description", {}, projectData.description),
      h("div", {}, [
        h("h3", {}, "Responsibilities"),
        this.getResponsibilityList(projectData.responsibilities)
      ]),
      h("div", {}, [
        h("h3", {}, "Technology"),
        this.getResponsibilityList(projectData.technologies)
      ])
    ]);
  },

  getResponsibilityList(responsibilities: any) {
    return h(
      "ul",
      {},
      responsibilities.map((responsibility: any) => h("li", {}, responsibility))
    );
  },

  getTechnologyList(technologies: any) {
    return h(
      "ul",
      {},
      technologies.map((technology: any) => h("li", {}, technology))
    );
  },

  render(projectData: any, technologies: any, filter: any) {
    const vNode = this.generateAllProjectData(
      projectData,
      technologies,
      filter
    );
    patch(document.getElementsByClassName("project-list")[0], vNode);
  }
};
