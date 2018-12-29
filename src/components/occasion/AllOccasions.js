import React, { Component} from 'react';
import { Link } from "react-router-dom"
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap';
import "./Occasion.css"


export default class AllOccasions extends Component {
  state = {

    isLoaded: false
  }


  // componentDidMount() {
  //   this.getFriendOccasions(this.props.currentUser)
  // }

  render() {


    return (
      <React.Fragment>
        <h1 className="text-center text-info my-4">Your Occasions</h1>
        <div className="allOccasions text-center">
          {
            this.props.userOccasions.map(userOcc =>
              <Card className="occasionCard" color="light" key={userOcc.id}>
                <CardImg top width="100%" src={userOcc.occasion.imgLg} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{userOcc.occasion.name}</CardTitle>

                  <Link className="nav-link" to={`/occasions/${userOcc.id}`}>Details</Link>

                </CardBody>
              </Card>
            )

          }

        </div>

      </React.Fragment>


    )
  }
}
