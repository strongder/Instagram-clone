import React, { useEffect, useState } from "react";
import "./Message.scss";
import ListChat from "../../Component/Chat/listChat/ListChat";
import WindowChat from "../../Component/Chat/WindowChat/WindowChat";
import InfoUser from "../../Component/Chat/InfoUser/InfoUser";
import { useDispatch, useSelector } from "react-redux";
import { getRoomByUser } from "../../redux/slices/roomSlice";
import axiosInstance from "../../api";
import Stomp from "stompjs";
import SockJS from 'sockjs-client';

const Message = () => {
  const [clickInf, setClickInf] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  const handleClickInf = () => {
    setClickInf(!clickInf);
  };

  const handleSelectedRoom = (roomId) => {
    subscribe(roomId);
    getMessageByRoom(roomId);
  };
  const getMessageByRoom = async (roomId) => {
    try {
      const result = await axiosInstance.get(`/messages/room/${roomId}`);
      setMessages(result.data);
    } catch (error) {
      console.error("---" + error);
    }
  };
  useEffect(() => {
    // Ngắt kết nối khi component unmount
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [stompClient]);
  const subscribe = async (roomId) => {
    if (currentRoom === roomId) {
      return;
    }
    if (stompClient) {
      stompClient.disconnect();
    }
    const socket = new SockJS("http://localhost:8081/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe(`/topic/room/${roomId}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, receivedMessage]);
      });
    });
    setStompClient(client);
    setCurrentRoom(roomId);
  };

  return (
    <div className="message">
      <div className="list__chat">
        <ListChat onSelectedRoom={handleSelectedRoom} />
      </div>
      <div className={`window__chat ${clickInf ? "full" : ""}`}>
        <WindowChat
          onClickInf={handleClickInf}
          listMessage={messages}
          currentRoom ={currentRoom}
          stompClient = {stompClient}
        ></WindowChat>
      </div>
      {clickInf && (
        <div className="info__user">
          <InfoUser />
        </div>
      )}
    </div>
  );
};

export default Message;
