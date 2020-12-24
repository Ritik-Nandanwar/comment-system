const express = require('express')
const app = express()
const PORT = 3333 || process.env.PORT
const path = require('path')
app.use(express.static(path.join(__dirname , "public")))
const server = app.listen(PORT , () => {
  console.log("server running...")
})
const io = require('socket.io')(server)
io.on('connection',socket => {
  //RECEIVE DATA FROM FRONTEND
  socket.on('comment' ,(data) => {
    //RESONSE TO RECEIVED REQUEST
    socket.broadcast.emit('comment' ,data)
  })
})
