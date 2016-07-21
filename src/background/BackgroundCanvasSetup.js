import {addResizeListener, getSize} from '../events/windowResizeManager';
import StarFallAnimator from './StarFallAnimator';

// Store it to avoid re-querying it evenu time
const headerElement = document.getElementsByTagName('header')[0];

function getHeaderSize() {
  const boundingBox = headerElement.getBoundingClientRect();
  return {
    height: boundingBox.height || boundingBox.bottom - boundingBox.top,
    width: boundingBox.width || boundingBox.right - boundingBox.left
  }
}

/**
 * Sets up Canavs to display BG image
 */
export function setUpBackground() {
  const canvas = document.getElementById('canvasBg');
  if(canvas !== undefined) {
    const size = getHeaderSize();
    canvas.height = size.height;
    canvas.width = size.width;
    const canvasContext = canvas.getContext('2d');
    canvasContext.fillStyle = 'white';
    let animator = new StarFallAnimator(canvasContext, size.height, size.width);
    animator.updatePos();
    addResizeListener(() => {
      const size = getHeaderSize();
      canvas.height = size.height;
      canvas.width = size.width;
      canvasContext.fillStyle = 'white';
      animator.reSize(size.width, size.height);
      animator.updatePos();
    });
  }
}