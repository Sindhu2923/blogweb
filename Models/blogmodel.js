const mongoose = require('mongoose');
const marked = require('marked')
const slugify = require('slugify');


const schema = new mongoose.Schema({


    title : {
        type : String,
        required : true 
    },
    description : {
        type : String ,
        required : true
    },
    content : {
        type : String ,
        required : true
    },
    createdat : {
        type : Date,
        default : Date.now
    },
    slug : {
        type : String, 
        required : true,
        unique : true
    }

})


schema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title,{lower:true , strict : true})
    }
    next()
})


const model = mongoose.model('blogdatas',schema);

module.exports = model ;