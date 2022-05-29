const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');


router.route('/').get(getUser).post(createUser);


router
  .route('/:userId')
  .get(getSinglUser)
  .put(updateUser)
  .delete(deleteCourse);

module.exports = router;
