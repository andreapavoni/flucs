require('core-js/shim')

jest.dontMock('../utils')
var utils = require('../utils')

class TestClass {
  constructor() {}
  someFunc() {}
}

describe('getPrototypeMethods()', () => {
  it('returns prototype methods of a class', function() {
    let methods = utils.getPrototypeMethods(TestClass)
    expect(Object.keys(methods)).toEqual(['someFunc'])
  })

  it('returns prototype methods of an instance', function() {
    let methods = utils.getPrototypeMethods((new TestClass()).__proto__, true)
    expect(Object.keys(methods)).toEqual(['someFunc'])
  })
})

describe('extendObjectWithClass()', () => {
  it('decorates given object with class prototype', function() {
    let obj = function() {}
    obj = utils.extendObjectWithClass(obj, TestClass)
    expect(typeof obj.someFunc).toBe('function')
  })
})
