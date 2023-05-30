const Web3 = require('web3')

const fs = require('fs');

try {
    

    let data = JSON.parse(fs.readFileSync('file.json', 'utf8'));

    var farmManagerAddr = data.localFM ;
    var farmManagerAddrGlobal = data.globalFM;
    var httpAddr_manager = `http://127.0.0.1:${data.localFMPort}`;
    var httpAddr_globalManager = `${data.host}:${data.globalFMPort}`;

    let sensorData = JSON.parse(fs.readFileSync('sensorStartFile.json', 'utf8'));

    var smartContractAddress = sensorData.localContractAddress;
    var sensorNodeAddr = sensorData.sensorAddress;
    var httpAddr_sensor = `http://127.0.0.1:${sensorData.sensorPort}`;

} catch (err) {
    console.error(err);
}


const smartContractAddressGlobal = "0xA2E07c0a7F56D329c5Ee074A4f758E62fba65B4d";




//sensor node address
const web3_sensor = new Web3(new Web3.providers.HttpProvider(httpAddr_sensor));
const web3_manager = new Web3(new Web3.providers.HttpProvider(httpAddr_manager));
const web3_manager_global = new Web3(new Web3.providers.HttpProvider(httpAddr_globalManager));


module.exports = {
    smartContractAddress,
    smartContractAddressGlobal,
    sensorNodeAddr,
    farmManagerAddr,
    farmManagerAddrGlobal,
    httpAddr_sensor,
    httpAddr_manager,
    httpAddr_globalManager,
    web3_sensor,
    web3_manager,
    web3_manager_global
};