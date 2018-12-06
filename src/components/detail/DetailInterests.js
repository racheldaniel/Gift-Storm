import React, { Component } from 'react';
import { Badge } from 'reactstrap';


export default class DetailInterests extends Component {
  render() {
    return (
      <React.Fragment>
        <Badge className="mx-3 my-3 pill" color="warning" pill>Architecture</Badge>
        <Badge className="mx-3 my-3 pill" color="warning" pill>Norah</Badge>
        <Badge className="mx-3 my-3 pill" color="warning" pill>Needlepoint</Badge>
        <Badge className="mx-3 my-3 pill large" color="warning" pill>Hiking</Badge>
        <Badge className="mx-3 my-3 pill" color="warning" pill>Camping</Badge>
        <Badge className="mx-3 my-3 pill" color="warning" pill>Climbing</Badge>
        <Badge className="mx-3 my-3 pill large" color="warning" pill>Harry Potter</Badge>
        <Badge className="mx-3 my-3 pill" color="warning" pill>Reading</Badge>
        <Badge className="mx-3 my-3 pill" color="warning" pill>Running</Badge>
      </React.Fragment>

    )
  }
}
