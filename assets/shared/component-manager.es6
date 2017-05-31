import { cuid, loadStylesheet, loadScript } from 'utils';

/**
 * Registered components by label.
 * @type {Object}
 */
export const components = {};

/**
 * Component instances by ID.
 * When a component is instantiated, a random ID is generated and set as the value of the `data-bound`
 * attribute on the component's root DOM element.
 */
export const instances = {};

/**
 * Register one or more components.
 * @param {array|constructor} components - an array of components, or a single component's constructor
 */
export function registerComponents(comps) {
  // Allow passing a single component
  comps = Array.isArray(comps) ? comps : [comps];

  // Register every component
  comps.forEach(Component => {
    // Log error if component doesn't have a label
    if (!Component.label || !Component.selector) {
      console.error('Component must have a label and a selector', Component);
      return;
    }

    // Register component by label
    components[Component.label] = Component;
  });
}

/**
 * Initialise all registered components.
 * @param {element} context (optional) - restrict the search in the DOM (defaults to `document`)
 */
export function initAllComponents(context) {
  // If first parameter is not provided or not a valid DOM Node, default to `document`
  context = context && context.nodeName ? context : document;

  Object.keys(components).forEach((label) => initComponent(label, context));
}

/**
 * Initialise a registered component.
 * Create a new instance of the component for each of its selector's matches in the DOM.
 * Note that when a `context` is provided, only its children are searched.
 * @param {string} label - the component's label
 * @param {element} context (optional) - restrict the search in the DOM (defaults to `document`)
 */
export function initComponent(label, context = document) {
  // Retrieve registered component
  const Component = components[label];
  if (!Component) {
    console.warn(`Component "${label}" is not registered`);
    return;
  }

  // Find matches and return if none are found
  const matches = findMatches(context, Component.selector, Component.firstOnly);
  if (matches.length === 0) return;

  // Retrieve the component's third-party dependencies
  const deps = Component.dependencies;

  // Load any stylesheet dependencies in the background
  if (deps && deps.stylesheets && (!deps.shouldLoadStylesheets || deps.shouldLoadStylesheets())) {
    loadStylesheet(deps.stylesheets);
  }

  // Load any script dependencies and initialise matches once all scripts have finished loading
  if (deps && deps.scripts && (!deps.shouldLoadScripts || deps.shouldLoadScripts())) {
    loadScript(deps.scripts).then(initMatches.bind(null, Component, matches));
    return;
  }

  // No script dependencies or global ; initialise matches right away
  initMatches(Component, matches);
}

/**
 * Find a component's matches.
 * @param {element} context
 * @param {string} rawSelector
 * @param {boolean} firstOnly
 * @return {array<element>} - the matched elements
 */
function findMatches(context, rawSelector, firstOnly) {
  // Build selector, making sure to exclude elements that are already bound
  const selector = `${rawSelector}:not([data-bound])`;

  // Optionally, look only for the first match
  if (firstOnly) {
    const match = context.querySelector(selector);
    return match ? [match] : [];
  }

  // Look for all matches
  return [].slice.call(context.querySelectorAll(selector));
}

/**
 * Initialise a component's matched elements.
 * If an element has attribute `data-props`, the attribute's value is parsed to JSON and the resulting
 * object is passed to the component's constructor. Only JSON object strings are allowed: `"{...}"`.
 * @param {constructor} Component
 * @param {array} matches
 */
function initMatches(Component, matches) {
  matches.forEach(el => {
    // Generate unique ID
    var id = cuid();

    // Retrieve and parse props (only allow JSON object)
    const rawProps = el.getAttribute('data-props');
    const props = rawProps && /^{/.test(rawProps) ? JSON.parse(rawProps) : {};

    // Create and store new instance
    instances[id] = new Component(el, props);

    // Mark element as bound and expose its ID
    el.setAttribute('data-bound', id);
  });
}
