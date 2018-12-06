import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';


export default class DetailPurchased extends Component {
  render() {
    return (
      <React.Fragment>
        <ListGroupItem className="detailCard--li">Dobby Socks</ListGroupItem>
        <ListGroupItem className="detailCard--li">Needlepoint Pattern Book</ListGroupItem>
      </React.Fragment>

    )
  }
}
