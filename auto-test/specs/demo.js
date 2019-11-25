module.exports = {
  'Test Demo': function (browser) {

    let url = 'https://192.168.1.1/demo'

    // 启动浏览器并打开页面
    browser.maximizeWindow()
    browser.url(url)
    browser.waitForElementVisible('div.login', 3000)
    browser.assert.elementPresent('input.el-input__inner')
    browser.assert.elementPresent('input.el-input__inner')

    browser.click('button.el-button.el-button--primary')
    browser.pause(3000)
    browser.waitForElementVisible('#app', 3000)
    browser.assert.visible('div.layer-control')
    browser.click('div.layer-control .el-checkbox')
    browser.pause(3000)
    'header-r-t'
    browser.click('ul.header-r-t>li:nth-child(3)').pause(4000)
    browser.back()
    browser.click('ul.header-r-t>li:nth-child(4)').pause(4000)
    browser.back()
    browser.click('ul.header-r-t>li:nth-child(5)').pause(4000)
    browser.getLog('browser', function (logs) {
      console.info(logs)
    })
    browser.pause(3000)
    browser.saveScreenshot('reports/smrt.png')
    browser.end()
  }
}
