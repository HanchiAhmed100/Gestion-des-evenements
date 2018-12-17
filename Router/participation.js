const express = require("express")
const bcrypt = require("bcrypt")
const connection = require("../Config/Db")
const router = express.Router()


//get client participation
router.get('/:id',(req,res)=>{
    connection.query("SELECT * from events join participation on participation.event_id = events.id where events.client_id = ? order by events.date desc",[req.params.id],(err,row)=>{
        if(err) throw err

        if(row.length == 0) {
            return res.json(401, {
                "message": "Table vide"
            })
        }
        else{

            connection.query("SELECT * from clients where id = ? ",[row[0].client_id],(err,rows)=>{
                if(err) throw err
                if(row.length == 0) {
                    return res.json(401, {
                        "message": "Table vide"
                    })
                }else{
                    return res.json(200, {
                        "events": row,
                        "client": rows
                    })
                }
            })
        }
    } 
)
})

//get admin all participation 
router.get('/admin',(req,res)=>{

    connection.query("SELECT * from events where order by date desc",[],(err,row)=>{
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


//get user participation
router.get('/user/:id',(req,res)=>{
    connection.query("SELECT * from participation where user_id = ?  order by date desc",[req.params.id],(err,row)=>{
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


//get region participation
// les participation sur toute la region 
router.get('/count/:region',(req,res)=>{
    console.log(req.params.region);
    connection.query("SELECT count(*) as c FROM participation join events on participation.event_id = events.id where events.region = ? ",[req.params.region],(err,row)=>{
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



//get count participation on a evnet
router.get('/count/:event',(req,res)=>{

    connection.query("SELECT count(*) as c FROM participation join events on participation.event_id = events.id where events.name= ?",[req.params.event],(err,row)=>{

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








// else{
//     connection.query("SELECT * from client where order by date desc",[],(err,row)=>{
//         if(err) throw err

//         if(row.length == 0) {
//             return res.json(401, {
//                 "message": "Table vide"
//             })
//         }else{
//             return res.json(200, {
//                 "events": row,
//             })
//         }

// }

// add participation 
    router.post("/",(req,res)=>{
        
        date = new Date();    
        let sql="INSERT INTO participation (user_id,event_id,code_qr,date) values ?"
        const values = [
            [req.body.user,req.body.event,req.body.code,date]
        ]
        connection.query(sql,[values],(err, result) => {
            if(err) {
                return res.json(502, {
                    "message": "error on inserting"
                })
            }
    
            res.json(201, {
                "message": "Participation created"
            })
        })
    })
module.exports = router;
