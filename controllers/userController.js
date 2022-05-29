const { Thought, User } = require('../models');

const userController = {
    getUsers(req, res){
        User.find()
        .then(userData => {
         
           res.json(userData)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    getSingleUser(req, res) {
        User.findOne({})
    }

}