var express = require('express');
var exp = express();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var mysql = require('mysql');
var middleware = require('middleware');

exp.use('/public', express.static('public'));

exp.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

exp.post('/add_data', urlencodeParser, function(req, res) {
  var con = mysql.createConnection({
    host: "82.200.170.122",
    port: "3306",
    user: "testuser",
    password: "qwerty123123",
    database: "test"
  });
//
  var sql = "INSERT INTO users (first_name_ru, last_name_ru, age) VALUES (?,?,?)";
  con.query(sql, [req.body.name1, req.body.name2, req.body.name3], function(err, result, fields) {
    if (err) res.send(err);
  //  res.send('it`s ok!');
  });
})


exp.post('/delete_data', urlencodeParser, function(req, res) {
  var con = mysql.createConnection({
    host: "82.200.170.122",
    port: "3306",
    user: "testuser",
    password: "qwerty123123",
    database: "test"
  });
  var sql = "delete from users where id = rekt" ;
  con.query(sql, function(err, result, fields) {
    if (err) res.send(err);
  //  res.send('it`s ok!');
  });
})


exp.get('/add', function(req,res){
  res.sendFile(__dirname + '/add.html');
});

exp.get('/delete', function(req,res){
  res.sendFile(__dirname + '/delete2.html');
});

exp.get('/data', function(req, res) {
  var con = mysql.createConnection({
    host: "82.200.170.122",
    port: "3306",
    user: "testuser",
    password: "qwerty123123",
    database: "test"
  });

  con.query("SELECT * FROM users", function(err, result, fields) {
    if (err) throw err;

    data = {
      'data': []
    };
    result.forEach(function(entry) {
      hh = [entry.id,  entry.first_name_ru, entry.last_name_ru, entry.age];
      data.data.push(hh);
    });

    res.send(data);
  });

})





exp.listen(3000);
console.log('OK LISTEN 3000 good ok');
