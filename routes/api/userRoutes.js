const { Thought, User } = require('../../models')
const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updatingUser,
  deleteUser,
} = require('../../controllers/userController.js');


router.route('/').get(getUsers).post(createUser);


router
  .route('/:userId')
  .get(getSingleUser)
  .put(updatingUser)
  .delete(deleteUser);

module.exports = router;
