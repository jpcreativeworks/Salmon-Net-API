const { Thoughts, Users } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thoughts.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getaThought(req, res) {
        Thoughts.findOne({_id: req.params.thoughtId })
        .select(`${thoughtId}`)
        .then((thoughts) =>
        !thoughts
            ? res.status(404).json({ message: 'no one thought of that yet' })
            : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));                        
    },
    createThoughts(req, res) {
        Thoughts.create(req.body)
        .then((course) => res.json(thoughts))
        .catch((err) =>{
            console.log(err);
            return res.status(500).json(err);
        });
    },
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId },
            {$set: req.body},
            { runValidators: true, new: true }
        )
        .then((thoughts) =>
        !thoughts
        ? res.status(404).json({ message: 'That thought couldnt be updated'})
        : res.json(course)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id:req.params.courseId })
            .then((thoughts) =>
            !thoughts   ?res.status(404).json({ message: 'Thought about it and decided not to delete that thought'})
            : Users.deleteMany({ _id: { $in: thoughts.user } })
            )
            .then(() => res.json({ message: 'That thought has been unthunk'}))
            .catch((err) => res.status(500).json(err));            
    },
};