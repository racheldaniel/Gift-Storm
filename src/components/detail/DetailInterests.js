import React, { Component } from 'react';
import { Badge } from 'reactstrap';


export default class DetailInterests extends Component {
  state = {
    hover: false
  }
  render() {
    return (
      <React.Fragment>
        <Badge className="mx-3 my-3 pill" color="primary" pill
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}>{this.props.interest}
        {
          (this.state.hover === true)
            ? <div className="my-2"><i className="icon-pencil mx-2"></i> <i className="icon-trash mx-2 "></i></div>
            : null
        }
        </Badge>
      </React.Fragment>

    )
  }
}
