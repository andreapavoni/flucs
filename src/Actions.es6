import Dispatcher from './Dispatcher'
import * as utils from './utils'


let prototypeMethods = {
  generateActions: function(...actions) {
    actions.forEach((action) => {
      this[action] = (payload) => {
        this.dispatch(action, payload)
      }
    })
  }
}

let protoMethods = {
  dispatch: function(action, payload, namespace) {
    // allow a different prefix/namespace rather than decorated-class name
    let prefix = (!!namespace) ? namespace : this.constructor.name

    Dispatcher.dispatch({
      actionType: `${prefix}.${action}`,
      payload: payload
    })
  }
}

export function createActions(klass) {
  let methods = Object.assign(
    utils.getInstanceMethods(klass),
    protoMethods
  )
  Object.assign(klass.prototype, prototypeMethods)

  let decorated = new klass()
  Object.keys(methods).forEach((method) => {
    decorated[method] = methods[method].bind(decorated)
  })

  return decorated
}
