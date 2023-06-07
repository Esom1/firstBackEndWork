const Trainees = require('../model/todoModel')


const todos_create = (req,res)=>{
  console.log(req.body);
  const savedTrainees = new Trainees (req.body);
  savedTrainees.save().then(result=>{
    res.redirect('/todos');
  })
  .catch((err)=>{
    console.log(err);
  });

}
const todos_specific = (req,res)=>{
  const id = req.params.id;
  // console.log(req.body);
 Trainees.findById(id).then((result)=>{
  res.render('details',{trainees: result,title:'ejs details'})
 })
 
}

const todos_delete = (req,res)=>{
  const id = req.params.id;
  Trainees.findByIdAndDelete(id).then ((result)=>{
    res.redirect('/todos')
  })
}
const todos_edit = (req,res)=>{
  const id = req.params.id;
  Trainees.findByIdAndUpdate(id).then ((result)=>{
    res.redirect('/todos')
  })
}
const todos_createList = (req,res)=>{
  res.render('createlist',{ title:'Ejs create-todo Page'})
}







module.exports = {
  todos_create,
  todos_specific,
  todos_delete,
  todos_edit,
  todos_createList
}