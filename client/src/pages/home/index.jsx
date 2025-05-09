import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'

export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);
    const navigate=useNavigate()

  async function fetchListOfBlogs() {
    setPending(true);
    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = response.data;
    console.log(result);
    if (result) {
      setPending(false);
      setBlogList(result);
    }
  }
  async function handleDeleteblog(getCurrentId) {
    console.log(getCurrentId);
    const response = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${getCurrentId}`
    );
    const result=await response.data
    if(result?.message){
      fetchListOfBlogs()
    }
  }
  function handleEdit(getCurrentBlogItem){
    console.log(getCurrentBlogItem)
    navigate('/add-blog',{state:{getCurrentBlogItem}})
  }
  useEffect(() => {
    fetchListOfBlogs();
  }, []);
  return (
    <div className={classes.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <h1>Loading Blogs! Please wait</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList&&blogList.length?blogList.map((blogItem) => (
            <div key={blogItem._id}>
              <p>{blogItem.title}</p>
              <p>{blogItem.description}</p>
              <FaEdit size={30} onClick={()=>handleEdit(blogItem)} />
              <FaTrash
                onClick={() => handleDeleteblog(blogItem._id)}
                size={30}
              />
            </div>
          )):<h3>No Blogs Added</h3>}
        </div>
      )}
    </div>
  );
}
