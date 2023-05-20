var express = require('express');
var mysql = require('mysql2');
var app = express();

app.set("view engine", "ejs")

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'join_us'
});



app.get("/", function (req, res) {
    // find count of users in the DB
    con.query('SELECT COUNT(*) AS count FROM users', function (error, results,) {
        if (error) throw error;
        var count = results[0].count
        res.render("home", {data: count})
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

app.listen(8080, function () {
    console.log("Server running on port 8080")
})