import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { privateRoutes } from "./Router/index";
import DefaultLayout from "./Component/Layout/DefaultLayout/DefaultLayout";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import { getAllUsers, getCurrentUser } from "./redux/slices/userSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {privateRoutes.map((route, index) => {
          const Layout = route.layout || DefaultLayout;
          const Page = route.page;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
