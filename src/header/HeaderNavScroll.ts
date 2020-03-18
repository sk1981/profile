import { animate } from "../scroll/ScrollTo";

/**
 * Iterates over all header links and attaches event listender to scroll to the element's position
 */
export function animateHeaderNavigation() {
  const headerElements = document.getElementsByClassName("main-nav__link");
  //Array destructuring depends on Array.from hence avoid that here
  for (let count = 0; count < headerElements.length; count++) {
    const headerLink = headerElements[count];
    headerLink.addEventListener("click", function(event) {
      event.preventDefault();
      //Get id of the element to which the link points to using the dat-target attribute
      const navigateToElementId = headerLink.getAttribute("data-target");
      animate(document.getElementById(navigateToElementId!)!);
    });
  }
}
