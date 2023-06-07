const express = require('express')
const router = express.Router();
const Trainees = require('../model/todoModel')
const todosControllers = require('../controler/todosControler')


router.get('/', async(req,res)=>{
  try{
    const allTrainees = await Trainees.find()
    res.render('index' , {title: 'EJS Home Pages', trainees: allTrainees})
    // res.send(allTrainees)
  }catch(err){
    console.log(err);
  }
})

// for the form 
router.post ('/',todosControllers.todos_create);


// and for getting specific items using params
router.get('/specific/:id',todosControllers.todos_specific)

router.get('/delete/:id', todosControllers.todos_delete)

router.get('/edit/:id',todosControllers.todos_edit)

router.get('/create',todosControllers.todos_createList)

module.exports = router