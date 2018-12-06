import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';


export default class FriendFormOptions extends Component {
  render() {
    return (
      <React.Fragment>
        <FormGroup check>
          <Label htmlFor="birthday" check>
            <Input type="checkbox" value="birthday" />{' '}
            Birthday
              </Label>
        </FormGroup>
        <FormGroup check>
          <Input type="text" defaultValue="Date" />{' '}
        </FormGroup>
        <FormGroup check>
          <Label htmlFor="anniversary" check>
            <Input type="checkbox" value="anniversary" />{' '}
            Anniversary
              </Label>
        </FormGroup>
        <FormGroup check>
          <Input type="text" defaultValue="Date" />{' '}
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            Mother's Day
              </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            Father's Day
              </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            Valentine's Day
              </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            Christmas
              </Label>
        </FormGroup>

      </React.Fragment>

    )
  }
}
