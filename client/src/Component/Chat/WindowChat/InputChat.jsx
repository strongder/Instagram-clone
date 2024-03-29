import React, { useEffect, useState } from "react";
import "./InputChat.scss";
import MoodIcon from "@mui/icons-material/Mood";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";

const InputChat = (props) => {
  const { sendMessage } = props;
  const [image, setImage] = useState();
  const [inputMessage, setInputMessage] = useState();
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = (e) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleMessageChange = (e) => {
    setInputMessage(e.target.value);
  };
  const handleKeyPress = (e) =>{
    if(e.key ==="Enter")
    {
      handleSendMessage();
    }
  }
  const handleSendMessage = () => {
    sendMessage(inputMessage, image);
    setInputMessage("");
    setImage(null)
  };
  return (
    <div className="input__chat">
      {image && <img src={image} alt="" className="image_send" />}
      <div className="div">
        <button className="action">
          <MoodIcon />
        </button>
        <input
          type="text"
          placeholder="Nhắn tin ..."
          value={inputMessage}
          onKeyPress={handleKeyPress}
          onChange={handleMessageChange}
        />
        <label htmlFor="image" className="action" style={{ cursor: "pointer" }}>
          <ImageIcon />
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="image"
        />
        <button className="action" onClick={handleSendMessage}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default InputChat;
