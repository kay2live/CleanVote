import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";

//-------------------------------------------------------------
// Contribution ContributeForm
//-------------------------------------------------------------
class ContributeForm extends Component {
  render() {
    return (
      <Form>
        <Form.Field>
          <lable>Contribute to this candidate</lable>
          <Input label="ether" labelPosition="right" />
        </Form.Field>
        <Button icon="dollar" primary>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
