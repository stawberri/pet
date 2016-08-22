// Function compositor
let _ = exports = module.exports = (...fns) => {
  switch(fns.length) {
    case 0: return Promise.resolve()
    case 1: return Promise.resolve(fns[0])
    default: return fns.slice(1).reduce((promise, fn) => promise.then(fn), _(fns[0])).catch(_.$)
  }
}

// Argument reducing function creator
_.reduce = function(fn) {
  return function(...args) {
    if(args.length <= 2) return fn(...args)
    return args.reduce((result, current) => fn(result, current))
  }
}

// Object merger (immediately called to merge more stuff into _)
~(_.merge = _.reduce((target, source) => {
  return Object.getOwnPropertyNames(source).forEach(key => target[key] = source[key])
}))(_, {
  // Fetch data from package.json
  _: require('../package.json'),

  // Convert spaces to non-breaking spaces
  nbspify(string) {
    return String(string).replace(/ /g, '\u00a0')
  },

  // Error handler
  $(error, ...parameters) {
    let data, errors = require('../data/errors')
    if(error === undefined) {
      data = errors.undefined
      parameters = [require('../package').bugs.url, `\u001b[0m${new Error().stack.replace(/^.*?(?=\n)/,'Stack trace:')}`]
    } else if((data = errors[error]) === undefined) {
      data = errors.error
      parameters = [require('../package').bugs.url, String(error instanceof Error ? error.stack : error)]
      if(/\n/.exec(parameters[1])) parameters[1] = `\u001b[0m${parameters[1]}`
    }
    console.error(`\u001b[1;31mError #${data.number}.\u001b[0m \u001b[31m${data.name}\u001b[0m`)
    console.error(data.message, ...parameters.map(p => `\u001b[31m${p}\u001b[0m`))
    process.exit(data.number)
  }
})
