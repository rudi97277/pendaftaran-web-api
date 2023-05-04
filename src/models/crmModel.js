import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user : Schema.Types.ObjectId,
    comment : String
});

export const UserSchema = new Schema({
    firstName : {
        type : String,
        required : 'Enter a first name'
    },
    lastName : {
        type : String,
        required : 'Enter a last name'
    },
    userName : {
        type : String,
        unique : true,
        index : true        
    },
    password : {
        type : String,
        select: false,
        required : 'Enter a password',
    },
    imageProfileUrl : {
        type : String,
    },
    dateOfBirth : {
        type : Date,
        required : 'Enter date of birth'
    }
});

export const PostSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : 'Enter user'
    },
    caption : {
        type : String
    },
    images : [{
        type : String
    }],
    comments : [{
        type : commentSchema
    }],
    like : [{
        type : Schema.Types.ObjectId
    }],
    dislike : [{
        type : Schema.Types.ObjectId
    }]
});