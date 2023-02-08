

const { Thought, User } = require('../models');


module.exports = {
  // ------------ Get All Thoughts --------------
  getThoughts(req, res) {
    Thought.find()
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
};
