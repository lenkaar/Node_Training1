var express = require('express');
var http = require('http');
const path = require('path');
var bodyParser = require('body-parser')
var mysql = require('mysql');
const { log } = require('console');

var app = express();
app.use(bodyParser.json({

    limit: '50mb'

}));



app.use(bodyParser.urlencoded({

    limit: '50mb',

    extended: true

}));



app.use(bodyParser.json({

    type: 'application/vnd.api+json'

}));


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database:"newdata"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.set('port',process.env.PORT || 3000);
var server = http.createServer(app);

app.get('/',function(req,res){
    res.render(__dirname + '/pages/login.html');
})

app.get('/index',function(req,res){
    res.render(__dirname + '/pages/index.html');
})

app.get('/stud_tab',function(req,res){
    res.render(__dirname + '/pages/stud_tab.html');
})

app.post("/adduser",function(req,res){
    console,log(req)
    let username = req.body.username;
    let userpassword = req.body.userpassword;
    let userotp = req.body.userotp;
    console.log({username})
    console.log({userpassword})
    console.log({userotp})
    var sql = "INSERT INTO user (UserName, UserPassword,UserOTP) VALUES ('"+username+"','"+userpassword+"','"+userotp+"')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.sendStatus(200)
  });
}

);

app.post("/deleteuser",function(req,res){
    let username = req.body.username;

        var sql = "DELETE FROM user WHERE UserName = '"+username+"'";
        con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        res.sendStatus(200)
        });
    });

    app.post("/updateuser",function(req,res){
        let username = req.body.username;
    
            var sql = "UPDATE user SET UserName = '"+username+"' WHERE UserName = 'raghab'";
            con.query(sql, function (err, result) {
                 if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");
                    res.sendStatus(200)
            });
        });


var arr = [{name:'amiya',password:'@12345'}, {name:'1',password:'@12345'}, {name:'2',password:'@12345'}]

app.post('/login',function(req,res){
    // console.log({req});

    console.log(req.body.uname);
    console.log(req.body.password);

    var username = req.body.uname
    var pasword = req.body.password

    if (username !== undefined && username !== 'undefined' && username.length !== 0 && username!== '' && 
    pasword !== undefined && pasword !== 'undefined' && pasword.length !== 0 && pasword!== ''){

        function loop(i) {

            console.log(`${arr.length}`);

            if (i < arr.length) {

                if (username === arr[i].name && pasword === arr[i].password) {
                    console.log(`Data validated successfully`);
                    res.sendStatus(200);
                }
                else {
                    i++;
                    loop(i);
                }
            }
            else {
                res.sendStatus(501);
            }
        }
        loop(0);
    }else {
        console.log(`Error: data is undefined`);
        res.sendStatus(500);// server responded with error status of 500
    }

})


app.set('views',__dirname+'/public');
app.use(express.static(path.join(__dirname,'public')));
console.log(__dirname)
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

//-------------------------
server.listen(app.set('port'),'0.0.0.0',function(){
    console.log('Express server listening on port'+app.get('port'));
});