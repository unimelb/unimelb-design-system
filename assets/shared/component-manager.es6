import { loadStylesheet, loadScript } from '../utils/index.es6';

/**
 * Registered components by name.
 * @type {Object}
 */
export const components = {};

/**
 * Initialise a registered component.
 * Create a new instance of the component for each of its selector's matches in the DOM.
 * Note that when a `context` is provided, only its children are searched.
 * @param {string} name - the component's name
 * @param {element} context (optional) - restrict the search in the DOM (defaults to `document`)
 * @return {array<any>} - the new instances of the component
 */
export function initComponent(name, context = document) {
  // Retrieve registered component
  const Component = components[name];
  if (!Component) {
    console.warn(`Component "${name}" is not registered`);
    return;
  }

  // Retrieve matches, making sure to exclude the ones that are already bound
  const selector = `${Component.selector}:not([data-bound])`;
  const matches = Array.from(context.querySelectorAll(selector));

  // Return if no matches are found
  if (matches.length === 0) return;

  // Retrieve the component's third-party dependencies
  const deps = Component.dependencies;

  // Load any stylesheet dependencies in the background
  if (deps && deps.stylesheets) {
    loadStylesheet(deps.stylesheets);
  }

  // Load any scripts dependencies and initialise matches once all scripts have finished loading
  if (deps && deps.scripts) {
    loadScript(deps.scripts).then(initMatches.bind(null, Component, matches));
    return;
  }

  // No script dependencies; initialise matches right away
  initMatches(Component, matches);
}

/**
 * Initialise a component's matches.
 * @param {constructor} Component
 * @param {array} matches
 */
function initMatches(Component, matches) {
  // Initialise each match and return the instances
  return matches.map(el => {
    el.setAttribute('data-bound', 'true');
    return new Component(el, {});
  });
}

/**
 * Initialise all registered components.
 * @return {object<array<any>>} - the components' new instances
 */
export function initAllComponents() {
  return Object.keys(components).reduce((instances, name) => {
    instances[name] = initComponent(name);
    return instances;
  }, {});
}

/**
 * Register one or more components.
 * @param {array|constructor} components - an array of components, or a single component's constructor
 */
export function registerComponents(comps) {
  // Allow passing a single component
  comps = Array.isArray(comps) ? comps : [comps];

  // Register every component
  comps.forEach(Component => {
    // Log error if component doesn't have a name
    if (!Component.name || !Component.selector) {
      console.error('Component must have a name and a selector', Component);
      return;
    }

    // Register component by name
    components[Component.name] = Component;
  });
}
