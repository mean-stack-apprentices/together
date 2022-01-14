import mongoose from 'mongoose';
import '../../shared/models/user.model.js';
const { Schema, model } = mongoose;
const UserSchema = new Schema({
    name: { type: String, required: true },
    username: String,
    email: String,
    password: String,
});
export const UserModel = model('User', UserSchema);
//# sourceMappingURL=user.schema.js.map