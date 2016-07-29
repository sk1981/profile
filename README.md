# Motivation
Motivations behind creating this site were:-
 * To display my online resume
 * Play around with with new technologies or frameworks I would be interested in like snabbdom, service workers etc
 * To make full use of web technologies to make this site more interactive like adding more details on hover or focusing on particular technologies/skills

#Guidelines
Guideline which were followed while creating this site:-
* Should be ***accessible*** via screen reader and/or keyboard navigation.
* Support large array of browsers.
  * currently works on IE8+, Edge, Chrome, FF, Opera, Safari, iOS Safari, Opera Mini, UC Browser, Chrome Android etc
* Size should as low as possible, hence very less reliance on external frameworks and no/minimal images.
* Should be responsive to work well on most different screen sizes.
* FPS should be high even on low end devices.

# Technologies
Tried to keep runtime dependencies to minimum as wanted to keep the size as low as possible.
List of technologies/libraries used:-
* Snabbdom - Always wanted to try out a non react virtual dom implementation, snabdom was a good fit as it was very light.
  * Used it mainly to create the select technology typeahead.
* Lodash - for robust debounce and throttle functions.
* Normalize.css - for normalizing css styles.
* rAF/clasList polyfill - for older browsers (loaded only for those browser).
* Canvas - for simple header optimization.
* SVG - for Technology Circle.
* Service Worker - for caching static assets like fonts.
* SASS - for managing CSS.
* Webpack - for managing builds.
* Babel - for ES6.