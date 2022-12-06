import axios from "axios";
import { set } from "mongoose";
import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { getCodeBlockRoute, host } from "../utils/APIRoutes";
import io from "socket.io-client";
import smiley from "../assets/smiley.png";

const solutions = [
  {
    codeblock1sol: `(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));`,
  },
  {
    codeblock2sol: `var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();`,
  },
  {
    codeblock3sol: `console.log(sum(2,3));   // Outputs 5
    console.log(sum(2)(3));  // Outputs 5`,
  },
  {
    codeblock4sol: ` function greet(param) {
    if(typeof param === 'string') {
    }
    else {
      // If param is of type array then this block of code would execute
    }
  }`,
  },
];

export const ChatPage = () => {
  const socket = useRef();
  const id = useRef(`${Date.now()}`);

  const remote = useRef(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const isMentor = urlParams.get("isMentor");
  const codeBlockNum = urlParams.get("codeBlockId");
  const [db_code, setDb_Code] = useState("");
  const [showSmiley, setShowSmiley] = useState(false);

  useEffect(() => {
    async function getCodeBlock() {
      const res = await axios.post(getCodeBlockRoute, {
        codeBlockNum,
      });
      setDb_Code(res.data);
    }
    getCodeBlock();
  }, []);

  useEffect(() => {
    socket.current = io("http://localhost:5500");
    socket.current.emit("code-changes", db_code.code);
  }, [db_code.code]);

  const handleChangeCode = (event) => {
    setDb_Code({ code: event.target.value });
    socket.current.emit("send-changes", event.target.value);
    switch (codeBlockNum) {
      case "1":
        console.log("sol:", solutions[0].codeblock1sol);
        console.log("quation:", event.target.value);
        if (event.target.value === solutions[0].codeblock1sol) {
          setShowSmiley(true);
          setTimeout(() => {
            setShowSmiley(false);
          }, 3000);
        }
      case "2":
        if (event.target.value === solutions[1].codeblock2sol) {
          setShowSmiley(true);
          setTimeout(() => {
            setShowSmiley(false);
          }, 3000);
        }
      case "3":
        if (event.target.value === solutions[2].codeblock4sol) {
          setShowSmiley(true);
          setTimeout(() => {
            setShowSmiley(false);
          }, 3000);
        }
      case "4":
        if (event.target.value === solutions[3].codeblock3sol) {
          setShowSmiley(true);
          setTimeout(() => {
            setShowSmiley(false);
          }, 3000);
        }
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-changes", (msg) => {
        setDb_Code({ code: msg });
      });
    }
  }, []);

  return (
    <div>
      <div className="chat-header">
        <textarea
          name="codeBlock"
          disabled={isMentor === "true" ? true : false}
          value={db_code.code}
          onChange={isMentor === true ? db_code.code : handleChangeCode}
          rows="30"
          cols="80"
        ></textarea>
        <div style={{ display: showSmiley ? "" : "none" }}>
          <img src={smiley}></img>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
