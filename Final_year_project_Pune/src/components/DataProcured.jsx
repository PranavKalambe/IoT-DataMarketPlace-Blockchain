import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import "./Portfolio.css";
import { web3_inter, bidContract,account_inter } from "../data";

export default function DataProcured() {
  const [bidData, setBidData] = useState([]);

  // Pending Tasks!
  // Display only those data which that particular FM has captured
  const farmManagers = ["0x7ac59b4fdbe774a8e61ad4bbcfe045fa445b3805","0x9eb72a7bfaf3bf88166f8f6a31e1efd8070db288","0x23f80af3036d95c60f96f0f2f259a7559fdb6b37"];
  useEffect(() => {
    farmManagers.map((farmManager) => {
       var farm = farmManager.toLowerCase();
      //  console.log(account_inter)
        if(account_inter !== undefined && farm === account_inter.toLowerCase()){
            bidContract.methods
            .countData(farmManager)
            .call()
            .then((countn) => {
              // console.log("The count of data is: ", countn);
              const bdata = [];
              for (let i = 0; i < countn; i++) {
                bidContract.methods
                  .getDataDetails(farmManager, i)
                  .call()
                  .then((dataDetail) => {
                    // console.log("Data details for Bidding:", dataDetail);
      
                    bdata.push({
                      id: web3_inter.utils
                        .hexToAscii(dataDetail[0])
                        .replace(/\u0000/g, ""),
                      sensor: dataDetail[1],
                      location: web3_inter.utils
                        .hexToAscii(dataDetail[3])
                        .replace(/\u0000/g, ""),
                      timestamp: new Date(
                        parseInt(dataDetail[5]) * 1000
                      ).toLocaleString(),
                      farmManager: dataDetail[6],
                      bidOpen: dataDetail[8]
                    });
      
                    setBidData([...bdata]);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
            
            // console.log("Info: ", farmManager, account_inter)
            
        }
   
      // console.log("dataaaaaaaa",bidData)
    })
  }, []);

  return (
    <>
      {/* Data Procured*/}
      <Card>
        <Card.Header className="main" style={{ fontWeight: "bold" }}>
          Data Procured
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Data_ID</th>
                <th>Sensor</th>
                <th>Bid</th>
                <th>Data Captured</th>
                <th>Farm Manager</th>
              </tr>
            </thead>
            <tbody>
              {bidData.map((data) => (
                data.bidOpen === false ?
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.sensor}</td>
                  <td>{data.location}</td>
                  <td>{data.timestamp}</td>
                  <td>{data.farmManager}</td>
                </tr> : null
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}
