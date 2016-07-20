export default {
  // t: current time, b: beginning value, _c: final value, d: total duration
  tweenBetween(timeDelta, startValue, endValue, duration, functionName) {
    var totalValueChange = endValue - startValue;
    return this[functionName](timeDelta, startValue, totalValueChange, duration);
  },

  linear(timeDelta, startValue, totalValueChange, duration) {
    // timeDelta / duration -> slope, * total value change =  value Delta from 0
    return totalValueChange * timeDelta / duration + startValue;
  }
}
 