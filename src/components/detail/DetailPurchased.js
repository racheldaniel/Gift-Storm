import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';


export default class DetailPurchased extends Component {
  render() {
    return (
      <React.Fragment>
        <ListGroupItem className="detailCard--li text-info">{this.props.gift.name}</ListGroupItem>
      </React.Fragment>

    )
  }
}
