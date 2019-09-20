class deepClone {
  constructor() {
    this.cacheStack = []
  }
  clone(resource) {
    if (resource instanceof Object) {
      const cache = this.findCache(resource)
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
        this.cacheStack.push([resource, result])
        for (let key in resource) {
          if (resource.hasOwnProperty(key)) {
            result[key] = this.clone(resource[key])
          }
        }
        return result
      }
    }
    return resource
  }
  findCache(resource) {
    for (let i = 0; i < this.cacheStack.length; i++) {
      if (this.cacheStack[i][0] === resource) {
        return this.cacheStack[i][1]
      }
    }
    return null
  }
}

module.exports = deepClone