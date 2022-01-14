import mongoose from 'mongoose';
import { User } from '../../shared/models/user.model.js';

const { Schema, model } = mongoose;


const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    username: String,
    email: String,
    password: String,
});

export const UserModel = model<User>('User', UserSchema);