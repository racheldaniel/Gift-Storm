import React, { Component } from 'react';
import { ListGroupItem  } from 'reactstrap';


export default class DetailInterests extends Component {
  state = {
    hover: false,
    id: ""
  }
  render() {
    return (
      <React.Fragment>
        <ListGroupItem  className="mx-3 my-3  detailCard--li text-info" color="primary"
          onMouseEnter={() => this.setState({ hover: true, id: this.props.interest.id })}
          onMouseLeave={() => this.setState({ hover: false, id: "" })}>{this.props.interest}
        {
          (this.state.hover === true)
            ? <div ><i className="icon-pencil float-right"></i>
            <i className="icon-trash mx-2 float-right" onClick={() => {
              this.props.deleteFriendInterest(this.props.id)
              .then(()=> this.props.findFriendInterests())
            }
            }
              ></i>
            </div>
            : null
        }
        </ListGroupItem >
      </React.Fragment>

    )
  }
}
