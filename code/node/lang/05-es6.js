// Const

const accounts = [{
  id: '1',
  firstName: 'Theresa',
  lastName: 'Bell',
  email: 'tbell0@goo.gl',
  sex: 'Female',
  ip: '71.27.150.161'
}]
accounts[0].id = '2'  // ok
console.log(accounts)
// accounts = [] // fails


// Let
var a = 1
if (true) {
  var a =2
  console.log('a', a)
}
console.log('a', a) // 2 - changed

let b = 1
if (true) {
  let b =2
  console.log('b', b)
}
console.log('b', b) // 1 - unchanged

// Fat arrow functions
const _this = this
const f = (i)=> {
  console.log(_this === this) // this is the same
  return ++i
}
const f2 = function (i) {
  console.log(_this === this) // this is different
  return ++i
}
console.log('increment', f(1), f2(1))

// Destructuring
const {email} = accounts[0]
console.log(email) // tbell@goo.gl

// Interpolation

const str = `${a} is a`
console.log(str)