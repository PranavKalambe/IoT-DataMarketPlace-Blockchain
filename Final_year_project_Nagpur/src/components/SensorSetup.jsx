import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./LoginTest.css";

if (localStorage.getItem("city") === null) {
  console.log("City is not present");
}


export default function SensorSetup() {
  const navigate = useNavigate();
  const [sensorAddress, setSensorAddress] = useState("");
  const [sensorPort, setSensorPort] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem(`SN0address`, sensorAddress);
    localStorage.setItem(`SN0Port`, sensorPort);

    navigate("/getSensorDetails");
  }

  useEffect(() => {
    if(localStorage.getItem("username")===null){
      navigate("/login")
    }
  },[])
  return (
    <>
      <div className="content">
        <h1>Set up your Sensors!</h1>
        <div className="mainContent">
          <form onSubmit={(e) => { handleSubmit(e) }}>
            <InputGroup className="mb-3" >
              <InputGroup.Text>Sensor Node</InputGroup.Text>
              <Form.Control
                required
                aria-label="Address"
                type="text"
                name={`SN0address`}
                onChange={(e) => { setSensorAddress(e.target.value) }}
                placeholder="Enter Address"
                autoComplete="off"
              />
              <Form.Control
                required
                aria-label="Port"
                type="number"
                name={`SN0Port`}
                onChange={(e) => { setSensorPort(e.target.value) }}
                placeholder="Enter Port"
                autoComplete="off"
              />
            </InputGroup>
            <Button type="submit">Proceed!</Button>
          </form>
        </div>
      </div>
    </>
  );
}