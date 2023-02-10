

const { Thought, User } = require('../models');


module.exports = {
  // ------------ Get All Thoughts --------------
  getThoughts(req, res) {
    Thought.find()
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // --------- Get Thought -----------
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'There are no thoughts with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // ----------- Create Thought -------------
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        console.log(thought)
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          {
            runValidators: false,
            new: true
          }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
            message: 'A thought has been created, but no user with ID how been found',
          })
          : res.json('Thought was created!')
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


  //------------ Delete Thought -------------
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'There is no thought with that ID' })
          : Expression.deleteMany({ _id: { $in: thought.reactions } })
      )
      .then(() => res.json({ message: 'Thought and reaction was deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  //----------  Update Thought ---------------
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },


  // ----------- Create Reaction ----------------
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'There is no thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      });
  },


  //  --------------- Delete Expression -------------
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'There is no thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      });

  },
}
