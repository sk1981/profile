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
  },

  /**
   *
   * Iterates over all project data and gets the list the of tags.
   *
   * Has to iterate of over 3 level array to get the data.
   *
   * Is done only once, so should be fine.
   *
   * @param projectData
   * @returns {Array}
   */
  getTagList(projectData) {
    const tags = [];
    projectData.forEach(project => {
      if (project.tags !== undefined) {
        project.tags.forEach(tag => {
          tag.name.forEach(n => {if(tags.indexOf(n) < 0) tags.push(n)});
        });
      }
    }, []);
    return tags;
  }
}
