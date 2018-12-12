import React, { Component } from 'react';
import { Container } from 'reactstrap';
import OccasionList from "./OccasionList"
import API from "../../modules/API/API"
import "./Occasion.css"

export default class Occasion extends Component {
  state = {
    friendOccasions: [],
    isLoaded: false
  }

   //this function will get friend occasions for this specific user occasion with friend details expanded and gifts for that friend embedded
   getFriendOccasions = (currentUser) => {
    const userOcc = this.props.userOccasions.find(a => a.id === parseInt(this.props.match.params.user_occasionId)) || {}
    return API.getData(`friend_occasions?userId=${currentUser}&user_occasionId=${userOcc.id}&_expand=friend&_embed=gifts`)
      .then((friendOccasions) => this.setState({ friendOccasions: friendOccasions, isLoaded: true }))
  }

  componentDidMount() {
    this.getFriendOccasions(this.props.currentUser)
  }

  render() {
    const userOcc = this.props.userOccasions.find(a => a.id === parseInt(this.props.match.params.user_occasionId)) || {}

    return (
      <React.Fragment>
        {
          (this.state.isLoaded === true)
            ? <Container>
              <h1 className="text-center text-info my-5">{`${userOcc.occasion.name} Gift List`}</h1>
              <h5 className="text-center text-info my-3">{userOcc.occasion.date}</h5>
              <OccasionList
                friends={this.props.friends}
                userOccasions={this.props.userOccasions}
                userOcc={userOcc}
                friendOccasions={this.state.friendOccasions}
              />
            </Container>
            : null
        }

      </React.Fragment>


    )
  }
}
