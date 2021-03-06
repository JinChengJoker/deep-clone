const chai = require('chai')
const sinonChai = require('sinon-chai')
const deepClone = require('../src/index')

chai.use(sinonChai)
const assert = chai.assert

describe('测试深拷贝', () => {
  it('成功引入深拷贝', () => {
    assert.isObject(new deepClone())
  })
  it('拷贝基本类型', () => {
    const clone = new deepClone().clone
    const s1 = 'xxx'
    const n1 = 123
    const u1 = undefined
    const b1 = true
    const empty1 = null
    const s2 = clone(s1)
    const n2 = clone(n1)
    const u2 = clone(u1)
    const b2 = clone(b1)
    const empty2 = clone(empty1)
    assert(s2 === s1)
    assert(n2 === n1)
    assert(u2 === u1)
    assert(b2 === b1)
    assert(empty2 === empty1)
  })
  it('拷贝一般（狭义）对象', () => {
    const o1 = { name: 'xxx', child: { name: 'zzz' } }
    const o2 = new deepClone().clone(o1)
    assert(o1 !== o2)
    assert(o1.name === o2.name)
    assert(o1.child !== o2.child)
    assert(o1.child.name === o2.child.name)
  })
  it('拷贝数组', () => {
    const a1 = [[12, 23], [34, 45], [56, 67]]
    const a2 = new deepClone().clone(a1)
    assert(a1 !== a2)
    assert(a1[0] !== a2[0])
    assert(a1[1] !== a2[1])
    assert(a1[2] !== a2[2])
    assert.deepEqual(a1, a2)
  })
  it('拷贝函数', () => {
    const f1 = (a, b) => {
      return a + b
    }
    f1.xxx = { yyy: { zzz: 'aaa' } }
    const f2 = new deepClone().clone(f1)
    assert(f1 !== f2)
    assert(f1(1, 2) === f2(1, 2))
    assert(f1.xxx !== f2.xxx)
    assert(f1.xxx.yyy !== f2.xxx.yyy)
    assert(f1.xxx.yyy.zzz === f2.xxx.yyy.zzz)
  })
  it('拷贝正则表达式', () => {
    const reg1 = /hi\d+/gi
    reg1.xxx = { yyy: { zzz: 'aaa' } }
    const reg2 = new deepClone().clone(reg1)
    assert(reg1 !== reg2)
    assert(reg1.source === reg2.source)
    assert(reg1.flags === reg2.flags)
    assert(reg1.xxx !== reg2.xxx)
    assert(reg1.xxx.yyy !== reg2.xxx.yyy)
    assert(reg1.xxx.yyy.zzz === reg2.xxx.yyy.zzz)
  })
  it('拷贝日期', () => {
    const d1 = new Date()
    d1.xxx = { yyy: { zzz: 'aaa' } }
    const d2 = new deepClone().clone(d1)
    assert(d1 !== d2)
    assert(d1.getTime() === d2.getTime())
    assert(d1.xxx !== d2.xxx)
    assert(d1.xxx.yyy !== d2.xxx.yyy)
    assert(d1.xxx.yyy.zzz === d2.xxx.yyy.zzz)
  })
  it('跳过原型属性', () => {
    const o1 = Object.create({ name: 'xxx' })
    o1.xxx = { yyy: { zzz: 'aaa' } }
    const o2 = new deepClone().clone(o1)
    assert(o1 !== o2)
    assert.isTrue('name' in o1)
    assert.isFalse('name' in o2)
    assert(o1.xxx !== o2.xxx)
    assert(o1.xxx.yyy !== o2.xxx.yyy)
    assert(o1.xxx.yyy.zzz === o2.xxx.yyy.zzz)
  })
  it('环拷贝', () => {
    const o1 = { name: 'xxx', child: { name: 'zzz' } }
    o1.self = o1
    const o2 = new deepClone().clone(o1)
    assert(o1 !== o2)
    assert(o1.name === o2.name)
    assert(o1.child !== o2.child)
    assert(o1.child.name === o2.child.name)
    assert(o1.self !== o2.self)
  })
})