import StarDataCalculator from './StarDataCalculator';

const fullCircle = Math.ceil(2 * Math.PI);

export default class StarFallAnimator {

  constructor(canvasContext, height, width) {
    this.canvasContext = canvasContext;
    this.height = height;
    this.width = width;
    this.rafId = undefined;
    this.starDataCalculator = new StarDataCalculator(width, height);
    this._updatePos = this.updatePos.bind(this)
  }

  reSize(width, height) {
    this.height = height;
    this.width = width;
    this.starDataCalculator.updateSize(width, height);
    if(this.rafId !== undefined) {
      window.cancelAnimationFrame(this.rafId);
    }
  }

  updatePos() {
    //Clear existing
    this.canvasContext.clearRect(0, 0, this.width, this.height);
    this.starDataCalculator.moveStarDataArrDown();
    this.draw(this.starDataCalculator.starArr);
    this.rafId = window.requestAnimationFrame(this._updatePos);
  }

  draw() {
    this.starDataCalculator.starArr.forEach(star => {
      this.canvasContext.beginPath();
      this.canvasContext.arc(star.x, star.y, star.radius, 0, fullCircle, false);
      this.canvasContext.fill();
    });
  }
}