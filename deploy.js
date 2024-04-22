const { ethers } = require("ethers");
const fs = require("fs");

// abi and bytecode - read from files

const ABI = JSON.parse(fs.readFileSync("contracts/build/storage_sol_Storage.abi"));
const bytecode = fs.readFileSync("contracts/build/storage_sol_Storage.bin");

//connect to the blockchain network
const provider = new ethers.getDefaultProvider("HTTP://127.0.0.1:7545"); //for mainnnet or testnet get from infura.io
const hexPrivateKey = new Buffer.from("0xdba23cf4af53e81dbed83fbda07c94d617f83a40e3db1b08b748dfca5b182d76", "hex") //store in .env
const signer = new ethers.Wallet(hexPrivateKey, provider);  //sign the txn.

//function - to deploy smart contract on blockchain network

async function deploy(){
    const factory = new ethers.ContractFactory(ABI, bytecode, signer);
    const contract = await factory.deploy();
    
    const deployContract = await contract.deployed(); //wait till deployed

    console.log("Deployed Contract Address: ", deployContract.address);
}

deploy();
