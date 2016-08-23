const util = require('util')
const _ = require('./_')

exports = module.exports = ({$, action, quote, description, advice}) => {
  $._()

  let output = ''

  output += format(action) + '\n\n'

  output += format(quote, {
    lineStart: `${_.em(35)}>${_.em} ${_.em(95)}`,
    lineEnd: _.em
  }) + '\n'

  output += format(description) + '\n\n'

  output += format(advice, {
    lineStart: _.em(36),
    lineEnd: _.em,
    wrapBegin: _.em(96),
    wrapEnd: _.em(36)
  }) + '\n'

  console.log(output.replace(/\n\n$/, ''))
}

function format(text = '', {
  lineStart, lineEnd,
  wrapBegin = '', wrapEnd = ''
} = {}) {
  if(text === undefined) return ''

  if(Array.isArray(text)) {
    text.forEach((v, i, a) => a[i] = i > 0 ? wrapBegin + v + wrapEnd : v)
    text = util.format(...text)
  }

  return _.wordwrap(text, undefined, lineStart, lineEnd)
}
