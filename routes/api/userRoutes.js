const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addSomeone,
  removeSomeone,
} = require('../../controllers/userController');

router.route('/')
.get(getUser)
.post(createUser);

router.route('/:userId')
.get(getSingleUser)
.delete(deleteUser)
.put(updateUser);

router.route('/:userId/someone/:someoneId').post(addSomeone).delete(removeSomeone);

module.exports = router;
