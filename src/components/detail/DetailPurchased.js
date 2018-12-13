import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';


export default class DetailPurchased extends Component {
  state = {
    hover: false
  }
  render() {
    return (
      <React.Fragment>
        <ListGroupItem className="detailCard--li text-info"
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}>{this.props.gift.name}
          {
            (this.state.hover === true)
              ? <div><i className="icon-pencil float-right "
              onClick={() => {
                console.log("editclick")
                // this.props.toggleEditGift(this.props.giftIdea)
              }
              }>
              </i>
                <i className="icon-trash float-right mx-2 " onClick={() => {
                  this.props.deleteFriendGift(this.props.gift.id)
                    .then(() => this.props.findFriendGifts())
                }
                }></i>
              </div>
              : null
          }</ListGroupItem>
      </React.Fragment>

    )
  }
}
