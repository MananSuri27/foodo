const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var timestamps = require('mongoose-timestamp');
//Update images stuff through cloudinary and imageSchema
const FeedpostSchema=new Schema(
    {
        title:String,
        location:String,
        post:String,
        //Need to update with appropriate schema
        author:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        comments:[
            {
            type:Schema.Types.ObjectId,
            ref:'Comment'
        }
        ],
        likes:[
            {
                type:Schema.Types.ObjectId,
                ref:'User'
            }
        ],
        image:String,
        rating:Number
    }
);

FeedpostSchema.plugin(timestamps);
FeedpostSchema.index({title: 'text', location: 'text', post: 'text' })

module.exports=mongoose.model('Feedpost', FeedpostSchema);