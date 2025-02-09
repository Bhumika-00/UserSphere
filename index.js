const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sigma_app',
    password:'Bhuika@12345',
  });

  let getRandomUser=()=> {
    return [
      faker.string.uuid(),
      faker.internet.username(), 
      faker.internet.email(),
      faker.internet.password(),
    ];
  }

app.get("/" , (req, res)=>{
    let q = `SELECT COUNT(*) FROM userss`;
    try{
        connection.query(q , (err , result)=>{
            if(err) throw err;
            let count = result[0]['COUNT(*)']
            
            res.render("home.ejs", { count });

        })
    }
    catch(err){
        console.log(err);
        res.send("some error");
    }
});

app.get("/user" , (req , res)=>{
   let q = `SELECT * FROM userss`;
   try{
    connection.query(q , (err , users)=>{
        if(err) throw err;
        
        res.render("user.ejs" , {users});

    })
}
catch(err){
    console.log(err);
    res.send("some error");
}
});

app.get("/user/:id/edit" , (req , res)=>{
   let {id} = req.params;
   let q = `SELECT * FROM userss where id = '${id}'`;
   try{
    connection.query(q , (err , result)=>{
        if(err) throw err;
        let user = result[0];
        res.render("edit.ejs" , {user});

    })
}
catch(err){
    console.log(err);
    res.send("some error");
}
});

app.patch("/user/:id" , (req , res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM userss where id = '${id}'`;
    let {password:formpass , username: newUsername} = req.body;
   try{
    connection.query(q , (err , result)=>{
        if(err) throw err;
        let user = result[0];
        if(formpass != user.password) 
        {
            res.send('Wrong Pssword');
        }
        else{
            let q2 =`UPDATE userss SET username='${newUsername}' where id = '${id}'`;
            connection.query(q2 , (err , result)=>{
                if(err) throw err;
                res.redirect("/user");
            })
        }
    
    })
}
catch(err){
    console.log(err);
    res.send("some error");
}
});

app.get("/user/new", (req, res) => {
    res.render("new.ejs");
  });
  
  app.post("/user/new", (req, res) => {
    let { username, email, password } = req.body;
    let id = uuidv4();
   
    let q = `INSERT INTO userss (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        console.log("added new user");
        res.redirect("/user");
      });
    } catch (err) {
      res.send("some error occurred");
    }
  });

  app.get("/user/:id/delete", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM userss WHERE id='${id}'`;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
        res.render("delete.ejs", { user });
      });
    } catch (err) {
      res.send("some error with DB");
    }
  });

  app.delete("/user/:id/", (req, res) => {
    let { id } = req.params;
    let { password } = req.body;
    let q = `SELECT * FROM userss WHERE id='${id}'`;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
  
        if (user.password != password) {
          res.send("WRONG Password entered!");
        } else {
          let q2 = `DELETE FROM userss WHERE id='${id}'`; 
          connection.query(q2, (err, result) => {
            if (err) throw err;
            else {
              console.log(result);
              console.log("deleted!");
              res.redirect("/user");
            }
          });
        }
      });
    } catch (err) {
      res.send("some error with DB");
    }
  });
  

const port = 8080;
app.listen(port , ()=>{
    console.log(`The app is listening at ${port}`);
})