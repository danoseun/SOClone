import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,

    },
    gender: {
        type: String,

    },
    profilepic: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});

export const User = mongoose.model('user', UserSchema);