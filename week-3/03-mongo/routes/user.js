const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  await User.create({
    username: username,
    password: password,
  });
  res.json({
    message: "User created succesfully",
  });
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
     // Implement fetching all courses logic
     const response = await Course.find({});

     res.json({
         courses: response
     })
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;

  User.updateOne({
    username: username
  }, {
    "$push":{
      purchasedCourses: courseId
    }
  }).catch (function(e){
    console.log(e);
  }) 

  res.json({
    message: "Purchase Complete!"
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({
    username: req.headers.username
  });
  console.log(user.purchasedCourses);
  const courses = await Course.find({
    _id: {
      "$in" : user.purchasedCourses
    }
  });
  res.json({
    courses: _id
  })
});

module.exports = router;
