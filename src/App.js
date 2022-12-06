import React from "react";
import CodeBlock from "./pages/CodeBlock";
import Lobby from "./pages/Lobby";
import Login from "./pages/Login";
import {
  BrowserRouter,
  Switch,
  Routes,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login></Login>}></Route>
          <Route path="/Lobby" element={<Lobby></Lobby>}></Route>
          <Route path="/CodeBlock" element={<CodeBlock></CodeBlock>}></Route>
          <Route path="/" element={<Navigate to="/Login"></Navigate>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
