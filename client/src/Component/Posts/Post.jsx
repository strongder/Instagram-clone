import React, { Fragment, useEffect, useState } from "react";
import "./Post.scss";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../redux/slices/postSlice";
import Comment from "../DialogComment/Comment";

function Post(props) {
  const [openComment, setOpenComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState({
    post: {},
    user: {},
  });
  const handleOpentComment = (post, user) => {
    setSelectedPost({ post, user });
    setOpenComment(true);
    window.history.pushState(null, '', `/posts/${post.id}`);
  };
  const handleClosetComment = () => {
    setOpenComment(false);
    window.history.pushState(null, '', '/');
  };

  const { errorUser, loadingUser, users } = useSelector((state) => state.users);
  const { errorPost, loadingPost, listPost } = useSelector(
    (state) => state.posts
  );

  const data = listPost.slice().reverse();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  if (errorPost || errorUser) {
    return <>Error</>;
  }
  if (loadingPost || loadingUser) {
    return <>Loading......</>;
  }
  return (
    <div className="post__container">
      <div className="list__item">
        {data.map((item, index) => {
          const user = users.find((user) => user.id === item.userId);
          return (
            <Fragment key={index}>
              {user && (
                <>
                  <div key={index} className="post__item">
                    <div className="header">
                      <img className="avatar" src={user.avatar} alt="Avatar" />
                      <span className="username">{user.username}</span>
                    </div>
                    <div className="content">
                      <p style={{ fontSize: "14px" }}> {item.content}</p>
                    </div>
                    <img className="image" src={item.image} alt="Post" />
                    <div className="actions">
                      <button className="like">
                        <FavoriteIcon />
                      </button>
                      <button
                        className="comment"
                        onClick={() => handleOpentComment(item, user)}
                      >

                        <MessageIcon />
                      </button>
                    </div>
                    <div className="countlike">
                      <span>8.112 like</span>
                    </div>
                  </div>
                  {openComment && (
                    <Comment
                      onCloseComment={handleClosetComment}
                      selectedPost={selectedPost}
                    ></Comment>
                  )}
                </>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Post;
