import web3 from "./web3";

//-----------------------------------------------------------------------
// Contract Address
//-----------------------------------------------------------------------
const address = "0x9A372FC7E22F7A7E2528beB5C26c2315252D9975";

//-----------------------------------------------------------------------
// ABI
//-----------------------------------------------------------------------
const abi = [
  {
    constant: false,
    inputs: [
      { name: "_candidateName", type: "bytes32" },
      { name: "_age", type: "uint8" },
      { name: "_slogan", type: "bytes32" },
      { name: "_party", type: "bytes32" }
    ],
    name: "createCandidates",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_candidateName", type: "bytes32" }],
    name: "getVoteStatusIndex",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "candidates",
    outputs: [
      { name: "name", type: "bytes32" },
      { name: "age", type: "uint8" },
      { name: "slogan", type: "bytes32" },
      { name: "party", type: "bytes32" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_candidateName", type: "bytes32" }],
    name: "validCandidate",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "voteStatus",
    outputs: [
      { name: "name", type: "bytes32" },
      { name: "voteCount", type: "uint8" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getNumberofvotesReceived",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "voters",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_candidateName", type: "bytes32" }],
    name: "getCandidateDetails",
    outputs: [
      { name: "", type: "bytes32" },
      { name: "", type: "uint8" },
      { name: "", type: "bytes32" },
      { name: "", type: "bytes32" },
      { name: "", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_candidateName", type: "bytes32" }],
    name: "voteForCandidate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_candidateName", type: "bytes32" }],
    name: "getReceivedCandidate",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getNumberofCandidates",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "candidateName", type: "bytes32" },
      { indexed: false, name: "arrayId", type: "uint256" }
    ],
    name: "eCandidateList",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "", type: "address" }],
    name: "eAlreadyVoted",
    type: "event"
  }
];

export default new web3.eth.Contract(abi, address);
