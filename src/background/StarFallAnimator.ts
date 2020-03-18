import StarDataCalculator from './StarDataCalculator';

const fullCircle = Math.ceil(2 * Math.PI);

/**
 * Animates the star fall by using canvas to redraw randomly
 * multiple points and then animate it
 *
 */
export default class StarFallAnimator {
  private canvasContext: CanvasRenderingContext2D;
  height: number;
  width: number;
  rafId: any;
  starDataCalculator: StarDataCalculator;
  _updatePos: () => void;

  /**
   * Create instance of star fall animator
   *
   * @param canvasContext canvas context to draw the shape
   * @param height height of context
   * @param width width of context
   */
  constructor(canvasContext: CanvasRenderingContext2D, height: number, width: number) {
    this.canvasContext = canvasContext;
    this.height = height;
    this.width = width;
    this.rafId = undefined;
    this.starDataCalculator = new StarDataCalculator(width, height);
    this._updatePos = this.updatePos.bind(this)
  }

  /**
   * Re-sizes the canvas and redraws the animation
   *
   * @param width new width
   * @param height new height
   */
  reSize(width: number, height: number) {
    this.height = height;
    this.width = width;
    this.starDataCalculator.updateSize(width, height);
    if(this.rafId !== undefined) {
      window.cancelAnimationFrame(this.rafId);
    }
  }

  /**
   * Updates animation by clearing the rect and and drawing the points
   */
  updatePos() {
    //Clear existing
    this.canvasContext.clearRect(0, 0, this.width, this.height);
    this.starDataCalculator.moveStarDataArrDown();
    this.draw();
    this.rafId = window.requestAnimationFrame(this._updatePos);
  }

  /**
   * Draws each points and moves them to new position by by adding a
   * new radius to the new point
   */
  draw() {
    this.canvasContext.beginPath();
    this.starDataCalculator.starArr.forEach(star => {
      this.canvasContext.moveTo(star.x, star.y);
      this.canvasContext.arc(star.x, star.y, star.radius, 0, fullCircle, false);
    });
    this.canvasContext.fill();
  }
}