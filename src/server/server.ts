import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import * as socketIO from "socket.io";
import http from 'http';
import dotenv from "dotenv";
import path from 'path';
import { UserModel } from "./schemas/user.schema.js";

// import { setupCardsInitial } from "./helpers/initial.js";


const __dirname = path.resolve();

// async function runner() {
//   setupCardsInitial();
//   // await onConnection('1');
//   // await onAddGame('123');
//   // await onAddName('1', 'test', '123');
//   // await onConnection('2');

//   // await onConnection('3');
//   // await onAddName('3', 'test3', '123');
//   // await onAddName('2', 'test2', '123');
//   // await addRandomCards('123');
//   // passOutCards('123');
//   // const state = await getGameState('123');
//   // const werewolves = await findPlayerByCardTitle('Werewolf');
//   // const unusedCards = await findNotUsedCards('123');
//   // console.log(JSON.stringify(unusedCards, null, 4));
  
//   // setTimeout(() => {
//   //   mongoose.connection.db.dropDatabase(function(err, result) {
//   //     console.log(err, result); console.log('DB dropped');
//   //   });
//   // } , 20000);
// }

// runner();

dotenv.config();
const app = express();
const server = http.createServer(app);
const clientPath = path.join(__dirname, '/dist/client');
app.use(express.static(clientPath));

const io = new socketIO.Server(server,  { cors: {
  origin: '*'
}});

const PORT = process.env.PORT || 3000;

mongoose
  // .connect(`${process.env.MONGO_URI}`)
  .connect('mongodb://localhost:27017/MEAN-Stack-together')
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));


app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3501', 'http://localhost:8080']
}));
app.use(express.json());

app.get("/api/test", function (req, res) {
  res.json({message: "Hello World!"});
});


app.get("/api/users", function(req,res){
  UserModel.find()
  .then((data) => {
    res.json({data})
  })
  .catch((err) => {
    res.status(501).json({error: err})
  })
});

app.post("/api/create-user", function(req,res){
  const {email, firstName, lastName, userName} = req.body;

  const user = new UserModel({
    email,
    firstName,
    lastName,
    userName
  })

  user.save()
  .then(data => {
    res.json({data});
  })
  .catch(err => {
    res.status(501).json({error:err})
  })
})


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