const errors = require('../data/errors')

exports = module.exports = (error, ...parameters) => {
  let data;
  if((data = errors[error]) === undefined) {
    data = errors.error;
    parameters = [require('../package').bugs.url, String(error instanceof Error ? error.stack : error)];
    if(/\n/.exec(parameters[1])) parameters[1] = '\u001b[0m' + parameters[1];
  }
  console.error(`\u001b[1;31mError #${data.number}.\u001b[0m \u001b[31m${data.name}\u001b[0m`);
  console.error(data.message, ...parameters.map(p => `\u001b[31m${p}\u001b[0m`));
  process.exit(data.number);
}
