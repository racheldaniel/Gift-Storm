import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';


export default class DetailGifts extends Component {
  render() {
    return (
      <React.Fragment>
        <ListGroupItem className="detailCard--li">{this.props.giftIdea}</ListGroupItem>
      </React.Fragment>

    )
  }
}
