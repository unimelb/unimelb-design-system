import InjectHeader from './header';
import InjectNav from './nav';
import InjectFooter from './footer';
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
