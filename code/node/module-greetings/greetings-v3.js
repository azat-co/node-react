const {sayHelloInEnglish,
  sayHelloInSwedish,
  sayHelloInTatar} = require('./greetings-v3-module.js')({caps: true})

console.log('Swedish ' +
  sayHelloInSwedish() +
  ' & English ' +
  sayHelloInEnglish() +
  ' & Tatar ' +
  sayHelloInTatar())
