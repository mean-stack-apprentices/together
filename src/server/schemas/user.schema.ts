import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const userSchema = new Schema<any>({
   firstName: String,
   lastName: String,
   userName: String,
   email: String,
});

export const UserModel = model('User', userSchema);