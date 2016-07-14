
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
  filterData(filterData = '', projectData) {
    const filteredProjects = projectData.filter(p => {
      return p.tags !== undefined && p.tags.some(t => t.name.indexOf(filterData) > -1)
    });
    return filteredProjects.length === 0 ? projectData : filteredProjects;
  }
}
