import React, { Component } from 'react';
import { Container } from 'reactstrap';
import OccasionList from "./OccasionList"
// import API from "../../modules/API/API"

export default class Occasion extends Component {
  // state = {
  //   friendOccasions: [],
  //   userOccasions: [],
  //   friends: [],
  //   isLoaded: false
  // }

  render() {
    const userOcc = this.props.userOccasions.find(a => a.id === parseInt(this.props.match.params.user_occasionId)) || {}

    return (
      <React.Fragment>
        {
          (this.state.isLoaded === true)
            ? <Container>
              <h1 className="text-center text-info my-5">Upcoming Celebrations</h1>
              <OccasionList
                friends={this.props.friends}
                userOccasions={this.props.userOccasions}
                userOcc={userOcc}
              />
            </Container>
            : null
        }

      </React.Fragment>


    )
  }
}
