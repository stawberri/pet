const fs = require('fs'), os = require('os'), path = require('path'), https = require('https')
const _ = require('./_')

exports = module.exports = currentVersion => {
  let file = path.join(os.homedir(), 'petpet.json')
  let majorVersion = parseInt(currentVersion)
  let $ = {$: majorVersion}

  try {
    $ = require(file)
    switch(true) {
      case($.$ >= majorVersion): break

      case($.$ === undefined):
        if($.v === undefined) _.$('corrupted-file', file)
        else delete $.v

      default: $.$ = majorVersion
    }
  } catch(e) {
    try {
      fs.accessSync(file, 0)
      _.$('corrupted-file', file)
    } catch(e) {}
  }

  $._ = () => {
    try {
      fs.writeFileSync(file, JSON.stringify($) + '\n')
    } catch(e) {
      _.$('write-file-error', file)
    }
  }

  return new Promise((resolve, reject) => {
    $.updater = $.updater || {}

    // If updatePrompted this version or current time is before check time
    if($.updater.prompt === currentVersion || Date.now() < $.updater.check) return reject()

    https.get(`https://registry.npmjs.org/${_._.name}/latest`, re => {
      let msg = '';
      re.setEncoding('utf8')
        .on('data', chunk => msg += chunk)
        .on('end', () => resolve(JSON.parse(msg)))
    }).on('error', () => reject())
  }).then(data => {
    $.updater.check = Date.now() + 300000
    return Promise.reject(data.version !== currentVersion ? data.version : false)
  }).catch(updateAvailable => {
    if(updateAvailable) $.updater.prompt = currentVersion
    $._()
    if(updateAvailable) _.$('update-available', currentVersion, updateAvailable, _.nbspify(`npm i ${_._.name} -g`))
    return $
  })
}
