const { Thoughts, Users, Reaction } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thoughts.find()
        .then((thoughts) => {
            // console.log('find thoughts', thoughts);
            return res.json(thoughts)          
        })
        .catch((err) => {
            console.log(err); 
            res.status(500).json(err)
        });
    },
    getaThought(req, res) {
        Thoughts.findOne({_id: req.params.id })
        
        .then((thoughts) =>
        !thoughts
            ? res.status(404).json({ message: 'no one thought of that yet' })
            : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));                        
    },
    createThoughts(req, res) {
        Thoughts.create(req.body)
        .then((thoughts) => res.json(thoughts))
        .catch((err) =>{
            console.log(err);
            return res.status(500).json(err);
        });
    },
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            {_id: req.params.id },
            {$set: req.body},
            { runValidators: true, new: true }
        )
        .then((thoughts) =>
        !thoughts
        ? res.status(404).json({ message: 'That thought couldnt be updated'})
        : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id:req.params.id })
            .then((thoughts) =>
            !thoughts   
            ? res.status(404).json({ message: 'Thought about it and decided not to delete that thought'})
            : Users.deleteMany({ _id: { $in: thoughts.user } })
            )
            .then(() => res.json({ message: 'That thought has been unthunk'}))
            .catch((err) => res.status(500).json(err));            
    },
    addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);
        Thoughts.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID :(' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {        
        Thoughts.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that ID :(' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
        },
    
};