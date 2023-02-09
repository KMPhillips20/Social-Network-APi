const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought'
    }],
  },
  {
    toJSON: {
     virtuals: true,
    },
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
