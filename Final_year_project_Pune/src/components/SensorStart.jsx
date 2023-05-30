import React, {useEffect} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./LoginTest.css";
import { axiosInstance } from "../AxiosSetup";
import { useNavigate } from "react-router-dom";
// const demo = require('../../backend/ethereum/SensorNode/sensorScript.js');





export default function SensorStart() {
  const navigate = useNavigate();

  if (localStorage.getItem("city") === null) {
    console.log("City is not present");
  } else {
    var city = localStorage.getItem("city");
  }
  
  
  
  
  let sensorAddress = localStorage.getItem(`SN0address`);
  let sensorPort = localStorage.getItem(`SN0Port`);

  const handleButtonChange = (e) => {
    // e.preventDefault();

    axiosInstance.post(`/sensorStart`,{
      "sensorAddress": sensorAddress,
      "sensorPort": sensorPort,
      "localContractAddress":localStorage.getItem("localContractAddress"),
      "farmManagerAddress": localStorage.getItem("localFM"),
      "city":localStorage.getItem("city")
    })
      .then(response => {
        console.log("send data")
      })
      .catch(error => {
        console.log("errrorrr",error);
      });
  };

  const navigateToPortfolio = (e) => {
    e.preventDefault()
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
        <h1>
          Set-up your Sensor of {city}
        </h1>
        <div className="mainContent">
          <Card>
            <Table responsive>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Port</th>
                  <th>Button</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>{sensorAddress}</td>
                    <td>{sensorPort}</td>
                    <button
                      className="btn btn-secondary mx-2 pd-2"
                      style={{ color: "black" }}
                      onClick={(e) => {handleButtonChange(e)}}
                    >
                      Start Sensor
                    </button>
                  </tr>
              </tbody>
            </Table>
          </Card>
        </div>
        <Button target="_blank" onClick={(e) => {navigateToPortfolio(e)}}>Go to portfolio</Button>
      </div>
    </>
  );
}