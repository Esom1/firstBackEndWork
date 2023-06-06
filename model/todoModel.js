// require mongoose 
// from mongoose we use a method which is schema(this defines the structure of the document we would store in a collection, its the thin thatr wraps sround ,note the S in the schems is capitalised)

const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const tranineeSchema = new Schema({
  name : {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  }

},{timestamps:true})
// lets create our model(model is what surrrounds the Schema and provides us with an interface by which we communicate with DB)

const Trainees = mongoose.model('Trainee', tranineeSchema)

module.exports = Trainees
