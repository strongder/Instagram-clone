import React, { useEffect } from "react";
import "./Suggestion.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendFollow } from "../../redux/slices/followSlice";
import { getFriends } from "../../redux/slices/userSlice";

const Suggestion = () => {
  const dispatch = useDispatch();
  const { users, userCurrent, friends, loadingFriend, errorFriend } =
    useSelector((state) => state.users);

    const allFriends = friends && [...friends, userCurrent]
    const nonfriends = friends ? users.filter(user => !allFriends.some(friend => friend.id === user.id)):[];

  useEffect(() => {
    if(userCurrent)
    {
      dispatch(getFriends(userCurrent.id));
    }
    
  }, [dispatch, userCurrent]);

  const handleRequestFl = (friendId) => {
    const data = {
      userId: userCurrent.id,
      friendId: friendId,
    };
    dispatch(sendFollow(data));
  };

  if (loadingFriend) {
    return <>Loading...</>;
  }
  return (
    <>
      {userCurrent && (
        <div className="suggestion__container">
          <Link to="profile" className="user__current">
            <img className="avatar" src={userCurrent.avatar} alt="Avatar" />
            <span className="username">{userCurrent.username}</span>
            <button className="follow-button">Chuyển</button>
          </Link>

          <p style={{ fontSize: "14px", color: "#ccc" }}>Gợi ý cho bạn</p>
          <div className="list__item">
            {friends &&
              nonfriends.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <Link to={`/profile/${item.id}`}>
                      <img className="avatar" src={item.avatar} alt="Avatar" />
                      <span className="username">{item.username}</span>
                    </Link>
                    <button
                      className="follow-button"
                      onClick={() => handleRequestFl(item.id)}
                    >
                      Follow
                    </button>
                  </div>
                );
              })}
          </div>
          <p className="more">Xem thêm</p>
          <p
            style={{
              fontSize: "12px",
              color: "rgb(116 115 115)",
              margin: "auto",
            }}
          >
            @Instagram clone
          </p>
        </div>
      )}
    </>
  );
};

export default Suggestion;
