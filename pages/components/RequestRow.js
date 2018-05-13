import React, { Component } from "react";
import { Button, Table, Radio, Form } from "semantic-ui-react";

import web3 from "../../ethereum/web3";
import vote from "../../ethereum/vote";

class RequestIndex extends Component {
  handleChange = (e, { value }) => this.setState({ value });
  //  value={candidate.name}
  //  checked={value === "sm"}

  render() {
    const { id, candidate, slogan, party } = this.props;
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
        <Cell>{id}</Cell>
        <Cell>{web3.utils.hexToAscii(candidate.name)}</Cell>
        <Cell>{candidate.age}</Cell>
        <Cell>{web3.utils.hexToAscii(candidate.slogan)}</Cell>
        <Cell>{web3.utils.hexToAscii(candidate.party)}</Cell>
      </Row>
    );
  }
}

export default RequestIndex;
