import React, { useState } from "react";
import "./CreatePost.scss";
import MoodIcon from "@mui/icons-material/Mood";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BackupIcon from "@mui/icons-material/Backup";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/slices/postSlice";

const CreatePost = (props) => {
  const { closeCreatePost } = props;
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const { userCurrent } = useSelector((state) => state.users);
  const [content, setContent] = useState('');
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
        console.log(image);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async () => {
    const post = {
      userId: localStorage.getItem("id"),
      content: content,
      image: image,
    };
    console.log(post);
    await dispatch(createPost(post));
    closeCreatePost();
  };
  return (
    <div className="dialog-overlay">
      <div className="create-post-dialog">
        <div className="dialog-header">
          <button>
            <ArrowBackIcon onClick={closeCreatePost}></ArrowBackIcon>
          </button>
          <h3>Tạo bài viết mới</h3>
          <button className="share" onClick={handleSubmit}>
            Chia sẻ
          </button>
        </div>
        <div className="dialog-main">
          <div className="image-post">
            {image ? (
              <img src={image} alt="" />
            ) : (
              <>
                <label className="upload" htmlFor="image">
                  <BackupIcon></BackupIcon>
                  Chọn ảnh từ máy tính
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="image"
                />
              </>
            )}
          </div>
          <div className="dialog-content">
            <div className="user">
              <img
                className="avatar"
                src={userCurrent.avatar}
                alt="Avatar"
              />
              <span className="username">{userCurrent.username}</span>
            </div>
            <div className="content">
              <textarea
                className="input"
                name="content"
                value={content}
                placeholder="Viết gì đó ..."
                onChange={handleChangeContent}
              />
              <button className="emoji">
                <MoodIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className="close" onClick={closeCreatePost}>
        <CloseIcon></CloseIcon>
      </button>
    </div>
  );
};

export default CreatePost;
