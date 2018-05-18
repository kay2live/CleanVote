import React, { Component } from "react";
import Layout from "../components/Layout";
import { Button, Label, Form, Input, Table } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import vote from "../../ethereum/vote";
import { Link, Router } from "../../routes";

class VoteNextShowStatus extends Component {
  //-----------------------------------------------------------
  // getInitialProps - First
  //-----------------------------------------------------------

  static async getInitialProps() {
    const owner = await vote.methods.owner().call();

    const numberOfVoted = await vote.methods.getNumberofvotesReceived().call();

    const voteStatus = await Promise.all(
      Array(parseInt(numberOfVoted))
        .fill()
        .map((element, index) => {
          return vote.methods.voteStatus(index).call();
        })
    );

    return { owner, voteStatus };
  }

  //-----------------------------------------------------------
  // renderRows 2 - Due to Radio button
  //-----------------------------------------------------------
  renderRows() {
    return this.props.voteStatus.map((vote, index) => {
      const { Row, Cell } = Table;
      return (
        <Row>
          <Cell>{index + 1}</Cell>
          <Cell>{web3.utils.hexToAscii(vote.name)}</Cell>
          <Cell>{vote.voteCount}</Cell>
        </Row>
      );
    });
  }

  //-----------------------------------------------------------
  // render
  //-----------------------------------------------------------

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h1>Current Status</h1>

        <Form>
          <Form.Group>
            <Label as="a" color="orange" image>
              <img src="/static/images/small0.jpg" />
              Owner
              <Label.Detail>{this.props.owner}</Label.Detail>
            </Label>
          </Form.Group>

          <p />
          <Form.Group inline>
            <Table>
              <Header>
                <Row>
                  <HeaderCell>ID</HeaderCell>
                  <HeaderCell>Candidate Name</HeaderCell>
                  <HeaderCell>Vote Count</HeaderCell>
                </Row>
              </Header>
              <Body>{this.renderRows()}</Body>
            </Table>
          </Form.Group>

          <Link route="/">
            <Button floated="right" content="Home" icon="home" primary />
          </Link>
        </Form>
      </Layout>
    );
  }
}

export default VoteNextShowStatus;
