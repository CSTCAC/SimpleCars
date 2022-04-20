//-------------------- Declarations ----------------------
const express = require("express");
const path = require("path");
const sqlite = require("./dbinit")
const util = require("./util")
const app = express();
const PORT = process.env.PORT || 80;

//-------------------- Configurations ----------------------
// Server configuration
const db = sqlite.inmem

let playercars = [{
    player1carid: 1,
    player2carid: 1,
    randcarid: 99,
    player1swapcardsremain: 1,
    player2swapcardsremain: 1,
    player1swapsremain: 10,
    player2swapsremain: 10,
    turnsleft: 20
}];

playercars[0].randcarid = util.getRand()


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true})); // <--- middleware configuration

app.use(function (req, res, next) {
    next();
});

// Start Server
app.listen(PORT, () => {
    console.log("Server started (http://localhost:80/) !");
});


//-------------------- Routing ----------------------
// GET / -- this is the home page button
app.get("/", (req, res) => {
    const sql = "select 'a' as 'rec_id', c.* from cars as c where car_id = " + playercars[0].player1carid + " union select 'b' as 'rec_id', d.* from cars as d where car_id = " + playercars[0].player2carid + " union select 'c' as 'rec_id' , e.* from cars as e where car_id = " + playercars[0].randcarid
    db.all(sql, (err, rows) => {
        res.render("index", {
            p1cars: rows[0],
            p2cars: rows[1],
            randcars: rows[2],
            players: playercars[0]
        });
    });
});


app.get("/selectCarPlayer1", (req, res) => {
    playercars[0].player1carid = playercars[0].randcarid
    playercars[0].player1swapsremain = playercars[0].player1swapsremain - 1
    const sql = "select * from cars where car_id = " + playercars[0].player1carid
    db.get(sql, (err, rows) => {
        res.set({'HX-Trigger': 'nextturn'});
        res.render("./includes/p1car", {
            p1cars: rows,
            players: playercars[0]
        });
    });
});

app.get("/selectCarPlayer2", (req, res) => {
    playercars[0].player2carid = playercars[0].randcarid
    playercars[0].player2swapsremain = playercars[0].player2swapsremain - 1
    const sql = "select * from cars where car_id = " + playercars[0].player2carid
    db.get(sql, (err, rows) => {
        res.set({'HX-Trigger': 'nextturn'});
        res.render("./includes/p2car", {
            p2cars: rows,
            players: playercars[0]
        });
    });
});

app.get("/nextturn", (req, res) => {
    playercars[0].turnsleft = playercars[0].turnsleft - 1
    playercars[0].randcarid = util.getRand()
    const getNewRandCar = "Select * from cars where car_id=?"
    res.set({'HX-Trigger': 'refresh'});
    db.get(getNewRandCar, playercars[0].randcarid, (err, row) => {
        res.render("./includes/newcar.ejs", {
            randcars: row,
            players: playercars[0]
        });
    });
});

app.get("/menu", (req, res) => {
    res.render("./includes/menus.ejs", {
        players: playercars[0]
    });
});

app.get("/restart", (req, res) => {
    playercars[0].player1carid = 1
    playercars[0].player2carid = 1
    playercars[0].randcarid = 99
    playercars[0].player1swapcardsremain = 1
    playercars[0].player2swapcardsremain = 1
    playercars[0].player1swapsremain = 10
    playercars[0].player2swapsremain = 10
    playercars[0].turnsleft = 20
    res.redirect("/");
});


app.get("/swapPlayer1", (req, res) => {
    playercars[0].player2carid = playercars[0].randcarid
    playercars[0].player1swapcardsremain = playercars[0].player1swapcardsremain - 1
    const sql = "select * from cars where car_id = " + playercars[0].player2carid
    db.get(sql, (err, rows) => {
        res.set({'HX-Trigger': 'nextturn'});
        res.render("./includes/p2car", {
            p2cars: rows,
            players: playercars[0]
        });
    });
});


app.get("/swapPlayer2", (req, res) => {
    playercars[0].player1carid = playercars[0].randcarid
    playercars[0].player2swapcardsremain = playercars[0].player2swapcardsremain - 1
    const sql = "select * from cars where car_id = " + playercars[0].player1carid
    db.get(sql, (err, rows) => {
        res.set({'HX-Trigger': 'nextturn'});
        res.render("./includes/p1car", {
            p1cars: rows,
            players: playercars[0]
        });
    });
});

app.post("/resetgame", (req, res) => {
    const sql = "UPDATE playercars SET player1carid =1, player2carid=1,player1swapcardsremain=1,player2swapcardsremain=1,player1swapsremain=10,player2swapsremain=10,turnsleft=20";
    db.run(sql, [], err => {
        res.redirect("/");
    });
});