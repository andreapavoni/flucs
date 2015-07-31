function NoopClass() {}

export function getPrototypeMethods(klass, isPrototype=false) {
  let excluded = Object.getOwnPropertyNames(NoopClass.prototype)
  let proto = isPrototype ? klass : klass.prototype
  return Object.getOwnPropertyNames(proto).reduce((result, method) => {
    if (excluded.indexOf(method) !== -1) {
      return result
    }

    result[method] = proto[method]
    return result
  }, {})
}

export function extendObjectWithClass(obj, klass) {
  obj.prototype = Object.assign((new klass()), obj.prototype)
  obj.prototype.constructor = obj
  return new obj()
}
