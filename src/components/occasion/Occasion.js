import React, { Component } from 'react';
import { Container, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import OccasionList from "./OccasionList"
import API from "../../modules/API/API"
import "./Occasion.css"
import moment from 'moment'
export default class Occasion extends Component {
  state = {
    friendOccasions: [],
    isLoaded: false,
    dropdownOpen: false,
    dropdownValue: "Filter"
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

  //function controlling filter dropdown
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  //function to display selected filter as dropdown heading
  changeValue = (e) => {
    this.setState({ dropdownValue: e.currentTarget.textContent })
  }


  render() {
    const userOcc = this.props.userOccasions.find(a => a.id === parseInt(this.props.match.params.user_occasionId)) || {}


    return (
      <React.Fragment>
        {
          (this.state.isLoaded === true)
            ? <Container>
              <h1 className="text-center text-info my-5">{`${userOcc.occasion.name} Gift List`}</h1>
              {
                (userOcc.occasion.groupHoliday === "1")
                  ? <h4 className="text-center text-info my-3">{moment(userOcc.occasion.date).format("MMMM Do")}</h4>
                  : null
              }
              <Dropdown
                className="text-right text-info filterBtn"
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle color="danger" caret>
                  {this.state.dropdownValue}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.changeValue}>Giftless</DropdownItem>
                  <DropdownItem onClick={this.changeValue}>In Progress</DropdownItem>
                  <DropdownItem onClick={this.changeValue}>Complete</DropdownItem>
                  <DropdownItem onClick={this.changeValue}>All</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <OccasionList
                {...this.props}
                userOcc={userOcc}
                friendOccasions={this.state.friendOccasions}
                dropdownValue={this.state.dropdownValue}
              />
            </Container>
            : null
        }

      </React.Fragment>


    )
  }
}
