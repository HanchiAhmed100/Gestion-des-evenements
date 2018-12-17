let connection = require('../Config/Db')
const bcrypt = require("bcrypt")
let jwtUtils = require('../Secret/jwt.utils.js')
class Users {

    constructor(row) {
		this.row = row
    }

    static AddUser(firstname,lastname,body,mail,password,callback){
        
        
        // first we need to hash the password
        let password = hashPassword(req.body.password)
        
        const sql = "INSERT INTO users (first_name,last_name,mail,password) VALUES ?"
        const values = [[firstname,lastname,phone,mail,password,region,callback]]
        connection.query(sql,[values],(err, result) => {
            if(err) {
                callback({
                    "message": "Erreur"
                })
            }
            callback({
                "message": "user created"
            })
        })
        
    }
    static AddClient(firstname,lastname,phone,mail,password,region,callback){
        
        // first we need to hash the password
        let password = hashPassword(req.body.password)

        const sql = "INSERT INTO clients (first_name,last_name,phone,mail,password,region) VALUES ?"
        const values = [[firstname,lastname,phone,mail,password,region,callback]]
        connection.query(sql,[values],(err, result) => {
            if(err) {
                callback({
                    "message": "Erreur"
                })
            }
            callback({
                "message": "Client created"
            })
        })
    }

  
    static LoginUser(mail,password,callback){
        const sqlSelectEmail = "SELECT * FROM users WHERE mail=?"
        const values = [
            [mail]
        ]

        connection.query(sqlSelectEmail, [values], (err,result) => {
            if(err) {
                callback({
                    "message": "error on selecting"
                })
            }

            if(result.length == 0) {
                callback ({
                    "message": "Wrong credentials"
                })
            }else {
                // check  the password if correct or not
                if(bcrypt.compareSync(password, result[0].password)) {
                    // generate a token
                    // payload contain user id
                    const token = jwtUtils.generateTokenForUser(result[0].id+"")
                    callback({
                        "message": "success...",
                        "id": result[0].id,
                        "token": token
                    })

                }else {
                    callback({
                        "message": "Wrong credentials"
                    })
                }
            }
            
        })
    }

    static ClientLogin(mail,password,callback){

    // select nom fro exemple to make sure that user is exist
    const sqlSelectEmail = "SELECT * FROM clients WHERE mail=?"
    const values = [
        [mail]
    ]

    connection.query(sqlSelectEmail, [values], (err,result) => {
        if(err) {
            return res.json(502, {
                "message": "error on selecting"
            })
        }

        if(result.length == 0) {
            callback ({
                "message": "Wrong credentials"
            })
        }else {
            // check  the password if correct or not
            if(bcrypt.compareSync(password, result[0].password)) {
                // generate a token
                // payload contain user id
                const token = jwtUtils.generateTokenForUser(result[0].id+"")
                callback({
                    "message": "success...",
                    "id": result[0].id,
                    "token": token
                })

            }else {
                callback({
                    "message": "Wrong credentials"
                })
            }
        }
        
    })
    }
    
} 
module.exports = Users