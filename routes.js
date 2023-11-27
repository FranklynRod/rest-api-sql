const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('./models').User;
const Course = require('./models').Course;


function asyncHandler(cb){
  return async(req,res,next) =>{
    try{
      await cb(req,res, next);
    }catch(error){
      next(error);
  }}
}

//GET all users
router.get('/users', asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.json(users);

}));

//POST creates a new user into the database
router.post('/users', asyncHandler(async (req, res) => {
  const errors = [];
  try{
    const user = await User.build(req.body);
    // Validate that we have a `name` value.
  if (!user.firstName) {
    errors.push('Please provide a value for "first name"');
  }
  if (!user.lastName) {
    errors.push('Please provide a value for "last name"');
  }
  // Validate that we have an `email` value.
  if (!user.emailAddress) {
    errors.push('Please provide a value for "emailAddress"');
  }
  let password = user.password;
  if (!password) {
    errors.push('Please provide a value for "password"');
  } else if (password.length < 8 || password.length > 20) {
    errors.push('Your password should be between 8 and 20 characters');
  } else {
    user.password = bcrypt.hashSync(password, 10);
  }
  if (errors.length > 0) {
    // Return the validation errors to the client.
    res.status(400).json({ errors });
  } 
  // Set the status to 201 Created and end the response.
  res.json(user)
  res.status(201).location("/").end();
  
    
  } catch(error){
    if(error.name === "SequelizeValidationError") { 
      const user = await User.build(req.body);
      res.status(400).json({ error });
    } else {
      throw error;
    } 
  }
}));

//GET all courses
router.get('/courses', asyncHandler(async (req, res) => {
  const courses = await Course.findAll();
  res.json(courses);
}));

//GET specific course
router.get('/courses/:id', asyncHandler(async(req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    if (course){
      res.json(course);
    } else{
      const error = new Error("The book you're trying to find doesn't exist");
      error.status = 404;
      next(error);
    }
  }));

//POST creates a new course
router.post('/courses', asyncHandler(async (req, res) => {
  const errors = [];
  try{
    const course = await Course.build(req.body);
    if (!course.title) {
      errors.push('Please provide a value for "title"');
    }
    if (!course.description) {
      errors.push('Please provide a value for "description"');
    }
    if (errors.length > 0) {
      // Return the validation errors to the client.
      res.status(400).json({ errors });
    } 
    // Set the status to 201 Created and end the response.
    res.status(201).location("/").end();
    
  } catch(error){
    if(error.name === "SequelizeValidationError") { 
      const course = await Course.build(req.body);
      res.render("new-book", {book, errors: error.errors, title: "New Book" })
    } else {
      throw error;
    } 
  }
}));

// // Put updates course in the database
// router.put('/books/:id', asyncHandler(async( req, res) => {
//   try{
//     const book = await Book.findByPk(req.params.id);
//     await book.update(req.body)
//     if (book){
//       res.redirect("/")
//     } else{
//       const error = new Error("The page you're trying to find doesn't exist");
//       error.status = 404;
//       next(error);
//     }
//   } catch(error){
//     if(error.name === "SequelizeValidationError") { 
//       const book = await Book.build(req.body);
//       book.id = req.params.id;
//       res.render("update-book", {book, errors: error.errors, title: "New Book" })
//     } else {
//       throw error;
//     } 
//   }
// }));

// // DELETE delete book from database
// router.delete('/books/:id/delete', asyncHandler(async( req, res) => {
//   try{
//     const book = await Book.findByPk(req.params.id);
    
//     if (book){
//       await book.destroy();
//       res.redirect("/books");
//     } else{
//       const error = new Error("The page you're trying to find doesn't exist");
//       error.status = 404;
//       next(error);
//     }
//   }catch(error){
//     if(error.name === "SequelizeValidationError") { 
//       const book = await Book.build(req.body);
//       book.id = req.params.id;
//       res.render("update-book", {book, errors: error.errors, title: "New Book" })
//     } else {
//       throw error;
//     } 
//   }
// }));


module.exports = router;