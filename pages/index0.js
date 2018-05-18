import React, { Component } from "react";
import web3 from "../ethereum/web3";
import vote from "../ethereum/vote";
import Layout from "./components/Layout";
import { Link, Router } from "../routes";
import {
  Card,
  Button,
  Table,
  Header,
  Form,
  Label,
  Icon,
  Message,
  Input,
  Image
} from "semantic-ui-react";

//import icon_owner from "./assets/images/avatar/small/small0.jpg";

class VoteNextIndex extends Component {
  state = {
    value: "",
    voter: "",
    errorMessage: "",
    loading: false
  };

  //-----------------------------------------------------------
  // getInitialProps - First
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
  // renderCandidates - should be called with {this.renderCardCandidates()}
  //-----------------------------------------------------------
  renderCardCandidates() {
    const items = this.props.candidates.map(name => {
      return {
        header: name,
        description: name,
        fluid: false
      };
    });

    return <Card.Group items={items} />;
  }

  //-----------------------------------------------------------
  // renderRows - Nested Loop - just for list not submit.
  //-----------------------------------------------------------
  //renderRows() {
  //  return this.props.candidates.map((candidate, index) => {
  //    return <RequestRow key={index} id={index} candidate={candidate} />;
  //  });
  //}

  handleChange = (e, { value }) => {
    this.setState({ value });
    console.log(value);
  };

  //-----------------------------------------------------------
  // renderRows 2 - Due to Radio button
  //-----------------------------------------------------------
  renderRows() {
    return this.props.candidates.map((candidate, index) => {
      const { Row, Cell } = Table;
      return (
        <Row>
          <Cell>
            <Form.Radio
              value={candidate.name}
              onChange={this.handleChange}
              checked={this.state.value === candidate.name}
            />
          </Cell>
          <Cell>{index}</Cell>
          <Cell>
            <Link route={`/campaigns/${candidate.name}`}>
              <a>{web3.utils.hexToAscii(candidate.name)}</a>
            </Link>
          </Cell>
          <Cell>{candidate.age}</Cell>
          <Cell>{web3.utils.hexToAscii(candidate.slogan)}</Cell>
          <Cell>{web3.utils.hexToAscii(candidate.party)}</Cell>
        </Row>
      );
    });
  }

  //-----------------------------------------------------------
  // onSubmit
  //-----------------------------------------------------------
  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true });

    try {
      const accounts = await web3.eth.getAccounts();
      await vote.methods.voteForCandidate(this.state.value).send({
        from: this.state.voter
      });

      Router.pushRoute("/campaigns/showstatus");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    //this.setState({ loading: false, errorMessage: "" });
  };

  //-----------------------------------------------------------
  // render
  //-----------------------------------------------------------
  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h1>Make our Atlantis Better!!</h1>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Group>
            <Label as="a" color="orange" image>
              <img src="/static/images/small0.jpg" />
              Owner
              <Label.Detail>{this.props.owner}</Label.Detail>
            </Label>
          </Form.Group>
          <Form.Group>
            <Input
              label="Voter"
              placeholder="Input your address here."
              onChange={event => this.setState({ voter: event.target.value })}
            />
          </Form.Group>

          <p />
          <Form.Group inline>
            <Table>
              <Header>
                <Row>
                  <HeaderCell>Choose One</HeaderCell>
                  <HeaderCell>ID</HeaderCell>
                  <HeaderCell>Candidate Name</HeaderCell>
                  <HeaderCell>Age</HeaderCell>
                  <HeaderCell>Slogan</HeaderCell>
                  <HeaderCell>Party</HeaderCell>
                </Row>
              </Header>
              <Body>{this.renderRows()}</Body>
            </Table>
          </Form.Group>
          <Message error header="Opps!" content={this.state.errorMessage} />
          <Button
            floated="right"
            content="Vote"
            icon="thumbs up"
            primary
            loading={this.state.loading}
          />
        </Form>
      </Layout>
    );
  }
}

export default VoteNextIndex;
