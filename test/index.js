const chai = require('chai')
const sinonChai = require('sinon-chai')
const deepClone = require('../src/index')

chai.use(sinonChai)
const assert = chai.assert

describe('测试深拷贝', () => {
  it('成功引入深拷贝', () => {
    assert.isFunction(deepClone)
  })
  it('拷贝基本类型', () => {
    const s1 = 'xxx'
    const n1 = 123
    const u1 = undefined
    const b1 = true
    const empty1 = null
    const s2 = deepClone(s1)
    const n2 = deepClone(n1)
    const u2 = deepClone(u1)
    const b2 = deepClone(b1)
    const empty2 = deepClone(empty1)
    assert(s2 === s1)
    assert(n2 === n1)
    assert(u2 === u1)
    assert(b2 === b1)
    assert(empty2 === empty1)
  })
  it('拷贝一般（狭义）对象', () => {
    const o1 = { name: 'xxx', child: { name: 'zzz' } }
    const o2 = deepClone(o1)
    assert(o1 !== o2)
    assert(o1.name === o2.name)
    assert(o1.child !== o2.child)
    assert(o1.child.name === o2.child.name)
  })
})