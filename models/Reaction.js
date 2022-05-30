const { Schema, model ,Types} = require('mongoose');
// const dateFormat = require('./utils/dateFormat');

const reactionSchema = new Schema(
{
    reactionId:{ //unique id in mongoose
        type:Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,        
    },
    userName: {
        type: String,
        required: true,               
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get: timerstamp => dateFormat(timerstamp)
    },
},
{
    toJSON:{
        getters:true
    },
    id: false // doing the heavy lifting and making the ids ourselves
}


);

module.exports = reactionSchema; // we are going to use it in the throughts schema, and that is why we aren't making an object for that 
