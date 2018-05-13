const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  //paste your account mnemonic
  "swift sing luxury half lawsuit fetch subway dove curtain senior small rabbit",
  //network token that you want to access
  "https://rinkeby.infura.io/Aza4NiEarYLBhUpPgmVU"
);
const web3 = new Web3(provider);

const deploy = async () => {
  //get accounts
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  // Use one of those accounts to deploy the contracts
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: "0x" + bytecode, arguments: [] })
    .send({
      from: accounts[0],
      gas: "1000000",
      gasPrice: web3.utils.toWei("2", "gwei")
    });

  console.log(interface);
  console.log("Contract deployed to ", result.options.address);
};
deploy();

/*
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
//const { interface, bytecode } = require("./compile");
const voting = require("./build/Voting.json");

const provider = new HDWalletProvider(
  //paste your account mnemonic
  "swift sing luxury half lawsuit fetch subway dove curtain senior small rabbit",
  //network token that you want to access
  "https://rinkeby.infura.io/Aza4NiEarYLBhUpPgmVU"
);
const web3 = new Web3(provider);

const deploy = async () => {
  //get accounts
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  // Use one of those accounts to deploy the contracts
  const result = await new web3.eth.Contract(JSON.parse(voting.interface))
    .deploy({ data: voting.bytecode })
    .send({
      from: accounts[0],
      gas: "1000000",
      gasPrice: web3.utils.toWei("2", "gwei")
    });

  //console.log(interface);
  console.log("Contract deployed to ", result.options.address);
};
deploy();
*/
