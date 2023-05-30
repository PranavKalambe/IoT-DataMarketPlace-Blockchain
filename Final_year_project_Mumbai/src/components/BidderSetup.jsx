import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "./LoginTest.css";
import { useNavigate } from "react-router-dom";
import { testFunction } from "../constant";
import { axiosInstance } from "../AxiosSetup";

export default function BidderSetup() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    host: "",
    bidderAddress: "",
    bidderPort: "",
  
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
    // console.log(state)
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log("submit")
    console.log(state);
    const { host, bidderAddress, bidderPort } =
      state;
    localStorage.setItem("host", host);
    localStorage.setItem("bidderAddress", bidderAddress);
    localStorage.setItem("bidderPort", bidderPort);
    console.log("Added successfully to local Storage!");
   
    console.log(testFunction()); 

    axiosInstance.post(`/bidderFileSetup`,state)
    .then(response => {
      console.log("send data")
    })
    .catch(error => {
      console.log("errrorrr",error);
    });
    navigate("/portfolio");
  }

  useEffect(() => {
    if(localStorage.getItem("username")===null){
      navigate("/login")
    }
  },[])


  return (
    <>
      <div className="content">
        <h1>Set-up your Blockchain</h1>
        <div className="mainContent">
          <form onSubmit={(e) => {handleSubmit(e)}}>
            <label htmlFor="host">Host</label>
            <span> </span>
            <input
              type="text"
              name="host"
              placeholder="192.168.1.0"
              required
              autoComplete="off"
              value={state.host}
              onChange={(e) => {handleChange(e)}}
            />
            <br />
            <br />

            <InputGroup className="mb-3">
      
              <Form.Control
                aria-label="Address"
                type="text"
                name="bidderAddress"
                value={state.bidderAddress}
                onChange={(e) => {handleChange(e)}}
                placeholder="Enter Bidder Address"
                autoComplete="off"
              />
            </InputGroup>

            <InputGroup className="mb-3">
     
              <Form.Control
                required
                aria-label="Address"
                type="number"
                name="bidderPort"
                value={state.bidderPort}
                onChange={(e) => {handleChange(e)}}
                placeholder="Enter Port"
                autoComplete="off"
              />
            </InputGroup>


            <Button variant="primary" type="submit">
              Proceed to next step
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}