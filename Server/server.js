import express from 'express';
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import http from 'http';
import { on } from 'events';

const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods: ["GET", "PUT"]
    }
});

io.on("connection", (socket)=> {console.log(socket.id)

    socket.on("Join_Room", (data) => {

        socket.join(data);
        console.log(`User Id ${socket.id}, Room No- ${data}`)
    })

    socket.on("send_message", (data) => {console.log("Send meassage",data)
        socket.to(data.room).emit("receive_massage",data);

    })

    io.on("disconnect", () =>{
        console.log("User disconnected", socket.id);
    })

})

app.use(cors());

server.listen(1000,() => console.log("Server is start is port 1000"));
