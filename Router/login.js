const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const connection = require("../Config/Db")
const router = express.Router()
let jwtUtils = require('../Secret/jwt.utils.js');
let users = require("../Models/Users")




router.post("/users", (req,res) => {
    const mail = req.body.mail
    const password = req.body.password
    users.LoginUser(mail,password,function(cb){
        res.send({cb : cb})
    })

})


router.post("/client", (req,res) => {
    const mail = req.body.mail
    const password = req.body.password
    users.ClientLogin(mail,password,function(cb){
        res.send({cb : cb})
    })
})


function generateToken(userId) {
    let token = jwt.sign({payload : userId},jwtUtils, { expiresIn: 60 * 60 })
    return token
}
module.exports = router;












// router.post("/admin", (req,res) => {
//     const mail = req.body.mail
//     const password = req.body.password

//     // select nom fro exemple to make sure that user is exist
//     const sqlSelectEmail = "SELECT * FROM admin WHERE mail=?"
//     const values = [
//         [mail]
//     ]

//     connection.query(sqlSelectEmail, [values], (err,result) => {
//         if(err) {
//             return res.json(502, {
//                 "message": "error on selecting"
//             })
//         }

//         if(result.length == 0) {
//             return res.json(401, {
//                 "message": "Wrong credentials"
//             })
//         }else {
//             // check  the password if correct or not
//             if(bcrypt.compareSync(password, result[0].password)) {
//                 // generate a token
//                 // payload contain user id
//                 const token = jwtUtils.generateTokenForUser(result[0].id+"")
//                 return res.json(200, {
//                     "message": "success...",
//                     "token": token
//                 })

//             }else {
//                 return res.json(401,{
//                     "message": "Wrong credentials"
//                 })
//             }
//         }
        
//     })
// })