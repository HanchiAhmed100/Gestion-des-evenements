const express = require("express")
const bcrypt = require("bcrypt")
const connection = require("../Config/Db")
const router = express.Router()

router.get('/',(req,res)=>{
    connection.query("SELECT * from events order by date desc",[],(err,row)=>{
        if(err) throw err

        if(row.length == 0) {
            return res.json(401, {
                "message": "Table vide"
            })
        }
        else{
            return res.json(200, {
                "events": row,
            })
        }
    } 
)
})

router.post("/",(req,res)=>{

        date = new Date();    
        let sql="INSERT INTO events (name,description,max,date,phone,region) values ?"
        const values = [
            [req.body.name,req.body.description,req.body.max,date,req.body.phone,req.body.region]
        ]
        connection.query(sql,[values],(err, result) => {
            if(err) {
                return res.json(502, {
                    "message": "error on inserting"
                })
            }
    
            res.json(201, {
                "message": "event created"
            })
        })
        
    })

    
router.get("/:region",(req,res)=>{

    connection.query("SELECT * from events where region = ? order by date desc",[ req.params.region ],(err,row)=>{
    if(err) throw err
        if(row.length == 0) {
            return res.json(401, {
                "message": "Table vide"
            })
        }
        else{
            return res.json(200, {
                "events": row,
            })
        }
    })

})

    
router.get("/:date",(req,res)=>{

    connection.query("SELECT * from events where date = ? order by date desc",[ req.params.date ],(err,row)=>{
    if(err) throw err
        if(row.length == 0) {
            return res.json(401, {
                "message": "Table vide"
            })
        }
        else{
            return res.json(200, {
                "events": row,
            })
        }
    })

})

router.get("/count/:region", (req,res)=>{
    connection.query("SELECT count(*) as count from events where region = ? group by region",[ req.params.region ],(err,rows)=>{
        if(err) throw err
            if(rows.length == 0) {
                return res.json(401, {
                    "message": "Table vide"
                })
            }
            else{
                
                connection.query("SELECT  * from events where region = ? order by date desc",[ req.params.region ],(err,row)=>{
                    if(err) throw err
                        if(row.length == 0) {
                            return res.json(401, {
                                "message": "Table vide"
                            })
                        }
                        else{
                            return res.json(200, {
                                "events": row,
                                "number": rows
                            })
                        } 
                    })
            }
        })
    
    })

module.exports = router;
