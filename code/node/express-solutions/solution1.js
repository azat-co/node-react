const express = require('express')
const mongodb = require('mongodb')
const app = express()
const url = 'mongodb://localhost:27017/board'
const client = mongodb.MongoClient.connect(url, (error, db)=>{
  if (error) return console.error(error)
  app.get('/messages', (req, res)=>{
    const messages = db.collection('messages')
    messages.find({}).toArray((error, messages)=>{
      if (error) return console.error(error)
      res.send(messages)
    })
  })

  app.listen(process.argv[2] || 3000)
})
