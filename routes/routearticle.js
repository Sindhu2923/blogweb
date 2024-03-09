const express = require('express');
const blogmodel = require('../Models/blogmodel')
const router = express.Router();


router.get('/new', (req,res) => {
    res.render('new')
})  
  

router.get('/:id', async (req,res) => {
    const findarticle = await blogmodel.findById(req.params.id)

    if(findarticle == null){
        res.redirect('/')
    }
    res.render('show',{article : findarticle });
})

 
router.get('/edit/:id', async (req,res) => {
    const findarticle = await blogmodel.findById(req.params.id)

    if(findarticle == null){
        res.redirect('/')
    }
    res.render('edit',{article : findarticle });
})
 


router.post('/', async (req,res) => {

    try{
    const {title , description , content } =req.body ;

    const createdat = new Date();

    const article = new blogmodel({
        title,
        description,
        content,
        createdat
    })

        await article.save();

        res.redirect(`/articles/${article.id}`);
    }
    catch(error){

        console.log(error);
        res.render('new',{article : article});

    }
    
})
  


router.post('/:id', async (req,res) => {
    
    try{
    const {title , description , content } =req.body ;

    const id = req.params.id ;
    
    const createdat = new Date();

    const article = await blogmodel.findByIdAndUpdate(id,{
        title,
        description, 
        content,
        createdat
    })

        // await article.save();

        res.redirect(`/articles/${article.id}`);
    }
    catch(error){
        console.log(error);
       
    }
    
})


router.delete('/:id' , async (req,res) => {
    const darticle = await blogmodel.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

 
module.exports = router 