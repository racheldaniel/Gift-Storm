import React, { Component } from 'react';
import { ListGroupItem  } from 'reactstrap';


export default class DetailInterests extends Component {
  state = {
    hover: false,
  }
  render() {
    return (
      <React.Fragment>
        <ListGroupItem  className="mx-3 my-3  detailCard--li text-info" color="primary"
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false, id: "" })}>{this.props.interest.interest}
        {
          (this.state.hover === true)
            ? <div ><i className="icon-pencil float-right" onClick={() => {
              this.props.toggleEditInterest(this.props.interest)
            }
            }
            ></i>
            <i className="icon-trash mx-2 float-right" onClick={() => {
              this.props.deleteFriendInterest(this.props.interest.id)
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
