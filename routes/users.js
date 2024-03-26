const express =require('express');
const router = express.Router();
const fs = require('fs').promises;

const filePath = require('../database.json');

//Middlewares
router.use(express.json());
router.use(express.urlencoded({extended: true}));
router.use(async (req,res, next)=>{
    try{
        const data = await ReadData();

        /* We create a userData variable with the database.json stored in it.
        the red.locals.userData makes it available anywhere in the view */


        res.locals.userData = Json.parse(data);
    }catch(error){

        next();

        res.status(500).send("Internal Server Error:", error);

    }   

});

//High-level function for writting to the data
async function readData(data){

    try{

        //JSON.stringify is used for formatting the JSON data

        const data =await fs.WriteFile(filePath, JSON.stringify(data, null, 2));
    }catch(error){
        res.status(500).send("Internal Server Error:", error);
        

    }
}

router.get('/', (req, res) =>{
    const data = res.locals.userData;
    res.render('home', {data});
});

module.exports = router;