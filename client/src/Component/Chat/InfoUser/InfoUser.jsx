import React, { useState } from "react";
import "./InfoUser.scss";
import { dataUser } from "../../../data";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const InfoUser = () => {
  const [onImage, setOnImage] = useState(false);

  const handleOnImage = () => {
    setOnImage(true);
  };
  const handleOffImage = () => {
    setOnImage(false);
  };
  return (
    <div className="info__container">
      {!onImage ? (
        <>
          <h2>Chi tiết</h2>
          <div className="users">
            <span>Thành viên</span>
            <div className="list__item">
              {dataUser.map((item, index) => {
                return (
                  <div key={index} className="item">
                    <img className="avatar" src={item.avatar} alt="Avatar" />
                    <span className="username">{item.username}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="show__image" onClick={handleOnImage}>
            <span>Xem hình ảnh</span>
            <ArrowForwardIcon />
          </div>
          <span className="delete__chat">Xóa đoạn chat</span>
        </>
      ) : (
        <div className="list__image">
          <h2>Danh sách hình ảnh</h2>
          <div className="list__item">
            <div className="item"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoUser;
