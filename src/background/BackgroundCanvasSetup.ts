import { addResizeListener } from "../events/windowResizeManager";
import StarFallAnimator from "./StarFallAnimator";

// Store it to avoid re-querying it every time
const headerElement = document.getElementsByTagName("header")[0];
const canvas = document.getElementById("canvasBg");
const canvasFallBack = document.getElementsByClassName(
  "canvas-fallback"
)[0] as HTMLDivElement;

function getHeaderDimensions() {
  const boundingBox = headerElement.getBoundingClientRect();
  return {
    windowHeight: boundingBox.bottom - boundingBox.top,
    windowWidth: boundingBox.right - boundingBox.left
  };
}

function isCanvas(canvas: HTMLElement): canvas is HTMLCanvasElement {
  return "getContext" in canvas;
}

function setupBackground() {
  const headerSize = getHeaderDimensions();
  if (!canvas) {
    throw new Error("Canvas element not found");
  }

  if (isCanvas(canvas)) {
    const canvasContext = canvas.getContext("2d")!;
    canvas.height = headerSize.windowHeight;
    canvas.width = headerSize.windowWidth;
    canvasContext.fillStyle = "white";
    const animator = new StarFallAnimator(
      canvasContext,
      headerSize.windowHeight,
      headerSize.windowWidth
    );
    animator.reSize(headerSize.windowWidth, headerSize.windowHeight);
    animator.updatePos();
  } else {
    // Setup background header with color
    canvas.style.height = `${headerSize.windowHeight}px`;
    canvas.style.width = `${headerSize.windowWidth}px`;
    canvas.style.display = "block";
    canvasFallBack.style.height = `${headerSize.windowHeight}px`;
    canvasFallBack.style.width = `${headerSize.windowWidth}px`;
  }
}

/**
 * Sets up Canvas to display BG image
 */
export function setUpBackground() {
  addResizeListener(() => {
    setupBackground();
  });
  setupBackground();
}
