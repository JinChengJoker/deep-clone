function deepClone(resource) {
  if (resource instanceof Object) {
    let result
    if (resource instanceof Array) {
      result = new Array()
    } else if (resource instanceof Function) {
      result = function () {
        return resource.apply(this, arguments)
      }
    } else if (resource instanceof RegExp) {
      result = new RegExp(resource.source, resource.flags)
    } else if (resource instanceof Date) {
      result = new Date(resource)
    } else {
      result = new Object()
    }
    for (let key in resource) {
      if(resource.hasOwnProperty(key)) {
        result[key] = deepClone(resource[key])
      }
    }
    return result
  }
  return resource
}

module.exports = deepClone