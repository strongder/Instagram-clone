import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { getPostByUser } from "../../redux/slices/postSlice";
import { useLocation, useParams } from "react-router-dom";
import Comment from "../../Component/DialogComment/Comment";

const Profile = () => {
  const { users, userCurrent } = useSelector((state) => state.users);
  const location = useLocation();
  const [previousUrl, setPreviousUrl] = useState("");
  const [dialogComment, setDialogComment] = useState(false);
  const { postUser, loadingPost, errorPost } = useSelector(
    (state) => state.posts
  );

  const [selectedPost, setSelectedPost] = useState({
    post: {},
    user: {},
  });
  const handleOpenComment = (post, user) => {
    setDialogComment(true);
    setSelectedPost({ post, user });
    setPreviousUrl(location.pathname);
    window.history.pushState(null, "", `/posts/${post.id}`);
  };

  const handleCloseComment = () => {
    setDialogComment(false);
    window.history.replaceState({ path: previousUrl }, "", previousUrl);
  };
  const { id } = useParams();

  const user = id ? users.find((u) => u.id == id) : userCurrent;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getPostByUser(user.id));
    }
  }, [dispatch, user]);

  return (
    <>
      {user && (
        <div className="profile__container">
          <div className="profile__header">
            <img className="avatar" src={user.avatar} alt="" />
            <div className="info">
              <div className="div">
                <span className="username">{user.username}</span>
                <button className="follow">Theo dõi</button>
              </div>
              <div style={{ fontSize: "16px" }}>
                <p>2 bài viết</p>
                <p>4 bạn</p>
              </div>
            </div>
          </div>
          {postUser && (
            <div className="profile__post">
              <span>Bài viết</span>
              <div className="list__post">
                {postUser.map((item, index) => (
                  <div
                    key={index}
                    className="post"
                    onClick={() => handleOpenComment(item, userCurrent)}
                  >
                    <img src={item.image} alt="" />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="profile__footer">
            <p>
              <span>Giới thiệu</span> <span>Trợ giúp</span>{" "}
              <span>Điều khoản</span> <span>Quyền riêng tư</span>{" "}
              <span> Vị trí </span>
              <span>Thông tin liên hệ</span>
            </p>
            <p className="copy__right">@2024 Instagram clone</p>
          </div>
        </div>
      )}
      {dialogComment && (
        <Comment
          onCloseComment={handleCloseComment}
          selectedPost={selectedPost}
        ></Comment>
      )}
    </>
  );
};

export default Profile;
