import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';


export default class FriendFormOptions extends Component {
  render() {
    return (
      <React.Fragment>
        <FormGroup check>
          <Label htmlFor={this.props.occ.occasion.name} check>
            <Input type="checkbox" value={this.props.occ.occasion.name} />{' '}
            {this.props.occ.occasion.name}
              </Label>
        </FormGroup>
        {
          (this.props.occ.occasion.groupHoliday === "0")
            ? <FormGroup>
              <Input type="text" defaultValue="Date" />{' '}
            </FormGroup>
            : null
        }


      </React.Fragment>

    )
  }
}
