import {
  components,
  initComponent,
  initAllComponents,
  registerComponents
} from 'shared/component-manager';

import * as utils from 'utils';
import cssesc from 'cssesc';

import InjectIconSet from 'targets/injection/icon-set';

import Accordion from 'components/accordion';
import FancySelect from 'components/forms/fancyselect';
import IconHelper from 'components/icons';
import InPageNavigation from 'components/inpage-navigation';
import Modal from 'components/modal';
import ValidateForm from 'components/forms';

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

  // utilities and third-party dependencies
  utils,
  vendor: { cssesc }
};

// Register the design system's components
window.uom.registerComponents([
  Accordion,
  FancySelect,
  IconHelper,
  InPageNavigation,
  Modal,
  ValidateForm
]);

// Toggle JS classes on document root
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function inject() { new InjectIconSet(); });
document.addEventListener('DOMContentLoaded', window.uom.initAllComponents);
