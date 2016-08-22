const util = require('util')

// Function compositor
let _ = exports = module.exports = (...fns) => {
  switch(fns.length) {
    case 0: return Promise.resolve()
    case 1: return Promise.resolve(fns[0])
    default: return fns.slice(1).reduce((promise, fn) => promise.then(fn), _(fns[0])).catch(_.$)
  }
}

// Argument reducing function creator
_.reduceArgs = function(fn) {
  return function(...args) {
    if(args.length <= 2) return fn(...args)
    return args.reduce((result, current) => fn(result, current))
  }
}

// Object merger (immediately called to merge more stuff into _)
~(_.mergeObj = _.reduceArgs((target, source) => {
  return Object.getOwnPropertyNames(source).forEach(key => target[key] = source[key])
}))(_, {
  // Fetch data from package.json
  _: require('../package.json'),

  // Trim ending whitespace only
  trimEnd(string) {
    return string.replace(/\s+$/, '')
  },

  // Word wrap strings
  wordwrap(string, length = 69, start = '', endCap = '') {
    // Strip color / format codes when measuring length
    let len = string => string.replace(/\u001b\[[;\d]*?m/g, '').length
    string = string.replace(/\t/, '  ')
    let lines = string.split(/\n/)
    // \u00a0 - non-breaking space
    let capturingWords = /([\S\u00a0]+[^\S\u00a0]+)/
    lines = lines.map(line => {
      line = _.trimEnd(line)
      let words = line.split(capturingWords)
      return words.reduce((array, word) => {
        let i = array.length - 1, lineLength = len(array[i])
        if(lineLength && lineLength + len(word) > length) {
          let wordTrimmed = _.trimEnd(word)
          if(lineLength + len(wordTrimmed) > length) {
            array.push(word)
          } else {
            array[i] += wordTrimmed
            array.push('')
          }
        } else {
          array[i] += word
        }
        return array
      }, ['']).join('\n')
    })
    return lines.join('\n');
  },

  // Error handler
  $(error, ...parameters) {
    let data, errors = require('../data/errors')

    let stackFormatter = stack => {
      if(stack === undefined) {
        let obj = {}
        Error.captureStackTrace(obj, _.$)
        ~({stack} = obj)
      }
      return String(stack).replace(/ /g, '\u00a0')
    }

    if(error === undefined) {
      data = errors.undefined
      parameters = [require('../package').bugs.url, `\u001b[0m${stackFormatter().replace(/^.*?(?=\n)/,'Stack trace:')}`]
    } else if((data = errors[error]) === undefined) {
      data = errors.error
      parameters = [require('../package').bugs.url, String(error instanceof Error ? stackFormatter(error.stack) : error)]
      if(/\n/.exec(parameters[1])) parameters[1] = `\u001b[0m${parameters[1]}`
    }
    console.error(`\u001b[1;31mError #${data.number}.\u001b[0m \u001b[31m${data.name}\u001b[0m`)
    let message = util.format(data.message, ...parameters.map(p => `\u001b[31m${p}\u001b[0m`))
    console.error(_.wordwrap(message))
    process.exit(data.number)
  }
})
