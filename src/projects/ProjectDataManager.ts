export default {
  /**
   * Filters the project data
   *
   * Method has high complexity due to fact we are checking inside 3 different arrays -
   * first list of projects, then list of tags and then lis tof tag names.
   *
   * @param filterData
   * @param projectData
   */
  filterData(filterData = '', projectData: any) {
    const filteredProjects = projectData.filter((p: any) => {
      return p.tags !== undefined && p.tags.some((t: any) => t.name.indexOf(filterData) > -1)
    });
    //TODO : Is lenght = 0 fine ? or should we 
    return filteredProjects.length === 0 ? projectData : filteredProjects;
  },

  /**
   *
   * Iterates over all technologies and gets list the of technologies.
   *
   * @param technologies
   * @returns {Array}
   */
  getTagList(technologies: any[]) {
    return technologies.map(technology => technology.name)
  }
}
