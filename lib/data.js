const _ = require('./_')

exports = module.exports = function(dataObj) {
  if(new.target !== exports) return new exports(dataObj)

  this.$ = dataObj
}

exports.prototype = {
  write() {
    this.$._()
  }
}
