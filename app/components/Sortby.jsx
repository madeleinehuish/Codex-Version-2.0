
import { Link } from 'react-router';
import React from 'react';

const Sortby = React.createClass({

  render() {
    return (

          <option value={this.props.item}>
            {this.props.item}
          </option>

    );
  }
});

export default Sortby;
