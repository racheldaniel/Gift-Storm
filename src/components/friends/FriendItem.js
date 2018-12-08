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

            <Col xs={2} className="text-center" >
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

        </ListGroupItem>


      </React.Fragment>

    )
  }
}
