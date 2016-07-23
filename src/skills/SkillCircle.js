import h from 'snabbdom/h';
import SVGAttributesCalculator from './SVGAttributesCalculator';

const STROKE_WIDTH = 10;

export default {

  renderSingleCircle(xPos, yPos, radius, dashArray, className) {
    return h('circle', {
      class: {[className]: true},
      attrs: {
        cx: xPos, cy: yPos, r: radius,
        'stroke-width': STROKE_WIDTH,
        'stroke-dasharray': dashArray,
        'stroke-dashoffset': 0
      }
    });
  },

  renderText(xPos, yPos, radius, text) {
    return h('text', {
      class:{'skill-circle__text': true},
      attrs: {
        x:xPos,
        y: yPos,
        dy:"5"}}
      , text)
  },

  renderSkillCircle(xPos, yPos, radius, percent, text) {
    const {percentStroke, fillerStroke} = SVGAttributesCalculator.getDashStrokeArray(radius, percent);
    const id = `skill-${text}-title`;
    return h('g', {attrs: { "aria-labelledby": id}}, [
      h('title', {attrs: {id: id}}, `${text} - ${percent}%`),
      h('description', {}, `Circle display skill with ${text}`),
      this.renderSingleCircle(xPos, yPos, radius, percentStroke, 'skill-circle--percent'),
      this.renderSingleCircle(xPos, yPos, radius, fillerStroke, 'skill-circle--filler'),
      this.renderText(xPos, yPos, radius, text)
    ]);
  }
}