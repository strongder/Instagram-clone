import React, { useEffect, useState } from "react";
import "./Comment.scss";
import SendIcon from "@mui/icons-material/Send";
import MoodIcon from "@mui/icons-material/Mood";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deleteComment,
  getCommentByPost,
} from "../../redux/slices/commentSlice";
import { Link } from "react-router-dom";
import moment from "moment";
const Comment = (props) => {
  const { userCurrent, users } = useSelector((state) => state.users);
  const [inputComment, setInputComment] = useState();
  const { onCloseComment, selectedPost } = props;
  const { post, user } = selectedPost;
  console.log(post)
  const { listComment } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentByPost(post.id));
  }, [dispatch]);

  const handleChangeInput = (e) => {
    setInputComment(e.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendComment();
    }
  };

  const handleSendComment = async () => {
    const comment = {
      userId: userCurrent.id,
      postId: post.id,
      content: inputComment,
    };
    setInputComment("");
    await dispatch(createComment(comment));
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };
  return (
    <div className="comment__overlay" onClick={onCloseComment}>
      <div className="comment__container" onClick={(e) => e.stopPropagation()}>
        <div className="post__image">
          <img src={post.image} alt="" />
        </div>
        <div className="comment__main">
          <div className="header">
            <img src={user.avatar} alt="" />
            <span>{user.username}</span>
            <FormatListBulletedIcon
              style={{ marginLeft: "auto" }}
            ></FormatListBulletedIcon>
          </div>

          <div className="content">
            <div className="list__comment">
              {
                 listComment &&
                listComment
                  .slice()
                  .reverse()
                  .map((item, index) => {
                    const user = users.find((u) => u.id === item.userId);
                    return (
                      <>
                        <div key={index} className="comment">
                          <img src={user.avatar} alt="" />
                          <div>
                            <Link to={`/profile/${user.id}`}>
                              {user.username}
                            </Link>
                            <p>
                              <i>{item.content}</i>
                            </p>
                            
                            <p
                              style={{fontSize:"12px", display: "flex", justifyContent: "space-between", cursor: "pointer" }}
                              onClick={() => handleDeleteComment(item.id)}
                            >
                              <span style={{fontSize: "12px", color:"#727272"}}>{moment(item.createAt).format("LLL")}</span>
                              Xoa
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })
              }
            </div>
          </div>
          <div className="footer">
            <MoodIcon />
            <input
              type="text"
              placeholder="Thêm bình luận.."
              onKeyPress={handleKeyPress}
              onChange={handleChangeInput}
              name="comment"
              value={inputComment}
            />
            <SendIcon onClick={handleSendComment}></SendIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
