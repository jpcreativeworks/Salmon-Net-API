const router = require('express').Router();
const {
  getAllThoughts,
  getaThought,
  createThoughts,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThoughts);


router
  .route('/:id')
  .get(getaThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:id/reactions').post(addReaction);


router.route('/:id/reaction/:reactionId').delete(removeReaction);

module.exports = router;