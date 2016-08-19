const test = require('tape')
const mock = require('mock-require')

test('petpet is called when run', t => {
  t.plan(1)
  mock('../lib', () => t.pass('mock run'))
  require('../bin/petpet')
  mock.stopAll()
})

test('petpet is a function', t => {
  t.is(typeof require('../lib'), 'function', 'typeof check')
  t.end()
})
