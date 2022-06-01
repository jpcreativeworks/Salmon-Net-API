const { ObjectId } = require('mongoose').Types;
const req = require('express/lib/request');
const { Thoughts, Users } = require('../models');
const User = require('../models/Users');


module.exports = {
    getUsers(req, res){
        Users.find({})        
        .select('-__v')
        .sort({ _id: -1 })
        .then(userData => {         
           res.json(userData)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    getSingleUser(req, res) {
        Users.findOne({ _id: req.params.userId })        
        .select('-__v') 
        .then((userData) => 
        !userData   
        ? res.status(404).json({ message: 'no user matches that id' })
        : res.json({ userData })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    createUser(req, res) {
        Users.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        Users.findOneAndDelete({ _id:req.params.userId})
            .then((userData) => 
            !userData
                ? res.status(404).json({ message: 'no user exists'})
                : Thoughts.deleteMany({userName: { $in: userData.userName } })
                .then((thoughts) => 
                !thoughts
                    ? res.status(404).json({
                     message: 'user deleted, no thoughts to think about',
                    })
                    : res.json({ message: 'user was deleted'})
                ) 
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                })
            )
            .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    
    },
    updatingUser (req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            {$set: req.body},             
            { new: true }
            )
            .then(userData => {
                !userData
                ? res.status(404).json({ message: 'No user found, unable to update'})
                : res.json({ message: 'all done updating user'});
                console.log(new userData);
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err);
            })
    },
    addAsFriend (req, res) {
        Users.findOneAndUpdate(
            {_id: req.params.userId },
            {$addToSet: {friends: req.params.friendId}},             
            { new: true }
        )
        .then(
            userData => {
                !userData
                ? res.status(404).json({ message: 'No user found, unable to update'})
                : Users.findOneAndUpdate(
                    {_id: req.params.friendId },
                    {$addToSet: {friends: req.params.userId}},             
                    { new: true }
                )
                .then(
                    userData => {
                        !userData
                        ? res.status(404).json({ message: 'No user found, unable to update'})
                        : res.json('Friends Added!')
                    }
                )
            })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
    },
    removeFriend(req, res) {
        Users.findOneAndUpdate(
            {_id: req.params.userId },
            {$pull: {friends: req.params.friendId}},             
            { new: true }
        )
        .then(
            userData => {
                !userData
                ? res.status(404).json({ message: 'No user found, unable to update'})
                : Users.findOneAndUpdate(
                    {_id: req.params.friendId },
                    {$pull: {friends: req.params.userId}},             
                    { new: true }
                )
                .then(
                    userData => {
                        !userData
                        ? res.status(404).json({ message: 'No user found, unable to update'})
                        : res.json('Friends Removed!')
                    }
                )
            })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
    }

}
    
