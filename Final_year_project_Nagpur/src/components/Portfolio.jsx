import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import DataAvailableForPortfolio from "./DataAvailableForPortfolio";
import DataProcured from "./DataProcured";
import DataPutForBidding from "./DataPutForBidding";
import "./Portfolio.css";
import { useNavigate } from "react-router-dom";

var city = "";

if (localStorage.getItem("city") === null) {
  console.log("City is not configured");
} else {
  city = localStorage.getItem("city");
}

export default function Portfolio() {
  const navigate = useNavigate();
  const [role, setRole] = useState("manager");
  useEffect(() => {
    if(localStorage.getItem("username")===null){
      navigate("/login")
    }
  },[])
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  },[])


  return (
    <div>
      <Nav />
      {role==="manager" ? <><DataAvailableForPortfolio /> <DataPutForBidding /></> : null}
      <DataProcured />
    </div>
  );
}
