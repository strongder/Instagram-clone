import React, { useEffect, useState } from "react";
import "./Home.scss";
import Post from "../../Component/Posts/Post";
import Suggestion from "../../Component/Suggestion/Suggestion";
import Comment from "../../Component/DialogComment/Comment";
import { useDispatch } from "react-redux";
const Home = () => {
  return (
    <div className="homepage">
      <div className="post">
        <Post></Post>
      </div>
      <div className="suggestion">
        <Suggestion></Suggestion>
      </div>
    </div>
  );
};

export default Home;
