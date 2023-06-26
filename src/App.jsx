import React from "react"; //you can also use useRef
import Main from "./components/Main";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import "./styles/App.css"
import axios from "axios";
import Header from "./components/Header";
import Task from "./components/Task";


function App(props) {

    return (
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/task" element={<Task/>}/>
          <Route index element={<Main/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
