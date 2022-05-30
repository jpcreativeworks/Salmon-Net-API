const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


const userController = {
    getUsers(req, res){
        User.find({})
        .populate({
            path: 'Thought',
            select: ('-__v')
        })
        // .populate({
        //     path:'friends',
        //     select: ('-__v')
        // })
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
        User.findOne({ _id: req.params.userId })
        .populate({
            path: 'Thought',
            select: ('-__v')
        })
        .select('-__v') 
        .then((userData) => // may need async here
        !userData   
        ? res.status(404).json({ message: 'no user matches that id' })
        : res.json({
            userData,
            // Thought: req.params.userId
            // may need to remove { }
            })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    createUser(req, res) {
        User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id:req.parama.userId})
            .then((userData) => 
            !userData
                ? res.status(404).json({ message: 'no user exists'})
                : User.findOneAndUpdate(
                    {userId: userData.userId},
                    // {$in: { userData.friends } },
                    // {$pull: { friends:params.userId} }
                    {$pull: { user: req.params.userId } },
                    { new: true }
                )
            )
            .then((thoughts) => {
                Thought.deleteMany({ user: userData.user })            
            !thoughts
                ? res.status(404).json({
                    message: 'user deleted, no thoughts to think about',
                    })
                : res.json({ message: 'user was deleted'})
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                })
            .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    
    },
    updatingUser (req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            body, 
            { new: true }
            )
            .then(userData => {
                !userData
                ? res.status(404).json({ message: 'No user found, unable to update'})
                : res.json({ message: 'all done updating user'}).console.log(new userData);
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err);
            })
        },
        addAsFriend

    }
