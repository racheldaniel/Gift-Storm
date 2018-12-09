import React, { Component } from 'react';
import { Container} from 'reactstrap';
import LandingList from "./LandingList"
import "./Landing.css"

export default class Landing extends Component{
  render () {
    return(
      <Container>
        <h1 className="text-center text-info my-5">Upcoming Celebrations</h1>
        <LandingList/>

      </Container>

    )
  }
}
