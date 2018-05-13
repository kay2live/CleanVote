import React, { Component } from "react";
import Layout from "../components/Layout";
import { Button, Checkbox, Form, Input, Message } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import vote from "../../ethereum/vote";
import { Router } from "../../routes";

class VoteNextNewCandidate extends Component {
  state = {
    value: "",
    candidateName: "",
    candidateAge: "",
    candidateParty: "",
    candidateSlogan: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true });

    try {
      const accounts = await web3.eth.getAccounts();
      await vote.methods
        .createCandidates(
          web3.utils.asciiToHex(this.state.candidateName),
          this.state.candidateAge,
          web3.utils.asciiToHex(this.state.candidateSlogan),
          web3.utils.asciiToHex(this.state.candidateParty)
        )
        .send({
          from: accounts[0]
        });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
      console.log("AAA");
    }

    //this.setState({ loading: false, errorMessage: "" });
  };

  render() {
    return (
      <Layout>
        <h1>Create a candidate.</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <Input
              icon="id badge"
              label="Name"
              placeholder="David"
              value={this.state.candidateName}
              onChange={event =>
                this.setState({ candidateName: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <Input
              label="Age"
              icon="heart"
              placeholder="45"
              value={this.state.candidateAge}
              onChange={event =>
                this.setState({ candidateAge: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <Input
              icon="hand peace"
              label="Slogan"
              placeholder="More food"
              value={this.state.candidateSlogan}
              onChange={event =>
                this.setState({ candidateSlogan: event.target.value })
              }
            />
          </Form.Field>

          <Form.Group widths="equal">
            <Form.Field
              icon="users"
              control="select"
              onChange={event =>
                this.setState({ candidateParty: event.target.value })
              }
            >
              <option value="The Republican">The Republican</option>
              <option value="The Deplomatic">The Deplomatic</option>
              <option value="The Justice">The Justice</option>
              <option value="The Marvel">The Marvel</option>
            </Form.Field>
          </Form.Group>

          <Message error header="Opps!" content={this.state.errorMessage} />
          <Button
            type="submit"
            floated="right"
            content="Create"
            icon="add circle"
            loading={this.state.loading}
            primary
          />
        </Form>
      </Layout>
    );
  }
}

export default VoteNextNewCandidate;
/*
  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true });

    try {
      const accounts = await web3.eth.getAccounts();
      await vote.methods
        .createCandidates(
          web3.utils.asciiToHex(this.state.candidateName),
          this.state.candidateAge
        )
        .send({
          from: accounts[0]
        });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, errorMessage: "" });
  };
  */
/*
  render() {
    return (
      <Layout>
        <h1>Create a candidate.</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <Input
              size="small"
              icon="tags"
              iconPosition="left"
              labelPosition="right"
              label={{ basic: true, content: "Name" }}
              value={this.state.candidateName}
              onChange={event =>
                this.setState({ candidateName: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <Input
              size="small"
              icon="tags"
              iconPosition="left"
              labelPosition="right"
              label={{ basic: true, content: "Age" }}
              value={this.state.candidateAge}
              onChange={event =>
                this.setState({ candidateAge: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Opps!" content={this.state.errorMessage} />
          <Button type="submit" loading={this.state.loading} primary>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
  */
