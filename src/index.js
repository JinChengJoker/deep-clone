function deepClone(resource) {
  if (resource instanceof Object) {
    let result = new Object()
    for(let key in resource) {
      result[key] = deepClone(resource[key])
    }
    return result
  }
  return resource
}

module.exports = deepClone