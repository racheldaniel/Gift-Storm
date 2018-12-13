import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import API from "./../../modules/API/API"


export default class DetailPurchased extends Component {
  state = {
    hover: false
  }

/*
  Function adds the purchased gift back to gift ideas, removes from purchased, and finds gifts and gift ideas again
*/
  moveGiftToIdeas = (friendId, giftName, giftId) => {
    let obj = {
      friendId: friendId,
      giftIdea: giftName
    }
    return API.saveData(`friend_giftIdeas`, obj)
    .then(this.props.deleteFriendGift(giftId))
    .then(() => this.props.findFriendGiftIdeas())
    .then(() => this.props.findFriendGifts())
  }

  render() {
    return (
      <React.Fragment>
        <ListGroupItem className="detailCard--li text-info"
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}>{this.props.gift.name}
          {
            (this.state.hover === true)
              ? <div>
                <i className="icon-trash float-right mx-2 " onClick={() => {
                  this.moveGiftToIdeas(this.props.friendOcc.friendId, this.props.gift.name, this.props.gift.id )

                }
                }></i>
              </div>
              : null
          }</ListGroupItem>
      </React.Fragment>

    )
  }
}
