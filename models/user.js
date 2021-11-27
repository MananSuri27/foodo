const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true       
    },
    email:{
        type:String,
        // required:true,
        unique:true
    },
    about:String,
    // followed:{ array of users
    // },
    notifications:{
        type:Schema.Types.ObjectId,
        ref:'Notification'
    },
    followercount:Number,
    dp:String
});

module.exports=mongoose.model('User', UserSchema)