import React, { Component } from "react";
import { Form, Table, Label, Icon } from "semantic-ui-react";

class FormRadio extends Component {
  state = {
    value: ""
  };

  handleChange = (e, { value }) => this.setState({ value });

  onSubmit = event => {
    console.log(value);
  };

  render() {
    const { value } = this.state;
    const { Header, Row, HeaderCell, Body, Cell } = Table;

    return (
      <Form onSubmit={this.onSubmit}>
        <Label>
          <Icon name="mail" /> {this.state.value}
        </Label>

        <Form.Group inline>
          <Table>
            <Header>
              <HeaderCell>Choose One</HeaderCell>
              <HeaderCell>Name</HeaderCell>
            </Header>
            <Body>
              <Row>
                <Cell>
                  <Form.Radio
                    label="Small"
                    value="sm"
                    checked={value === "sm"}
                    onChange={this.handleChange}
                  />
                </Cell>
                <Cell>Abe</Cell>
              </Row>
              <Row>
                <Cell>
                  <Form.Radio
                    label="Medium"
                    value="md"
                    checked={value === "md"}
                    onChange={this.handleChange}
                  />
                </Cell>
                <Cell>Spiderman</Cell>
              </Row>
              <Row>
                <Cell>
                  <Form.Radio
                    label="Large"
                    value="lg"
                    checked={value === "lg"}
                    onChange={this.handleChange}
                  />
                </Cell>
                <Cell>Thor</Cell>
              </Row>
            </Body>
          </Table>
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default FormRadio;
