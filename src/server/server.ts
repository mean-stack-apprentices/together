import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import * as socketIO from "socket.io";
import http from 'http';
import dotenv from "dotenv";
import path from 'path';
import { setupCardsInitial } from "./helpers/initial.js";

dotenv.config();

async function runner() {
  setupCardsInitial();
}

runner();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();


const server = http.createServer(app);
const clientPath = path.join(__dirname, '/dist/client');

const io = new socketIO.Server(server,  { cors: {
  origin: '*'
}});

//mongoose.connect('mongodb://localhost:27017/teamProjectDB')
mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3501', 'http://localhost:8080']
}));

app.use(cookieParser())
app.use(express.json());
app.use(express.static(clientPath));

app.get("/api/test", function (req, res) {
  res.json({message: "Hello World!"});
});
app.all("/api/*", function (req, res) {
  res.sendStatus(404);
});


server.listen(PORT, function () {
  console.log(`starting at localhost http://localhost:${PORT}`);
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('message', 'work')
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

app.all("*", function (req, res) {
  const filePath = path.join(__dirname, '/dist/client/index.html');
  console.log(filePath);
  res.sendFile(filePath);
});