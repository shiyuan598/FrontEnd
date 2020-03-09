let mock = require('mockjs')

module.exports = {
  getName () {
    return mock.mock('@cname')
  }
}
