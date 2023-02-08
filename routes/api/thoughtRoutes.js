const router = require('express').Router();
const {
  getThoughts,
  getSinglethought,
  createThought,
  updateThought,
  deleteThought,
  createExpression,
  deleteExpression

} = require('../../controllers/thoughtController.js');


router.route('/')
.get(getThoughts)
.post(createThought);


router
  .route('/:thoughtId')
  .get(getSinglethought)
  .put(updateThought)
  .delete(deleteThought);

  router.route('/:thoughtId/expression')
  .post(createExpression)

router.route('/:thoughtId/expression/:expressionId')
  .delete(deleteExpression);

module.exports = router;
