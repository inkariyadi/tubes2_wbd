const express = require('express');
const app = express();
const mysql = require('mysql')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "inkinkink",
    database : "wwsupplier",
});

app.get("/",(req,res)=>{
    const sql_insert = "SELECT * FROM bahan;"
    db.query(sql_insert,(err,result)=>{
        res.send("result");
        console.log(result);
        // console.log(err);
        
    });
    // res.send("Hello yey");
});

app.listen(3002,()=>{
    console.log("Server running on 3002");
});