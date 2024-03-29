import React from "react";
import "./WindowChat.scss";
import InfoIcon from "@mui/icons-material/Info";
import PhoneIcon from "@mui/icons-material/Phone";
import MoodIcon from "@mui/icons-material/Mood";
import ImageIcon from "@mui/icons-material/Image";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import { Label } from "@mui/icons-material";
const WindowChat = (prop) => {
  const { onClickInf } = prop;
  return (
    <div className="chat__container">
      <div className="header">
        <img
          className="avatar"
          src="https://symbols.vn/wp-content/uploads/2022/02/Hinh-Avatar-Rose-sieu-xinh.jpg"
          alt=""
        />
        <span>Lisa</span>
        <div className="button__actions">
          <button className="action">
            <PhoneIcon />
          </button>
          <button className="action">
            <SearchIcon></SearchIcon>
          </button>
          <button className="action" onClick={onClickInf}>
            <InfoIcon></InfoIcon>
          </button>
        </div>
      </div>
      <div className="main">
        <div className="list__message">
          <div className="message"></div>
        </div>
      </div>
      <div className="footer">
        <button className="action">
          <MoodIcon />
        </button>
        <input type="text" />
        <label htmlFor="file" className="action">
          <ImageIcon />
        </label>
        <input style={{ display: "none" }} type="file" name="" id="file" />
        <button className="action">
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default WindowChat;
