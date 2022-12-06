import { useState, useEffect } from "react";
import React, { Component } from "react";
import lobby from "../assets/lobby.png";
import { lobyRoute } from "../utils/APIRoutes";
import Modal from "../Components/Modal.js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Lobby() {
  const list = [{ "title": "case 1", "index": "1" }, { "title": "case 2", "index": "2" }, { "title": "case 3", "index": "3" }, { "title": "case 4", "index": "4" }];
  const [modal, setModal] = useState(false);
  const [students, setStudent] = useState([]);
  const [codeBlockSelected, setCodeBlockSelected] = useState("");

  const handleClick = async(e, caseName) => {
    e.preventDefault();
    setModal(!modal);
    const res = await axios.get(lobyRoute);
    setStudent(res.data);
    setCodeBlockSelected(caseName.index);
    // if (res.statusCode!=="200") - if different from 200 then error
  };

  const Toggle = () => {
    setModal(!modal);
  };

  return (
    <div className="body">
      <div>
        <img id="lobbyImg" src={lobby} alt="" />
        <h1>Choose Code Block:</h1>
        <br></br>
        <ul className="list">
          <li>
            <button onClick={(e) => handleClick(e, list[0])}>{list[0].title}</button>{" "}
          </li>
          <li>
            <button onClick={(e) => handleClick(e, list[1])}>{list[1].title}</button>{" "}
          </li>
          <li>
            <button onClick={(e) => handleClick(e, list[2])}>{list[2].title}</button>{" "}
          </li>
          <li>
            <button onClick={(e) => handleClick(e, list[3])}>{list[3].title}</button>{" "}
          </li>
        </ul>
        <Modal show={modal} close={Toggle} students={students} codeBlockSelected={ codeBlockSelected}></Modal>
      </div>
    </div>
  );
}
