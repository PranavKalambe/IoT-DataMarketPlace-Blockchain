const {  web3_manager, smartContractAddress } = require('./constants');

// import Interface or ABI of contract
const fs = require("fs")
const ABI = JSON.parse(fs.readFileSync("C:/Users/ASUS/Desktop/LY Project/Code/Final_year_project/backend/ethereum/contracts/build/LocalData_sol_LocalData.abi"))
// const ABI = [{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getSensorDataCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getSensorDataInfo","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"bytes32","name":"data_id","type":"bytes32"}],"name":"getSensorDataInfoById","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"addr","type":"address"},{"internalType":"bytes32","name":"data_id","type":"bytes32"}],"name":"paySensorForData","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"bytes32","name":"data_id","type":"bytes32"}],"name":"putOutToSell","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"data_id","type":"bytes32"},{"internalType":"uint256","name":"dataPoints","type":"uint256"},{"internalType":"bytes32","name":"dataHash","type":"bytes32"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bytes32","name":"location","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"}],"name":"sendSensorDataTo","outputs":[],"stateMutability":"nonpayable","type":"function"}]


const instance = new web3_manager.eth.Contract(
    ABI,
    smartContractAddress
);
module.exports =  instance; 
