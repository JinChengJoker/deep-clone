function deepClone(resource) {
  if (resource instanceof Object) {
    if (resource instanceof Array) {
      const result = new Array()
      for (let key in resource) {
        result[key] = deepClone(resource[key])
      }
      return result
    } else if (resource instanceof Function) {
      const result = function () {
        return resource.apply(this, arguments)
      }
      for (let key in resource) {
        result[key] = deepClone(resource[key])
      }
      return result
    } else if (resource instanceof RegExp) {
      const result = new RegExp(resource.source, resource.flags)
      for (let key in resource) {
        result[key] = deepClone(resource[key])
      }
      return result
    } else {
      const result = new Object()
      for (let key in resource) {
        result[key] = deepClone(resource[key])
      }
      return result
    }
  }
  return resource
}

module.exports = deepClone