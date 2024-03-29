import React, { useEffect, useState } from "react";
import "./Message.scss";
import ListChat from "../../Component/Chat/listChat/ListChat";
import WindowChat from "../../Component/Chat/WindowChat/WindowChat";
import InfoUser from "../../Component/Chat/InfoUser/InfoUser";
import { useDispatch, useSelector } from "react-redux";
import { getRoomByUser } from "../../redux/slices/roomSlice";

const Message = () => {
  const [clickInf, setClickInf] = useState(false);
  const { userCurrent, users } = useSelector((state) => state.users);
  const { listRoom, loadingRoom, errorRoom } = useSelector(
    (state) => state.rooms
  );
  const dispatch = useDispatch();
  const handleClickInf = () => {
    setClickInf(!clickInf);
  };

  useEffect(() => {
    dispatch(getRoomByUser(userCurrent.id));
  }, [dispatch]);
  
  return (
    <div className="message">
      <div className="list__chat">
        <ListChat />
      </div>

      <div className={`window__chat ${clickInf ? "full" : ""}`}>
        <WindowChat onClickInf={handleClickInf}></WindowChat>
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
