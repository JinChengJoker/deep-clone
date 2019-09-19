function deepClone(resource) {
  if (resource instanceof Object) {
    if (resource instanceof Array) {
      let result = new Array()
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