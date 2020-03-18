import { h } from "snabbdom";
import SkillCircle from "./SkillCircle";

/**
 * Create the display for all the skill circels
 */
export default {
  /**
   * Converts a of data to list of skills
   *
   * @param skillsData data related to skills
   * @param radius, radius of circle
   * @returns {*} svg vdom of skill circel
   */
  renderSkillCirclesArray(skillsData: any, radius: number) {
    return skillsData.map((skillData: any) => {
      return h(
        "svg",
        {
          attrs: {
            height: "100",
            width: "100",
            class: "skills-svg"
          }
        },
        [
          SkillCircle.renderSkillCircle(
            50,
            50,
            radius,
            skillData.level,
            skillData.name
          )
        ]
      );
    });
  },

  /**
   * Renders all the skill related views
   * @param skillsData data related to all skills
   */
  renderSkills: function(skillsData: any) {
    const radius = 40;
    return h("div", [
      h(
        "div",
        { class: { "skills-wrapper": true } },
        this.renderSkillCirclesArray(skillsData, radius)
      )
    ]);
  }
};
