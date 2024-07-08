const express = require("express");
const app = express();
const path = require("path");
const mysql = require('mysql2');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

const { faker } = require('@faker-js/faker');

app.use(methodOverride('_method')) // override with POST having ?_method=PATCH and DELETE

app.use(express.urlencoded({extended :true})); // for post method

app.set("view engine", "ejs"); //to set ejs template
app.set("views", path.join(__dirname, "/views")); // for parent directory

app.use(express.static(path.join(__dirname, "/public/css"))); // for static file eg. css and js
app.use(express.static(path.join(__dirname, "/public/js"))); 


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Hassam@5024",
    database: 'company'
  });


//   let getFakeData = () => {
//         return [
//             faker.string.uuid(),
//             faker.internet.userName(),
//             faker.internet.email(),
//             faker.number.int(100000)
//         ]  
//     }


//     let data = [];
//     for(let i=1; i<=100; i++) {
//         data.push(getFakeData());
//     }

//     let q = `INSERT INTO employee (id, name, email, salary) VALUES ?`;
//    try {
//         connection.query(q, [data], (err, results) => {
//             if(err) throw err;
//             console.log(results);
//         })
//    }catch(err) {
//     console.log("some error in DB");
//    }




//   try {
//     connection.query("SHOW TABLES", (err, result) => {
//         if(err) throw err;
//         console.log(result);
//     })
//   }catch(err) {
//     console.log("some error in DB");
//   }
//   connection.end();



app.get("/employee", (req, res) => {
   
    let q = `SELECT count(*) AS count FROM employee`;
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let count = result[0].count;
            res.render("index.ejs", {count});
              
        });
    }catch(err) {
        res.send("some error in DB");
    }

   
});

app.get("/employee/show", (req, res) => {
    let q = `SELECT * FROM employee`;
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let employees = result;
            res.render("show.ejs", {employees});
        })
    }catch(err) {
        res.send("some error in DB");
    }

   
});

app.get("/employee/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/employee/show", (req, res) => {
    let id = uuidv4();
    let {name, email, salary} = req.body;
    console.log(name, email, salary);
    let q = `INSERT INTO employee (id, name, email, salary) Values ("${id}", "${name}","${email}", "${salary}")`;
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            console.log(result);
            console.log("New Record Added");
            res.redirect("/employee/show");
        });
    }catch(err) {
        res.send("some error in DB");
    }
})


app.get("/employee/:id/edit", (req, res) => {
    let {id} = req.params;
    let q = `SELECT * FROM employee WHERE id="${id}"`;
   try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let employee = result[0];
            res.render("edit.ejs", {employee});
            
        });
   }catch(err) {
    res.send("some error in DB");
   }
    

});

app.patch("/employee/:id", (req, res) => {
    let {id} = req.params;
    let {name , salary} = req.body;
    let q = `SELECT * FROM employee WHERE id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let employee = result[0];
            if(employee.salary != salary) {
                res.send("WRONG salary entered!");
            }else {
                let q2 = `UPDATE employee SET name="${name}" WHERE id='${id}'`;
                connection.query(q2, (err, result) => {
                    if(err) throw err;
                    else {
                        console.log(result);
                        console.log("Updated");
                        res.redirect("/employee/show");
                    }
                       
                    
                });
            }
        });
    }catch(err) {
        res.send("some error in DB");
    }
    
});

app.get("/employee/:id/delete", (req, res) => {
    let {id} = req.params;
    let q = `SELECT * FROM employee WHERE id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let employee = result[0];
            res.render("delete.ejs", {employee});
    
        })
    }catch(err) {
        res.send("some error in DB");
    }
    
});

app.delete("/employee/:id", (req, res) => {
    let {id} = req.params;
    let {salary} = req.body;
    let q = `SELECT * FROM employee WHERE id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let employee = result[0];
            if(employee.salary != salary) {
                res.send("WRONG salary entered");
            }else {
                let q2 = `DELETE FROM employee WHERE id="${id}"`;
                connection.query(q2, (err, result) => {
                    if(err) throw err;
                    console.log(result);
                    console.log("Deleted");
                    res.redirect("/employee/show");
                })
            }
        })
    }catch(err) {
        res.send("some error ind DB");
    }
})


app.listen(8080, () => {
    console.log(`Server is listening on 8080`);
})