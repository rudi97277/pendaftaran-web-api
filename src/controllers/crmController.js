import mongoose from "mongoose";
import { PostSchema, UserSchema } from "../models/crmModel";


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

export const register = async (req,res) => {
    req.body.password =  bcrypt.hashSync(req.body.password,8);
    req.body.dateOfBirth =  new Date(req.body.dateOfBirth);
    try {
        let newUser = new User(req.body);
        let user = await newUser.save();
        user.password = '**************';
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err);
    }
}

export const login = async (req,res) => {
    try {
        User.findOne({userName: req.body.userName}).select('+password').then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found!"
                })
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(!passwordIsValid) {
                return res.status(401).send({
                    accessToken : null,
                    message: "Invalid password"
                });
            }

            var token = jwt.sign({
                id: user._id,
            }, process.env.API_SECRET, {
                expiresIn: 86400
            });

            res.status(200)
                .send({
                    user: {
                        id: user._id,
                        userName: user.userName,
                        firstName: user.firstName,
                        lastName: user.lastName
                    },
                    message : "Login succesfull",
                    accessToken : token,
                })

        }).catch((err) => {
            res.status(500).send({message : err});
        });
    }
    catch(err) {
        res.status(500).send({
            message: err
        })
    }
}

export const getUsers = async (req,res) => {
    try {
        
        let users = await User.find();
        res.send({data: users});
    } catch (err) {
        res.send(err);
    }
}

export const addPost = async (req, res) => {
    try {
        let newPost = new Post(req.body);
        let post = await newPost.save();
        res.send(post); 
    } catch (err) {
        res.send(err);
    }
}

export const getPost = async (req, res) => {
    try {
        let posts = await Post.find();
        res.send(posts);
    } catch (err) {
        res.send(err);
    }
}

export const commentPost = async (req, res) => {
    try {
        let post = await Post.updateOne({_id : req.params.postId} , {
            $push : {
                comments : {
                    user : req.body.user,
                    comment : req.body.comment
                } 
            }
        })

        res.send(post);
    } catch (err) {
        res.send(err)
    }
}

export const reactPost = async (req, res) => {
    try {
        let post = '';
        if(req.body.type === 'like') {
            post = await Post.updateOne({_id : req.params.postId}, {
            $pull : {
                dislike : req.body.user
            },
            $addToSet : {
                like : req.body.user
            }});

            post.modifiedCount === 0 && await Post.updateOne(
                {_id : req.params.postId}, {
                    $pull : {
                    like : req.body.user
                }}
            );
        }
        else  if(req.body.type === 'dislike'){
            post = await Post.updateOne({_id : req.params.postId}, {
            $pull : {
                like : req.body.user
            },
            $addToSet : {
                dislike : req.body.user
            }});

            post.modifiedCount === 0 && await Post.updateOne(
                {_id : req.params.postId}, {
                    $pull : {
                    dislike : req.body.user
                }}
            );
        }
        
        res.send(post);
    } catch (err) {
        res.send(err);
    }
}

export const followUser = async (req,res) => {
    try {
        let follow = await User.updateOne({_id : req.params.userId}, {
            $addToSet : {
                following : req.body.user
            }
        });

        follow.modifiedCount === 0 && await User.updateOne({_id : req.params.userId}, {
            $pull : {
                following : req.body.user
            }
        }) 

        res.send(follow);
    } catch (err) {
        res.send(err);
    }
}
