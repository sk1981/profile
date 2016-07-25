import h from 'snabbdom/h';
import SVGAttributesCalculator from './SVGAttributesCalculator';

const STROKE_WIDTH = 10;

/**
 * Creates a skill circle svg
 */
export default {

  /**
   * Renders a single circle as per the provided data;
   * @param xPos x position of circle center
   * @param yPos y position of circle center
   * @param radius radius of circle
   * @param dashArray dash array of circle
   * @param className class to be attached
   */
  renderSingleCircle(xPos, yPos, radius, dashArray, className) {
    return h('circle', {
      attrs: {
        cx: xPos, cy: yPos, r: radius,
        'stroke-width': STROKE_WIDTH,
        'stroke-dasharray': dashArray,
        'stroke-dashoffset': 0,
        class: className
      }
    });
  },

  /**
   * Renders text insides the circle
   * @param xPos x position of text
   * @param yPos y position of circle center
   * @param text text value
   */
  renderText(xPos, yPos, text) {
    return h('text', {
      attrs: {
        x: xPos,
        y: yPos,
        dy: "5",
        class: 'skill-circle__text'
      }}
      , text)
  },

  /**
   * Renders a skill circle by rendering the data two circles and text inside
   * @param xPos x position of circle center
   * @param yPos y position of circle center
   * @param radius radius of circle
   * @param percent skill level as perecent
   * @param text skill name
   */
  renderSkillCircle(xPos, yPos, radius, percent, text) {
    const {percentStroke, fillerStroke} = SVGAttributesCalculator.getDashStrokeArray(radius, percent);
    const id = `skill-${text}-title`;
    return h('g', {attrs: { "aria-labelledby": id}}, [
      h('title', {attrs: {id: id}}, `${text} - ${percent}%`),
      h('description', {}, `Circle display skill with ${text}`),
      this.renderSingleCircle(xPos, yPos, radius, percentStroke, 'skill-circle--percent'),
      this.renderSingleCircle(xPos, yPos, radius, fillerStroke, 'skill-circle--filler'),
      this.renderText(xPos, yPos, text)
    ]);
  }
}