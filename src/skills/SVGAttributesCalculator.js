export default {

  getDashStrokeArray: function(radius, percent) {
    const circumference = radius * Math.PI * 2;
    const fillArcLength = percent / 100 * circumference; // Should be filled based on percent;
    const emptyArcLength = circumference - fillArcLength;
    const strokeStartOffset = circumference / 4; // Stroke starts from 3'O clock, instead of top
    const strokeFullOffset = strokeStartOffset * 3; // Stroke starts from 3'O clock, instead of top

    let percentStroke;
    let fillerStroke;
    if(percent > 25) {
      // should be 'fill from 25% to remaining', 'empty till 100`, 'fill from 0 25'.
      // Reverse for filler
      const remainingArc = fillArcLength - strokeStartOffset;

      percentStroke = `${remainingArc}, ${emptyArcLength}, ${strokeStartOffset}`;
      fillerStroke = `0, ${remainingArc}, ${emptyArcLength}, ${strokeStartOffset}`
    } else {
      const remainingArc = circumference - fillArcLength - strokeStartOffset;
      // precent - `empty from 25 to 100`, `fill fom 0 to percent`, `empty till 25`
      // fill - reverse
      percentStroke = `0, ${strokeFullOffset}, ${fillArcLength}, ${remainingArc}`;
      fillerStroke =`${strokeFullOffset}, ${fillArcLength}, ${remainingArc}`;
    }
    return {percentStroke, fillerStroke};
  }
}