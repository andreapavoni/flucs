require('core-js/shim');

module.exports = {
  createStore: require('./lib/Store').createStore,
  createActions: require('./lib/Actions').createActions,
  Dispatcher: require('./lib/Dispatcher').Dispatcher
};
