import React, { useEffect, useState } from "react";
import Sidenav from "../Navigation/Sidenav";
import "./DefaultLayout.scss";
import CreatePost from "../../CreatePost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../../redux/slices/postSlice";
import { getAllUsers, getCurrentUser } from "../../../redux/slices/userSlice";
import Notification from "../../notification/Notification";
function DefaultLayout({ children }) {
  const [createPost, setCreatePost] = useState(false);
  const dispatch = useDispatch();
  const { loadingUser, errorUser } = useSelector((state) => state.users);
  const id = localStorage.getItem("id");

  const [expanded, setExpanded] = useState(false);

  const OfftoggleExpanded = () => {
    setExpanded(true);
  };
  const OntoggleExpanded = () => {
    setExpanded(false);
  };
  const handleOnCreatePost = () => {
    setCreatePost(true);
  };

  const handleCloseCreatePost = () => {
    setCreatePost(false);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getCurrentUser(id));
    }
  }, [dispatch, id]);

  if (errorUser) {
    return <>Error</>;
  }
  if (loadingUser) {
    return <>Loading......</>;
  }

  return (
    <div className="layout__container">
      <div className={`layout__nav ${expanded ? "expanded" : ""}`}>
        <Sidenav onCreatePost={handleOnCreatePost}
          OfftoggleExpanded={OfftoggleExpanded}
          OntoggleExpanded = {OntoggleExpanded}
          expanded ={expanded}
          setExpanded = {setExpanded}
        ></Sidenav>
      </div>
      <div className="layout__content">{children}</div>
      <>
        {createPost && <CreatePost closeCreatePost={handleCloseCreatePost} />}
      </>
    </div>
  );
}

export default DefaultLayout;
