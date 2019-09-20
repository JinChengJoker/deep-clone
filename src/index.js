const cacheStack = []

function deepClone(resource) {
  if (resource instanceof Object) {
    const cache = findCache(resource)
    if (cache) {
      return cache
    } else {
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
      cacheStack.push([resource, result])
      for (let key in resource) {
        if (resource.hasOwnProperty(key)) {
          result[key] = deepClone(resource[key])
        }
      }
      return result
    }
  }
  return resource
}

function findCache(resource) {
  for (let i = 0; i < cacheStack.length; i++) {
    if (cacheStack[i][0] === resource) {
      return cacheStack[i][1]
    }
  }
  return null
}

module.exports = deepClone