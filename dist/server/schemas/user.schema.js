import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const userSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    username: String
});
export const UserModel = model('User', userSchema);
//# sourceMappingURL=user.schema.js.map