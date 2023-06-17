const fs = require("fs");
const {  web3_manager } = require('./constants');

// const ABI = JSON.parse(fs.readFileSync("../contracts/build/LocalData_sol_LocalData.abi"));
const ABI = [{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getSensorDataCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getSensorDataInfo","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"bytes32","name":"data_id","type":"bytes32"}],"name":"getSensorDataInfoById","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"addr","type":"address"},{"internalType":"bytes32","name":"data_id","type":"bytes32"}],"name":"paySensorForData","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"bytes32","name":"data_id","type":"bytes32"}],"name":"putOutToSell","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"data_id","type":"bytes32"},{"internalType":"uint256","name":"dataPoints","type":"uint256"},{"internalType":"bytes32","name":"dataHash","type":"bytes32"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bytes32","name":"location","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"}],"name":"sendSensorDataTo","outputs":[],"stateMutability":"nonpayable","type":"function"}]
// const ABI = [
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "addr",
//         type: "address",
//       },
//     ],
//     name: "getSensorDataCount",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "addr",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "index",
//         type: "uint256",
//       },
//     ],
//     name: "getSensorDataInfo",
//     outputs: [
//       {
//         internalType: "bytes32",
//         name: "",
//         type: "bytes32",
//       },
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//       {
//         internalType: "bytes32",
//         name: "",
//         type: "bytes32",
//       },
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//       {
//         internalType: "bytes32",
//         name: "",
//         type: "bytes32",
//       },
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "addr",
//         type: "address",
//       },
//       {
//         internalType: "bytes32",
//         name: "data_id",
//         type: "bytes32",
//       },
//     ],
//     name: "getSensorDataInfoById",
//     outputs: [
//       {
//         internalType: "bytes32",
//         name: "",
//         type: "bytes32",
//       },
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//       {
//         internalType: "bytes32",
//         name: "",
//         type: "bytes32",
//       },
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//       {
//         internalType: "bytes32",
//         name: "",
//         type: "bytes32",
//       },
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address payable",
//         name: "addr",
//         type: "address",
//       },
//       {
//         internalType: "bytes32",
//         name: "data_id",
//         type: "bytes32",
//       },
//     ],
//     name: "paySensorForData",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "addr",
//         type: "address",
//       },
//       {
//         internalType: "bytes32",
//         name: "data_id",
//         type: "bytes32",
//       },
//     ],
//     name: "putOutToSell",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "bytes32",
//         name: "data_id",
//         type: "bytes32",
//       },
//       {
//         internalType: "uint256",
//         name: "dataPoints",
//         type: "uint256",
//       },
//       {
//         internalType: "bytes32",
//         name: "dataHash",
//         type: "bytes32",
//       },
//       {
//         internalType: "uint256",
//         name: "timestamp",
//         type: "uint256",
//       },
//       {
//         internalType: "bytes32",
//         name: "location",
//         type: "bytes32",
//       },
//       {
//         internalType: "address",
//         name: "addr",
//         type: "address",
//       },
//     ],
//     name: "sendSensorDataTo",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];

const bytecode = fs.readFileSync('C:/Users/ASUS/Desktop/LY Project/Code/Final_year_project_Pune/backend/ethereum/contracts/build/LocalData_sol_LocalData.bin').toString();

async function deploy() {

  const accounts = await web3_manager.eth.getAccounts();
  console.log("Deploying using Account - ",accounts[0]);

  const balance = await web3_manager.eth.getBalance(accounts[0]);
  const etherAmount = web3_manager.utils.fromWei(balance, 'ether');
  console.log("Current Balance - ", etherAmount);

  const farmContract = new web3_manager.eth.Contract(ABI);

  const deployContract = await farmContract.deploy({
    data: bytecode,
  }).send({
    from: accounts[0],
    gas: 1500000,
    gasPrice: '300000000000'
   }); // add the from field here

  console.log(`Contract deployed at address: ${deployContract.options.address}`);
  return {"localContractAddress": deployContract.options.address};

}

  // deploy();

  module.exports = {deploy};
