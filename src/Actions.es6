import Dispatcher from './Dispatcher'
import * as utils from './utils'


let prototypeMethods = {
  generateActions: function(...actions) {
    actions.forEach((action) => {
      this.__proto__[action] = (payload) => {
        Dispatcher.dispatch({
          actionType: `${this.constructor.name}.${action}`,
          payload: payload
        })
      }
    })
  }
}

let protoMethods = {
  dispatch: function(action, payload) {
    Dispatcher.dispatch({
      actionType: `${this.constructor.name}.${action}`,
      payload: payload
    })
  }
}

export default {
  createActions: function(klass) {
    let methods = Object.assign(
      utils.getInstanceMethods(klass),
      protoMethods
    )
    Object.assign(klass.prototype, prototypeMethods)
    
    let decorated = new klass()
    Object.keys(methods).forEach((method) => {
      decorated.__proto__[method] = methods[method].bind(decorated)
    })

    return decorated
  }
}
