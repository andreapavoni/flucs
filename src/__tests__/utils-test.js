jest.dontMock('../utils')

const utils = require('../utils')

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
