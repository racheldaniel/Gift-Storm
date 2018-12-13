import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';


export default class EditFormUntracked extends Component {
  render() {
    return (
      <React.Fragment>
        <FormGroup check>
          <Label htmlFor={this.props.userOcc.occasion.name} check>
            <Input type="checkbox" value={this.props.userOcc.occasion.name} onClick={(() =>
                this.props.onAddCheckboxClick(this.props.userOcc.occasionId))} />{' '}
            {this.props.userOcc.occasion.name}
              </Label>
        </FormGroup>
        {
          (this.props.userOcc.occasion.groupHoliday === "0")
            ? <FormGroup>
              <Input type="date" defaultValue="Date" id={this.props.userOcc.id} onChange={((e) =>
                this.props.handleFieldChange(e))}
                />{' '}
            </FormGroup>
            : null
        }


      </React.Fragment>

    )
  }
}
