import InjectHeader from './header/index.es6';
import InjectNav from './nav/index.es6';
import InjectFooter from './footer/index.es6';
import InjectIconSet from './icon-set';

// Deps
require('./gtm');
require('./tealium');

function inject() {
  new InjectHeader({ defaultLink: 'https://www.unimelb.edu.au' });
  new InjectNav();
  new InjectFooter();
  new InjectIconSet();
};

document.addEventListener('DOMContentLoaded', inject);
