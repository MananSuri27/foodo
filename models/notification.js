const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const timestamps = require('mongoose-timestamp');


const NotificationSchema=new Schema({
    type:{
        type:String,
        enum:['commented' , 'liked']
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:'Feedpost'
    },
    person:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})


NotificationSchema.plugin(timestamps);

module.exports=mongoose.model('Notification', NotificationSchema);

