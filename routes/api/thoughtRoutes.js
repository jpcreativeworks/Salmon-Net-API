const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtsById,
  addThoughts,
  updateThoughts,
  removeThoughts,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(addThoughts);


router
  .route('/:id')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(removeThoughts);

router.route('/:id/reaction').post(addReaction);

// /api/applications/:applicationId/tags/:tagId
router.route('/:id/reaction/:reactionId').delete(removeReaction);

module.exports = router;