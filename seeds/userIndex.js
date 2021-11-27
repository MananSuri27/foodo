const mongoose=require('mongoose');
const User=require('../models/user')


mongoose.connect('mongodb://localhost:27017/foodo-app',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connection open')
})

const user1=new User({
    username:"Somya",
    about:"Life is for tasting, lunch is for eating!",
    followercount:722,
    dp:"https://source.unsplash.com/collection/3678902"
})

const user2=new User({
    username:"Kruti",
    about:"I hate dairy...except butter",
    followercount:140,
    dp:"https://source.unsplash.com/collection/3678902"
})

const user3=new User({
    username:"Charchit",
    about:"Lassi te naan!",
    followercount:123,
    dp:"https://source.unsplash.com/collection/3678902"
})


// const saveUsers= async() =>{
// await user1.save();
// await user2.save();
// await user3.save();
// }

// saveUsers();

// const getUserIDs=async()=>{
//     const users= await User.find();
//     console.log(users);
// }

// getUserIDs();



    //   _id: ("61a12525618e62611b56f2a9"),

    //   _id: ("61a12525618e62611b56f2aa"),

    //   _id: ("61a12525618e62611b56f2ab"),
 