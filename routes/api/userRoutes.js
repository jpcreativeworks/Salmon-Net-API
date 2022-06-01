const { Thought, User } = require('../../models')
const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updatingUser,
  deleteUser,
  addAsFriend,
  removeFriend
} = require('../../controllers/userController.js');


router.route('/').get(getUsers).post(createUser);


router
  .route('/:userId')
  .get(getSingleUser)
  .put(updatingUser)
  .delete(deleteUser);

router.route('/:userId/friend/:friendId')
.post(addAsFriend)
.delete(removeFriend);



module.exports = router;
