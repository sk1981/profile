import {addResizeListener, getSize} from '../events/windowResizeManager';
import StarFallAnimator from './StarFallAnimator';

/**
 * Sets up Canavs to display BG image
 */
export function setUpBackground() {
  const canvas = document.getElementById('canvasBg');
  if(canvas !== undefined) {
    const size = getSize();
    canvas.height = size.height;
    canvas.width = size.width;
    const canvasContext = canvas.getContext('2d');
    canvasContext.fillStyle = 'white';
    const animator = new StarFallAnimator(canvasContext, size.height, size.width);
    animator.updatePos();
    //TODO : full re-draw on size change
    addResizeListener((width, height) => {
      canvas.height = height;
      canvas.width = width;
      canvasContext.fillStyle = 'white';
      animator.reSize(width, height);
      animator.updatePos();
    });
  }
}