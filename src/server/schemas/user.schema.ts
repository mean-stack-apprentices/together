import mongoose from 'mongoose';
import type { User } from '../../shared/models/user.model';
const { Schema, model } = mongoose;

const userSchema = new Schema<User>({

    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true}
}, {collection: "Users", toObject: {versionKey: false}}
);


const UserModel = model<User>('User', userSchema)