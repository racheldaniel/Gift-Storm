import React, { Component } from 'react';
import { ListGroupItemText, ListGroupItem } from 'reactstrap';


export default class OccasionGift extends Component {


  render() {


    return (

        <ListGroupItem className="detailCard--li text-info">
          <ListGroupItemText>{this.props.gift.name}</ListGroupItemText>
        </ListGroupItem>



    )
  }
}
