pragma solidity ^0.4.18;

contract Voting {

  //-----------------------------------------------------------------------
  // Candidate Members
  //-----------------------------------------------------------------------
  struct Candidate {
      bytes32 name;
      uint8 age;
      bytes32 slogan;
      bytes32 party;
  }

  Candidate[] public candidates;

  address public owner;
  //mapping (bytes32 => uint8) public votesReceived;
  struct Vote {
    bytes32 name;
    uint8 voteCount;
  }

  Vote[] public voteStatus;


  mapping (address => uint8) public voters;


  //Event
  event eCandidateList(bytes32 candidateName, uint arrayId);
  //event evalidCandidate(bytes32 candidateName, bytes32 _candidateName,uint arrayId);
  event eAlreadyVoted(address);

  //------------------------------------------------------------------------------------
  // Modifier
  //------------------------------------------------------------------------------------
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  //------------------------------------------------------------------------------------
  // Constructor
  //------------------------------------------------------------------------------------
  function Voting() public {
      owner = msg.sender;
  }

  //------------------------------------------------------------------------------------
  // createCandidates
  //------------------------------------------------------------------------------------
  function createCandidates(bytes32 _candidateName, uint8 _age,
    bytes32 _slogan, bytes32 _party) public onlyOwner  {
    uint _id = candidates.push(Candidate(_candidateName,_age,_slogan, _party)) -1;
    voteStatus.push(Vote(_candidateName,0));
    emit eCandidateList(_candidateName, _id);
  }

  //------------------------------------------------------------------------------------
  // voteForCandidate
  //------------------------------------------------------------------------------------
  function voteForCandidate(bytes32 _candidateName) public {
    require(validCandidate(_candidateName)); //validate candidateList

    if (voters[msg.sender] > 0) {
        emit eAlreadyVoted(msg.sender);
    } else {

        voteStatus[getVoteStatusIndex(_candidateName)].voteCount += 1;
        voters[msg.sender] = 1;
    }
  }

  //------------------------------------------------------------------------------------
  // validCandidate :
  //------------------------------------------------------------------------------------
  function validCandidate(bytes32 _candidateName) public returns (bool) {
    for(uint i = 0; i < candidates.length; i++) {
      //emit evalidCandidate(candidates[i].name, _candidateName, i);
      if (candidates[i].name == _candidateName) {
        return true;
      }
    }
    return false;
   }

   //------------------------------------------------------------------------------------
   // getVoteStatusIndex :
   //------------------------------------------------------------------------------------
   function getVoteStatusIndex(bytes32 _candidateName) public view returns (uint8){

     for(uint8 i = 0; i < voteStatus.length; i++) {
       //emit evalidCandidate(candidates[i].name, _candidateName, i);
       if (voteStatus[i].name == _candidateName) {
         return i;
       }
     }

   }


  //------------------------------------------------------------------------------------
  // viewReceivedCandidate :
  //------------------------------------------------------------------------------------
  function getReceivedCandidate(bytes32 _candidateName) public view returns (uint8){
    return (voteStatus[getVoteStatusIndex(_candidateName)].voteCount);
  }

  //------------------------------------------------------------------------------------
  // getNumberofCandidates :
  //------------------------------------------------------------------------------------
  function getNumberofCandidates() public view returns(uint){
    return (candidates.length);
  }

  //------------------------------------------------------------------------------------
  // getNumberofCandidates :
  //------------------------------------------------------------------------------------
  function getNumberofvotesReceived() public view returns(uint){
    return (voteStatus.length);
  }

  //------------------------------------------------------------------------------------
  // getCandidateDetail :
  //------------------------------------------------------------------------------------
  function getCandidateDetails(bytes32 _candidateName) public view returns(bytes32,uint8,bytes32,bytes32,uint){
    for(uint i = 0; i < candidates.length; i++) {
      //emit evalidCandidate(candidates[i].name, _candidateName, i);
      if (candidates[i].name == _candidateName) {
        return (
          candidates[i].name,
          candidates[i].age,
          candidates[i].slogan,
          candidates[i].party,
          i
          );
      }
    }
  }




}
