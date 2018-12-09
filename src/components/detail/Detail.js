import React, { Component } from 'react';
import {
  ListGroup, Container, Card, CardText, CardDeck,
  CardBody, CardHeader
} from 'reactstrap';

import DetailInterests from "./DetailInterests"
import DetailGifts from "./DetailGifts"
import DetailCelebrations from "./DetailCelebrations"

import "./Detail.css"
import API from "./../../modules/API/API"


export default class FriendDetail extends Component {
  state = {
    friendOccGifts: [],
    userOccasions: [],
    friendDetail: [],
    isLoaded: false
  }
  //function fetches this friend's occasions and corresponding gifts with user-occasion entity embedded. This can be used to find image from occasion array
  findFriendGifts = () => {
    const friend = this.props.friends.find(a => a.id === parseInt(this.props.match.params.friendId)) || {}
    return API.getData(`friend_occasions?friendId=${friend.id}&_embed=gifts`)
      .then((friendOccGifts) => this.setState({ friendOccGifts: friendOccGifts, isLoaded: true }))
  }

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

  componentDidMount() {
    this.getUserOccasions(this.props.currentUser)
      .then(() => this.findFriend())
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
                        this.state.friendDetail[0].interests.map(interest =>
                          <DetailInterests
                            interest={interest}
                            friendDetail={this.state.friendDetail}
                          />
                        )
                      }


                    </CardText>
                    <i className="icon-plus float-right "></i>
                  </CardBody>
                </Card>

                <Card className="detailCard">
                  <CardBody>
                    <CardHeader className="detailCard--Heading text-center" id="gift--head"><h2>Gift Ideas</h2></CardHeader>
                    <CardText className=" d-flex align-items-center flex-wrap">
                      <ListGroup className="detailCard--ul ">
                        {
                          this.state.friendDetail[0].giftIdeas.map(giftIdea =>
                            <DetailGifts
                              giftIdea={giftIdea}
                              friendDetail={this.state.friendDetail}
                            />
                          )
                        }
                      </ListGroup>
                    </CardText>
                    <i className="icon-plus float-right "></i>
                  </CardBody>
                </Card>
              </CardDeck>
              <ListGroup className="mt-5">
                <h3 className="text-center text-info">Celebrations</h3>
                {
                  this.state.friendOccGifts.map(friendOcc =>
                    <DetailCelebrations
                      friend={friend}
                      friendOcc={friendOcc}
                      friendDetail={this.state.friendDetail}
                      userOccasions={this.state.userOccasions}
                      friendOccGifts={this.state.friendOccGifts}
                    />
                  )
                }
              </ListGroup>
            </Container>
            : null
        }
      </React.Fragment>

    );
  }
}
