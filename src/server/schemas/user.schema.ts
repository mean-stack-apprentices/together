import mongoose from 'mongoose';
const {Schema, model} = mongoose;
import type {User} from '../../shared/models/user.model.js'

const userSchema = new Schema<User>({
    email: {
        type: String, 
        required: true,
        validate: {
            validator : (email: string) => {
                const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                 console.log(regex.test(email))
                return regex.test(email)
            },
            message: props => `${props.value} is not a valid email!`
        }},

    firstName: {
        type: String, 
        minlength: 2,
        required: true,
        validate: {
            validator : (firstName: string) => {
                const doesItContainANumber = /\d/g
                return !doesItContainANumber.test(firstName)
            },
            message: props => `${props.value} is not a valid first name!`
        }},

    lastName: {
        type: String, 
        minlength: 2,
        required: true,
        validate: {
            validator : (lastName: string) => {
                const doesItContainANumber = /\d/g
                return !doesItContainANumber.test(lastName)
            },
            message: props => `${props.value} is not a valid last name!`
        }},

    username: {type: String, minLength: 3, maxlength: 8, required: true},

    password: {type: String, minLength: 5, required: true}
})

export const UserModel = model('User', userSchema);