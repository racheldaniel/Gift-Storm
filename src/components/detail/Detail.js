import React, { Component } from 'react';
import {
  ListGroup, Container, Card, CardText, CardDeck,
  CardBody, CardHeader
} from 'reactstrap';

import DetailInterests from "./DetailInterests"
import DetailGifts from "./DetailGifts"
import DetailCelebrations from "./DetailCelebrations"
import DetailInterestForm from "./DetailInterestForm"
import DetailGiftForm from "./DetailGiftForm"
import EditInterestForm from "./EditInterestForm"
import EditGiftForm from "./EditGiftForm"
import "./Detail.css"
import API from "./../../modules/API/API"


export default class FriendDetail extends Component {
  state = {
    friendOccGifts: [],
    userOccasions: [],
    friendDetail: [],
    friendInterests: [],
    friendGiftIdeas: [],
    currentlyEditing: "",
    isLoaded: false,
    interestModal: false,
    editInterestModal: false,
    editGiftModal: false,
    editPurchasedModal: false,
    giftModal: false
  }
  /*
  function fetches this friend's occasions and corresponding gifts with user-occasion entity embedded. It then changes the date to reflect current or upcoming year depending on whether the date has already passed. Method to reset date pulled from the following post: https://stackoverflow.com/a/20409421

  This array is used for render of celebrations on friend detail page
  */


  findFriendGifts = () => {
    const friend = this.props.friends.find(a => a.id === parseInt(this.props.match.params.friendId)) || {}

    return API.getData(`friend_occasions?friendId=${friend.id}&_embed=gifts`)
      .then((friendOccGifts) => {
        friendOccGifts.forEach((friendOcc) => {
          let date = friendOcc.date.split("-")
          let currentYear = new Date().getFullYear()
          let newDate = new Date(currentYear, date[1] - 1, date[2])
          let today = new Date().valueOf()
          if(newDate.valueOf() < today){
            newDate.setFullYear(currentYear + 1)
          }
          friendOcc.date = newDate
        })
        friendOccGifts.sort((a, b) => a.date - b.date)
        this.setState({ friendOccGifts: friendOccGifts, isLoaded: true })
      })
  }

  //function fetches friend data and sets state
  findFriend = () => {
    const friend = this.props.friends.find(a => a.id === parseInt(this.props.match.params.friendId)) || {}
    return API.getData(`friends?id=${friend.id}`)
      .then((friendDetail) => this.setState({ friendDetail: friendDetail }))
  }

  //this function will get all user occasions expanded with the occasion details , then set state in this component
  getUserOccasions = (currentUser) => {
    return API.getData(`user_occasions?userId=${currentUser}&_expand=occasion`)
      .then((userOccasions) => this.setState({ userOccasions: userOccasions }))
  }

  findFriendInterests = () => {
    const friendId = this.props.friends.find(a => a.id === parseInt(this.props.match.params.friendId)).id || {}
    return API.getData(`friend_interests?friendId=${friendId}`)
      .then((friendInterests) => this.setState({ friendInterests: friendInterests }))
  }

  findFriendGiftIdeas = () => {
    const friendId = this.props.friends.find(a => a.id === parseInt(this.props.match.params.friendId)).id || {}
    return API.getData(`friend_giftIdeas?friendId=${friendId}`)
      .then((friendGiftIdeas) => this.setState({ friendGiftIdeas: friendGiftIdeas }))
  }
  saveFriendInterest = (obj) => {
    return API.saveData(`friend_interests`, obj)
  }

  saveFriendGift = (obj) => {
    return API.saveData(`friend_giftIdeas`, obj)
  }

  savePurchasedGift = (obj) => {
    return API.saveData(`gifts`, obj)
  }

  deleteFriendInterest = (id) => {
    return API.deleteData(`friend_interests`, id)
  }

  deleteFriendGiftIdea = (id) => {
    return API.deleteData(`friend_giftIdeas`, id)
  }

  deleteFriendGift = (id) => {
    return API.deleteData(`gifts`, id)
  }


  editFriendInterest = (obj, id) => {
    return API.editData(`friend_interests`, obj, id)
  }


  editFriendGiftIdea = (obj, id) => {
    return API.editData(`friend_giftIdeas`, obj, id)
  }

  currentlyEditing = (id) => {
    return this.setState({ currentlyEditing: id })
  }



  componentDidMount() {
    this.getUserOccasions(this.props.currentUser)
      .then(() => this.findFriendInterests())
      .then(() => this.findFriendGiftIdeas())
      .then(() => this.findFriend())
      .then(() => this.findFriendGifts())
  }

  toggleInterest = () => {
    this.setState({
      interestModal: !this.state.interestModal,
    })
  }

  toggleGift = () => {
    this.setState({
      giftModal: !this.state.giftModal,
    })
  }

  toggleEditInterest = (interest) => {
    this.setState({
      editInterestModal: !this.state.editInterestModal,
      currentlyEditing: interest
    })
  }

  toggleEditGiftIdea = (giftIdea) => {
    this.setState({
      editGiftModal: !this.state.editGiftModal,
      currentlyEditing: giftIdea
    })
  }



  toggleGiftStatus = (giftStatus, id) => {
    let obj = {}
    if (giftStatus === 0) {
      obj = {
        giftStatus: 1
      }
    } else {
      obj = {
        giftStatus: 0
      }
    }
    return API.editData(`friend_occasions`, obj, id)
      .then(() => this.findFriendGifts())
  }

  render() {
    const friend = this.props.friends.find(a => a.id === parseInt(this.props.match.params.friendId)) || {}

    return (
      <React.Fragment>
        {
          (this.state.isLoaded === true)
            ? <Container>
              <h1 className="text-center text-info my-5">{`${friend.name}'s Gift List`}</h1>
              <CardDeck>
                <Card className="detailCard">
                  <CardBody>
                    <CardHeader className="detailCard--Heading text-center" id="interest--head"><h2>Interests</h2></CardHeader>
                    <CardText className=" d-flex align-items-center flex-wrap text-center">
                      {
                        this.state.friendInterests.map(interest =>
                          <DetailInterests
                            key={interest.id}
                            interest={interest}
                            friendInterests={this.state.friendInterests}
                            deleteFriendInterest={this.deleteFriendInterest}
                            findFriendInterests={this.findFriendInterests}
                            toggleEditInterest={this.toggleEditInterest}
                            currentlyEditing={this.currentlyEditing}
                          />
                        )
                      }

                    </CardText>
                    <i className="icon-plus float-right " onClick={(e) => {
                      this.toggleInterest()
                    }}></i>
                  </CardBody>
                </Card>

                <Card className="detailCard">
                  <CardBody>
                    <CardHeader className="detailCard--Heading text-center" id="gift--head"><h2>Gift Ideas</h2></CardHeader>
                    <CardText className=" d-flex align-items-center flex-wrap">
                      <ListGroup className="detailCard--ul ">
                        {
                          this.state.friendGiftIdeas.map(giftIdea =>
                            <DetailGifts
                              key={giftIdea.id}
                              giftIdea={giftIdea}
                              deleteFriendGiftIdea={this.deleteFriendGiftIdea}
                              toggleEditGiftIdea={this.toggleEditGiftIdea}
                              findFriendGiftIdeas={this.findFriendGiftIdeas}
                            />
                          )
                        }
                      </ListGroup>
                    </CardText>
                    <i className="icon-plus float-right " onClick={(e) => {
                      this.toggleGift()
                    }}></i>
                  </CardBody>
                </Card>
              </CardDeck>
              <ListGroup className="mt-5">
                <h3 className="text-center text-info">Celebrations</h3>
                {
                  this.state.friendOccGifts.map(friendOcc =>
                    <DetailCelebrations
                      key={friendOcc.id}
                      friend={friend}
                      friendOcc={friendOcc}
                      friendDetail={this.state.friendDetail}
                      userOccasions={this.state.userOccasions}
                      friendOccGifts={this.state.friendOccGifts}
                      toggleGiftStatus={this.toggleGiftStatus}
                      findFriendGifts={this.findFriendGifts}
                      findFriendGiftIdeas={this.findFriendGiftIdeas}
                      deleteFriendGift={this.deleteFriendGift}
                    />
                  )
                }
              </ListGroup>
            </Container>
            : null
        }
        <DetailInterestForm
          friend={friend}
          toggleInterest={this.toggleInterest}
          interestModal={this.state.interestModal}
          saveFriendInterest={this.saveFriendInterest}
          findFriendInterests={this.findFriendInterests}
        />
        <DetailGiftForm
          friend={friend}
          userOccasions={this.state.userOccasions}
          friendOccGifts={this.state.friendOccGifts}
          toggleGift={this.toggleGift}
          giftModal={this.state.giftModal}
          saveFriendGift={this.saveFriendGift}
          findFriendGiftIdeas={this.findFriendGiftIdeas}
          savePurchasedGift={this.savePurchasedGift}
          findFriendGifts={this.findFriendGifts}
        />
        <EditInterestForm
          friend={friend}
          userOccasions={this.state.userOccasions}
          friendOccGifts={this.state.friendOccGifts}
          toggleEditInterest={this.toggleEditInterest}
          editInterestModal={this.state.editInterestModal}
          findFriendInterests={this.findFriendInterests}
          currentlyEditing={this.state.currentlyEditing}
          editFriendInterest={this.editFriendInterest}
        />
        <EditGiftForm
          friend={friend}
          userOccasions={this.state.userOccasions}
          friendOccGifts={this.state.friendOccGifts}
          toggleEditGiftIdea={this.toggleEditGiftIdea}
          editGiftModal={this.state.editGiftModal}
          findFriendGiftIdeas={this.findFriendGiftIdeas}
          findFriendGifts={this.findFriendGifts}
          currentlyEditing={this.state.currentlyEditing}
          savePurchasedGift={this.savePurchasedGift}
          deleteFriendGiftIdea={this.deleteFriendGiftIdea}
          editFriendGiftIdea={this.editFriendGiftIdea}
        />

      </React.Fragment>

    );
  }
}
