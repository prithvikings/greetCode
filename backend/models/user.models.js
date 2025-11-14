import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        default: '',
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
        default: [],
    },
    profilePicture:{
        type: String,
        default: '',
    },
}, { timestamps: true });


export const User =mongoose.model('User',userSchema);