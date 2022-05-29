const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


const userController = {
    getUsers(req, res){
        User.find({})
        .populate({
            path: 'Thought',
            select: ('V__-')
        })
        .populate({
            path:'friends',
            select: ('V__-')
        })
        .select('V__-')
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
            select: ('V__-')
        })
        .select('v__-') 
        .then((userData) => // may need async here
        !user   ? res.status(404).json({ message: 'no user matches that id' })
        : res.json({
            userData,
            Thought: req.params.userId
            
            })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id:req.parama.userId})
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'no user exists'})
                : User.findOneAndUpdate(
                    {user: req.params.userId},
                    {$pull: { user: req.params.sudentId } },
                    { new: true }
                )
            )
            .then((thoughts) =>
            !thoughts
                ? res.status(404).json({
                    message: 'user deleted, no thoughts to think about',
                    })
                :res.json({ message: 'user was deleted'})
                )
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
    },

}