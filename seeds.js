const mongoose = require('mongoose');
const Profile  = require('./models/portfoliomodels');



function seedDB(){
  // Remove old data
  console.log(typeof Profile);
  Profile.remove({},function(err){
    if (err) {
      console.log("Error removing model");
    }else {
      console.log("Removed model");
    }
  });

  var aboutMe = "Hi there this is <strong>Amit Kishor Raturi</strong> I am currently pursuing my b.tech from NIT Uttarakhand,I have got good hands over developing some android apps."
  // seed with initial data
  Profile.create({
  header: { name : "Amit Kishor Raturi",
    positions : "Android Developer",
    phoneNumber : "9557491531",
    email : "Amitkishorraturi.cse16@nituk.ac.in",
    image : "https://avatars2.githubusercontent.com/u/37178117?s=460&v=4"
  },
    about : aboutMe
  },function(err,profile){
    if (err) {
      console.log("There was some error entering data");
      console.log(err);
    }else {
      console.log("Created model profile");
      console.log(profile);
    }
  })
  console.log("Hello");
}

module.exports = seedDB
