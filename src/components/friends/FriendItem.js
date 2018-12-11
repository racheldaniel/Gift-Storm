import React, { Component } from 'react';
import { ListGroupItem, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom"
import FriendOccasions from "./FriendOccasions"




export default class FriendItem extends Component {

  render() {
    return (
      <React.Fragment>
        <ListGroupItem className="friendListItem">
          <Row>
            <Col xs={10} className=" d-flex align-items-center text-center">
              <h3>{this.props.friend.name}</h3>

            </Col>

            <Col xs={2} >
              <Link className="nav-link" to={`/friends/${this.props.friend.id}`}>Details</Link>

            </Col>
          </Row>
          <Row >
            {
              this.props.friend.friend_occasions.map(friend_occasion =>
                <FriendOccasions key={friend_occasion.id}
                  friend_occasion={friend_occasion}
                  friend={this.props.friend}
                  friendOccasions={this.props.friendOccasions}
                  userOccasions={this.props.userOccasions} />)
            }

          </Row>
          <Row>
            <Col xs={10}>
            </Col>

            <Col xs={2} className="float-right" >
              <i className="icon-pencil float-right "
                onClick={() => {
                  // this.props.toggleEditGift(this.props.giftIdea)
                  console.log("click")
                }
                }></i>
              <i className="icon-trash float-right mx-2 " onClick={() => {
                this.props.deleteFriend(this.props.friend.id)
                .then(()=> this.props.getFriendOccasions(this.props.currentUser))
              }
              }></i>
            </Col>

          </Row>

        </ListGroupItem>


      </React.Fragment>

    )
  }
}
