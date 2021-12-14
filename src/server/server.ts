import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import * as socketIO from "socket.io";
import http from 'http';
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from 'path';


import { UserModel } from "./schemas/user.schema.js";
import { authHandler } from "./middleware/auth.middleware.js";

const __dirname = path.resolve();

dotenv.config();

const access_token = process.env.ACCESS_TOKEN_SECRET as string;
const saltRounds = 10;


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


app.get("/api/users", authHandler, function(req: any,res){
  UserModel.find({}, '-password')
  .then((data:any) => {
    res.json({data})
    console.log({data})
  })
  .catch((err:any) => {
    res.status(501).json({error: err})
  })
});

app.post("/api/create-user", function(req,res){
  const {email, firstName, lastName, username, password} = req.body;

  bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(password, salt, function(err, hash){

      const user = new UserModel({
        email,
        firstName,
        lastName,
        username,
        password: hash
      });

      const token = jwt.sign({id: req.body._id}, access_token, {
        expiresIn: 90
      })

      user.save()
      .then((data: any) => {
        res.json({data, token});
        console.log(data, `token: ${token}`)
      })
      .catch((err:any) => {
        res.status(501).json({error:err})
      })
    })
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