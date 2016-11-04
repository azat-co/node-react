// Two standard variable functions.
var sayHelloInEnglish = function() {
  return 'Hello'
}

var sayHelloInSwedish = function() {
  return 'Hej'
}

var sayHelloInTatar = function() {
  return 'Isänme'
}

console.log('Swedish ' +
  sayHelloInSwedish() +
  ' & English ' +
  sayHelloInEnglish()
  ' & Tatar ' +
  sayHelloInTatar())
