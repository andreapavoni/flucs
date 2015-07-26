import Dispatcher from './Dispatcher'
import * as utils from './utils'

export default class Actions {
  constructor() {
    // for some reason, we need to re-bind subclass methods to its own instance,
    // otherwise it will not recognize its `this`
    let methods = utils.getPrototypeMethods(this.__proto__, true)
    Object.keys(methods).forEach((method) => {
      this[method] = methods[method].bind(this)
    })
  }

  dispatch(action, payload, namespace) {
    // allow a different prefix/namespace rather than decorated-class name
    let prefix = (!!namespace) ? namespace : this.constructor.name

    Dispatcher.dispatch({
      actionType: `${prefix}.${action}`,
      payload: payload
    })
  }

  generateActions(...actions) {
    actions.forEach((action) => {
      this[action] = (payload) => {
        this.dispatch(action, payload)
      }
    })
  }
}
