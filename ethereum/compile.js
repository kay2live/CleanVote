const path = require("path");
const fs = require("fs");
const solc = require("solc");

const votingPath = path.resolve(__dirname, "contracts", "Voting.sol");
const source = fs.readFileSync(votingPath, "utf8");

module.exports = solc.compile(source, 1).contracts[":Voting"];

/*
const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");

fs.removeSync(buildPath);

const votePath = path.resolve(__dirname, "contracts", "Voting.sol");
const source = fs.readFileSync(votePath, "utf8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
*/
