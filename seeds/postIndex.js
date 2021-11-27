const mongoose=require('mongoose');
const User=require('../models/user');
const Feedpost=require('../models/feedpost')
const{descriptors,suffix,restaurants}=require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/foodo-app',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connection open')
})


const usersSample =[
      "61a12525618e62611b56f2a9",
      "61a12525618e62611b56f2aa",
      "61a12525618e62611b56f2ab",
];


const seedDB= async ()=>{
    await Feedpost.deleteMany({});

    for(let i=1;i<=20;i++){
        const desc=descriptors[Math.floor(Math.random()*descriptors.length)];
        const suff=suffix[Math.floor(Math.random()*suffix.length)];
        const location=restaurants[Math.floor(Math.random()*restaurants.length)];

        const author=usersSample[Math.floor(Math.random()*3)];
        const rating=1+ Math.floor(Math.random()*5);
        const post=new Feedpost({
            title: desc+" "+suff,
            location,
            author,
            rating,
            likes:Math.floor(Math.random()*50),
            post: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
            ,
            image:"https://source.unsplash.com/collection/8613861",
        })

        await post.save();
    }
}

seedDB();

