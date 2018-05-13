import React, { Component } from "react";
import Layout from "../components/Layout";
import { Button, Checkbox, Form, Input, Message } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import vote from "../../ethereum/vote";
import { Router } from "../../routes";

class VoteNextNewCandidate extends Component {
  //-----------------------------------------------------------
  // getInitialProps
  //-----------------------------------------------------------
  static async getInitialProps() {
    const owner = await vote.methods.owner().call();

    const numberOfCandididates = await vote.methods
      .getNumberofCandidates()
      .call();

    const candidates = await Promise.all(
      Array(parseInt(numberOfCandididates))
        .fill()
        .map((element, index) => {
          return vote.methods.candidates(index).call();
        })
    );

    return { owner, candidates };
  }

  //-----------------------------------------------------------
  // render
  //-----------------------------------------------------------
  render() {
    return <h3>Candidate Info</h3>;
  }
}

export default VoteNextNewCandidate;
