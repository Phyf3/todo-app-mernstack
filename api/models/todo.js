const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    text : {type : String, required : true},
    complete : {type : Boolean, default : false },
    timestamp : {type : String, default: Date.now()}
}, 
    { collection: 'tasks'}
)

// Compile model from schema
const model = mongoose.model('TodoSchema', TodoSchema);

module.exports = model;