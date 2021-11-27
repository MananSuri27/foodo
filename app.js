const express=require('express');
const app=express();
const path=require('path')
const ejsMate=require('ejs-mate')
const mongoose=require('mongoose');
const Feedpost=require('./models/feedpost')
const User=require('./models/user')
const Comment=require('./models/comment')
const methodOverride=require('method-override')



mongoose.connect('mongodb://localhost:27017/foodo-app',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connection open')
})
.catch(error => console.log(error));


app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(methodOverride('_method'))



app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'))


app.get('/', async (req,res)=>{
    const posts=await Feedpost.find({}).sort({createdAt:-1}).populate(
        'author'
    );
    res.render('timeline/index', {posts})
})


app.post('/post/search', async (req,res)=>{
    const posts=await Feedpost.find({ $text: { $search: req.body.search }}).sort({createdAt:-1}).populate(
        'author'
    );
    res.render('timeline/search', {posts})
})

app.post('/post/:id/comment' , async (req,res)=>{
    const {id} = req.params;
    const {commentBody}=req.body;
    const comment=new Comment({ comment:commentBody , author:"61a12525618e62611b56f2ab"});
    await comment.save();

    const post=await Feedpost.findById(id);
    post.comments.push(comment);
    await post.save();
    res.redirect(`/post/${id}`);
   
})

app.delete('/post/:id/comment/:cid' , async (req,res)=>{
    const {id, cid} = req.params;
    await Feedpost.findByIdAndUpdate(id, {$pull:{comments:cid}});
    await Comment.findByIdAndDelete(cid);

   
    res.redirect(`/post/${id}`);
   
})


app.post('/post' , async(req,res)=>{
    const {post} = req.body;
    const newPost=new Feedpost(post);
    newPost.author= "61a12525618e62611b56f2aa";
    newPost.image="https://source.unsplash.com/collection/8613861";
    await newPost.save();
    res.redirect(`/post/${newPost._id}`);
})

app.get('/post/:id/edit', async (req,res)=>{
    const {id} = req.params;
    const post=await Feedpost.findById(id).populate('author');
    res.render('timeline/edit' , {post})
})

app.get('/post/:id', async (req,res)=>{
    const {id} = req.params;
    const post=await Feedpost.findById(id).populate({
        path:'comments',
        populate:{
            path:'author'
        }
        }).populate('author');
    res.render('timeline/show' ,{ post})
})

app.put('/post/:id', async(req,res)=>{
    const {id}=req.params;
    const {post}=req.body;
    await Feedpost.findByIdAndUpdate(id, {...post})
    res.redirect(`/post/${id}`)
})

app.delete('/post/:id' , async(req,res) =>{
    const {id}=req.params;
    await Feedpost.findByIdAndDelete(id);
    res.redirect('/')
})

app.get('/profile', (req,res)=>{
    res.render('timeline/profile')
})

app.get('/login', (req,res)=>{
    res.render('timeline/login')
})

app.get('/register', (req,res)=>{
    res.render('timeline/register')
})

app.listen(3000, ()=>{
    console.log('serving on port 3000')
})