const util = require('util')

// Unpack things
let deArray = array => Array.isArray(array) ? array[0] : array
let deFunc = (func, ...args) => typeof func === 'function' ? func(...args) : func

// Argument reducing function creator
let reduceArgs = function(fn) {
  return function(...args) {
    if(args.length <= 2) return fn(...args)
    return args.reduce((result, current) => fn(result, current))
  }
}

// Object merger
let mergeObj = reduceArgs((target, source) => {
  return Object.assign(target, deFunc(source, target))
})

// Require shortener
let _ = exports = module.exports = (path = '') => {
  return require(`./${deArray(path).replace(/^\$/, '../data/')}`)
}

mergeObj(_, {
  deArray, reduceArgs, mergeObj,

  // Fetch data from package.json
  _: _`../package`,

  // Trim ending whitespace only
  trimEnd(string) {
    return string.replace(/\s+$/, '')
  },

  // Esc format code helper
  em: mergeObj((...codes) => {
    let code = `\x1b[${codes.length ? codes.join(';') : 0}m`
    let ret = string => code + _.deArray(string) + _.em
    ret.toString = () => code
    return ret
  }, em => {
    let str = String(em())
    return {
      // Use it as a value for reset code
      toString: () => str
    }
  }),

  // Word wrap strings
  wordwrap(string, length = 69, start = '', end = '') {
    // Strip color / format codes when measuring length
    let len = string => string.replace(/\u001b\[[;\d]*?m/g, '').length
    string = string.replace(/\t/g, '  ')
    let lines = string.split(/\n/)
    // \xa0 - non-breaking space
    let capturingWords = /([\S\xa0]+[^\S\xa0]+)/
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
      }, ['']).map(line => start + line + end).join('\n')
    })
    return lines.join('\n');
  },

  // Convert spaces to non-breaking spaces
  nbspify(string) {
    return String(string).replace(/ /g, '\xa0')
  },

  // Error handler
  $(error, ...parameters) {
    let data, errors = _`$errors`

    let stackFormatter = stack => {
      if(stack === undefined) {
        let obj = {}
        Error.captureStackTrace(obj, _.$)
        ~({stack} = obj)
      }
      return _.nbspify(stack)
    }

    if(error === undefined) {
      data = errors.undefined
      parameters = [_._.bugs.url, _.em + stackFormatter().replace(/^.*?(?=\n)/,'Stack trace:')]
    } else if((data = errors[error]) === undefined) {
      data = errors.error
      parameters = [_._.bugs.url, String(error instanceof Error ? stackFormatter(error.stack) : error)]
      if(/\n/.exec(parameters[1])) parameters[1] = _.em + parameters[1]
    }
    console.error(`${_.em(1,31)(`Error #${data.number}:`)} ${_.em(31)(data.name)}`)
    let message = util.format(data.message, ...parameters.map(p => _.em(31)(p)))
    console.error(_.wordwrap(message))
    process.exit(data.number)
  }
})
