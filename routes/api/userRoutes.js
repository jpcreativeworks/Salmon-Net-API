const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updatingUser,
  deleteUser,
} = require('../../controllers/userController.js');


router.route('/').get(getUser).post(createUser);


router
  .route('/:userId')
  .get(getSingleUser)
  .put(updatingUser)
  .delete(deleteUser);

module.exports = router;
