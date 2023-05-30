import React, { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import {
  web3_inter,
  bidContractAddress,
  bidContract,
  account_inter,
} from "../data";



var amount;
var dataID;

export default function Bidding() {
  const navigate = useNavigate();
  const [bidData, setBidData] = useState([]);
  const [show, setShow] = useState(false); // modal
  const [response, setResponse] = useState({});
  const [count, setCount] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAmount = (event) => {
    amount = event.target.value;
  }

  const handleDataID = (event) => {
    dataID = event.target.value;
  }

  function stringToBytes32(inputString) {
    const hexString = web3_inter.utils.asciiToHex(inputString);
    const bytes32 = web3_inter.utils.padRight(hexString, 64);
    return bytes32;
  }
  useEffect(() => {
    if(localStorage.getItem("username")===null){
      navigate("/login")
    }
  },[])


  const farmManagers = ["0x7ac59b4fdbe774a8e61ad4bbcfe045fa445b3805","0x9eb72a7bfaf3bf88166f8f6a31e1efd8070db288","0x23f80af3036d95c60f96f0f2f259a7559fdb6b37"];
  const data = [];

  useEffect(() => {
    farmManagers.map((farmManager) => {
      bidContract.methods.countData(farmManager)

        .call()

        .then((countn) => {

          console.log("The count of data is: ", countn);


          for (let i = 0; i < countn; i++) {

            bidContract.methods

              .getDataDetails(farmManager, i)

              .call()

              .then((dataDetail) => {
                data.push({
                  id: web3_inter.utils
                    .hexToAscii(dataDetail[0])
                    .replace(/\u0000/g, ""),
                  sensor: dataDetail[1],

                  location: web3_inter.utils

                    .hexToAscii(dataDetail[3])

                    .replace(/\u0000/g, ""),

                  bid: dataDetail[4],

                  timestamp: new Date(

                    parseInt(dataDetail[5]) * 1000

                  ).toLocaleString(),

                  farmManager: dataDetail[6], 
                  bidOpen: dataDetail[8]

                });




                setBidData([...data]);

              })

              .catch((err) => {

                console.log(err);

              });

          }

        })

        .catch((err) => {

          console.log(err);

        });

    })

  }, [])




  const Bid = () => {
    console.log("Bid button clicked");
    console.log(dataID);
    console.log(amount);

    // d.id, d.sensor, d.dataHash, d.location, d.bid, d.timestamp, d.farmManager, d.bidder, d.bidOpen

    if (dataID && amount) {
      console.log("ffffffffffffffffff",account_inter);

      web3_inter.eth.call({
        to: bidContractAddress,
        data: bidContract.methods
          .getDataDetailsById(stringToBytes32(dataID))
          .call()
          .then((res) => {
            console.log(res);
            setShow(true);
            setResponse({ ...res });
            console.log(response);
          })
          .catch((err) => {
            console.log("Error retrieving data by ID : " + err);
          }),
      });
    } else {
      alert("Fields cannot be Empty");
    }
  };
  const bidTrans = async (e) => {
    e.preventDefault()
    var bid_on = stringToBytes32(dataID);
    var bid_amt = web3_inter.utils.toWei(amount,"ether");
    console.log("The bid amount is:", bid_amt)
    var bidData = await bidContract.methods.bid(bid_on).encodeABI();
    if (account_inter !== undefined) {


      web3_inter.eth
        .sendTransaction({
          to: bidContractAddress,
          from: account_inter,
          data: bidData,
          value: bid_amt,
          gas: 800000,
        })
        .on("transactionHash", function (hash) {
          console.log("Transaction hash: " + hash);
          //TODO toastify this
          alert("Transaction Hash:  " + hash);
          setShow(false)
        })
        .catch((err) => {
          console.log("Bidding Error: " + err);
        })
    }
  };


  return (
    <>
      <div>

        <Nav />

        <Card>
          <Card.Header className="main" style={{ fontWeight: "bold" }}>
            Data Available for Bidding
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Data_ID</th>
                  <th>Data Description</th>
                  <th>Sensor</th>
                  <th>Location</th>
                  <th>Bid</th>
                  <th>Data Captured</th>
                  <th>Farm Manager</th>
                </tr>
              </thead>
              <tbody>
                {bidData.map((data) => (
                  data.bidOpen ? 
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.location==="MUMS" ? "Temperature of Mumbai" : data.location==="NAGP" ? "Temperature of Nagpur":"Temperature of Pune"}</td>
                    <td>{data.sensor}</td>
                    <td>{data.location}</td>
                    <td>{web3_inter.utils.fromWei(data.bid,"ether")}</td>
                    <td>{data.timestamp}</td>
                    <td>{data.farmManager}</td>
                  </tr> : null 
                ))}
              </tbody>
            </Table>
            <Card.Header>
              <div
                className="bid-section"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <InputGroup className="mb-3 mx-2">
                  <InputGroup.Text id="basic-addon1">Data ID</InputGroup.Text>
                  <Form.Control
                    className=" td-xs-3"
                    placeholder="Enter the Data_ID"
                    aria-label="Username"
                    id="dataPutForBid"
                    aria-describedby="basic-addon1"
                    name="dataID"
                    value={dataID}
                    onChange={handleDataID}
                  />
                </InputGroup>
                <InputGroup className="mb-3 mx-2">
                  <InputGroup.Text id="basic-addon1">Amount</InputGroup.Text>
                  <Form.Control
                    className=" td-xs-3"
                    placeholder="Enter the Amount"
                    aria-label="Username"
                    id="dataAvailableForBid"
                    aria-describedby="basic-addon1"
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={handleAmount}
                  />
                </InputGroup>
                <Button
                  className="btn btn-primary mb-3"
                  variant="primary"
                  onClick={Bid}
                >
                  Bid
                </Button>
              </div>
            </Card.Header>
          </Card.Body>
        </Card>
        <Modal style={{ color: "black" }} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm bid!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <table>
                <tr>
                  <td>Data ID</td>
                  <td id="d_id">{dataID}</td>
                </tr>
                <tr>
                  <td>From </td>
                  <td id="from_addr">{account_inter}</td>
                </tr>
                <tr>
                  <td>To </td>
                  <td id="to_addr">{response[6]}</td>
                </tr>
                <tr>
                  <td>Current Highest Bid</td>
                  <td id="top_bid">{response[4]}</td>
                </tr>
                <tr>
                  <td>Your Bid </td>
                  <td id="your_bid">{amount}</td>
                </tr>
                <tr>
                  <td>Acc PassWord</td>
                  <td>
                    <input id="pass" type="password" placeholder="PassPhrase" />
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <br />
                    <button id="ubid" onClick={(e) => bidTrans(e)}>
                      Confirm Bid
                    </button>
                  </td>
                </tr>
              </table>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}