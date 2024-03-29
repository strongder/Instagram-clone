import React, { useEffect } from "react";
import "./Notification.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  accept,
  decline,
  getFollowByUser,
} from "../../redux/slices/followSlice";
const Notification = (props) => {
  const {formRef} = props
  const dispatch = useDispatch();
  const { users, userCurrent } = useSelector((state) => state.users);
  const { listRequestFl, loadingFollow } = useSelector(
    (state) => state.follows
  );

  const data = listRequestFl.filter((f) => f.status === "pending");
  useEffect(() => {
    dispatch(getFollowByUser(userCurrent.id));
  }, []);

  const handleAccept = (id) => {
    dispatch(accept(id));
  };
  const handleCancel = (id) => {
    dispatch(decline(id));
  };
  if (loadingFollow) {
    return <div>Loading... </div>;
  }
  // console.log(listRequsestFl)
  return (
    
    <div className="notifi__container" ref={formRef} onClick={(e) => e.stopPropagation()}>
      <h2>Thông báo</h2>
      <div className="list__notifi">
        {data &&
          data.map((item, index) => {
            const user = users.find((u) => u.id === item.userId);
            return (
              <div className="notifi" key={index}>
                <img src={user.avatar} alt="" />
                <div className="content">
                  <p>
                    <span>{user.username}</span> <i>Gửi lời mời theo dõi</i>
                  </p>
                  <div className="button__action">
                    <button
                      className="accept"
                      onClick={() => handleAccept(item.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="cancel"
                      onClick={() => handleCancel(item.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Notification;
