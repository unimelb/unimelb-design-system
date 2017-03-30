// Core dependencies
import {
  components,
  initComponent,
  initAllComponents,
  registerComponents
} from '../../shared/component-manager.es6';

// Components
import accordion from '../../components/accordion';
import checklist from '../../components/checklist';

// Polyfills
require('es6-promise').polyfill();
require('classlist-polyfill');

// Build API object
window.uom = {
  // component manager
  components,
  initComponent,
  initAllComponents,
  registerComponents
};

// Register the design system's components
window.uom.registerComponents([
  accordion,
  checklist
]);

// Toggle JS classes on document root
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', window.uom.initAllComponents, false);

