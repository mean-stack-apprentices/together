import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const userSchema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true }
}, { collection: "Users", toObject: { versionKey: false } });
export const UserModel = model('User', userSchema);
//# sourceMappingURL=user.schema.js.map