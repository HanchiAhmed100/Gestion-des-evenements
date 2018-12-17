const express = require("express")
const bcrypt = require("bcrypt")
const connection = require("../Config/Db")
const router = express.Router()

router.get('/',(req,res)=>{

    feedback.getAllFeedback(function(callback){
        res
    })    
})

module.exports = router;
