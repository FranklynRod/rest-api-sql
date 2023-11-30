const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('./models').User;
const Course = require('./models').Course;

const { authenticateUser } = require('./middleware/authUser.js');

function asyncHandler(cb){
  return async(req,res,next) =>{
    try{
      await cb(req,res, next);
    }catch(error){
  // Forward error to the global error handler
      next(error);
  }}
}

//GET all users
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  // const users = await User.findAll();
  const user = req.currentUser;
  res.json(user).status(200);

}));

//POST creates a new user into the database
router.post('/users', asyncHandler(async (req, res) => {
  const errors = [];
  try{
    const user = await User.create(req.body);
    // Validate that we have a `name` value.
  // if (!user.firstName) {
  //   errors.push('Please provide a value for "first name"');
  // }
  // if (!user.lastName) {
  //   errors.push('Please provide a value for "last name"');
  // }
  // // Validate that we have an `email` value.
  // if (!user.emailAddress) {
  //   errors.push('Please provide a value for "emailAddress"');
  // }
  // let password = user.password;
  // if (!password) {
  //   errors.push('Please provide a value for "password"');
  // } else if (password.length < 8 || password.length > 20) {
  //   errors.push('Your password should be between 8 and 20 characters');
  // } else {
  //   user.password = bcrypt.hashSync(password, 10);
    
  // }
  if (errors.length > 0) {
    // Return the validation errors to the client.
    res.status(400).json({ errors });
  } 
  // Set the status to 201 Created and end the response.
  res.status(201).location("/").end();
  
  } catch(error){
    if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') { 
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    } 
  }
}));

//GET all courses
router.get('/courses', asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    include: {
      model: Course,
      attributes:['firstName', 'lastName', 'emailAddress']
  }
   });
  res.json(courses).status(200);
}));

//GET specific course
router.get('/courses/:id', asyncHandler(async(req, res, next) => {
    const course = await Course.findByPk(req.params.id ,{
      include: {
        model: Course,
        attributes:['firstName', 'lastName', 'emailAddress']
    }
     });
    if (course){
      res.json(course).status(200);
    } else{
      const error = new Error("The book you're trying to find doesn't exist");
      error.status = 404;
      next(error);
    }
  }));

//POST creates a new course
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
  // const errors = [];
  try{
    const course = await Course.create(req.body);
    if (!course.title) {
      const error = new Error("You are not authorized to update this course");
      error.status = 400;
      next(error);
      // errors.push('Please provide a value for "title"');
    }
    if (!course.description) {
      // errors.push('Please provide a value for "description"');
      const error = new Error("You are not authorized to update this course");
      error.status = 400;
      next(error);
    }
    // if (errors.length > 0) {
    //   // Return the validation errors to the client.
    //   res.status(400).json({ errors });
    // } 
    // Set the status to 201 Created and end the response.
    res.status(201).location(`/courses/${course.id}`).end();
    
  } catch(error){
    if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') { 
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    } 
  }
}));

// Put updates course in the database
router.put('/courses/:id', authenticateUser, asyncHandler(async( req, res) => {
  try{
    const course = await Course.findByPk(req.params.id);
    if (course.userId !== req.currentUser.id){
      const error = new Error("You are not authorized to update this course");
      error.status = 401;
      next(error);
    }
    if (course){
      await course.update(req.body)
      res.status(204).end();
    } else{
      const error = new Error("The course you're trying to find doesn't exist");
      error.status = 404;
      next(error);
    }
  } catch(error){
    if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') { 
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    } 
  }
}));

// DELETE delete course from database
router.delete('/courses/:id', authenticateUser, asyncHandler(async( req, res) => {
  try{
    const course = await Course.findByPk(req.params.id);
    if (course.userId !== req.currentUser.id){
      const error = new Error("You are not authorized to delete this course");
      error.status = 401;
      next(error);
    }
    if (course.userId === req.currentUser.id){
      await course.destroy();
      res.status(204).end()
    } else{
      const error = new Error("The course you're trying to find doesn't exist");
      error.status = 404;
      next(error);
    }
  }catch(error){
    if(error.name === "SequelizeValidationError") { 
      res.status(400)
    } else {
      throw error;
    } 
  }
}));


module.exports = router;