const { Schema, model } = require('mongoose');


const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {

        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt:{
            type:Date,
            default:Date.now,
            
        },
        userName: {
            type: String,
            required: true,               
        },
        reactions: [reactionSchema]
    },
    {
        toJSON:{
            getters: true
        } 
    }

)
thoughtSchema.virtual('reactionsCount').get( function() {
    return this.reactions.length
})

const Thoughts = model('Thought', thoughtSchema);
const Reaction = model('Reaction', reactionSchema);
module.exports = Thoughts;