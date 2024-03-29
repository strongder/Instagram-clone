import React, { useState, useEffect } from "react";
import "./Login.scss";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getAllPost } from "../../redux/slices/postSlice";

const Login = (props) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuth({ ...auth, [name]: value });
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      navigate("/");
    }
  }, []);
  const login = async () => {
    try {
      const response = await axios.post(`http://localhost:8081/api/auth`, auth);

      if (response.status === 200) {
        console.log(response.data)
        // localStorage.setItem("token", response.data.token)
        localStorage.setItem("id", response.data.id)
        // Dispatch các action trước khi navigate
      //  await dispatch(getAllPost())
        setTimeout(() => {
          // Dispatch các action trước khi navigate
          navigate('/');
        }, 3000);
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn việc tải lại trang khi submit form
    await login();
  };


  return (
    <div className="login-container">
      <div className="login-box">
      <img
          className="sidenav__logo"
          src="https://s3.cloud.cmctelecom.vn/tinhte1/2013/05/3368536_InstagramLogo-730x278.png"
          alt="Instagram Logo"
        />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="enter email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
        <p>Bạn chưa có tài khoản? 
          <Link to='/register'>Đăng ký</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
