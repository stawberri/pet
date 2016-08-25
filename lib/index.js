const _ = require('./_')
const Data = _`data`, actions = _`actions`

exports = module.exports = $ => {
  let data = new Data($)
  return Promise
    .resolve(actions.default(data))
    .then(output => {
      data.write()
      return output
    })
}
