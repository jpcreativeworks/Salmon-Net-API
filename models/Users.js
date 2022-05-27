const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Assignment');

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
        ref:'Thought'
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

module.exports = User;
