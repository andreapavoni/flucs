import {EventEmitter} from 'events'
import Dispatcher from './Dispatcher'
import * as utils from './utils'

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

var _state = {}

export default class Store extends EventEmitter {
  static createFromObject(obj) {
    return utils.extendObjectWithClass(obj, this)
  }

  constructor() {
    super()
  }

  bindActions(opts) {
    let bindings = parseBindingsTree(opts)

    // later inside some store callback, you can use:
    // this.dispatcher.waitFor([AnotherStore.dispatchToken])
    this.dispatchToken = Dispatcher.register((action) => {
      if (!!this[bindings[action.actionType]]) {
        this[bindings[action.actionType]](action.payload)
      }
    })
  }

  setInitialState(state = {}) {
    _state = state
  }

  get dispatcher() { return Dispatcher }

  getState() {
    return _state
  }

  setState(state={}) {
    Object.assign(_state, state)
    this.emitChange()
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
