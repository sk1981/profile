export default {
  // t: current time, b: beginning value, _c: final value, d: total duration
  tweenBetween(
    timeDelta: number,
    startValue: number,
    endValue: number,
    duration: number,
    functionName: number
  ): any {
    const totalValueChange = endValue - startValue;
    // @ts-ignore
    return this[functionName](
      timeDelta,
      startValue,
      totalValueChange,
      duration
    );
  },

  // @ts-ignore
  easeOutQuad: function(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  }
};
