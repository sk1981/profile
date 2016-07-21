import h from 'snabbdom/h';
import SkillCircle from './SkillCircle';

export default {

  renderSkillCirclesArray(skillsData, radius) {
    return skillsData.map((skillData) => {
      return  h('svg', {class: {'skills-svg': true}, attrs: {height: "100", width: "100"}}, [
        SkillCircle.renderSkillCircle(50, 50, radius, skillData.level, skillData.name)
        ]);
    })
  },

  renderSkills: function (skillsData) {
    const radius = 40;
    return h('div', [
      h('div', {class: {'skills-wrapper': true}},
        this.renderSkillCirclesArray(skillsData, radius)
      )
    ]);
  }
} 