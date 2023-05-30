import React from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import { account_inter,balance } from "../data";

var username;
// var newBalance= balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Nav() {
  const navigate = useNavigate();

  if (localStorage.getItem("host") === null) {
    // alert("Host not Configured");
    console.log("HOST NOT DEFINED");
   
  }else{
    username = localStorage.getItem("username")
  }

  const handleClick = (e) => {
    // console.log(e.target.id);
    let value = e.target.id;
    if (value === "profile-btn") {
      navigate("/portfolio");
    } else if (value === "sensors-btn") {
      navigate("/sensorfarm");
    } else if (value === "ext-sensors-btn") {
      navigate("/bidding");
    }
  };

  return (
    <>
      <div className="header">
        <h1>Trading On Blockchain</h1>
        <div className="myinfo">
          {/* PROBLEM: AFTER REFRESH THE VALUE GOES AWAY, BUT COMES AFTER MULTIPLE REFRESH DUE TO ASYNC WAY OF JS. */}
          <span>User: {username}</span>
          <span>My Address : {account_inter}</span>
          <span>My Balance : {Math.round(balance)} Ethers </span>
        </div>
      </div>
      <div className="nav">
        <button
          className="nav-opt btn btn-dark"
          onClick={handleClick}
          id="profile-btn"
        >
          Portfolio
        </button>
        {/* <button
          className="nav-opt btn btn-dark"
          onClick={handleClick}
          id="sensors-btn"
        >
          Sensor Farm
        </button> */}
        <button
          className="nav-opt btn btn-dark"
          onClick={handleClick}
          id="ext-sensors-btn"
        >
          Bidding Space
        </button>
      </div>
    </>
  );
}