const http = require('http')

// http.get('http://demo3087851.mockable.io', (response)=>{
//   let counter = 0
//   let str = ''
//     response.on('data', (chunk) => {
//       counter ++
//       str +=chunk.toString()
//       // console.log(chunk.toString())
//     })
//     response.on('end', (error)=>{
//       if (error) return console.error(error)
//       console.log(counter, typeof str)
//       let obj = JSON.parse(str)
//       console.log(typeof obj)
//       // console.log(obj)
//     })
//   }
// )
http.request({
    method: 'GET',
    port: 80,
    protocol: 'http:',
    path: '/',
    hostname: 'demo3087851.mockable.io',
    headers: {
      'Content-Type': 'application/json'
    }
  }, (response)=>{
    response.on('data', (chunk) => {
      console.log(chunk)
    })
    response.on('end', (error)=>{
      console.error(error)
    })
    response.on('error', (error) => console.log(error))
  }
).on('error', (error) => console.log(error)).end()

