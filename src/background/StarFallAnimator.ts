import StarDataCalculator from "./StarDataCalculator";

const FULL_CIRCLE_IN_RADIANS = Math.ceil(2 * Math.PI);

/**
 * Animates the star fall by using canvas to redraw randomly
 * multiple points and then animate it
 * It creates a parallax effect in 2d by creating stars of different
 * size moving at different speed
 */
export default class StarFallAnimator {
  private canvasContext: CanvasRenderingContext2D;
  windowHeight: number;
  windowWidth: number;
  rafId?: number;
  starDataCalculator: StarDataCalculator;

  /**
   * Create instance of star fall animator
   *
   * @param canvasContext canvas context to draw the shape
   * @param height height of context
   * @param width width of context
   */
  constructor(
    canvasContext: CanvasRenderingContext2D,
    height: number,
    width: number
  ) {
    this.canvasContext = canvasContext;
    this.windowHeight = height;
    this.windowWidth = width;
    this.rafId = undefined;
    this.starDataCalculator = new StarDataCalculator(width, height);
  }

  /**
   * Re-sizes the canvas and redraws the animation
   *
   * @param width new width
   * @param height new height
   */
  reSize(windowWidth: number, windowHeight: number) {
    this.windowHeight = windowHeight;
    this.windowWidth = windowWidth;
    this.starDataCalculator.updateContainerSize(windowWidth, windowHeight);
    if (this.rafId !== undefined) {
      window.cancelAnimationFrame(this.rafId);
    }
  }

  /**
   * Updates animation by clearing the rect and and drawing the points
   */
  updatePos = () => {
    //Clear existing
    this.canvasContext.clearRect(0, 0, this.windowWidth, this.windowHeight);
    this.starDataCalculator.moveStars();
    this.draw();
    this.rafId = window.requestAnimationFrame(this.updatePos);
  };

  /**
   * Draws each points and moves them to new position by by adding a
   * new radius to the new point
   */
  draw() {
    this.canvasContext.beginPath();
    this.starDataCalculator.starsArr.forEach(star => {
      this.canvasContext.moveTo(star.x, star.y);
      this.canvasContext.arc(
        star.x,
        star.y,
        star.radius,
        0,
        FULL_CIRCLE_IN_RADIANS,
        false
      );
    });
    this.canvasContext.fill();
  }
}
