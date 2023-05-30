const fs = require("fs");
const Web3 = require("web3");
// const {  web3_manager_global } = require('./constants');
var httpAddr_globalManager = 'http://127.0.0.1:9041';
const web3_manager_global = new Web3(new Web3.providers.HttpProvider(httpAddr_globalManager));

const ABI = JSON.parse(fs.readFileSync("contracts/build/BidData_sol_BidData.abi"));

const bytecode = fs.readFileSync("contracts/build/BidData_sol_BidData.bin").toString();

async function deploy() {

  const accounts = await web3_manager_global.eth.getAccounts();
  console.log("Deploying using Account - ",accounts[0]);

  const balance = await web3_manager_global.eth.getBalance(accounts[0]);
  const etherAmount = web3_manager_global.utils.fromWei(balance, 'ether');
  console.log("Current Balance - ", etherAmount);

  const farmContract = new web3_manager_global.eth.Contract(ABI);
  
  const deployContract = await farmContract.deploy({
    data: bytecode,
  }).send({
    from: accounts[0],
    gas: 3000000,
    gasPrice: '300000000000'
   });

  console.log(`Contract deployed at address: ${deployContract.options.address}`);

}

  deploy();
