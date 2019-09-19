function deepClone(resource) {
  if (resource instanceof Object) {
    if (resource instanceof Array) {
      let result = new Array()
      for (let key in resource) {
        result[key] = deepClone(resource[key])
      }
      return result
    } else if (resource instanceof Function) {
      let result = function() {
        return resource.apply(this, arguments)
      }
      for (let key in resource) {
        result[key] = deepClone(resource[key])
      }
      return result
    } else {
      let result = new Object()
      for (let key in resource) {
        result[key] = deepClone(resource[key])
      }
      return result
    }
  }
  return resource
}

module.exports = deepClone