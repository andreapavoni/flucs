jest.dontMock('../Store')
jest.dontMock('../Dispatcher')
jest.dontMock('../utils')

const Store = require('../Store')

class MyTestStore extends Store {
  constructor() {
    super()
    this.customNameCallback = jest.genMockFn().mockImpl(function() {})
    this.autoMapped = jest.genMockFn().mockImpl(function() {})
    this.anotherCustomCallback = jest.genMockFn().mockImpl(function() {})

    this.bindActions({
      'SomeActions': { // prefix
        'customName': 'customNameCallback', // 1:1 mapping
        '*': ['autoMapped'] // auto mapping
      },
      'CustomPrefix': {
        'anotherCustomName': 'anotherCustomCallback'
      }
    })
  }
}

describe('Store', () => {
  var MyStore, callback

  beforeEach(() => {
    MyStore = new MyTestStore()
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
      expect(MyStore.changeEventName()).toBe('MyTestStore change')
    })
  })

  describe('bindActions()', () => {
    it('binds a custom callback name for a given action identifier', function() {
      MyStore.dispatcher.dispatch({
        actionType: 'SomeActions.customName',
        payload: {a: 1}
      })

      expect(MyStore.customNameCallback).toBeCalled()
      expect(MyStore.customNameCallback.mock.calls.length).toBe(1)
    })

    it('automatically binds a callback with same name of the given action', function() {
      MyStore.dispatcher.dispatch({
        actionType: 'SomeActions.autoMapped',
        payload: {a: 1}
      })

      expect(MyStore.autoMapped).toBeCalled()
      expect(MyStore.autoMapped.mock.calls.length).toBe(1)
    })

    it('binds to actions with a custom prefix', function() {
      MyStore.dispatcher.dispatch({
        actionType: 'CustomPrefix.anotherCustomName',
        payload: {a: 1}
      })

      expect(MyStore.anotherCustomCallback).toBeCalled()
      expect(MyStore.anotherCustomCallback.mock.calls.length).toBe(1)
    })

    it('ignores unregistered prefix.action', function() {
      MyStore.dispatcher.dispatch({
        actionType: 'SomeActions.anotherCustomName',
        payload: {a: 1}
      })

      expect(MyStore.anotherCustomCallback).not.toBeCalled()
      expect(MyStore.anotherCustomCallback.mock.calls.length).toBe(0)
      expect(MyStore.autoMapped).not.toBeCalled()
      expect(MyStore.autoMapped.mock.calls.length).toBe(0)
      expect(MyStore.customNameCallback).not.toBeCalled()
      expect(MyStore.customNameCallback.mock.calls.length).toBe(0)
    })
  })
})
