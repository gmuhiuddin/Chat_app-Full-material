import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import db from './config/db.js';
import Msg from './models/Msg.js';

const app = express();
const server = http.createServer();
const io = new SocketServer(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(express.json());

db.connection.once("open", () => {
    console.log("Db connected");
})
    .on('error', (err) => {
        console.log("error" + err);
    })

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("getMsg", async ({ msgId }) => {
        const msgs = await Msg.find({
            msgId
        });

        socket.emit("catchMsg", msgs);
    });

    socket.on("sendMsg", async ({ msgId, msg, userId }) => {
            await Msg.create({
                msgId,
                msg,
                userId
            });

            const msgs = await Msg.find({
                msgId
            });
    
            io.sockets.emit("catchMsg", msgs);
    });

});

server.listen(3001, () => {
    console.log("Server was running successfully");
});

app.use('/', (req, res) => {
    res.json("Hello there")
});