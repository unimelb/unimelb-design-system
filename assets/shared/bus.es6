import EventEmitter from 'super-event-emitter';

const bus = EventEmitter.mixin({

  /**
   * Namespace `bus.emit` to a given component.
   * @param {Constructor} Component - must have `label` property
   * @return {Function} - the namespaced `emit` function
   */
  nsEmit: (Component) => (event) => {
    bus.emit(Component.label + '.' + event);
  }

});

console.log(bus);

export default bus;
