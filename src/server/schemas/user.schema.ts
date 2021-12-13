import mongoose from 'mongoose';
const {Schema, model} = mongoose;

interface User {
    email: string,
    firstName: string,
    lastName: string,
    username: string
}

const userSchema = new Schema<User>({
    email: String,
    firstName: String,
    lastName: String,
    username: String
})

export const UserModel = model('User', userSchema);