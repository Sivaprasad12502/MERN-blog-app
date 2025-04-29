import React, { useContext, useEffect } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
export default function AddNewBlog() {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSaveblogToDatabase() {
    const response = isEdit
      ? await axios.put(
          `http://localhost:5000/api/blogs/update/${location.state.getCurrentBlogItem._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("http://localhost:5000/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        });
    const result = await response.data;

    if (result) {
      setIsEdit(false)
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  }
  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { getCurrentBlogItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: getCurrentBlogItem.title,
        description: getCurrentBlogItem.description,
      });
    }
  }, []);
  return (
    <div className={classes.wrapper}>
      <h1>{isEdit ? "Edit a blog" : "Add a blog"}</h1>
      <div className={classes.formWrapper}>
        <input
          type="text"
          name="title"
          placeholder="Enter blog title"
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />
        <textarea
          name="description"
          id="description"
          placeholder="Enter Blog Description"
          value={formData.description}
          onChange={(event) =>
            setFormData({
              ...formData,
              description: event.target.value,
            })
          }
        ></textarea>
        <button onClick={handleSaveblogToDatabase}>
          {isEdit ? "Edit blog" : "Add blog"}
        </button>
      </div>
    </div>
  );
}
