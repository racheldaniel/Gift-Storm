import React, { Component } from 'react';
import { Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import LandingList from "./LandingList"
import "./Landing.css"
import API from "./../../modules/API/API"
import moment from "moment"

export default class Landing extends Component {
  state = {
    friendOccasions: [],
    occasionGifts: [],
    userOccasions: [],
    isLoaded: false,
    uniqueFriendOccs: [],
    currentDate: "",
    dropdownOpen: false,
    dropdownValue: "Filter"
  }

  setCurrentDate = () => {
    let currentDate = new Date()
    return this.setState({ currentDate: moment(currentDate).format('l') })
  }



  getOccasionGifts = () => {
    return API.getData(`friend_occasions?_embed=gifts`)
      .then((occasionGifts) =>
        this.setState({ occasionGifts: occasionGifts })
      )
  }

  //function controlling filter dropdown
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }


  /*
  this function will get all friend occasions, then change the date to reflect current or upcoming year depending on whether the date has already passed. Method to reset date pulled from the following post: https://stackoverflow.com/a/20409421

  The function then sets state with both friend occasions and friends, which still have occasions embedded. API calls need to be drier, but work for now.
  */

  getFriendOccasions = (currentUser) => {
    return API.getData(`friends?userId=${currentUser}&_embed=friend_occasions`)
      .then((friends) => {
        let friendOccasions = []
        friends.forEach((friend) => {
          friend.friend_occasions.forEach((friendOcc) => {
            friendOccasions.push(friendOcc)
          })
        })
        friendOccasions.forEach((friendOcc) => {
          let date = friendOcc.date.split("-")
          let currentYear = new Date().getFullYear()
          let newDate = new Date(currentYear, date[1] - 1, date[2])
          let today = new Date().valueOf()
          if (newDate.valueOf() < today) {
            newDate.setFullYear(currentYear + 1)
          }
          friendOcc.date = newDate
        })
        friendOccasions.sort((a, b) => a.date - b.date)
        this.setState({ friendOccasions: friendOccasions, friends: friends })
      })
  }

  //this function will get all user occasions expanded with the occasion details , then set state in this component
  getUserOccasions = (currentUser) => {
    return API.getData(`user_occasions?userId=${currentUser}&_expand=occasion`)
      .then((userOccasions) => this.setState({ userOccasions: userOccasions }))
  }

  //function to display selected filter as dropdown heading
  changeValue = (e) => {
    this.setState({ dropdownValue: e.currentTarget.textContent })
  }

  /*
  function iterates over userOccasions and creates an array of friend occasions with the corresponding user_occasionId.

  It iterates over that new array and creates an object with a key of the user_occasionId and value of either complete, in progress, or null (depending on gifting status of all friend occasions for that user Occ).

  Those objects are pushed into an array, which is used to set state. This will be used for icon generation in LandingItem
  */

  setUserOccasionState = () => {
    let statuses = []

    this.state.userOccasions.forEach((userOcc) => {
      let count = 0
      let obj = {}
      let complete = true

      let friendOccs = this.state.occasionGifts.filter(friendOcc =>
        friendOcc.user_occasionId === userOcc.id
      )

      friendOccs.forEach((friendOcc) => {
        count += friendOcc.gifts.length
        if (friendOcc.giftStatus === 0) {
          complete = false
        }
        console.log(friendOcc, friendOcc.giftStatus, complete)
      })
      if (complete === true) {
        obj[userOcc.id] = "complete"
      } else if (complete === false && count > 0) {
        obj[userOcc.id] = "inProgress"
      } else {
        obj[userOcc.id] = "none"
      }
      console.log(userOcc, friendOccs, obj)
      statuses.push(obj)

    })

    return this.setState({ statuses: statuses })
  }


  // Function iterates over friendOccasions and returns an array containing only those with unique user_occasion Id's
  findUniqueOccasions = () => {
    let uniqueOccasions = []
    this.state.friendOccasions.forEach((friendOcc) => {
      let count = 0
      let userOcc = this.state.userOccasions.find(occ =>
        occ.id === friendOcc.user_occasionId
      )
      uniqueOccasions.forEach((unique) => {
        if (unique.user_occasionId === friendOcc.user_occasionId && userOcc.occasion.groupHoliday === "1") {
          count += 1
        }
      })
      if (count === 0) {
        uniqueOccasions.push(friendOcc)
      }
    })
    return this.setState({ uniqueFriendOccs: uniqueOccasions, isLoaded: true })
  }

  componentDidMount() {
    this.getFriendOccasions(this.props.currentUser)
      .then(() => this.getOccasionGifts())
      .then(() => this.getUserOccasions(this.props.currentUser))
      .then(() => this.setUserOccasionState())
      .then(() => this.setCurrentDate())
      .then(() => this.findUniqueOccasions())

  }

  render() {

    return (
      <React.Fragment>
        {
          (this.state.isLoaded === true)
            ? <Container>
              <h1 className="text-center text-info my-5">Upcoming Celebrations</h1>
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
              <LandingList
                occasionGifts={this.state.occasionGifts}
                friendOccasions={this.state.friendOccasions}
                friends={this.state.friends}
                uniqueFriendOccs={this.state.uniqueFriendOccs}
                userOccasions={this.state.userOccasions}
                statuses={this.state.statuses}
                dropdownValue={this.state.dropdownValue}
              />
            </Container>
            : null
        }

      </React.Fragment>


    )
  }
}
