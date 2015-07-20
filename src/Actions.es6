import Dispatcher from './Dispatcher'

export default {
  generateActions: function(...actions) {
    actions.forEach((action) => {
      this.__proto__[action] = (payload) => {
        Dispatcher.dispatch({
          actionType: `${this.constructor.name}.${action}`,
          payload: payload
        })
      }
    })
  },

  createActions: function(klass) {
    Object.assign(klass.prototype, {
      generateActions: this.generateActions
    })

    return new klass()
  }
}
