import React, { useEffect, useRef, useState } from "react";
import "./WindowChat.scss";
import InfoIcon from "@mui/icons-material/Info";
import PhoneIcon from "@mui/icons-material/Phone";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import InputChat from "./InputChat";
import moment from "moment/moment";

const WindowChat = (prop) => {
  const { onClickInf, listMessage, currentRoom, stompClient } = prop;
  const [hover, setHover] = useState(null);
  const { users } = useSelector((state) => state.users);
  const messagesEndRef = useRef();
  const userIdCurrent = localStorage.getItem("id");
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [listMessage]);

  const sendMessage = (content, image) => {
    if (content.trim()) {
      const chatMessage = {
        userId: localStorage.getItem("id"),
        content: content,
        roomId: currentRoom,
        image: image,
      };
      stompClient.send(
        `/app/messages/room/${currentRoom}`,
        {},
        JSON.stringify(chatMessage)
      );
    }
  };

  return (
    <div className="chat__container">
      {currentRoom ? (
        <>
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
              {listMessage.map((item, index) => {
                const user = users.find((u) => u.id === item.userId);
                console.log(user.id);
                return (
                  <div
                    className={`message_item ${
                      user.id == userIdCurrent ? "reverse" : ""
                    }`}
                    key={index}
                  >
                    <img src={user.avatar} alt="" className="message_avatar" />
                    <div className="message_content">
                      {item.image && (
                        <div className="message_image">
                          <img src={item.image} alt="" />
                        </div>
                      )}
                      <div
                        className="content_time"
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(null)}
                      >
                        <p
                          style={{
                            maxWidth: "80%",
                            overflowWrap: "break-word",
                          }}
                        >
                          {item.content}
                        </p>
                        {hover === index && (
                          <p style={{ background: "none", margin: "0" }}>
                            {moment(item.createAt).format("LLL")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="footer">
            <InputChat sendMessage={sendMessage}></InputChat>
          </div>
        </>
      ) : (
        <div style={{display: "flex", alignItems:'center', justifyContent:'center',flex:"1", flexDirection:"column"}}>
          <img  style ={{width:"20%"}}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7nmQv7ipcek0_ZyIxbOHqzNMysPAp8eNs6gwOJ51ITQBlahN3brov7ZQ9pjrmnLDA54k&usqp=CAU" alt="" />
          <p style ={{fontSize:"20px"}}>Tin nhắn của bạn</p></div>
      )}
    </div>
  );
};

export default WindowChat;
