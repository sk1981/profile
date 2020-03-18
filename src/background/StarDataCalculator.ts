/**
 * Class for calculating various attributes related to
 * star's data
 */
export default class StarDataCalculator {
  private height: number;
  private width: number;
  public starArr: any[];

  /**
   * Static map of orignal start Data
   * @returns {Map}
   */
  static GET_STAR_MAP() {
    return {
      MEDIUM: { count: 40, radius: 2 },
      SMALL: { count: 80, radius: 1 }
    };
  }

  /**
   * Constructor for creating instance
   */
  constructor(width: number, height: number) {
    this.height = height;
    this.width = width;
    this.starArr = this.getStarDataArr(StarDataCalculator.GET_STAR_MAP());
  }

  updateSize(width: number, height: number) {
    this.height = height;
    this.width = width;
  }

  /**
   * Gets data for all stars randomly generated
   *
   * @param starMap
   * @returns {Array}
   */
  getStarDataArr(starMap: any) {
    const starArr = [];
    for (const starKey in starMap) {
      const stars = starMap[starKey];
      for (let i = 0; i < stars.count; i++) {
        const x = Math.floor(Math.random() * this.width);
        const y = Math.floor(Math.random() * this.height);
        starArr.push({ x, y, radius: stars.radius });
      }
    }
    return starArr;
  }

  /**
   * Moves each star down by one unit
   *
   */
  moveStarDataArrDown() {
    this.starArr.forEach(star => {
      let y = star.y + star.radius;
      y = y > this.height ? 0 : y;
      star.y = ~~y;
    });
  }
}
