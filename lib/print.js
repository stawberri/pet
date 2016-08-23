const util = require('util')
const _ = require('./_')

exports = module.exports = ({$, action, quote, description, advice}) => {
  $._()

  let output = ''

  output += format(action)

  output += format(quote, {
    lineStart: '> '
  })

  output += format(description)

  output += format(advice)

  console.log(output.replace(/\n$/, ''))
}

function format(text = '', {lineStart, lineEnd} = {}) {
  if(text === undefined) return ''

  if(Array.isArray(text)) text = util.format(...text)

  return _.wordwrap(text, undefined, lineStart, lineEnd) + '\n'
}
