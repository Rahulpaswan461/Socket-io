const express = require("express")
const http = require("node:http")
const path = require("node:path")
const {Server} = require("socket.io")

const app = express()

const server = http.createServer(app)
const io = new Server(server)

// it will run whenever a new user is connected or it will referss to all the members to the group
io.on("connection",(socket) =>{
    socket.on("user-message",message=>{
        console.log(message)
        io.emit("message",message)//sending this message on frontend
    })
})
app.use(express.static(path.resolve("./public")))

app.get("/",(req,res)=>{
      return res.sendFile('./public/index.html')
})

server.listen(9000,()=>[
    console.log("server is running at port 9000")
])