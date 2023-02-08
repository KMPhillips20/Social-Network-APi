const { User, Thought } = require('../models');

module.exports = {
  // ------------- Get All Users -----------
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


  // ---------- Get A Single User --------------
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'There is no user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


  // ----------- Create A New User ---------------
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { id: req.params.userId },
      { $set: req.body },
      {
        runValidators: true,
        new: true
      }
    )
      .then((user =>
        !user
          ? res.status(404).json({ message: 'There is no user with this id!' })
          : res.json(user)
      )
      )
      .catch((err) => res.status(500).json(err));
  },

  
  // ------------------ Delete a user and all their thoughts -----------------
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : User.findOneAndUpdate(
            { users: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
          )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
            message: 'User was deleted, but no thoughts were found',
          })
          : res.json({ message: 'User was successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  // --------------- Add Someone -----------
  addSomeone(req, res) {
    console.log('You are adding someone');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { someone: req.params.someoneId } },
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user was found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },


  // -------------- Remove Someone ------------
  removeSomeone(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { someone: req.params.someoneId } },
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user was found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};