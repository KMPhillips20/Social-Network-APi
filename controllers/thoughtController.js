

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
};
