module.exports = (ops = {})=> {

  return {
    sayHelloInEnglish() {
      return (ops.caps) ? 'Hello' : 'hello'
    },
    sayHelloInSwedish() {
      return  (ops.caps) ? 'Hej' : 'hej'
    },
    sayHelloInTatar() {
      return  (ops.caps) ? 'Isänme' : 'isänme'
    }
  }
}
