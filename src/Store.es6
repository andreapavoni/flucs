import {EventEmitter} from 'events'
import Dispatcher from './Dispatcher'

let protoMethods = Object.assign({}, EventEmitter.prototype, {
  getState: function() {
    let state = {}
    Object.keys(this).forEach((prop) => {
      if (prop !== 'state' || prop !== '_events') {
        state[prop] = this[prop]
      }
    })
    return state
  },

  setState: function(obj) {
    Object.keys(obj).forEach((prop) => {
      this[prop] = obj[prop]
    })
    this.emitChange()
    return this
  },

  changeEventName: function() {
    return `${this.constructor.name} change`
  },

  emitChange: function() {
    this.emit(this.changeEventName())
  },

  addChangeListener: function(callback) {
    this.on(this.changeEventName(), callback)
  },

  removeChangeListener: function(callback) {
    this.removeListener(this.changeEventName(), callback)
  }
 })

 function parseBindingsTree(bindings) {
   let result = {}
   Object.keys(bindings).forEach((prefix) => {
     Object.keys(bindings[prefix]).forEach((action) => {
       if (Array.isArray(bindings[prefix][action])) {
         bindings[prefix][action].forEach((callback) => {
           result[`${prefix}.${callback}`] = callback
         })
       } else {
         result[`${prefix}.${action}`] = bindings[prefix][action]
       }
     })
   })
   return result
 }

export default {
  createStore: function(klass) {
    Object.assign(klass.prototype, {
      bindActions: function(opts) {
        let bindings = parseBindingsTree(opts)

        // later inside some store callback, you can use:
        // this.dispatcher.waitFor([AnotherStore.dispatchToken])
        klass.dispatchToken = Dispatcher.register((action) => {
          let {actionType, payload} = action
          this[bindings[actionType]](payload)
        })
      },
      dispatcher: Dispatcher // exposed as this.dispatcher in decorated Stores
    })

    let decorated = new klass()
    Object.assign(decorated.__proto__, protoMethods)
    return decorated
  }
}
