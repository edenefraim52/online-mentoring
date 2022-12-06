import axios from "axios";
import React, { useState , useRef } from "react";
import { useEffect } from "react";
import LoginPage from "../Components/LoginPage";
import { codeBlockRoute,createSessionRoute, host} from "../utils/APIRoutes";
import ChatPage from "../Components/ChatPage";

export default function CodeBlock() {


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const isMentor = urlParams.get("isMentor");
  const _uuid = urlParams.get("uuid");
  const _codeBlockId = urlParams.get("codeBlockId");
  const _user = urlParams.get("student_login");

  const [showLogin, setShowLogin] = useState(true);

  const [values, setValues] = useState({
    uuid:_uuid,
    user:_user,
    codeBlockID:_codeBlockId,
  });

  const [login, setLogin] = useState({
    username: _user,
    password: "",
  });

  const onPress = async (event) => { 
    event.preventDefault();
      const { username, password } = login;
      const { data } = await axios.post(codeBlockRoute, {
        username,
        password
      });
    if (!data.status) {
        alert("username and password are inccorect. try again");
    }
    if (data.user.mentor) { 
      alert("This link is only for students");
    }
    alert("Login Success");
    setShowLogin(false);
    const { status } = await axios.post(createSessionRoute, values)
  }


  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
    setValues({ ...values, [event.target.name]: event.target.value })
  };

  return (
    <div className="body">
      
      {isMentor==="false" && showLogin ? <LoginPage onPress={onPress} onChange={handleChange} username={_user} ></LoginPage>
        : 
        <div className="body">
          <ChatPage ></ChatPage>
        </div>
}
      
  </div>
  );
}

