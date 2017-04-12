
import { Link } from 'react-router';
import React from 'react';

const Sortby = React.createClass({

  render() {
    // if (this.props.value === 'All Titles') {
    //   return (
    //     <option value={this.props.item} selected={this.props.sortValue}>
    //       {this.props.item}
    //     </option>
    //   );
    // } else {
    return (
      <option value={this.props.item}>
        {this.props.item}
      </option>
    );
  // }
}
});

export default Sortby;
