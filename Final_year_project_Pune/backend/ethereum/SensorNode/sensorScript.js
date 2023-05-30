const farm = require('./farm');
const Web3 = require('web3')

// const {  farmManagerAddr } = require('../constants');

//get location from localstorage
let location

let sensorNodeAddr
let farmManagerAddr




// const prefix = location.slice(0, 3);
//button will submit sensor identification
let sn = 1;

//recurssively run this function for 5 times to send data (emulating a sensor node that continiously sends data)
async function sendSensorDataTo() {
 
   //change data id
    let data_id_string = generateDataId();
    let data_id = stringToBytes32(data_id_string);
    console.log(data_id);

    //convert random int to string and then bytes32 data type
    var randomNumber = Math.floor(Math.random() * 100) + 1;
    let dataPoint = randomNumber;
    let dataString = dataPoint.toString();
    let dataHash = stringToBytes32(dataString);
    // console.log(dataHash);

    //get timestamp
    let timestamp = getTimestamp();

    //get location
    let bytes32Location = stringToBytes32(location)

    // let location = "0x6d756d6261690000000000000000000000000000000000000000000000000000";

    console.log("Sending Sensor Data: ", randomNumber);

    //await -- waiting for the transaction to be confirmed on the blockchain 
    let res = await farm.methods.sendSensorDataTo(data_id, dataPoint, dataHash, timestamp, bytes32Location, farmManagerAddr).send({
        from: sensorNodeAddr,
    })
    console.log(
        "WENT INSIDE RES: ", res
    );
    // .then( (res) => {
    //     console.log("DATA SENTTTTTT SUCCESSFULLY");
    // })
    // .catch((err) => {
    //     console.log("ERROR SENDING DATA: ", err);
    // })
    console.log("Data Sent Successfully: ", dataPoint);

}



//<------------------------------------ UTILITY FUNCTIONS ----------------------------------->
function stringToBytes32(inputString) {
    const web3 = new Web3();
    const hexString = web3.utils.asciiToHex(inputString);
    const bytes32 = web3.utils.padRight(hexString, 64);
    return bytes32;
}
//function to get the current timestamp
function getTimestamp() {
    const time = Math.floor(Date.now() / 1000);
    return time;
}
//function to generate data id randomly each time its called (format- "MUMXXX")
function generateDataId() {
    // const prefix = 'MUMS';
    const randomNum = Math.floor(Math.random() * 999) + 1;
    const paddedNum = randomNum.toString().padStart(3, '0');
    const dataId = sn + paddedNum;
    return dataId.toString();
}
//----------------------------- call sendSensorDataTo function 5 times ------------>
function autoSendData() {
    console.log(
        "INSIDE AUTO"
    );
    //send only 2 data points at a time
        for (let i = 0; i <5; i++) {
            sendSensorDataTo();
        }   

}

// setInterval(autoSendData, 10000);

function runSensor(loc, sensorAddr, farmManagAddr)
{
//set address in global context
location = loc;
sensorNodeAddr = sensorAddr;
farmManagerAddr = farmManagAddr;
console.log(location, sensorAddr, farmManagAddr)
    //adjust interval of sending 3 data points together
    autoSendData()
// setInterval(autoSendData, 800);
}
// function demo(){
//     console.log("Hello world");
// }


module.exports = runSensor;






