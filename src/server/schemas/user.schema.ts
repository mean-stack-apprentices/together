import mongoose from 'mongoose';
const {Schema, model} = mongoose;
import type {User} from '../../shared/models/user.model.js'

const userSchema = new Schema<User>({
    email: String,
    firstName: String,
    lastName: String,
    username: String,
    password: String,
})

export const UserModel = model('User', userSchema);