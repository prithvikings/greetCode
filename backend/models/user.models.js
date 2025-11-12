import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        enum: ['user', 'admin'],
        type: String,
        default: 'user',
    },
    problemSolved:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Problem',
        }],
        unique: true,
        default: [],
    },
    profilePicture:{
        type: String,
        default: '',
    },
}, { timestamps: true });


export const User =mongoose.model('User',userSchema);