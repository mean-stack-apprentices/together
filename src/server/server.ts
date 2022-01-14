import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import * as socketIO from "socket.io";
import http from 'http';
import dotenv from "dotenv";
import path from 'path';

import {PlayerModel} from "./schemas/player.schema.js";
import {GameModel} from "./schemas/game.schema.js";
import {CardModel} from "./schemas/card.schema.js";
import { setupCardsInitial } from "./helpers/initial.js";
import { addRandomCards, findNotUsedCards, findPlayerByCardTitle, getGameState, onAddGame, onAddName, onConnection, passOutCards } from "./helpers/io.sim.js";
import { apiRouter } from "./routes/api.routes.js";



dotenv.config();

const __dirname = path.resolve();


dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3501', 'http://localhost:8080']
}));

app.use(express.json());


app.use('/api', apiRouter);


const server = http.createServer(app);
const clientPath = path.join(__dirname, '/dist/client');
app.use(express.static(clientPath));

const io = new socketIO.Server(server,  { cors: {
  origin: '*'
}});

if (!process.env.PORT || !process.env.MONGO_URI) {
  throw new Error('Please set PORT and MONGO_URI environment variables');
}


const PORT = process.env.PORT || 3000;

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));


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