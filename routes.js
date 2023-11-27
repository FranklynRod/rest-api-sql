const express = require('express');
const router = express.Router();

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
  res.render(users);

}));

//POST creates a new user into the database
router.post('/users', asyncHandler(async (req, res) => {
  try{

    const user = await User.create(req.body);
    res.location("/").status(201).end();

  } catch(error){
    if(error.name === "SequelizeValidationError") { 
      const user = await User.build(req.body);
      res.status(400).json({ error });
    } else {
      throw error;
    } 
  }
}));

// //GET all courses
// router.get('/courses', asyncHandler(async (req, res) => {
//   const books = await Course.findAll();
//   res.render("index",{books});
// }));

// //GET specific course
// router.get('/course/:id', asyncHandler(async(req, res, next) => {
//     const book = await Course.findByPk(req.params.id);
//     if (book){
//       res.render("update-book",{book, title: book.title})
//     } else{
//       const error = new Error("The book you're trying to find doesn't exist");
//       error.status = 404;
//       next(error);
//     }
//   }));

// //POST creates a new course
// router.post('/course/new', asyncHandler(async (req, res) => {
//   try{
//     const book = await Book.create(req.body);
//     res.redirect("/books/"+ book.id);
//   } catch(error){
//     if(error.name === "SequelizeValidationError") { 
//       const book = await Book.build(req.body);
//       res.render("new-book", {book, errors: error.errors, title: "New Book" })
//     } else {
//       throw error;
//     } 
//   }
// }));

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