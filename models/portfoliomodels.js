const mongoose = require('mongoose');

// SCHEMAS
var skillSchema = new mongoose.Schema({
  title:String,
  proficency:String
});

var educationSchema = new mongoose.Schema({
  title: String,
  institution: String,
  time: String,
  description : String
});
var trainingSchema = new mongoose.Schema({
  title: String,
  description : String
});
var achievementsSchema = new mongoose.Schema({
  title: String,
  description: String
});
var otherSillSchema = new mongoose.Schema({
  title: String,
});
var projectSchema = new mongoose.Schema({
      title: String,
      time: String,
      description:String,
      images:String,
      technologies:String,
      link:String 
});

// // models
// var Skill = mongoose.model("Skill",skillSchema);
// var Education = mongoose.model("Education",educationSchema);
// var Achievement = mongoose.model("Achievement",achievementsSchema);
// var Training = mongoose.model("Training",trainingSchema);
// var SocialLink = mongoose.model("SocialLink",socialLinkSchema);
// var Project = mongoose.model("Project",projectSchema);


var profileSchema = mongoose.Schema({
  about: String,
  header:{
    name: String,
    positions: String,
    email: String,
    phoneNumber: String,
    image: String
  },
  socialLinks:String,
  socialIcons:String,
  skills:[
    skillSchema
  ],
  otherSkills:[otherSillSchema],
  education:[
    educationSchema
  ],
  achievements:[
    achievementsSchema
  ],
  trainings:[
    trainingSchema
  ],
  interests:[otherSillSchema],
  projects:[
    projectSchema
  ]

});

var Profile = mongoose.model("Profile",profileSchema)











module.exports = Profile
