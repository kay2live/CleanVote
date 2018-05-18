import React, { Component } from "react";
import Layout from "../components/Layout";
import {
  Button,
  Label,
  Form,
  Input,
  Card,
  Grid,
  Image
} from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import vote from "../../ethereum/vote";
import { Link, Router } from "../../routes";
import ContributeForm from "../components/ContributeForm";

class VoteNextShowInfo extends Component {
  static async getInitialProps(props) {
    const candidname = props.query.address;

    const candidInfo = await vote.methods
      .getCandidateDetails(candidname)
      .call();

    return {
      name: candidInfo[0],
      age: candidInfo[1],
      slogan: candidInfo[2],
      party: candidInfo[3],
      imageidx: (parseInt(candidInfo[4]) + 1).toString()
    };
  }

  renderCards() {
    const { name, age, slogan, party, candidimage } = this.props;
    //"/static/images/large/candid" + (candidInfo[4] + 1).toString() + ".png"
    //<Image src={candidimage} />

    const items = [
      {
        header: web3.utils.hexToAscii(name),
        meta: "Name",
        description: ""
      },
      {
        header: age,
        meta: "Age",
        description: ""
      },
      {
        header: web3.utils.hexToAscii(slogan),
        meta: "Slogan",
        description: "",
        stype: { overflowWrap: "break-word" }
      },
      {
        header: web3.utils.hexToAscii(party),
        meta: "Party",
        description: ""
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    const candidimage = "/static/images/large/candid"
      .concat(this.props.imageidx)
      .concat(".png");

    return (
      <Layout>
        <h3>Candidate Details</h3>

        <p />
        <Grid>
          <Grid.Column width={6}>
            <Image src={candidimage} width="300" height="300" />
          </Grid.Column>
          <Grid.Column width={4}>{this.renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm />
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default VoteNextShowInfo;
