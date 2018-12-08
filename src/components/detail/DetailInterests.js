import React, { Component } from 'react';
import { Badge } from 'reactstrap';


export default class DetailInterests extends Component {
  render() {
    return (
      <React.Fragment>
        <Badge className="mx-3 my-3 pill" color="warning" pill>{this.props.interest}</Badge>
      </React.Fragment>

    )
  }
}
