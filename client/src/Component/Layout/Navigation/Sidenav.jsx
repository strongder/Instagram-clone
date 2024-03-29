import React, { useEffect, useRef, useState } from "react";
import "./Sidenav.scss";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Notification from "../../notification/Notification";

const Sidenav = (props) => {
  const { onCreatePost, OntoggleExpanded, OfftoggleExpanded, expanded, setExpanded } = props;
  const { userCurrent } = useSelector((state) => state.users);
  const formRef = useRef(null);
  const [openNotifi, setOpenNotifi] = useState(false);
  const navigate = useNavigate();

  const OffExpanded =()=>{
    OfftoggleExpanded();
    setOpenNotifi(false);
  }
  

  const handleChangeNotifi = () => {
    setExpanded(true);
    setOpenNotifi(!openNotifi);
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setOpenNotifi(false);
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/login");
  };

  return (
    <div className={`sidenav`}>
      {expanded ? (
        <Link to="/">
          <button className="sidenav__button" onClick={OntoggleExpanded}>
            <InstagramIcon />
            <span>Home</span>
          </button>
        </Link>
      ) : (
        <img
          className="sidenav__logo"
          src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png"
          alt="Instagram Logo"
        />
      )}

      <div className="sidenav__buttons">
        <Link to="/">
          <button className="sidenav__button" onClick={OntoggleExpanded}>
            <HomeIcon />
            <span>Home</span>
          </button>
        </Link>
        <button className="sidenav__button">
          <SearchIcon />
          <span>Search</span>
        </button>
        <Link to="/message">
          <button className="sidenav__button" onClick={OffExpanded}>
            <ChatIcon />
            <span>Messages</span>
          </button>
        </Link>
        <button className="sidenav__button" onClick={handleChangeNotifi}>
          <FavoriteBorderIcon />
          <span>Notifications</span>
        </button>
        <button className="sidenav__button" onClick={onCreatePost}>
          <AddCircleOutlineIcon />
          <span>Create</span>
        </button>
        <Link to="/profile">
          <button className="sidenav__button">
            <img
              className="avatar"
              src={userCurrent ? userCurrent.avatar : ""}
              alt=""
            />
            <span>Profile</span>
          </button>
        </Link>
      </div>
      <div className="logout">
        <button className="sidenav__button" onClick={logout}>
          <LogoutIcon />
          <span className="sidenav__buttonText">Logout</span>
        </button>
      </div>
      {openNotifi && <Notification formRef = {formRef}></Notification>}
    </div>
  );
};

export default Sidenav;
