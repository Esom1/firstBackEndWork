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
    name : 'sam',
    profession : 'seniorfrontend  dev',
    description : 'he is a good coder'
  })
  TRAINEES.save()
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err);
  })
})


// either use this below or use the one above.they do the same work.
// try{
//   const savedTrainees = await TRAINEES.save()
// res.send (savedTrainees)
// }catch(err){
  // console.log(err)
// }
// })

// for getting all info froo the DB
// app.get('/all-trainees',(req,res)=>{
//   Trainees.find()
//   .then((results)=>{
//     res.send(results)
//   })
//   .catch((err)=>{
//     console.log(err);
//   })
// })




// this method is used to find all trainees
app.get('/all-trianees',async(req,res)=>{
  try{
    const allTrainees = await Trainees.find()
    res.send(allTrainees)
  }catch(err){
    console.log(err);
  }
})

// to get a single trainee
// app.get('/single-trainee',(req,res)=>{
//   Trainees.findById('647f06ac4c042dacf14662e5')
//   .tehn((result)=>{
//     res.send(result)
//   })
//   .catch((err)=>{
//     console.log(err);
//   })
// })



// this method is used to find just a single trainee
app.get('/single-trainee',async(req,res)=>{
try{
  const singleTrainee = await Trainees.findById('647df2e9f15830cf177bb9b5')
  res.send(singleTrainee)
}
catch(err){
  console.log(err);
}
})



// routes
// const trainees = [
//   {name:'Christy', profession: 'front-end-dev'},
//   {name:'ejiro', profession: 'back-end-dev'},
//   {name:'john', profession: 'mobile app-dev'},
//   {name:'henry', profession: 'desktop-dev'}
// ]

app.get ('/',(req,res)=>{
 res.redirect('/todos')
})

app.get ('/about',(req,res)=>{
  res.render('about' , {title: 'EJS About Pages',})
})

// Todo routes
app.get('/todos', async(req,res)=>{
  try{
    const allTrainees = await Trainees.find()
    res.render('index' , {title: 'EJS Home Pages', trainees: allTrainees})
    res.send(allTrainees)
  }catch(err){
    console.log(err);
  }
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