import renderPrompt from './prompt.es6';

const SCRIPT_ID = 'uom-prompt-script';
const TEMPLATE_ID = 'uom-prompt-template';

const DEFAULTS = {
  delay: 3000,
  retry: 1
}

document.addEventListener('DOMContentLoaded', () => {
  const script = document.getElementById(SCRIPT_ID);
  const template = document.getElementById(TEMPLATE_ID);

  const delay = getNum(script, 'data-delay');
  const retry = getNum(script, 'data-retry');

  renderPrompt(document.body, template.innerHTML, {
    delay: delay || DEFAULTS.delay,
    retry: retry || DEFAULTS.retry
  });
});

function getNum(elem, attr) {
  if (!elem.hasAttribute(attr)) { return null; }
  const num = parseInt(elem.getAttribute(attr), 10);
  return isNaN(num) ? null : num;
}
