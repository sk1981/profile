import {addResizeListener, getSize} from '../events/windowResizeManager';
import StarFallAnimator from './StarFallAnimator';

// Store it to avoid re-querying it evenu time
const headerElement = document.getElementsByTagName('header')[0];
const canvas = document.getElementById('canvasBg');
const canvasFallBack = document.getElementsByClassName('canvas-fallback')[0];

function getHeaderSize() {
  const boundingBox = headerElement.getBoundingClientRect();
  return {
    height: boundingBox.height || boundingBox.bottom - boundingBox.top,
    width: boundingBox.width || boundingBox.right - boundingBox.left
  }
}

function setupBackground() {
  const size = getHeaderSize();
  if(canvas.getContext) {
    const canvasContext = canvas.getContext('2d');
    canvas.height = size.height;
    canvas.width = size.width;
    canvasContext.fillStyle = 'white';
    let animator = new StarFallAnimator(canvasContext, size.height, size.width);
    animator.reSize(size.width, size.height);
    animator.updatePos();
  } else {
    canvas.style.height = `${size.height}px`;
    canvas.style.width = `${size.width}px`;
    canvas.style.display = 'block';
    canvasFallBack.style.height = `${size.height}px`;
    canvasFallBack.style.width = `${size.width}px`;
  }
}

/**
 * Sets up Canavs to display BG image
 */
export function setUpBackground() {
    addResizeListener(() => {
      setupBackground();
    });
  setupBackground();
}