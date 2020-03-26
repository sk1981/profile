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

  easeOutQuad: function(t: number, b: number, c: number, d: number) {
    return -c * (t /= d) * (t - 2) + b;
  }
};
