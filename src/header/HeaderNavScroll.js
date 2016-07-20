import {animate} from '../scroll/ScrollTo'

export function animateHeaderNavigation() {
  const headerElements = document.getElementsByClassName('main-nav__link');
  [...headerElements].forEach(function (headerLink) {
    headerLink.addEventListener('click', function(event) {
      event.preventDefault();
      // Get id of the element to which the link points to using the dat-target attribute
      const navigateToElementId = headerLink.getAttribute("data-target");
      animate(document.getElementById(navigateToElementId));
    });
  })
}