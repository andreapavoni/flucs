import {EventEmitter} from 'events'
import Dispatcher from './Dispatcher'

export default {
  decorators: Object.assign({}, EventEmitter.prototype, {
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
   }),

  createStore: function(klass) {
    Object.assign(klass.prototype, {
      bindActions: function(bindings) {
        Dispatcher.register((action) => {
          let {actionType, payload} = action
          this[bindings[actionType]](payload)
        })
      }
    })

    let decorated = new klass()
    Object.keys(this.decorators).forEach((decoration) => {
      decorated.__proto__[decoration] = this.decorators[decoration]
    })
    return decorated
  }
}
