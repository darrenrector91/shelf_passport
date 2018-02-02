const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const ItemSchema = new Schema({

  person: [{type: mongoose.Schema.ObjectId, ref: 'Person'}], //items is the collection name we are referencing. 
  description: {
      type: String,
      required: true,
  },
  url: String


});

const PersonSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

// Combined both schemas into one for easier tracking, when comparing to notes of class.

module.exports = {
  
  person: mongoose.model('Person', PersonSchema),
  item: mongoose.model('Item', ItemSchema)

}

//mongoose.model('Person', PersonSchema, ADD SOMETHING HERE TO DEFINE COLLECTION NAME);
