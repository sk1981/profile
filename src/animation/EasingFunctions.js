export default {
  // t: current time, b: beginning value, _c: final value, d: total duration
  tweenBetween(timeDelta, startValue, endValue, duration, functionName) {
    var totalValueChange = endValue - startValue;
    return this[functionName](timeDelta, startValue, totalValueChange, duration);
  },

  easeOutQuad: function(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  }
}
 