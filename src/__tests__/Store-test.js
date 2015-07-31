require('core-js/shim')

jest.dontMock('../Store')
jest.dontMock('../Dispatcher')
jest.dontMock('../utils')

const Store = require('../Store')

describe('Store', () => {
  describe('static methods()', () => {
    describe('createFromObject()', () => {
      it('decorates given object with Store prototype', function() {
        let obj = function() {}
        obj = Store.createFromObject(obj)
        expect(typeof obj.emitChange).toBe('function')
      })
    })
  })

  describe('prototype methods', () => {
    var MyStore, callback

    beforeEach(() => {
      MyStore = new Store()
      callback = jest.genMockFunction()
    })

    describe('emitChange()', () => {
      it('emits the change event"', function() {
        MyStore.addChangeListener(callback)
        MyStore.emitChange()
        expect(callback).toBeCalled()
        expect(callback.mock.calls.length).toBe(1)
      })
    })

    describe('setState()', () => {
      it('updates current state with the given data', function() {
        MyStore.setState({name: 'John'})
        expect(MyStore.getState()['name']).toBe('John')
      })

      it('emits the change event"', function() {
        MyStore.addChangeListener(callback)
        MyStore.setState({name: 'John'})
        expect(callback).toBeCalled()
        expect(callback.mock.calls.length).toBe(1)
      })
    })

    describe('addChangeListener()', () => {
      it('binds a callback for the change event"', function() {
        MyStore.addChangeListener(callback)
        expect(MyStore._events[MyStore.changeEventName()]).not.toBeUndefined()
      })
    })

    describe('removeChangeListener()', () => {
      it('removes the callback for the change event"', function() {
        MyStore.addChangeListener(callback)
        MyStore.removeChangeListener(callback)
        expect(MyStore._events[MyStore.changeEventName()]).toBeUndefined()
      })
    })

    describe('changeEventName()', () => {
      it('returns "$storeName change"', function() {
        expect(MyStore.changeEventName()).toBe('Store change')
      })
    })

    describe('setInitialState()', () => {
      it('sets the state', function() {
        MyStore.setInitialState({a: 1})
        expect(MyStore.getState()).toEqual({a: 1})
      })

      it('sets default empty object when no state is provided', function() {
        MyStore.setInitialState()
        expect(MyStore.getState()).toEqual({})
      })
    })

    describe('bindActions()', () => {
      beforeEach(() => {
        MyStore.callback = jest.genMockFn()
      })

      it('binds custom callback name for a given action', function() {
        let dispatched = {actionType: 'MyActions.custom', payload: {a: 1}}
        MyStore.bindActions({'MyActions': {'custom': 'callback'}})
        MyStore.dispatcher.dispatch(dispatched)
        expect(MyStore.callback).toBeCalled()
        expect(MyStore.callback.mock.calls.length).toBe(1)
      })

      it('binds callbacks with same name of the given actions', function() {
        let dispatched = {actionType: 'MyActions.callback', payload: {a: 1}}
        MyStore.bindActions({'MyActions': {'*': ['callback']}})
        MyStore.dispatcher.dispatch(dispatched)
        expect(MyStore.callback).toBeCalled()
        expect(MyStore.callback.mock.calls.length).toBe(1)
      })

      it('binds callbacks to actions with a custom prefix', function() {
        let dispatched = {actionType: 'CustomPrefix.custom', payload: {a: 1}}
        MyStore.bindActions({'CustomPrefix': {'custom': 'callback'}})
        MyStore.dispatcher.dispatch(dispatched)
        expect(MyStore.callback).toBeCalled()
        expect(MyStore.callback.mock.calls.length).toBe(1)
      })

      it('ignores unregistered prefix.action', function() {
        let dispatched = {actionType: 'MyActions.custom', payload: {a: 1}}
        MyStore.dispatcher.dispatch(dispatched)
        expect(MyStore.callback).not.toBeCalled()
        expect(MyStore.callback.mock.calls.length).toBe(0)
      })
    })
  })
})
