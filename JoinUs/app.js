var express = require('express');
var mysql = require('mysql2');
var app = express();
var bodyParser = require("body-parser")

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'join_us'
});



app.get("/", function (req, res) {
    // find count of users in the DB
    con.query('SELECT COUNT(*) AS count FROM users', function (error, results) {
        if (error) throw error;
        console.log(results)
        var count = results[0].count
        res.render("home", { data: count })
        console.log("finished")
    });
})



app.get("/joke", function (req, res) {
    console.log("request joke")
    var joke = "HAHAHA"
    res.send(joke)
})

app.get("/random_num", function (req, res) {
    var num = Math.floor(Math.random() * 10) + 1;
    res.send("random num is: " + num)
})

app.post("/register", function (req, res) {
    var person = {
        email: req.body.email
    }
    if (person.email.length != 0 && person.email.includes("@") && person.email.includes(".com")) {
        con.query('INSERT INTO users SET ?', person, function (error, results, fields) {
            if (error) throw error;
            res.redirect("/")
        });
    }
})

app.listen(8080, function () {
    console.log("Server running on port 8080")
})