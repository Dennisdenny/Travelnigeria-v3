var express = require("express");
var app = express();
var bodyParser = require("body-parser"); 
var mongoose = require("mongoose");
var Toursite = require("./models/toursites"),
seedDB = require("./seeds");


seedDB();
// mongoose.connect("mongodb://localhost/travel_nigeria_v3");
mongoose.connect("mongodb://weeveedenny:kakadennis..1@ds127962.mlab.com:27962/travelnigeria");

app.use(bodyParser.urlencoded({ extended: false }));





// Toursite.create({name:"Isaac Boro Park", img:"http://afrotourism.com/wp-content/uploads/2015/06/IsaacBoroGardenPark1.jpg"}, function(err,toursites){
//     if(err){
//         console.log(err);
        
//     } else{
//         console.log(toursites);
//          }
// });


app.set("view engine", "ejs");


app.get("/", function(req, res){
    
    res.render("landing");
});


app.get("/toursites", function(req, res){
    //Get all toursites from DB
    Toursite.find({}, function(err,allToursites){
        if(err){console.log(err);}
        else{
         res.render("toursites", {toursites:allToursites});
        }
    });
    
   
});

app.get("/toursites/new", function(req, res) {
    res.render("new");
});

//Shows more info about one toursite
app.get("/toursites/:id", function(req,res){
    //Find toursite with a particular id
    Toursite.findById(req.params.id).populate("comments").exec(function(err,foundToursite){
        if(err){console.log(err);} 
        else{
            console.log(foundToursite);
            //Show the toursite with the show template
            res.render("show", {toursite:foundToursite});
        }
    });
    
});



app.post("/toursites", function(req, res){
    //push a new tour site into the toursites array
    var name = req.body.name;
    var img = req.body.img;
    var desc = req.body.desc;
    
    var newTourSite = {name : name , img : img, desc : desc};
    
   //Create a new campground and save to DB
    Toursite.create(newTourSite, function(err,toursites){
    if(err){
        console.log(err);
        
    } else{
          //redirect to the toursites page
            res.redirect("toursites");
         }
    });
   
  
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Travelnigeria's Server just started!!");
});