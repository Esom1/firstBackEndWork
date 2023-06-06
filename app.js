const express = require('express');
const mongoose = require('mongoose')
const Trainees = require('./model/todoModel')

const app = express()
const port = process.env.PORT||8080

// config ejs
app.set ('view engine', 'ejs')
require('dotenv').config()


// custom middle ware
// how to make a request move from page to page it is called a middle ware
// app.use((req,res,next)=>{
//   console.log('a request was just made');
//   console.log(req.method);
//   console.log(req.path);
//   next()
// })
app.use(express.static('public'))

// mongoose connection
mongoose.connect(process.env.DBURL)
.then(()=>console.log('DB connected successfully'))

// TESTING THE MODEL AND DB
app.get('/add-trainee',(req,res)=>{
  const TRAINEES = new Trainees({
    name : 'Christy',
    profession : 'senior dev',
    description : 'she is a good coder'
  })
  TRAINEES.save()
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err);
  })
})
// routes
const trainees = [
  {name:'Christy', profession: 'front-end-dev'},
  {name:'ejiro', profession: 'back-end-dev'},
  {name:'john', profession: 'mobile app-dev'},
  {name:'henry', profession: 'desktop-dev'}
]

app.get ('/',(req,res)=>{
  res.render('index' , {title: 'EJS Home Pages', trainees})
})

app.get ('/about',(req,res)=>{
  res.render('about' , {title: 'EJS About Pages', trainees})
})

app.get('/todo/create',(req,res)=>{
  res.render('createList',{ title:'Ejs create-todo Page'})
})

app.use((req,res)=>{
  res.status(404).render('404', {title: 'Ejs error page'})
})

// server

app.listen(port,()=>{
  console.log(`server up and running on port ${port}`);
})