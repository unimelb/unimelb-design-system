import {
  components,
  initComponent,
  initAllComponents,
  registerComponents
} from '../../shared/component-manager.es6';

import * as utils from '../../shared/utils.es6';

import Accordion from '../../components/accordion';
import Checklist from '../../components/checklist';
import CheckboxHelper from '../../components/checklist/checkboxhelper';
import FilteredListing from '../../components/filtered-listings';

// Polyfills
require('es6-promise').polyfill();
require('classlist-polyfill');

// Build API object
window.uom = {
  // component manager
  components,
  initComponent,
  initAllComponents,
  registerComponents,

  // utilities
  utils
};

// Register the design system's components
window.uom.registerComponents([
  Accordion,
  Checklist,
  CheckboxHelper,
  FilteredListing
]);

// Toggle JS classes on document root
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', window.uom.initAllComponents, false);

