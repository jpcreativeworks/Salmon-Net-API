const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thoughts');

// Schema to create Student model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match:[/.+.+\..+/,'Invalid Email']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref:'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref:'User'
    }],
  },
  {
    toJSON: {
      getters: true,
    },
    id:false
  }
);

userSchema.virtual('friendCount').get( function() {
    return this.friends.length
})

const User = model('User', userSchema);
// const Thoughts = model('Thought', thoughtSchema);
module.exports = User;
