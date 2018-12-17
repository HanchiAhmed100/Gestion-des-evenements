const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const connection = require("../Config/Db")
const router = express.Router()
let jwtUtils = require('../Secret/jwt.utils.js');
let users = require("../Models/Users")

const router = express.Router()


router.post("/users", (req,res) => {
    users.AddUser(req.body.firstname,req.body.lastname,req.body.phone,req.body.mail,req.body.password,req.body.region,function(callback){
        res.send({
            User : callback
        })
    })
})
router.post("/client", (req,res) => {
    users.AddClient(req.body.firstname,req.body.lastname,req.body.phone,req.body.mail,req.body.password,req.body.region,function(callback){
        res.send({
            Client : callback
        })
    })
})

function hashPassword(password) {
    let passwordHashed = bcrypt.hashSync(password,10)
    return passwordHashed
}

module.exports = router;


