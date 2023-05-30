import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../AxiosSetup";


const AuthLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("manager");

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post("/login", {"username":username, "password":password,"role":role})
        .then((response) => {
            console.log(response)
            localStorage.setItem("username", username);
            localStorage.setItem("role", role);
            if(role==="manager"){
                navigate("/setup")
            }

        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if(localStorage.getItem("username") || localStorage.getItem("role")){
            navigate("/setup");
        }
    },[]) 
  return (
    <div className="content">
    <h1>Login</h1>
    <div className="mainContent">
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <label htmlFor="username">Username</label>
        <span> </span>
        <input
          type="text"
          name="username"
          required
          autoComplete="off"
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
        />
        <br />
        <br />
        <label htmlFor="password">Password</label>
        <span> </span>
        <input
          type="password"
          name="password"
          required
          autoComplete="off"
          value={password}
          onChange={(e) =>{setPassword(e.target.value)}}
        />
        <br />
        <br />
        
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  </div>
  )
}

export default AuthLogin
