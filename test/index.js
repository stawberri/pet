const test = require('tape')

test('petpet is a function', t => {
  t.is(typeof require('../lib'), 'function', 'typeof check')
  t.end()
})
