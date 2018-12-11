import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';


export default class FriendFormOptions extends Component {
  render() {
    return (
      <React.Fragment>
        <FormGroup check>
          <Label htmlFor={this.props.occ.occasion.name} check>
            <Input type="checkbox" value={this.props.occ.occasion.name} onClick={(() =>
                this.props.onCheckboxClick(this.props.occ.id))} />{' '}
            {this.props.occ.occasion.name}
              </Label>
        </FormGroup>
        {
          (this.props.occ.occasion.groupHoliday === "0")
            ? <FormGroup>
              <Input type="date" defaultValue="Date" id={this.props.occ.id} onChange={((e) =>
                this.props.handleFieldChange(e))}/>{' '}
            </FormGroup>
            : null
        }


      </React.Fragment>

    )
  }
}
