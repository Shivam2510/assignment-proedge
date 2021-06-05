const express = require("express");
const http = require('http'),   https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


let Results = [];

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
  var rollNumber = req.body.rollNumber;
  console.log(rollNumber);

  var rollNumberSplit = rollNumber.split(",");
  rollNumberSplit = rollNumberSplit.map(function (val) { return +val + 1; });
  console.log(rollNumberSplit);

  for(var i =0;i<rollNumberSplit.length;i++){
    const url = "http://proedge.me/test.php?rollnumber="+rollNumberSplit[i];
    http.get(url,function(response){
      response.on("value",function(value){

        Results.push(value);
        console.log(value);
      })
    })
  }
    res.send("hello");
})

app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
