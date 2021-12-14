import mongoose from "mongoose";
import { User } from "../../shared/models/user.model";
const { Schema, model } = mongoose;


const userSchema = new Schema<User>({
    name:{type:String , required:true},
    username:{type: String, require: true },
    email:{type: String, require: true },
    password:{type: String, require: true },
    
})

export const UserModel = model<User>('User',userSchema)