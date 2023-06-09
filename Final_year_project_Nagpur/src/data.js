// const fs = require("fs");
const Web3 = require("web3");
const constant = require("./constant");

// ----------------------- ABI of respective contracts -------------------------

const ABI_Farm = [
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getSensorDataCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getSensorDataInfo",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "data_id",
        type: "bytes32",
      },
    ],
    name: "getSensorDataInfoById",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "addr",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "data_id",
        type: "bytes32",
      },
    ],
    name: "paySensorForData",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "data_id",
        type: "bytes32",
      },
    ],
    name: "putOutToSell",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "data_id",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "dataPoints",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "dataHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "location",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "sendSensorDataTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const ABI_Bid = [
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "data_id",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "sensor_addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "dataPoints",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "dataHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "location",
				"type": "bytes32"
			}
		],
		"name": "addNewData",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "data_id",
				"type": "bytes32"
			}
		],
		"name": "bid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "data_id",
				"type": "bytes32"
			}
		],
		"name": "closeBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "countData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "dataOwn",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getDataDetails",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "data_id",
				"type": "bytes32"
			}
		],
		"name": "getDataDetailsById",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "data_id",
				"type": "bytes32"
			}
		],
		"name": "getHighestBid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "data_id",
				"type": "bytes32"
			}
		],
		"name": "whoOwns",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

//Intra-Farm Account

// Creating an Instance of web3_intra
// let web3_intra = new Web3(
//   new Web3.providers.HttpProvider("http://127.0.0.1:8061")
// );
var web3_intra;
var web3_inter;
var locals;
var farmContractAddress;
console.log(localStorage.getItem("web3_intra"))
console.log("LOCALCONTRACTADDRESS", localStorage.getItem("localContractAddress"))
let testFunction = constant.testFunction();

if (testFunction.length) {
  console.log("HELLOOOOOOOOOOOOOOOOOOO", testFunction)
  web3_intra = testFunction.addrManagerLocal;
  web3_inter = testFunction.addrManagerGlobal;
  console.log(web3_intra)
  console.log(web3_inter)
}

if (localStorage.getItem("web3_intra")) {
  web3_intra = localStorage.getItem("web3_intra");
}

if (localStorage.getItem("web3_inter")) {
  web3_inter = localStorage.getItem("web3_inter");
}

if (localStorage.getItem("localContractAddress")) {
  farmContractAddress = localStorage.getItem("localContractAddress");
}

// web3_intra = testFunction;

console.log("WEB:", web3_intra)
console.log("FARM CONTRACT:", farmContractAddress)


console.log("HELLOOOOOOOOOOOOOOOOOOOOOO", testFunction);
// web3_intra = testFunction.addrManagerLocal;

let account_intra, account_inter, farmContract;

//------------------------- web3_intra.eth.defaultAccount is not working  ---------------------------
if (web3_intra !== undefined) {
  web3_intra = new Web3(new Web3.providers.HttpProvider(web3_intra));
  let accounts = web3_intra.eth
    .getAccounts()
    .then((result) => {
      account_intra = result[0].toLowerCase() ;
      locals = account_intra;
      // account_intra = account_intra.toLowerCase(); 
      // console.log("CHECKING: ",  account_intra);
    });

  setTimeout(() => {
    console.log("The value of account_intra is ", account_intra);
  }, 1000);
  var balance;
  setTimeout(() => {
    let balances = web3_intra.eth
      .getBalance(account_intra)
      .then((e) => (balance = web3_intra.utils.fromWei(e, "ether")));
  }, 2000);

  //Farm Contract

  farmContract = new web3_intra.eth.Contract(ABI_Farm, farmContractAddress);
  console.log(farmContract)

  //Inter-Farm Account
  //make this dynamic  "http://${host}:${globalFMPort}"
  // var web3_inter_url = `http://${localStorage.getItem("host")}:${localStorage.getItem("globalFMPort")}`
  //  web3_inter = new Web3(
  //    new Web3.providers.HttpProvider(web3_inter_url)
  //  );
} else {
  console.log(web3_intra)
}

if (web3_inter !== undefined) {
  web3_inter = new Web3(new Web3.providers.HttpProvider(web3_inter));
  let accounts_inter = web3_inter.eth
    .getAccounts()
    .then((result) => (
      account_inter = result[0]));



  setTimeout(() => {
    console.log("The value of account_inter is ", account_inter);
  }, 1000);

  var balance;
  setTimeout(() => {
    let balances = web3_inter.eth
      .getBalance(account_inter)
      .then((e) => (balance = e));
  }, 2000);

  setTimeout(() => {
    balance = web3_inter.utils.fromWei(balance, "ether");
    console.log("The balance ", balance);
  }, 3000);

  //Bidding Contract
  var bidContractAddress = "0xA2E07c0a7F56D329c5Ee074A4f758E62fba65B4d";
  var bidContract = new web3_inter.eth.Contract(ABI_Bid, bidContractAddress);
} else {
  console.log("heloooooooooo", web3_inter)
}


export {
  web3_intra,
  farmContractAddress,
  farmContract,
  web3_inter,
  bidContractAddress,
  bidContract,
  account_inter,
  account_intra,
  balance,
  locals
};
