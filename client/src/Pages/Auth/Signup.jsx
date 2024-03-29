// SignUp.js
import React, { useState } from "react";
import './Signup.scss'
import { Link, useNavigate } from "react-router-dom";
import { combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/slices/userSlice";


const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, password, confirmPassword, username } = formData;
    if (!email || !password || !confirmPassword || !username) {
      alert("Please fill in all fields");
      return false;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if(validateForm())
    { 
      console.log("xin")
      const user = {
        "username": formData.username,
        "password":formData.password,
        "email": formData.email
      }
      dispatch(createUser(user));
      alert("Đăng ký thành công")
      navigate('/login')
    }
    console.log(formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
      <img
          className="sidenav__logo"
          src="https://s3.cloud.cmctelecom.vn/tinhte1/2013/05/3368536_InstagramLogo-730x278.png"
          alt="Instagram Logo"
        />
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Log In</Link></p>
      </div>
    </div>
  );
};

export default Signup;
