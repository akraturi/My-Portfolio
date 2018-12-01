const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Profile  = require('./models/portfoliomodels');

// to grab the data out of post requests
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}))

router.get('/',function(req,res){
  Profile.findOne(function(err,profile){
    if (err) {
      console.log("Error retrieving data");
    }else {

       console.log("Profile retrieved");
    }
    res.render('index',{profile:profile,superuser:false});
  });
});

router.get('/superuser',function(req,res){
  Profile.findOne(function(err,profile){
    if (err) {
      console.log("Error retrieving data");
    }else {

       console.log("Profile retrieved");
    }
    res.render('index',{profile:profile,superuser:true});
  });
});



router.get('/header/new',function(req,res){
  Profile.findOne(function(err,profile){
    if (err) {
      console.log("Error retrieving data");
    }else {

       console.log("Profile retrieved");
    }
    res.render('forms/resume_header',{profile:profile});
  });
});


router.post('/header',function(req,res){
  console.log(req.body.header);
  console.log(req.body.socialLinks);
  Profile.update({
    "header":req.body.header,
    "socialLinks":req.body.socialLinks.links,
    "socialIcons":req.body.socialLinks.icons
  },function(err,head){
    if (err) {
      console.log(err);
    }else {
      console.log("Updated object");
      console.log(head);
    }
    res.redirect('/');
  });
});

router.get('/about/new',function(req,res){
  Profile.findOne(function(err,profile){
    if (err) {
      console.log("Error retrieving data");
    }else {

       console.log("Profile retrieved");
    }
    res.render('forms/about_me',{profile:profile});
  });

});

router.post('/about',function(req,res){
   Profile.update({
     "about": req.body.about
   },function(err,obj){
     if (err) {
       console.log(err);
     }else {
       console.log(obj);
     }
     res.redirect('/');
   });
});

router.get('/skills/new',function(req,res){
     res.render('forms/skills',{});
});

router.post('/skills',function(req,res){
     console.log(req.body.skills);
     Profile.update({
      $push: {
              skills:req.body.skills
            }
     },function(err,obj){
       if (err) {
         console.log(err);
       }else {
         console.log(obj);
       }
       res.redirect('/');
     })
});

router.get('/skills/:id/delete',function(req,res){
   Profile.update({
    $pull: {
             skills: {_id :req.params.id }
           }
   },function(err,obj){
     if (err) {
       console.log(err);
     }else {
       console.log(obj);
     }
     res.redirect('/');
   })
})

router.get('/other_skills/new',function(req,res){
  Profile.findOne(function(err,profile){
    if (err) {
      console.log("Error retrieving data");
    }else {

       console.log("Profile retrieved");
    }
    res.render('forms/other_skills',{profile:profile}) ;
  });

});

router.post('/other_skills',function(req,res){
      Profile.update({
        $push : {
          otherSkills: req.body.other_skill
        }
      },function(err,obj){
          if (err) {
            console.log(err);
          }else {
            console.log(obj);
          }
          res.redirect('/');
        });
});

router.get('/other_skills/:id/delete',function(req,res){
         Profile.update({
         $pull:{
           otherSkills:{
             _id:req.params.id
           }
         }
         },function(err,obj){
           if (err) {
             console.log(err);
           }
           else {
             console.log(obj);
           }
           res.redirect('/');
         })
});

router.get('/education/new',function(req,res){
     res.render('forms/education',{edit:false}) ;
});

router.get('/education/:id/edit',function(req,res){
     Profile.findOne(function(err,profile){
       education = profile.education.id(req.params.id);
       console.log(education);
       res.render('forms/education',{education:education,edit:true});
     });
})

router.post('/education',function(req,res){
    if (req.body.edit_id === "") {
      Profile.update({
        $push : {
          education : req.body.education
        }
      },function(err,obj){
        if (err) {
          console.log(err);
        }else {
          console.log(obj);
        }
        res.redirect('/')
      });
    }else {
        console.log("This is edit request");
        console.log(req.body.edit_id);
        console.log(req.body.education);

        Profile.findOne(function(err,profile){
          education = profile.education.id(req.body.edit_id);
          console.log(education);
          education.title = req.body.education.title
          education.institution= req.body.education.institution
          education.time= req.body.education.time
          profile.save(function(err,obj){
            if (err) {
              console.log(err);
            }else {
              console.log(obj);
            }
            res.redirect('/');
          })
        });
    }

});

router.get('/education/:id/delete',function(req,res){
  Profile.update({
  $pull:{
    education:{
      _id:req.params.id
    }
  }
  },function(err,obj){
    if (err) {
      console.log(err);
    }
    else {
      console.log(obj);
    }
    res.redirect('/');
  });
});

router.get('/achievements/new',function(req,res){
     res.render('forms/achievements',{edit:false}) ;
});

router.post('/achievements',function(req,res){
  if (req.body.edit_id === "") {
    Profile.update({
      $push : {
        achievements : req.body.achievement
      }
    },function(err,obj){
      if (err) {
        console.log(err);
      }else {
        console.log(obj);
      }
      res.redirect('/')
    });
  }else {
      console.log("This is edit request");
      console.log(req.body.edit_id);
      console.log(req.body.achievement);

      Profile.findOne(function(err,profile){
        achievement = profile.achievements.id(req.body.edit_id);
        console.log(achievement);
        achievement.title = req.body.achievement.title
        achievement.description = req.body.achievement.description

        profile.save(function(err,obj){
          if (err) {
            console.log(err);
          }else {
            console.log(obj);
          }
          res.redirect('/');
        })
      });
  }

});

router.get('/achievements/:id/edit',function(req,res){
  Profile.findOne(function(err,profile){
    achievement = profile.achievements.id(req.params.id);
    console.log(achievement);
    res.render('forms/achievements',{achievement:achievement,edit:true});
  });
});

router.get('/achievements/:id/delete',function(req,res){
  Profile.update({
  $pull:{
    achievements:{
      _id:req.params.id
    }
  }
  },function(err,obj){
    if (err) {
      console.log(err);
    }
    else {
      console.log(obj);
    }
    res.redirect('/');
  });
});

router.get('/trainings/new',function(req,res){
     res.render('forms/training',{edit:false}) ;
});

router.post('/trainings',function(req,res){
  if (req.body.edit_id === "") {
    Profile.update({
      $push : {
        trainings : req.body.training
      }
    },function(err,obj){
      if (err) {
        console.log(err);
      }else {
        console.log(obj);
      }
      res.redirect('/')
    });
  }else {
      console.log("This is edit request");
      console.log(req.body.edit_id);
      console.log(req.body.training);

      Profile.findOne(function(err,profile){
        training = profile.trainings.id(req.body.edit_id);
        console.log(training);
        training.title = req.body.training.title
        training.description = req.body.training.description

        profile.save(function(err,obj){
          if (err) {
            console.log(err);
          }else {
            console.log(obj);
          }
          res.redirect('/');
        })
      });
  }

});

router.get('/trainings/:id/edit',function(req,res){
  Profile.findOne(function(err,profile){
    training = profile.trainings.id(req.params.id);
    console.log(training);
    res.render('forms/training',{training:training,edit:true});
  });
});

router.get('/trainings/:id/delete',function(req,res){
  Profile.update({
  $pull:{
    trainings:{
      _id:req.params.id
    }
  }
  },function(err,obj){
    if (err) {
      console.log(err);
    }
    else {
      console.log(obj);
    }
    res.redirect('/');
  });
});


router.get('/interests/new',function(req,res){

     res.render('forms/interests',{});

});

router.post('/interests',function(req,res){
      Profile.update({
        $push : {
          interests: req.body.interest
        }
      },function(err,obj){
          if (err) {
            console.log(err);
          }else {
            console.log(obj);
          }
          res.redirect('/');
        });
});

router.get('/interests/:id/delete',function(req,res){
         Profile.update({
         $pull:{
           interests:{
             _id:req.params.id
           }
         }
         },function(err,obj){
           if (err) {
             console.log(err);
           }
           else {
             console.log(obj);
           }
           res.redirect('/');
         })
});


router.get('/projects/new',function(req,res){
     res.render('forms/projects',{edit:false}) ;
});

router.post('/projects',function(req,res){
  if (req.body.edit_id === "") {
    Profile.update({
      $push : {
        projects : req.body.project
      }
    },function(err,obj){
      if (err) {
        console.log(err);
      }else {
        console.log(obj);
      }
      res.redirect('/')
    });
  }else {
      console.log("This is edit request");
      console.log(req.body.edit_id);
      console.log(req.body.project);

      Profile.findOne(function(err,profile){
        project = profile.projects.id(req.body.edit_id);
        console.log(project);
        project.title = req.body.project.title
        project.description = req.body.project.description
        project.time = req.body.project.time
        project.images = req.body.project.images
        project.technologies = req.body.project.technologies
        project.link = req.body.project.link

        profile.save(function(err,obj){
          if (err) {
            console.log(err);
          }else {
            console.log(obj);
          }
          res.redirect('/');
        })
      });
  }

});

router.get('/projects/:id/edit',function(req,res){
  Profile.findOne(function(err,profile){
    project = profile.projects.id(req.params.id);
    console.log(project);
    res.render('forms/projects',{project:project,edit:true});
  });
});

router.get('/projects/:id/delete',function(req,res){
  Profile.update({
  $pull:{
    projects:{
      _id:req.params.id
    }
  }
  },function(err,obj){
    if (err) {
      console.log(err);
    }
    else {
      console.log(obj);
    }
    res.redirect('/');
  });
});


module.exports = router;
