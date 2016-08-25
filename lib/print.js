const util = require('util')
const _ = require('./_')

exports = module.exports = ({text, quote} = {}) => {
  if(text === undefined && quote === undefined) _.$("no-output")

  let output = ''

  output += format(text) + '\n'

  output += format(quote, {
    lineStart: `  ${_.em(95)}`,
    lineEnd: _.em,
    firstLineStart: `${_.em(35)('>')} ${_.em(95)}`
  })

  console.log(output.trim())
}

function format(text, {
  lineStart, lineEnd,
  firstLineStart,
  wrapBegin = '', wrapEnd = ''
} = {}) {
  if(text === undefined) return ''

  if(Array.isArray(text)) {
    text.forEach((v, i, a) => a[i] = i > 0 ? wrapBegin + v + wrapEnd : v)
    text = util.format(...text)
  }

  text = _.wordwrap(text, undefined, lineStart, lineEnd)
  if(firstLineStart !== undefined && lineStart !== undefined)
    text = text.replace(lineStart, firstLineStart)

  return text
}
