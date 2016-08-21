const fs = require('fs');
const os = require('os');
const path = require('path');
const error = require('./error');

exports = module.exports = currentVersion => {
  let file = path.join(os.homedir(), 'petpet.json');
  let majorVersion = parseInt(currentVersion);

  try {
    let $ = require(file);
    switch(true) {
      case($.$ >= majorVersion):
        return;

      case($.$ === undefined):
        if($.v === undefined) error('corrupted-file', file);
        else delete $.v;

      default:
        $.$ = majorVersion;
    }
    try {
      fs.writeFileSync(file, JSON.stringify($) + '\n');
    } catch(e) {
      error('write-file-error', file);
    }
  } catch(e) {
    try {
      fs.accessSync(file, 0);
      error('corrupted-file', file);
    } catch(e) {
      try {
        fs.writeFileSync(file, `{"$":${majorVersion}}\n`);
      } catch(e) {
        error('write-file-error', file);
      }
    }
  }

  file
}
