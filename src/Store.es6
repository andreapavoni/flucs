import {EventEmitter} from 'events'
import Dispatcher from './Dispatcher'

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

export default class Store extends EventEmitter {
  constructor() { super() }

  bindActions(opts) {
    let bindings = parseBindingsTree(opts)

    // later inside some store callback, you can use:
    // this.dispatcher.waitFor([AnotherStore.dispatchToken])
    this.dispatchToken = Dispatcher.register((action) => {
      let {actionType, payload} = action
      this[bindings[actionType]](payload)
    })
  }

  dispatcher() { return Dispatcher }

  getState() {
    let state = {}
    Object.keys(this).forEach((prop) => {
      if (prop !== 'state' || prop !== '_events') {
        state[prop] = this[prop]
      }
    })
    return state
  }

  setState(obj) {
    Object.keys(obj).forEach((prop) => {
      this[prop] = obj[prop]
    })
    this.emitChange()
    return this
  }

  changeEventName() {
    return `${this.constructor.name} change`
  }

  emitChange() {
    this.emit(this.changeEventName())
  }

  addChangeListener(callback) {
    this.on(this.changeEventName(), callback)
  }

  removeChangeListener(callback) {
    this.removeListener(this.changeEventName(), callback)
  }
}
