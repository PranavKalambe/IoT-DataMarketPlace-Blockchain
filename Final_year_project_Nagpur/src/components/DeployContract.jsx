import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../AxiosSetup";
import "./LoginTest.css";


export default function SensorSetup() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axiosInstance.get(`/deploy`)
      .then(response => {
        console.log("send data");
        console.log("deploy contract",response.data.localContractAddress);
        localStorage.setItem("localContractAddress", response.data.localContractAddress);
        navigate("/sensorsetup");
      })
      .catch(error => {
        console.log("errrorrr",error);
      });
    
  }

  useEffect(() => {
    if(localStorage.getItem("username")===null){
      navigate("/login")
    }
  },[])
  return (
    <>
      <div className="content">
        <h1>Deploy your local smart contract!</h1>
        <div className="mainContent">
          <h4>Click the button below to deploy the Smart Contract for your local network</h4>
          <br></br>
          <form onSubmit={(e) => { handleSubmit(e) }}>
            <Button type="submit">Deploy!</Button>
          </form>
        </div>
      </div>
    </>
  );
}