const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const timestamps = require('mongoose-timestamp');


const CommentSchema=new Schema({
    author: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    comment:String
})

CommentSchema.plugin(timestamps)

module.exports=mongoose.model('Comment', CommentSchema)