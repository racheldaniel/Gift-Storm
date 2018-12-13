import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';


export default class FriendFormOptions extends Component {
  render() {
    return (
      <React.Fragment>
        <FormGroup check>
          <Label htmlFor={this.props.occ.occasion.name} check>
            <Input type="checkbox" value={this.props.occ.occasion.name} onClick={(() =>
                this.props.onCheckboxClick(this.props.occ.occasionId))} />{' '}
            {this.props.occ.occasion.name}
              </Label>
        </FormGroup>
        {
          (this.props.occ.occasion.groupHoliday === "0")
            ? <FormGroup>
              <Input type="date" defaultValue="Date" id={this.props.occ.id} onChange={((e) =>
                this.props.handleFieldChange(e))}
                //TODO: this currently isn't working-- need date to be mandatory if box is checked
                required= {
                  (this.props.friendOccasions.includes(this.props.occ.id))
                  ? "true"
                  : null
                }
                />{' '}
            </FormGroup>
            : null
        }


      </React.Fragment>

    )
  }
}
