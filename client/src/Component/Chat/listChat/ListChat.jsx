import React, { useEffect, useState } from "react";
import "./ListChat.scss";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import { dataUser } from "../../../data";
import { useDispatch, useSelector } from "react-redux";
import { getRoomByUser } from "../../../redux/slices/roomSlice";
const ListChat = () => {
  const { userCurrent, users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { listRoom, loadingRoom, errorRoom } = useSelector(
    (state) => state.rooms
  );

  const getUser = (id) => {
    return users.find((user) => user.id === id);
  };
  useEffect(() => {
    dispatch(getRoomByUser(userCurrent.id));
  }, []);
  return (
    <div className="container">
      <div className="header">
        <span>rose</span>
        <button className="add_conversation">
          <PersonAddSharpIcon />
        </button>
      </div>
      <span
        style={{ fontWeight: "500", fontSize: "18px", padding: "8px 20px" }}
      >
        Tin nhắn
      </span>
      <div className="list__item">
        {listRoom &&
          listRoom.map((item, index) => {
            const userId = item.userIds.find(
              (userId) => userId !== userCurrent.id
            );
            let user = null;
            if (item.userIds.length === 2) {
              user = getUser(userId);
            }
            return (
              <div key={index} className="item">
                <img className="avatar" src={user ? user.avatar:''} alt="Avatar" />
                <span className="username">{user ? user.username: item.name}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListChat;
