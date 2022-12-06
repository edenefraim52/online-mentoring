import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import LoginPage from "../Components/LoginPage";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });


  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      alert("username and password are required");
      return false;
    } else if (password === "") {
      alert("username and password are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password ,mentor} = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
        mentor
      });
      if (data.status === false) {
        alert("username and password are inccorect. try again");
      }
      if (!data.user.mentor) { 
        alert("Only mentors allowed this page");
      }
      if (data.status === true && data.user.mentor) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate(`/Lobby?username=${data.user.username}`);
      }
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <LoginPage onPress={handleSubmit} onChange={handleChange} username=""></LoginPage>
    </div>  );
}