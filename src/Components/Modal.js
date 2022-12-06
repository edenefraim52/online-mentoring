import "./modal.css";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

export default function Modal({ show, close, students, codeBlockSelected }) {
  const [student, setStudent] = useState("");
  const [mentorLink, setMentorLink] = useState("");
  const [studentLink, setStudentLink] = useState("");
  const [submit, setSubmit] = useState(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const currentMentor = urlParams.get("username");
  const codeBlockID = codeBlockSelected;

  function onChangeValue(event) {
    setStudent(event.target.value);
  }

  const getUuid = () => {
    return uuid();
  };

  const handleSubmitBtn = (event) => {
    setSubmit(true);
    const uuid_ = getUuid();
    setMentorLink(
      `/CodeBlock?mentor=${currentMentor}&uuid=${uuid_}&isMentor=${true}&codeBlockId=${codeBlockID}`
    );
    setStudentLink(
      `/CodeBlock?student_login=${student}&uuid=${uuid_}&isMentor=${false}&codeBlockId=${codeBlockID}`
    );
  };

  return show ? (
    <div className="modalContainer">
      <div className="modal">
        <header className="modal_header">
          <h2 className="modal_header_title">Choose a student:</h2>
        </header>
        <button className="close" onClick={() => close()}>
          back
        </button>
        <main className="modal_content">
          {students.map(({ username }, index) => (
            <div className="usernames" key={index} onChange={onChangeValue}>
              <input
                key={index}
                type="radio"
                value={username}
                name="username"
              />
              {username}
            </div>
          ))}
        </main>
        <footer className="modal_footer">
          <button type="button" className="submit" onClick={handleSubmitBtn}>
            Submit
          </button>
          {submit ? (
            <div>
              <Link to={mentorLink}>Mentor Link</Link>
              <br></br>
              <Link to={studentLink}>Student Link</Link>
            </div>
          ) : null}
        </footer>
      </div>
    </div>
  ) : null;
}
