const _ = require('./_')

exports = module.exports = class {
  constructor(dataObj) {
    this.$ = dataObj
  }

  write() {
    this.$._()
  }
}
