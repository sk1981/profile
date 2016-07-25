import ClassListPolyfill from "./loadPolyfill";
import {setUpBackground} from "./background/BackgroundCanvasSetup";
import {renderProject} from './projects/ProjectSetup'
import {renderSkills} from './skills/SkillsSetups'
import {animateHeaderNavigation} from './header/HeaderNavScroll'

// Runs the methods once the the polyfills have been loaded (if needed)
ClassListPolyfill.waitTillPolyFillsLoaded(function waitTillRun() {
  renderSkills();
  renderProject();
  animateHeaderNavigation();
  setUpBackground();
});
