import * as mongoose from 'mongoose';
export interface User {
    _id?:{type: mongoose.Types.ObjectId}
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    
}