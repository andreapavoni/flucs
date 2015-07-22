function NoopClass() {}

export function getInstanceMethods(klass) {
  let excluded = Object.getOwnPropertyNames(NoopClass.prototype)
  let proto = klass.prototype
  return Object.getOwnPropertyNames(proto).reduce((result, method) => {
    if (excluded.indexOf(method) !== -1) {
      return result
    }

    result[method] = proto[method]
    return result
  }, {})
}
