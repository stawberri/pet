const fs = require('fs'), os = require('os'), path = require('path'), https = require('https')
const _ = require('./_')

exports = module.exports = currentVersion => {
  let file = path.join(os.homedir(), '.pet.json')
  let creatingNewFile = false
  let majorVersion = parseInt(currentVersion)
  let $ = {$: majorVersion}

  try {
    $ = require(file)
    switch(true) {
      case($.$ >= majorVersion): break

      case($.$ === undefined): _.$('corrupted-file', file)

      default: $.$ = majorVersion
    }
  } catch(e) {
    try {
      fs.accessSync(file, 0)
      _.$('corrupted-file', file)
    } catch(e) {
      creatingNewFile = true
    }
  }

  $._ = () => {
    try {
      fs.writeFileSync(file, JSON.stringify($) + '\n')
    } catch(e) {
      _.$('write-file-error', file)
    }
  }

  return new Promise((resolve, reject) => {
    var updateTime = $.update
    if(typeof updateTime === 'object' && updateTime.v === currentVersion) updateTime = updateTime.d
    if(Date.now() < updateTime) return reject()

    https.get(`https://registry.npmjs.org/${_._.name}/latest`, re => {
      let msg = '';
      re.setEncoding('utf8')
        .on('data', chunk => msg += chunk)
        .on('end', () => resolve(JSON.parse(msg)))
    }).on('error', () => reject())
  }).then(data => {
    $.update = Date.now() + 300000 // 5 minutes
    return Promise.reject(data.version !== currentVersion ? data.version : false)
  }).catch(updateAvailable => {
    if(updateAvailable) $.update = {v: currentVersion, d: Date.now() + 21600000} // 6 hours}
    $._()

    if(creatingNewFile) {
      try {
        let oldPath = path.join(os.homedir(), '.petpet.json')
        let oldFile = require(oldPath)
        if(oldFile.$ === 0) _.$('old-data-file', oldPath)
      } catch(e) {}

      try {
        let oldPath = path.join(os.homedir(), 'petpet.json')
        let oldFile = require(oldPath)
        if(oldFile.$ === 0 || oldFile.v === 0) _.$('old-data-file', oldPath)
      } catch(e) {}
    }

    if(updateAvailable) _.$('update-available', currentVersion, updateAvailable, _.nbspify(`npm i ${_._.name} -g`))
    return $
  })
}
