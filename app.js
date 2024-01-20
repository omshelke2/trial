const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("localData"));



app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})


app.post("/",function(req,res){
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const email = req.body.email;

    // console.log(fname);
    // console.log(lname);
    // console.log(email);
    
    
    const edata = {
        members:[
            {
                "email_address":email,
                "status":"subscribed",
                "merge_fields":{
                    "FNAME":fname,
                    "LNAME":lname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(edata);
    const url = "https://us21.api.mailchimp.com/3.0/lists/f3887f19d1";
    const options = {
        method: "POST",
        auth: "omkar:a7fbf8357e0620d1708f38d3ee851023-us21"
    }
 
    const request = https.request(url,options,function(response){
        if (response.statusCode==200) {
            res.sendFile(__dirname+"/success.html");
        } else{
            res.sendFile(__dirname+"/failure.html");
        }



        // response.on("data",function(data){
        //     //const parsedData = JSON.parse(data);
        //     const webStatus = response.statusCode;
        //     console.log(webStatus);
        //     if (webStatus==200) {
        //         res.sendFile(__dirname+"/success.html");
        //     }
        // })
    
    })

    request.write(jsonData);
    request.end(); 
    // res.sendFile(__dirname+"/success.html");
      
})

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
    console.log("Listening Port 3000");
})



//API
//a7fbf8357e0620d1708f38d3ee851023-us21

//Audience ID
//f3887f19d1.

//url
//https://<dc>.api.mailchimp.com/3.0/