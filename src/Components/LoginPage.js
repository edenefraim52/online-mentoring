import React from "react";
import logo from "../assets/logo.png";
import { FC } from "react";

export const LoginPage = ({ onPress, onChange, username }) => {
  return (
    <div className="FormContainer">
      <form onSubmit={(event) => onPress(event)}>
        <div className="brand">
          <img src={logo} alt="logo"></img>
          <img src="" alt="" />
        </div>
        <h1>welcome back!</h1>
        <h3>Please sign in:</h3>
        <input
          type="text"
          value={
            username === "" || username === null || username === undefined
              ? undefined
              : username
          }
          placeholder="Username"
          name="username"
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => onChange(e)}
        ></input>

        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginPage;
