function NoopClass() {}

export function getInstanceMethods(klass, isPrototype=false) {
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
