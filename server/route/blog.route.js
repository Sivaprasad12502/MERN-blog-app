const express = require("express");
const blogRouter = express.Router();

const {
  fetchListOfBlogs,
  addNewBlog,
  updateABlogs,
  deleteABlog,
} = require("../controller/blog-controller");


blogRouter.get('/',fetchListOfBlogs)
blogRouter.post('/add',addNewBlog)
blogRouter.put("/update/:id",updateABlogs)
blogRouter.delete("/delete/:id",deleteABlog)

module.exports=blogRouter