interface StarTypeData {
  // number of stars of given type
  count: number;
  // Radius of these stars
  radius: number;
}

interface StarInstance {
  // x position of single star
  x: number;
  // y position of single star
  y: number;
  // size of star
  radius: number;
  xChange: number;
}

/**
 * Class for calculating various attributes related to
 * star's data
 */
export default class StarDataCalculator {
  private containerHeight: number;
  private containerWidth: number;
  public starsArr: StarInstance[];

  /**
   * Static map of orignal start Data
   * @returns {Map}
   */
  static GET_STAR_TYPE_MAP(): StarTypeData[] {
    return [
      { count: 10, radius: 2.5 },
      { count: 40, radius: 2 },
      { count: 80, radius: 1 }
    ];
  }

  /**
   * Constructor for creating instance
   */
  constructor(containerWidth: number, containerHeight: number) {
    this.containerHeight = containerHeight;
    this.containerWidth = containerWidth;
    this.starsArr = this.getStarsArr(StarDataCalculator.GET_STAR_TYPE_MAP());
  }

  updateContainerSize(containerWidth: number, containerHeight: number) {
    this.containerHeight = containerHeight;
    this.containerWidth = containerWidth;
  }

  /**
   * Gets data for all the starts with randomly generated position
   *
   * @returns {Array}
   * @param starTypeMap
   */
  getStarsArr(starTypeMap: StarTypeData[]) {
    return starTypeMap.reduce(
      (starArr: StarInstance[], starType: StarTypeData) => {
        for (let i = 0; i < starType.count; i++) {
          // Position stars randomly
          const x = Math.floor(Math.random() * this.containerWidth);
          const y = Math.floor(Math.random() * this.containerHeight);
          starArr.push({
            x,
            y,
            radius: starType.radius,
            xChange: Math.random() / 5 - 0.1
          });
        }
        return starArr;
      },
      []
    );
  }

  /**
   * Moves each star down by one unit
   *
   */
  moveStars() {
    this.starsArr.forEach(star => {
      let y = ~~(star.y + star.radius);
      star.y = y > this.containerHeight ? 0 : y;
      /*let x = star.x + star.xChange;
      star.x = x > this.containerWidth ? 0 : x; */
    });
  }
}
