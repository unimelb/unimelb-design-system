import * as componentManager from 'shared/component-manager';
import * as utils from 'utils';
import bus from 'shared/bus';
import cssesc from 'cssesc';
import WebFont from 'webfontloader';

import CreateNameSpace from 'shared/create-namespace';
import InjectHeader from 'components/header';
import InjectNav from 'components/nav';
import InjectFooter from 'components/footer';
import InjectIconSet from 'components/icon-set';

import Accordion from 'components/accordion';
import Announcement from 'components/announcement';
import Checklist from 'components/checklist';
import CheckboxHelper from 'components/checklist/checkboxhelper';
import FilteredListing from 'components/filtered-listings';
import FancySelect from 'components/forms/fancyselect';
import Flash from 'components/notices/flash';
import GMaps from 'components/maps/gmaps';
import LMaps from 'components/maps/lmaps';
import IconHelper from 'components/icons';
import ImageGallery from 'components/gallery';
import InPageNavigation from 'components/inpage-navigation';
import JumpNav from 'components/inpage-navigation/jumpnav';
import MobileTableHelper from 'components/tables';
import Modal from 'components/modal';
import SidebarTabs from 'components/tabs/sidebar-tabs';
import SortableTable from 'components/tables/sortable';
import Tabs from 'components/tabs';
import ValidateForm from 'components/forms';

// Polyfills
require('es6-promise').polyfill();
require('classlist-polyfill');
require('locale-compare-polyfill');

// Tracking
require('shared/tracking');

// Build API object
window.uom = {
  ...componentManager,
  utils,
  bus,
  vendor: {
    cssesc,
    WebFont
  }
};

// Register the design system's injection components
window.uom.registerInjectionComponents([
  CreateNameSpace,
  InjectHeader,
  InjectNav,
  InjectFooter,
  InjectIconSet
]);

// Register the design system's components
window.uom.registerComponents([
  Accordion,
  Announcement,
  Checklist,
  CheckboxHelper,
  FilteredListing,
  FancySelect,
  Flash,
  GMaps,
  IconHelper,
  ImageGallery,
  InPageNavigation,
  JumpNav,
  LMaps,
  MobileTableHelper,
  Modal,
  SidebarTabs,
  SortableTable,
  Tabs,
  ValidateForm
]);

// Toggle JS classes on document root
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// Load custom fonts
const fonts = 'Roboto:400,300,100,700,100italic,300italic,400italic,700italic:latin';
WebFont.load({ google: { families: [fonts] } });

document.addEventListener('DOMContentLoaded', window.uom.applyInjection);
document.addEventListener('DOMContentLoaded', window.uom.initAllComponents);
