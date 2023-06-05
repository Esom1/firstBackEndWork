const express = require('express');

const app = express()
const PORT = 8080

// config ejs
app.set ('view engine', 'ejs')

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

app.use((req,res)=>{
  res.status(404).render('404', {title: 'Ejs error page'})
})

// server

app.listen(PORT,()=>{
  console.log(`server up and running on port ${PORT}`);
})