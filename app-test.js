var htmlClassTest = {
 isTouchDevice: 'ontouchstart' in document.documentElement,
 isSVG: typeof SVGRect != "undefined"
};
var rootElement = document.getElementsByTagName( 'html' )[0];
rootElement.className += (htmlClassTest.isTouchDevice ? 'touch-device': '') + (htmlClassTest.isSVG ? '': 'no-svg');