import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';


export default class DetailGifts extends Component {
  render() {
    return (
      <React.Fragment>
        <ListGroupItem className="detailCard--li">Climbing Mat</ListGroupItem>
        <ListGroupItem className="detailCard--li">Camping Coffee Pot</ListGroupItem>
        <ListGroupItem className="detailCard--li">Running Shoes</ListGroupItem>
      </React.Fragment>

    )
  }
}
