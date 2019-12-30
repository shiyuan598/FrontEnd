var Mock = require('mockjs')
//1.1 string 'name|min-max': string
var str = Mock.mock({
  'string|1-5': '-asdf-'
})
console.info(str)
//1.2 string 'name|count': string
str = Mock.mock({
  'string|3': ' 等扽扽 ' 
})
console.info(str)
//2.1 number 'name|count': number
var num = Mock.mock({
  'number|+1': 8
})
console.info(num)

var func = Mock.mock({
  'foo': 'Syntax Demo',
  'name': function () {
    return this.foo
  }
})
console.info(func)

// var data = Mock.mock({
//   'list|1-10': [{
//     'id|+1':1
//   }]
// })
// console.info(data)